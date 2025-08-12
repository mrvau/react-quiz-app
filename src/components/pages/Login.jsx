import Illustration from "../Illustration";
import classes from "../../styles/Login.module.css";
import TextInput from "../TextInput";
import Button from "../Button";
import Form from "../Form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		try {
			await login(email, password);
			navigate('/');
		} catch (err) {
			console.error(err);
			setError("Failed to log in!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<h1>Login to your account</h1>
			<div className="column">
				<Illustration />
				<Form className={classes.login} onSubmit={handleSubmit}>
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
					<Button type="submit" disabled={loading}>
						<span>Submit now</span>
					</Button>

					{error && <p className="error">{error}</p>}

					<div className="info">
						Don't have an account? <Link to="/signup">Signup</Link> instead.
					</div>
				</Form>
			</div>
		</>
	);
};

export default Login;
