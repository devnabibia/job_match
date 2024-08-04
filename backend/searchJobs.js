const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.JOBS_TABLE;

exports.handler = async (event) => {
  try {
    const { searchTerm } = event.queryStringParameters;
    const params = {
      TableName: tableName,
      FilterExpression: 'contains(jobTitle, :searchTerm)',
      ExpressionAttributeValues: {
        ':searchTerm': searchTerm,
      },
    };

    const result = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error searching jobs', error: error.message }),
    };
  }
};

