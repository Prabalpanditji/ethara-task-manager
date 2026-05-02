import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a task title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters']
        },
        description: {
            type: String,
            maxlength: [1000, 'Description cannot be more than 1000 characters']
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },
        assignedTo: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['To Do', 'In Progress', 'In Review', 'Done'],
            default: 'To Do'
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High', 'Critical'],
            default: 'Medium'
        },
        dueDate: Date,
        startDate: Date,
        estimatedHours: Number,
        actualHours: Number,
        isOverdue: {
            type: Boolean,
            default: false
        },
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                text: String,
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

// Populate references
taskSchema.pre(/^find/, function () {
    this.populate('project', 'name')
        .populate('assignedTo', 'name email avatar')
        .populate('createdBy', 'name email')
        .populate('comments.user', 'name avatar');
});

// Check if overdue before saving
taskSchema.pre('save', function () {
    if (this.dueDate) {
        this.isOverdue = new Date() > this.dueDate && this.status !== 'Done';
    }
});

export default mongoose.model('Task', taskSchema);
