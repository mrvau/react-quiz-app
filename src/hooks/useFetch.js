import { useEffect, useState } from "react";

export const useFetch = (url, method, headers) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [result, setResult] = useState(null);

	useEffect(() => {
		const requestFetch = async () => {
			try {
				setLoading(true);
				setError(false);
				const response = await fetch(url, {
					method: method || "GET",
					headers: headers,
				});
				const data = await response.json();
				setResult(data);
			} catch (err) {
				console.error(err);
				setError(true);
			} finally {
				setLoading(false);
			}
		};
		requestFetch();
	}, []);

	return {
		loading,
		error,
		result,
	};
};

export default useFetch;
