import { useEffect, useState } from "react";
import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";

export default function useVideoList(page) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [videos, setVideos] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		const fetchVideos = async () => {
			const db = getDatabase();
			const videosRef = ref(db, "videos");
			const videosQuery = query(videosRef, orderByKey(), startAt("" + page), limitToFirst(8));

			try {
				setError(false);
				const snapshot = await get(videosQuery);

				if (snapshot.exists()) {
					setVideos((prev) => {
						return [...prev, ...Object.values(snapshot.val())];
					});
				} else {
					setHasMore(false);
				}
			} catch (error) {
				console.error(error);
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchVideos();
	}, [page]);

	return {
		loading,
		error,
		videos,
		hasMore,
	};
}
