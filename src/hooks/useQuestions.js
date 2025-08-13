import { useEffect, useState } from "react";
import { get, getDatabase, orderByKey, query, ref } from "firebase/database";

export default function useQuestions(id) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const fetchQuestions = async () => {
			const db = getDatabase();
			const quizRef = ref(db, "quiz/" + id + "/questions");
			const quizQuery = query(quizRef, orderByKey());

			try {
				setError(false);
				setLoading(true);
				const snapshot = await get(quizQuery);

				if (snapshot.exists()) {
					setQuestions((prev) => {
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
		fetchQuestions();
	}, [id]);

	return {
		loading,
		error,
		questions,
	};
}
