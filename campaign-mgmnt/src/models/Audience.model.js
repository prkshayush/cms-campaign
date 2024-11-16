import mongoose from 'mongoose';

const audienceSchema = new mongoose.Schema({
    audType: {
        type: String,
        required: true
    },         // type of the audience segment like high value or returning customers
    conditions: {
        type: Object,
        required: true
    },       // conditions to filter the audience
    totSize: {
        type: Number,
        required: true
    },             // size of the audience
    totSpend: {
        type: Number,
        default: 0
    },           // their total spending 
    visits: {
        type: Number,
        default: 0
    },               // number of visits
    lastVisited: {
        type: Date,
        default: null
    },         // last visited
}, { timestamps: true });

export default mongoose.models.Audience || mongoose.model('Audience', audienceSchema);
