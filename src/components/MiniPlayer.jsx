import classes from "../styles/MiniPlayer.module.css";

import { useRef, useState } from "react";
import ReactPlayer from "react-player";

const MiniPlayer = ({ id, title }) => {
	const buttonRef = useRef();
	const [status, setStatus] = useState(false);

	const youtubeURL = `https://www.youtube.com/watch?v=${id}`;

	const toggleMiniPlayer = () => {
		if (!status) {
			buttonRef.current.classList.remove(classes.floatingBtn);
			setStatus(true);
		} else {
			buttonRef.current.classList.add(classes.floatingBtn);
			setStatus(false);
		}
	};
	return (
		<div
			className={`${classes.miniPlayer} ${classes.floatingBtn}`}
			ref={buttonRef}
			onClick={toggleMiniPlayer}>
			<span className={`material-icons-outlined ${classes.open}`}> play_circle_filled </span>
			<span className={`material-icons-outlined ${classes.close}`} onClick={toggleMiniPlayer}>
				{" "}
				close{" "}
			</span>
			<div className={classes.playerContainer}>
				<ReactPlayer
					src={youtubeURL}
					className={classes.player}
					width="100%"
					height="100%"
					playing={status}
					controls
				/>
			</div>
			<p>{title}</p>
		</div>
	);
};

export default MiniPlayer;
