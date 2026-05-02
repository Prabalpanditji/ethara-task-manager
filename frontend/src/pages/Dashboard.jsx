import React, { useState, useEffect } from "react";
import { taskService, projectService } from "../services/api";

export const Dashboard = () => {
	const [stats, setStats] = useState(null);
	const [projects, setProjects] = useState([]);
	const [overdueTasks, setOverdueTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		loadDashboard();
	}, []);

	const loadDashboard = async () => {
		try {
			setLoading(true);
			const [tasksRes, projectsRes] = await Promise.all([
				taskService.getTaskStats(),
				projectService.getProjects(),
			]);

			setStats(tasksRes.data);
			setProjects(projectsRes.data);
			setOverdueTasks(tasksRes.data.overdueTasks || []);
		} catch (err) {
			setError("Failed to load dashboard");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	if (loading)
		return (
			<div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
				<div className="flex flex-col items-center gap-4">
					<div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
					<p className="text-slate-400 font-medium animate-pulse">Loading dashboard...</p>
				</div>
			</div>
		);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
			{/* Decorative background elements */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
			<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

			<div className="flex items-center gap-3 mb-8">
				<div className="p-3 bg-primary-500/10 rounded-xl border border-primary-500/20">
					<svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
					</svg>
				</div>
				<h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
			</div>

			{error && (
				<div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl mb-8 flex items-center gap-3">
					<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span className="font-medium">{error}</span>
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
					<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
						<svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
						</svg>
					</div>
					<h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 relative z-10">Total Tasks</h3>
					<p className="text-4xl font-bold text-white relative z-10">{stats?.total || 0}</p>
				</div>

				<div className="glass-card p-6 rounded-2xl relative overflow-hidden group border-l-4 border-l-blue-500">
					<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
						<svg className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 relative z-10">In Progress</h3>
					<p className="text-4xl font-bold text-blue-400 relative z-10">
						{stats?.byStatus?.["In Progress"] || 0}
					</p>
				</div>

				<div className="glass-card p-6 rounded-2xl relative overflow-hidden group border-l-4 border-l-emerald-500">
					<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
						<svg className="w-16 h-16 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 relative z-10">Completed</h3>
					<p className="text-4xl font-bold text-emerald-400 relative z-10">
						{stats?.byStatus?.["Done"] || 0}
					</p>
				</div>

				<div className="glass-card p-6 rounded-2xl relative overflow-hidden group border-l-4 border-l-rose-500">
					<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
						<svg className="w-16 h-16 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 relative z-10">Overdue</h3>
					<p className="text-4xl font-bold text-rose-400 relative z-10">{stats?.overdue || 0}</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="glass-card p-6 md:p-8 rounded-2xl">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-2 bg-purple-500/10 rounded-lg">
							<svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
							</svg>
						</div>
						<h2 className="text-xl font-bold text-white">Task Status Breakdown</h2>
					</div>
					
					<div className="space-y-5">
						{stats?.byStatus &&
							Object.entries(stats.byStatus).map(([status, count]) => {
								const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
								let colorClass = "bg-slate-500";
								if (status === "To Do") colorClass = "bg-slate-400";
								if (status === "In Progress") colorClass = "bg-blue-500";
								if (status === "In Review") colorClass = "bg-purple-500";
								if (status === "Done") colorClass = "bg-emerald-500";

								return (
									<div key={status} className="relative">
										<div className="flex justify-between items-end mb-2">
											<span className="text-sm font-semibold text-slate-300">{status}</span>
											<span className="text-sm font-bold text-white bg-slate-800 px-2 py-0.5 rounded">{count}</span>
										</div>
										<div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
											<div
												className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`}
												style={{ width: `${percentage}%` }}
											></div>
										</div>
									</div>
								);
							})}
					</div>
				</div>

				<div className="space-y-8">
					{overdueTasks && overdueTasks.length > 0 && (
						<div className="glass-card p-6 md:p-8 rounded-2xl border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-rose-500/10 rounded-lg animate-pulse">
									<svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h2 className="text-xl font-bold text-rose-400">Overdue Tasks</h2>
							</div>
							
							<div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
								{overdueTasks.map((task) => (
									<div key={task.id} className="flex justify-between items-center p-4 bg-slate-900/50 rounded-xl border border-rose-500/10 hover:border-rose-500/30 transition-colors">
										<span className="font-medium text-slate-200 truncate pr-4">{task.title}</span>
										<span className="text-xs font-semibold px-2.5 py-1 bg-rose-500/10 text-rose-400 rounded-lg whitespace-nowrap">
											{new Date(task.dueDate).toLocaleDateString()}
										</span>
									</div>
								))}
							</div>
						</div>
					)}

					<div className="glass-card p-6 md:p-8 rounded-2xl">
						<div className="flex items-center gap-3 mb-6">
							<div className="p-2 bg-indigo-500/10 rounded-lg">
								<svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
								</svg>
							</div>
							<h2 className="text-xl font-bold text-white">Recent Projects</h2>
						</div>
						
						<div className="space-y-3">
							{projects.slice(0, 5).map((project) => (
								<div key={project._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-white/5 hover:bg-slate-900/60 transition-colors gap-3">
									<div className="flex-1 min-w-0">
										<h3 className="font-bold text-slate-200 truncate">{project.name}</h3>
										<p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
											<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
											</svg>
											{project.members.length} members
										</p>
									</div>
									<span className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap self-start sm:self-auto
										${project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
										  project.status === 'Completed' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 
										  project.status === 'On Hold' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
										  'bg-slate-500/10 text-slate-400 border border-slate-500/20'}`}
									>
										{project.status}
									</span>
								</div>
							))}
							{projects.length === 0 && (
								<div className="text-center p-6 bg-slate-900/30 rounded-xl border border-white/5 border-dashed">
									<p className="text-slate-400">No projects found</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
