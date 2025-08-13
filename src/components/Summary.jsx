import classes from "../styles/Summary.module.css";
import imageAlt from "../assets//images/success.png";
import useFetch from "../hooks/useFetch";

const Summary = ({ score, totalScore }) => {
	const getQuery = () => {
		const percent = (score / totalScore) * 100;
		if (percent < 50) {
			return "failed";
		} else if (percent < 75) {
			return "good";
		} else if (percent < 100) {
			return "very good";
		} else {
			return "excellent";
		}
	};

	const query = getQuery();

	const { loading, error, result } = useFetch(
		`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
		"GET",
		{
			Authorization: import.meta.env.VITE_PEXELS_API_KEY,
		},
	);

	const image = result ? result?.photos[0].src.medium : imageAlt;
	return (
		<div className={classes.summary}>
			<div className={classes.point}>
				{/* progress bar will be placed here */}
				<p className={classes.score}>
					Your score is <br />
					{score} out of {totalScore}
				</p>
			</div>

			{loading ? (
				<div className={classes.badge}>Loading your badge</div>
			) : error ? (
				<p className="error">An error occured!</p>
			) : (
				<div className={classes.badge}>
					<img src={image} alt="Success" />
				</div>
			)}
		</div>
	);
};

export default Summary;
