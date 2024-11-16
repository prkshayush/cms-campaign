import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
	campaignName: { 
		type: String, 
		required: true 
	},                // name of campaign
	audienceId: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Audience', 
		required: true 
	}, // audience id
	messageTemplate: { 
		type: String, 
		required: true 
	},     // Template for messages
}, { timestamps: true});

export default mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);
