import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    query,
    orderBy,
    startAfter,
    limit,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const COLORS = {
    blue: "#4361EE",
    yellow: "#FFC107",
    ink: "#0F172A",
    text: "#1F2937",
    subtext: "#6B7280",
    card: "#FFFFFF",
    divider: "rgba(15, 23, 42, 0.06)",
    rowAlt: "rgba(67, 97, 238, 0.03)",
};

const RADIUS = "14px";
const SHADOW = "0 8px 24px rgba(15, 23, 42, 0.08)";
const TRANSITION = "160ms ease";

function SuggestionScreen() {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const pageSize = 10;

    const fetchSuggestions = async (isLoadMore = false) => {
        try {
            const base = query(
                collection(db, "suggestions"),
                orderBy("createdAt", "desc"),
                limit(pageSize)
            );

            const q = isLoadMore && lastDoc
                ? query(
                    collection(db, "suggestions"),
                    orderBy("createdAt", "desc"),
                    startAfter(lastDoc),
                    limit(pageSize)
                )
                : base;

            const querySnapshot = await getDocs(q);
            const newSuggestions = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setSuggestions((prev) => (isLoadMore ? [...prev, ...newSuggestions] : newSuggestions));

            setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);

            setHasMore(querySnapshot.docs.length === pageSize);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        } finally {
            isLoadMore ? setLoadingMore(false) : setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuggestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLoadMore = () => {
        setLoadingMore(true);
        fetchSuggestions(true);
    };

    if (loading) {
        return (
            <div style={tableStyles.container}>
                <div style={tableStyles.card}>
                    <div style={tableStyles.loadingRow}>Loading suggestions…</div>
                </div>
            </div>
        );
    }

    if (!suggestions.length) {
        return (
            <div style={tableStyles.container}>
                <div style={tableStyles.card}>
                    <div style={tableStyles.emptyState}>
                        <div style={tableStyles.emptyBadge}>No suggestions yet</div>
                        <p style={tableStyles.emptyText}>
                            New submissions will appear here as they arrive.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={tableStyles.container}>
            <div style={tableStyles.card}>
                <div style={tableStyles.tableWrap}>
                    <table style={tableStyles.table} role="table">
                        <thead>
                            <tr style={tableStyles.theadRow}>
                                <th scope="col" style={{ ...tableStyles.th, width: "18ch", minWidth: "14ch" }}>Name</th>
                                <th scope="col" style={{ ...tableStyles.th, minWidth: 280 }}>Suggestion</th>
                                <th scope="col" style={{ ...tableStyles.th, width: "20ch", minWidth: "18ch" }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suggestions.map((s, i) => {
                                const created =
                                    s.createdAt?.toDate ? s.createdAt.toDate().toLocaleString() : "N/A";
                                const alt = i % 2 === 1;
                                return (
                                    <tr
                                        key={s.id}
                                        style={{
                                            ...tableStyles.tr,
                                            background: alt ? COLORS.rowAlt : "#fff",
                                        }}
                                    >
                                        <td style={{ ...tableStyles.td, fontWeight: 700, color: COLORS.ink }}>
                                            {s.name || "N/A"}
                                        </td>
                                        <td style={tableStyles.td}>{s.text}</td>
                                        <td style={{ ...tableStyles.td, color: COLORS.subtext }}>{created}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div style={tableStyles.footer}>
                    <div style={tableStyles.footerInfo}>
                        Showing {suggestions.length} {hasMore ? "of many" : "results"}
                    </div>
                    {hasMore && (
                        <button
                            style={{
                                ...tableStyles.loadMore,
                                opacity: loadingMore ? 0.8 : 1,
                            }}
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            aria-busy={loadingMore}
                        >
                            {loadingMore ? "Loading…" : "Load more"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// Styles
const tableStyles = {
    container: { width: "100%" },
    card: {
        background: COLORS.card,
        borderRadius: RADIUS,
        boxShadow: SHADOW,
        overflow: "hidden",
        border: `1px solid ${COLORS.divider}`,
    },
    tableWrap: {
        width: "100%",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
    },
    table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: 0,
        minWidth: 640,                  // keep columns readable on phones
    },
    theadRow: {
        background: "linear-gradient(180deg, rgba(67,97,238,0.06), rgba(255,193,7,0.05))",
    },
    th: {
        textAlign: "left",
        padding: "12px 14px",          // slightly tighter for mobile
        fontSize: 13,
        textTransform: "uppercase",
        letterSpacing: 0.7,
        color: COLORS.subtext,
        position: "sticky",
        top: 0,
        zIndex: 1,
        background: COLORS.card,       // opaque for sticky header
        borderBottom: `1px solid ${COLORS.divider}`,
    },
    tr: { transition: TRANSITION },
    td: {
        padding: "12px 14px",          // slightly tighter for mobile
        borderBottom: `1px solid ${COLORS.divider}`,
        verticalAlign: "top",
        color: COLORS.text,
        lineHeight: 1.5,
        wordBreak: "break-word",       // prevent overflow on long text
    },
    footer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        gap: 8,
        flexWrap: "wrap",
    },
    footerInfo: { color: COLORS.subtext, fontSize: 13 },
    loadMore: {
        background: COLORS.blue,
        color: "#fff",
        borderRadius: 12,
        border: "none",
        padding: "10px 14px",
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 6px 16px rgba(67,97,238,0.35)",
        transition: TRANSITION,
    },
    loadingRow: { padding: 16, color: COLORS.subtext },
    emptyState: {
        padding: "24px 14px",
        display: "grid",
        justifyItems: "center",
        gap: 8,
    },
    emptyBadge: {
        background: COLORS.rowAlt,
        color: COLORS.blue,
        fontWeight: 700,
        borderRadius: 999,
        padding: "6px 10px",
    },
    emptyText: { margin: 0, color: COLORS.subtext },
};



export default SuggestionScreen;
