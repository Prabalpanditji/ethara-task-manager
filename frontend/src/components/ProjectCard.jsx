import React from "react";

export const ProjectCard = ({ project, onEdit, onDelete }) => {
	const getStatusColor = (status) => {
		const colors = {
			Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
			Completed: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
			"On Hold": "bg-amber-500/10 text-amber-400 border-amber-500/20",
			Archived: "bg-slate-500/10 text-slate-400 border-slate-500/20",
		};
		return colors[status] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
	};

	return (
		<div className="glass-card rounded-xl p-5 flex flex-col h-full relative overflow-hidden group">
			<div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-primary-500/10"></div>
			
			<div className="flex justify-between items-start mb-4 relative z-10">
				<h2 className="text-xl font-bold text-white truncate pr-4">{project.name}</h2>
				<span className={`px-2.5 py-1 text-xs font-semibold rounded-full border whitespace-nowrap ${getStatusColor(project.status)}`}>
					{project.status}
				</span>
			</div>

			{project.description && (
				<p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow relative z-10">
					{project.description}
				</p>
			)}

			<div className="grid grid-cols-2 gap-4 mb-4 text-sm relative z-10">
				<div className="bg-slate-900/40 p-2.5 rounded-lg border border-white/5">
					<span className="block text-xs text-slate-500 font-medium mb-1">Owner</span>
					<span className="text-slate-300 font-medium truncate flex items-center gap-1.5">
						<div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-[10px] text-white uppercase shrink-0">
							{project.owner?.name?.charAt(0) || '?'}
						</div>
						{project.owner?.name || 'Unknown'}
					</span>
				</div>
				<div className="bg-slate-900/40 p-2.5 rounded-lg border border-white/5">
					<span className="block text-xs text-slate-500 font-medium mb-1">Members</span>
					<span className="text-slate-300 font-medium flex items-center gap-1.5">
						<svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
						{project.members?.length || 0}
					</span>
				</div>
			</div>

			{project.startDate && project.endDate && (
				<div className="text-xs text-slate-400 mb-5 flex items-center gap-2 bg-slate-900/30 p-2 rounded border border-white/5 relative z-10">
					<svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<span>
						{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
					</span>
				</div>
			)}

			<div className="flex gap-3 mt-auto relative z-10 pt-2 border-t border-white/5">
				<button onClick={onEdit} className="flex-1 btn-secondary text-sm py-1.5 flex justify-center items-center gap-1.5">
					<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
					</svg>
					Edit
				</button>
				<button onClick={onDelete} className="flex-1 btn-danger text-sm py-1.5 flex justify-center items-center gap-1.5">
					<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
					Delete
				</button>
			</div>
		</div>
	);
};
