const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const applicationsTable = process.env.APPLICATIONS_TABLE;

exports.handler = async (event) => {
  try {
    const applicationData = JSON.parse(event.body);
    const applicationId = uuid.v4();
    const createdAt = new Date().toISOString();

    const newApplication = {
      applicationId,
      ...applicationData,
      createdAt,
    };

    await dynamoDb.put({
      TableName: applicationsTable,
      Item: newApplication,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Application submitted successfully', applicationId }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error applying for job', error: error.message }),
    };
  }
};

