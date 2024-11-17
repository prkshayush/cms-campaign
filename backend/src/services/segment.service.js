import Segment from '../models/segments.model.js';
import Customer from '../models/customers.model.js';

export const createSegment = async (segmentData) => {
  try {
    const query = buildMongoQuery(segmentData.conditions, segmentData.logicOperator);
    const audienceCount = await Customer.countDocuments(query);
    
    const segment = await Segment.create({
      ...segmentData,
      audienceCount
    });
    
    return segment;
  } catch (error) {
    throw new Error(`Error creating segment: ${error.message}`);
  }
};

export const getAllSegments = async () => {
  try {
    const segments = await Segment.find({});
    return segments;
  } catch (error) {
    throw new Error(`Error fetching segments: ${error.message}`);
  }
};

export const getSegmentAudience = async (segmentId) => {
  try {
    const segment = await Segment.findById(segmentId);
    const query = buildMongoQuery(segment.conditions, segment.logicOperator);
    return Customer.find(query);
  } catch (error) {
    throw new Error(`Error fetching segment audience: ${error.message}`);
  }
};

const buildMongoQuery = (conditions, logicOperator) => {
  const queries = conditions.map(condition => {
    switch(condition.field) {
      case 'lastVisited':
        return {
          [condition.field]: {
            [condition.operator === '>' ? '$gt' : '$lt']: new Date(condition.value)
          }
        };
      default:
        return {
          [condition.field]: {
            [translateOperator(condition.operator)]: condition.value
          }
        };
    }
  });

  return {
    [logicOperator === 'AND' ? '$and' : '$or']: queries
  };
};

const translateOperator = (operator) => {
  const operatorMap = {
    '>': '$gt',
    '<': '$lt',
    '>=': '$gte',
    '<=': '$lte',
    '==': '$eq',
    '!=': '$ne'
  };
  return operatorMap[operator];
};