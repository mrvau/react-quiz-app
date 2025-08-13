import Checkbox from "./Checkbox";
import classes from "../styles/Answers.module.css";
import { Fragment } from "react";

const Answers = ({ options = [], handleChange, input }) => {
	return (
		<div className={classes.answers}>
			{options &&
				options.map((option, index) => (
					<Fragment key={index}>
						{input ? (
							<Checkbox
								key={option.title}
								className={classes.answer}
								text={option.title}
								checked={option.checked}
								onChange={(e) => handleChange(e, index)}
							/>
						) : (
							<Checkbox
								key={option.title}
								className={`${classes.answer} ${
									option.correct
										? classes.correct
										: option.checked
										? classes.wrong
										: null
								}`}
								text={option.title}
								defaultChecked={option.checked}
								disabled
							/>
						)}
					</Fragment>
				))}
		</div>
	);
};

export default Answers;
