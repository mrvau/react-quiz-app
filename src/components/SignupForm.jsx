import Form from "./Form";
import classes from "../styles/Signup.module.css";
import TextInput from "./TextInput";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const SignupForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [agree, setAgree] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {signup} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      return setError("Passwords don't match!");
    }

    try {
      setError("");
      setLoading(true);

      await signup(email, password, username);
      navigate('/');

    } catch (err) {
      console.error(err);
      setError("Failed to sign up!");
    } finally {
      setLoading(false);
    }
  }

	return (
		<Form className={classes.signup} onSubmit={handleSubmit}>
			<TextInput
				type="text"
				placeholder="Enter name"
				icon="person"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
        required
			/>
			<TextInput
				type="email"
				placeholder="Enter email"
				icon="alternate_email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
        required
			/>
			<TextInput
				type="password"
				placeholder="Enter password"
				icon="lock"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
        required
			/>
			<TextInput
				type="password"
				placeholder="Confirm password"
				icon="lock_clock"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
        required
			/>
			<Checkbox
				text="I agree to the Terms &amp; Conditions"
				checked={agree}
				onChange={(e) => setAgree(e.target.checked)}
        required
			/>
			<Button disabled={loading} type='submit'>
				<span>Submit now</span>
			</Button>
      {error && <p className="error">{error}</p>}
			<div className="info">
				Already have an account? <Link to="/login">Login</Link> instead.
			</div>
		</Form>
	);
};

export default SignupForm;
