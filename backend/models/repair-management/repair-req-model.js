import mongoose from 'mongoose'

const Schema = mongoose.Schema

const repairRequestSchema = new Schema({
    request_id: { type: Number, required: true, unique: true },
    item_id: { type: Number, required: true },
    request_date: { type: Date, required: true },
    issue_description: { type: String, required: true },
    priority_level: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    assigned_technician_id: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], required: true },
    }, {
    timestamps: true,
})

const RepairRequest = mongoose.model('RepairRequest', repairRequestSchema)

export { RepairRequest }