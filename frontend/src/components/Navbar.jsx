import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
	const { user, logout, isAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	if (!isAuthenticated) return null;

	return (
		<nav className="sticky top-0 z-50 glass-panel border-b border-white/10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<div className="flex-shrink-0 flex items-center">
						<Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent hover:from-primary-300 hover:to-primary-500 transition-all">
							📋 Project Manager
						</Link>
					</div>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center space-x-8">
						<Link to="/dashboard" className="text-slate-300 hover:text-white font-medium transition-colors">
							Dashboard
						</Link>
						<Link to="/projects" className="text-slate-300 hover:text-white font-medium transition-colors">
							Projects
						</Link>
						<Link to="/tasks" className="text-slate-300 hover:text-white font-medium transition-colors">
							Tasks
						</Link>
						<div className="flex items-center space-x-4 ml-4 border-l border-white/10 pl-4">
							<div className="flex flex-col text-right">
								<span className="text-sm font-semibold text-white">{user?.name}</span>
								<span className="text-xs text-primary-400 font-medium">{user?.role}</span>
							</div>
							<button onClick={handleLogout} className="btn-secondary text-sm">
								Logout
							</button>
						</div>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-slate-300 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
						>
							<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								{isOpen ? (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
								) : (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
								)}
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="md:hidden glass-panel border-t border-white/10 absolute w-full left-0">
					<div className="px-4 pt-2 pb-4 space-y-1">
						<Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>
							Dashboard
						</Link>
						<Link to="/projects" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>
							Projects
						</Link>
						<Link to="/tasks" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5" onClick={() => setIsOpen(false)}>
							Tasks
						</Link>
						<div className="pt-4 mt-2 border-t border-white/10">
							<div className="px-3 mb-2">
								<p className="text-sm font-semibold text-white">{user?.name}</p>
								<p className="text-xs text-primary-400 font-medium">{user?.role}</p>
							</div>
							<button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-rose-400 hover:text-rose-300 hover:bg-white/5">
								Logout
							</button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};
