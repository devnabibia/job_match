const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.JOBS_TABLE;

exports.handler = async (event) => {
  try {
    const jobData = JSON.parse(event.body);
    const jobId = uuid.v4();
    const createdAt = new Date().toISOString();

    const newJob = {
      jobId,
      ...jobData,
      createdAt,
    };

    await dynamoDb.put({
      TableName: tableName,
      Item: newJob,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Job created successfully', jobId }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating job', error: error.message }),
    };
  }
};

