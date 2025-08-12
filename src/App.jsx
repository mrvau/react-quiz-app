import Layout from "./components/Layout";
import Result from "./components/pages/Result";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Quiz from "./components/pages/Quiz";
import { AuthProvider } from "./contexts/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/App.css";

function App() {
	return (
		<Router>
			<AuthProvider>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/quiz" element={<Quiz />} />
						<Route path="/result" element={<Result />} />
					</Routes>
				</Layout>
			</AuthProvider>
		</Router>
	);
}

export default App;
