import mongoose from 'mongoose'

const Schema = mongoose.Schema

const maintenanceTaskSchema = new Schema({
    item_id: { type: Number, required: true },
    assigned_technician_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    priority_level: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], required: true },
    task_type: { type: String, enum: ['Repair', 'Routine Maintenance'], required: true },
    scheduled_date: Date,
    completion_date: Date,
    }, {
    timestamps: true,
    })

const MaintenanceTask = mongoose.model('MaintenanceTask', maintenanceTaskSchema)

export { MaintenanceTask }