import Summary from "../Summary";
import Analysis from "../Analysis";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import _ from "lodash"

const Result = () => {
	const { id } = useParams();
	const location = useLocation();
	const { state } = location;
	const { qna } = state;
	const { loading, error, answers } = useAnswers(id);


  const calculateScore = () => {
    let score = 0;

    answers.forEach((question, index1) => {
      let correctIndices = [], checkedIndices = [];

      question.options.forEach((option, index2) => {
        if(option.correct) correctIndices.push(index2);
        if(qna[index1].options[index2].checked) {
          checkedIndices.push(index2);
          option.checked = true;
        }
      })

      if(_.isEqual(correctIndices, checkedIndices)) score += 5;
    })

    return score;
  }

  const userScore = calculateScore();
  const totalScore = answers.length > 0 ? answers.length * 5 : 0;

	return (
		<>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<p className="error">Failed to get answers!</p>
			) : answers ? (
				<>
					<Summary score={userScore} totalScore={totalScore} />
					<Analysis answers={answers} />
				</>
			) : (
				<div>No answers Found.</div>
			)}
		</>
	);
};

export default Result;
