import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/api";

export const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		setLoading(true);

		try {
			await authService.signup(name, email, password);
			navigate("/login");
		} catch (err) {
			setError(err.response?.data?.message || "Signup failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
			{/* Background Blobs */}
			<div className="absolute top-0 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px]"></div>
			<div className="absolute bottom-0 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]"></div>

			<div className="max-w-md w-full glass-panel rounded-2xl p-8 relative z-10 border border-white/10 shadow-2xl">
				<div className="text-center mb-10">
					<h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent mb-2">
						📋 Project Manager
					</h1>
					<h2 className="text-xl text-slate-300 font-semibold">Create Account</h2>
					<p className="text-slate-400 text-sm mt-2">Sign up to get started managing your projects</p>
				</div>

				{error && (
					<div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-lg mb-6 text-sm flex items-start gap-3">
						<svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span>{error}</span>
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
							</div>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="input-field pl-10"
								placeholder="John Doe"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
								</svg>
							</div>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="input-field pl-10"
								placeholder="you@example.com"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
							</div>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="input-field pl-10"
								placeholder="••••••••"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
								</svg>
							</div>
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
								className="input-field pl-10"
								placeholder="••••••••"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="btn-primary w-full py-3 mt-4 text-lg flex justify-center items-center gap-2"
					>
						{loading ? (
							<>
								<svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Creating account...
							</>
						) : (
							"Sign Up"
						)}
					</button>
				</form>

				<p className="mt-8 text-center text-sm text-slate-400">
					Already have an account?{" "}
					<Link to="/login" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
						Login here
					</Link>
				</p>
			</div>
		</div>
	);
};
