import Answers from "./Answers";
import classes from "../styles/Question.module.css";

const Questions = ({ answers = [] }) => {
	return answers.map((answer, index) => (
		<div className={classes.question} key={index}>
			<div className={classes.qtitle}>
				<span className="material-icons-outlined"> help_outline </span>
				{answer.title}
			</div>
			<Answers options={answer.options} />
		</div>
	));
};

export default Questions;
