import mongoose, { Schema } from "mongoose";

const conditionSchema = new Schema({
  field: {
    type: String,
    enum: ['totalSpending', 'visits', 'lastVisited'],
    required: true
  },
  operator: {
    type: String, 
    enum: ['>', '<', '>=', '<=', '==', '!='],
    required: true
  },
  value: {
    type: Schema.Types.Mixed,
    required: true
  }
});

const segmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  conditions: [{
    type: conditionSchema,
    required: true
  }],
  logicOperator: {
    type: String,
    enum: ['AND', 'OR'],
    default: 'AND'
  },
  audienceCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Segment = mongoose.model('Segment', segmentSchema);
export default Segment;