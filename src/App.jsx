import Layout from "./components/Layout";
import Result from "./components/pages/Result";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Quiz from "./components/pages/Quiz";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/App.css";
import PublicRoute from "./components/PublicRoute";

function App() {
	return (
		<Router>
			<AuthProvider>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />

						<Route
							path="/login"
							element={
								<PublicRoute>
									<Login />
								</PublicRoute>
							}
						/>

						<Route
							path="/signup"
							element={
								<PublicRoute>
									<Signup />
								</PublicRoute>
							}
						/>

						<Route
							path="/quiz/:id"
							element={
								<PrivateRoute>
									<Quiz />
								</PrivateRoute>
							}
						/>

						<Route
							path="/result/:id"
							element={
								<PrivateRoute>
									<Result />
								</PrivateRoute>
							}
						/>
					</Routes>
				</Layout>
			</AuthProvider>
		</Router>
	);
}

export default App;
