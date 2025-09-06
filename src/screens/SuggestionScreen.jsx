import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, startAfter, limit } from "firebase/firestore";
import { db } from "../firebaseConfig";

function SuggestionScreen() {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const pageSize = 10;

    const fetchSuggestions = async (isLoadMore = false) => {
        try {
            const q = isLoadMore
                ? query(
                    collection(db, "suggestions"),
                    orderBy("createdAt", "desc"),
                    startAfter(lastDoc),
                    limit(pageSize)
                )
                : query(
                    collection(db, "suggestions"),
                    orderBy("createdAt", "desc"),
                    limit(pageSize)
                );

            const querySnapshot = await getDocs(q);

            const newSuggestions = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            if (isLoadMore) {
                setSuggestions((prev) => [...prev, ...newSuggestions]);
            } else {
                setSuggestions(newSuggestions);
            }

            // Update lastDoc for pagination
            if (querySnapshot.docs.length > 0) {
                setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            }

            // Check if more data is available
            if (querySnapshot.docs.length < pageSize) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        } finally {
            if (isLoadMore) {
                setLoadingMore(false);
            } else {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchSuggestions();
    }, []);

    const handleLoadMore = () => {
        setLoadingMore(true);
        fetchSuggestions(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-[#4361EE] font-semibold animate-pulse">
                    Loading suggestions...
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-6 text-white text-center">User Suggestions</h1>

            {suggestions.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No suggestions found.</p>
            ) : (
                <>
                    <div className="overflow-x-auto bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-lg border border-white border-opacity-20 p-4 mb-4">
                        <table className="min-w-full divide-y divide-gray-200 table-auto rounded-lg">
                            <thead className="bg-white bg-opacity-20">
                                <tr>
                                    <th className="px-4 py-3 text-left text-[#4361EE] font-semibold rounded-tl-lg">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-[#4361EE] font-semibold">
                                        Suggestion
                                    </th>
                                    <th className="px-4 py-3 text-left text-[#4361EE] font-semibold rounded-tr-lg">
                                        Date Submitted
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {suggestions.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-100 bg-opacity-10 transition duration-200 rounded-lg">
                                        <td className="px-4 py-3 text-[#4361EE] font-medium">{s.name || "N/A"}</td>
                                        <td className="px-4 py-3 text-[#4361EE]">{s.text}</td>
                                        <td className="px-4 py-3 text-gray-400 text-sm">
                                            {s.createdAt ? s.createdAt.toDate().toLocaleString() : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {hasMore && (
                        <div className="text-center">
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="mt-4 px-4 py-2 bg-[#4361EE] text-white rounded-lg shadow hover:bg-[#3651D4] transition"
                            >
                                {loadingMore ? "Loading..." : "Load More"}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default SuggestionScreen;