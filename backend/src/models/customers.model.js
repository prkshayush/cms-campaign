import mongoose, {Schema } from "mongoose";

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    totalSpending: {
        type: Number,
        default: 0,
    },
    visits: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
})

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;