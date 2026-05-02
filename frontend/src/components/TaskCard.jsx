import React from "react";

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
	const getPriorityColor = (priority) => {
		const colors = {
			Low: "border-emerald-500 text-emerald-400 bg-emerald-500/10",
			Medium: "border-amber-500 text-amber-400 bg-amber-500/10",
			High: "border-orange-500 text-orange-400 bg-orange-500/10",
			Critical: "border-rose-500 text-rose-400 bg-rose-500/10",
		};
		return colors[priority] || "border-gray-500 text-gray-400 bg-gray-500/10";
	};

	const getStatusColor = (status) => {
		const colors = {
			"To Do": "bg-slate-700 text-slate-300",
			"In Progress": "bg-blue-500/20 text-blue-400",
			"In Review": "bg-purple-500/20 text-purple-400",
			Done: "bg-emerald-500/20 text-emerald-400",
		};
		return colors[status] || "bg-gray-700 text-gray-300";
	};

	const priorityStyle = getPriorityColor(task.priority);

	return (
		<div className={`glass-card rounded-xl p-5 flex flex-col h-full relative overflow-hidden group border-l-4 ${priorityStyle.split(' ')[0]}`}>
			<div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-8 -mt-8 transition-all duration-500 group-hover:bg-white/10"></div>
			
			<div className="flex justify-between items-start mb-3 relative z-10">
				<h3 className="text-lg font-bold text-white truncate pr-3">{task.title}</h3>
				<span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded ${priorityStyle}`}>
					{task.priority}
				</span>
			</div>

			{task.description && (
				<p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow relative z-10">
					{task.description}
				</p>
			)}

			<div className="flex flex-wrap gap-2 items-center mb-4 relative z-10">
				<span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${getStatusColor(task.status)}`}>
					{task.status}
				</span>
				
				{task.dueDate && (
					<span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md font-medium ${task.isOverdue ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-slate-800 text-slate-300 border border-white/5"}`}>
						<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						{new Date(task.dueDate).toLocaleDateString()}
					</span>
				)}
			</div>

			{task.assignedTo && task.assignedTo.length > 0 && (
				<div className="flex items-center gap-2 mb-5 relative z-10 bg-slate-900/30 p-2 rounded-lg border border-white/5">
					<svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					</svg>
					<span className="text-xs text-slate-300 truncate">
						{task.assignedTo.map((u) => u.name).join(", ")}
					</span>
				</div>
			)}

			<div className="flex flex-wrap sm:flex-nowrap gap-2 mt-auto relative z-10 pt-3 border-t border-white/5 items-center">
				<select
					value={task.status}
					onChange={(e) => onStatusChange(e.target.value)}
					className="bg-slate-900 border border-white/10 text-slate-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full sm:w-auto px-2.5 py-1.5 outline-none"
				>
					<option value="To Do" className="bg-slate-800">To Do</option>
					<option value="In Progress" className="bg-slate-800">In Progress</option>
					<option value="In Review" className="bg-slate-800">In Review</option>
					<option value="Done" className="bg-slate-800">Done</option>
				</select>
				
				<div className="flex gap-2 w-full sm:w-auto ml-auto">
					<button onClick={onEdit} className="btn-secondary px-3 py-1.5 text-xs flex-1 sm:flex-none flex justify-center items-center">
						Edit
					</button>
					<button onClick={onDelete} className="btn-danger px-3 py-1.5 text-xs flex-1 sm:flex-none flex justify-center items-center">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};
