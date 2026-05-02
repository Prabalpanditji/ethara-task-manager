import React, { useState, useEffect } from "react";
import { taskService, projectService } from "../services/api";
import { TaskCard } from "../components/TaskCard";

export const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [projects, setProjects] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [filters, setFilters] = useState({
		projectId: "",
		status: "",
		priority: "",
	});
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		project: "",
		priority: "Medium",
		dueDate: "",
		estimatedHours: "",
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		loadTasks();
	}, [filters]);

	const loadData = async () => {
		try {
			setLoading(true);
			const projectsRes = await projectService.getProjects();
			setProjects(projectsRes.data);
			await loadTasks();
		} catch (err) {
			setError("Failed to load data");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const loadTasks = async () => {
		try {
			const response = await taskService.getTasks(filters);
			setTasks(response.data);
		} catch (err) {
			setError("Failed to load tasks");
			console.error(err);
		}
	};

	const handleCreateTask = async (e) => {
		e.preventDefault();
		try {
			const payload = { ...formData };
			if (!payload.dueDate) delete payload.dueDate;
			if (!payload.estimatedHours) delete payload.estimatedHours;
			
			await taskService.createTask(payload);
			setFormData({
				title: "",
				description: "",
				project: "",
				priority: "Medium",
				dueDate: "",
				estimatedHours: "",
			});
			setShowForm(false);
			await loadTasks();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to create task");
			console.error(err);
		}
	};

	const handleUpdateTaskStatus = async (taskId, newStatus) => {
		try {
			await taskService.updateTask(taskId, { status: newStatus });
			await loadTasks();
		} catch (err) {
			setError("Failed to update task");
			console.error(err);
		}
	};

	const handleDeleteTask = async (id) => {
		if (window.confirm("Are you sure?")) {
			try {
				await taskService.deleteTask(id);
				await loadTasks();
			} catch (err) {
				setError("Failed to delete task");
				console.error(err);
			}
		}
	};

	if (loading)
		return (
			<div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
				<div className="flex flex-col items-center gap-4">
					<div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
					<p className="text-slate-400 font-medium animate-pulse">Loading tasks...</p>
				</div>
			</div>
		);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
			{/* Decorative background elements */}
			<div className="absolute top-20 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
			<div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
				<div className="flex items-center gap-3">
					<div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
						<svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h1 className="text-3xl font-bold text-white tracking-tight">Tasks</h1>
				</div>
				<button onClick={() => setShowForm(!showForm)} className={showForm ? "btn-secondary" : "btn-primary"}>
					{showForm ? "✕ Cancel" : "+ New Task"}
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
				<div className="glass-card rounded-2xl p-6 md:p-8 mb-8 border border-primary-500/20 shadow-[0_0_20px_rgba(14,165,233,0.1)] relative overflow-hidden">
					<div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px] pointer-events-none"></div>
					
					<h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
						<svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
						</svg>
						Create New Task
					</h3>

					<form onSubmit={handleCreateTask} className="space-y-5 relative z-10">
						<div>
							<label className="block text-sm font-medium text-slate-300 mb-1.5">Task Title <span className="text-rose-500">*</span></label>
							<input
								type="text"
								value={formData.title}
								onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								required
								className="input-field"
								placeholder="What needs to be done?"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
							<textarea
								value={formData.description}
								onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								className="input-field resize-none"
								placeholder="Add details about this task..."
								rows="3"
							></textarea>
						</div>

						<div>
							<label className="block text-sm font-medium text-slate-300 mb-1.5">Project <span className="text-rose-500">*</span></label>
							<select
								value={formData.project}
								onChange={(e) => setFormData({ ...formData, project: e.target.value })}
								required
								className="input-field appearance-none"
							>
								<option value="" className="bg-slate-800">Select a project</option>
								{projects.map((p) => (
									<option key={p._id} value={p._id} className="bg-slate-800">
										{p.name}
									</option>
								))}
							</select>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
									<option value="Critical" className="bg-slate-800">Critical</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-300 mb-1.5">Due Date</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
									</div>
									<input
										type="date"
										value={formData.dueDate}
										onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
										className="input-field pl-10"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-slate-300 mb-1.5">Estimated Hours</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									</div>
									<input
										type="number"
										value={formData.estimatedHours}
										onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
										placeholder="Hours"
										className="input-field pl-10"
										min="0"
										step="0.5"
									/>
								</div>
							</div>
						</div>

						<div className="pt-2">
							<button type="submit" className="btn-primary px-8">
								Create Task
							</button>
						</div>
					</form>
				</div>
			)}

			<div className="glass-card p-4 rounded-xl mb-8 flex flex-col md:flex-row gap-4 items-center border border-white/10">
				<div className="flex items-center gap-2 text-slate-400 pl-2">
					<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
					</svg>
					<span className="font-medium text-sm">Filters:</span>
				</div>
				
				<div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
					<select
						value={filters.projectId}
						onChange={(e) => setFilters({ ...filters, projectId: e.target.value })}
						className="input-field py-2 text-sm appearance-none"
					>
						<option value="" className="bg-slate-800">All Projects</option>
						{projects.map((p) => (
							<option key={p._id} value={p._id} className="bg-slate-800">
								{p.name}
							</option>
						))}
					</select>

					<select
						value={filters.status}
						onChange={(e) => setFilters({ ...filters, status: e.target.value })}
						className="input-field py-2 text-sm appearance-none"
					>
						<option value="" className="bg-slate-800">All Statuses</option>
						<option value="To Do" className="bg-slate-800">To Do</option>
						<option value="In Progress" className="bg-slate-800">In Progress</option>
						<option value="In Review" className="bg-slate-800">In Review</option>
						<option value="Done" className="bg-slate-800">Done</option>
					</select>

					<select
						value={filters.priority}
						onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
						className="input-field py-2 text-sm appearance-none"
					>
						<option value="" className="bg-slate-800">All Priorities</option>
						<option value="Low" className="bg-slate-800">Low</option>
						<option value="Medium" className="bg-slate-800">Medium</option>
						<option value="High" className="bg-slate-800">High</option>
						<option value="Critical" className="bg-slate-800">Critical</option>
					</select>
				</div>
			</div>

			{tasks.length === 0 ? (
				<div className="text-center py-20 px-4 glass-card rounded-2xl border-dashed border-white/10">
					<div className="bg-slate-900/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
						<svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
						</svg>
					</div>
					<h3 className="text-xl font-semibold text-white mb-2">No tasks found</h3>
					<p className="text-slate-400 mb-6 max-w-sm mx-auto">It looks like there are no tasks matching your current filters or you haven't created any yet.</p>
					<button onClick={() => setShowForm(true)} className="btn-primary">
						Create Task
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{tasks.map((task) => (
						<TaskCard
							key={task._id}
							task={task}
							onEdit={() => console.log("Edit:", task._id)}
							onDelete={() => handleDeleteTask(task._id)}
							onStatusChange={(status) => handleUpdateTaskStatus(task._id, status)}
						/>
					))}
				</div>
			)}
		</div>
	);
};
