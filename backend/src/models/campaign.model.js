import mongoose, { Schema } from "mongoose";

const campaignSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    segmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Segment',
        required: true
    },
    status: {
        type: String,
        enum: ['DRAFT', 'SCHEDULED', 'SENT', 'FAILED'],
        default: 'DRAFT'
    },
    metrics: {
        opens: { type: Number, default: 0 },
        clicks: { type: Number, default: 0 },
        delivered: { type: Number, default: 0 },
        failed: { type: Number, default: 0 }
    },
    scheduledFor: {
        type: Date,
        default: null
    },
    sentAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;