import Answers from "../Answers";
import ProgressBar from "../ProgressBar";
import MiniPlayer from "../MiniPlayer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useQuestions from "../../hooks/useQuestions";
import { useEffect, useReducer, useState } from "react";
import _ from "lodash";
import { useAuth } from "../../contexts/AuthContext";
import { getDatabase, ref, set } from "firebase/database";

const initialState = null;

const reducer = (state, action) => {
	switch (action.type) {
		case "questions":
			action.value.forEach((question) => {
				question.options.forEach((option) => {
					option.checked = false;
				});
			});
			return action.value;
		case "answer": {
			const questions = _.cloneDeep(state);
			questions[action.questionID].options[action.optionIndex].checked = action.value;
			return questions;
		}
		default:
			return state;
	}
};

const Quiz = () => {
	const { id } = useParams();
	const { loading, error, questions } = useQuestions(id);
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const [qna, dispatch] = useReducer(reducer, initialState);
	const { currentUser } = useAuth();

  const navigate = useNavigate();
	const location = useLocation();

	const {videoTitle} = location.state;

	useEffect(() => {
		dispatch({ type: "questions", value: questions });
	}, [questions]);

	const handleAnswerChange = (e, index) => {
		dispatch({
			type: "answer",
			questionID: currentQuestion,
			optionIndex: index,
			value: e.target.checked,
		});
	};

	const handleNextClick = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion((prev) => prev + 1);
		}
	};

	const handlePreviousClick = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion((prev) => prev - 1);
		}
	};

	const handleSubmit = async () => {
		const { uid } = currentUser;

		const db = getDatabase();
		const resultRef = ref(db, `result/${uid}`);

		await set(resultRef, {
			[id]: qna,
		});

		navigate(`/result/${id}`, {state: {qna}});
    return;
	};



	const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

	return (
		<>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<p className="error">Failed to load questions!</p>
			) : qna && qna.length > 0 ? (
				<>
					<h1>{qna[currentQuestion].title}</h1>
					<h4>Question can have multiple answers</h4>

					<Answers
						input
						options={qna[currentQuestion].options}
						handleChange={handleAnswerChange}
					/>
					<ProgressBar
						next={handleNextClick}
						prev={handlePreviousClick}
            submit={handleSubmit}
						progress={percentage}
					/>
					<MiniPlayer id={id} title={videoTitle} />
				</>
			) : (
				<div>No questions to show.</div>
			)}
		</>
	);
};

export default Quiz;
