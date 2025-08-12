import classes from "../styles/Illustration.module.css";
import image from "../assets/images/signup.svg"

const Illustration = () => {
  return (
		<div className={classes.illustration}>
			<img src={image} alt="Signup" />
		</div>
  );
}

export default Illustration