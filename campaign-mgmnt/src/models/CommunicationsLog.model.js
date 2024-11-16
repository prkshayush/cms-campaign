// table for communcation_log
import mongoose from 'mongoose';

const communicationLogSchema = new mongoose.Schema({
  campaignId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: true 
}, // reference to the campaign
  audienceMember: { 
    type: Object, 
    required: true 
},    // dets of the individual
  status: { 
    type: String, 
    enum: ['SENT', 'FAILED'], 
    default: 'SENT' 
},  // delivery status
  message: { 
    type: String, 
    required: true 
},           // personalized message
}, {
    timestamps: true
});

export default mongoose.models.CommunicationLog || mongoose.model('CommunicationLog', communicationLogSchema);
