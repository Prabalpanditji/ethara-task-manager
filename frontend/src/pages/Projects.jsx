import React, { useState, useEffect } from "react";
import { projectService } from "../services/api";
import { ProjectCard } from "../components/ProjectCard";

export const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		startDate: "",
		endDate: "",
		priority: "Medium",
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		loadProjects();
	}, []);

	const loadProjects = async () => {
		try {
			setLoading(true);
			const response = await projectService.getProjects();
			setProjects(response.data);
		} catch (err) {
			setError("Failed to load projects");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateProject = async (e) => {
		e.preventDefault();
		try {
			const payload = { ...formData };
			if (!payload.startDate) delete payload.startDate;
			if (!payload.endDate) delete payload.endDate;

			await projectService.createProject(payload);
			setFormData({
				name: "",
				description: "",
				startDate: "",
				endDate: "",
				priority: "Medium",
			});
			setShowForm(false);
			await loadProjects();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to create project");
			console.error(err);
		}
	};

	const handleDeleteProject = async (id) => {
		if (window.confirm("Are you sure?")) {
			try {
				await projectService.deleteProject(id);
				await loadProjects();
			} catch (err) {
				setError("Failed to delete project");
				console.error(err);
			}
		}
	};

	if (loading)
		return (
			<div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
				<div className="flex flex-col items-center gap-4">
					<div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
					<p className="text-slate-400 font-medium animate-pulse">Loading projects...</p>
				</div>
			</div>
		);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
			{/* Decorative background elements */}
			<div className="absolute top-20 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
			<div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
				<div className="flex items-center gap-3">
					<div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
						<svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
						</svg>
					</div>
					<h1 className="text-3xl font-bold text-white tracking-tight">Projects</h1>
				</div>
				<button onClick={() => setShowForm(!showForm)} className={showForm ? "btn-secondary" : "btn-primary"}>
					{showForm ? "✕ Cancel" : "+ New Project"}
				</button>
			</div>

			{error && (
				<div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl mb-8 flex items-center gap-3">
					<svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span className="font-medium">{error}</span>
				</div>
			)}

			{showForm && (
				<div className="glass-card rounded-2xl p-6 md:p-8 mb-10 border border-primary-500/20 shadow-[0_0_20px_rgba(14,165,233,0.1)] relative overflow-hidden">
					<div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px] pointer-events-none"></div>
					
					<h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
						<svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
						</svg>
						Create New Project
					</h3>

					<form onSubmit={handleCreateProject} className="space-y-5 relative z-10">
						<div>
							<label className="block text-sm font-medium text-slate-300 mb-1.5">Project Name <span className="text-rose-500">*</span></label>
							<input
								type="text"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								required
								className="input-field"
								placeholder="E.g., Website Redesign"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
							<textarea
								value={formData.description}
								onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								className="input-field resize-none"
								placeholder="What is this project about?"
								rows="3"
							></textarea>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
							<div>
								<label className="block text-sm font-medium text-slate-300 mb-1.5">Start Date</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
									</div>
									<input
										type="date"
										value={formData.startDate}
										onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
										className="input-field pl-10"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-300 mb-1.5">End Date</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
									</div>
									<input
										type="date"
										value={formData.endDate}
										onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
										className="input-field pl-10"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-300 mb-1.5">Priority</label>
								<select
									value={formData.priority}
									onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
									className="input-field appearance-none"
								>
									<option value="Low" className="bg-slate-800">Low</option>
									<option value="Medium" className="bg-slate-800">Medium</option>
									<option value="High" className="bg-slate-800">High</option>
								</select>
							</div>
						</div>

						<div className="pt-2">
							<button type="submit" className="btn-primary px-8">
								Create Project
							</button>
						</div>
					</form>
				</div>
			)}

			{projects.length === 0 ? (
				<div className="text-center py-20 px-4 glass-card rounded-2xl border-dashed border-white/10">
					<div className="bg-slate-900/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
						<svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
						</svg>
					</div>
					<h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
					<p className="text-slate-400 mb-6 max-w-sm mx-auto">Get started by creating your first project to organize your tasks and collaborate with your team.</p>
					<button onClick={() => setShowForm(true)} className="btn-primary">
						Create First Project
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{projects.map((project) => (
						<ProjectCard
							key={project._id}
							project={project}
							onEdit={() => console.log("Edit:", project._id)}
							onDelete={() => handleDeleteProject(project._id)}
						/>
					))}
				</div>
			)}
		</div>
	);
};
