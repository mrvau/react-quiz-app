import classes from "../styles/Summary.module.css"
import image from "../assets//images/success.png"

const Summary = ({score, totalScore}) => {
	return (
		<div className={classes.summary}>
			<div className={classes.point}>
				{/* progress bar will be placed here */}
				<p className={classes.score}>
					Your score is <br />{score} out of {totalScore}
				</p>
			</div>

			<div className={classes.badge}>
				<img src={image} alt="Success" />
			</div>
		</div>
	);
};

export default Summary;
