import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { Tasks } from "./pages/Tasks";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, loading } = useContext(AuthContext);

	if (loading)
		return (
			<div className="flex items-center justify-center min-h-screen bg-background">
				<div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
			</div>
		);

	return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<BrowserRouter>
			<div className="flex flex-col min-h-screen bg-background text-slate-100">
				<Navbar />
				<main className="flex-grow">
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />

						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/projects"
							element={
								<ProtectedRoute>
									<Projects />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/tasks"
							element={
								<ProtectedRoute>
									<Tasks />
								</ProtectedRoute>
							}
						/>

						<Route
							path="/"
							element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
						/>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}
