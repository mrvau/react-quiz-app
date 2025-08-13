import { useEffect, useState } from "react";
import { get, getDatabase, orderByKey, query, ref } from "firebase/database";

export default function useAnswers(id) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		const fetchAnswers = async () => {
			const db = getDatabase();
			const answersRef = ref(db, "answers/" + id + "/questions");
			const answersQuery = query(answersRef, orderByKey());

			try {
				setError(false);
				setLoading(true);
				const snapshot = await get(answersQuery);

				if (snapshot.exists()) {
					setAnswers((prev) => {
						return [...prev, ...Object.values(snapshot.val())];
					});
				}
			} catch (error) {
				console.error(error);
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchAnswers();
	}, [id]);

	return {
		loading,
		error,
		answers,
	};
}
