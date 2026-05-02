import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a project name'],
            trim: true,
            maxlength: [100, 'Project name cannot be more than 100 characters']
        },
        description: {
            type: String,
            maxlength: [500, 'Description cannot be more than 500 characters']
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        members: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                role: {
                    type: String,
                    enum: ['Admin', 'Member'],
                    default: 'Member'
                }
            }
        ],
        status: {
            type: String,
            enum: ['Active', 'Completed', 'On Hold', 'Archived'],
            default: 'Active'
        },
        startDate: Date,
        endDate: Date,
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium'
        }
    },
    {
        timestamps: true
    }
);

// Populate references
projectSchema.pre(/^find/, function () {
    this.populate('owner', 'name email avatar')
        .populate('members.user', 'name email avatar role');
});

export default mongoose.model('Project', projectSchema);
