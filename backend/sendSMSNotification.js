const AWS = require('aws-sdk');
const twilio = require('twilio');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.JOBS_TABLE;
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.handler = async (event) => {
  try {
    const { jobId, phoneNumber } = JSON.parse(event.body);

    const job = await dynamoDb.get({
      TableName: tableName,
      Key: { jobId },
    }).promise();

    if (!job.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Job not found' }),
      };
    }

    const message = `New job alert: ${job.Item.jobTitle} - ${job.Item.description}`;
    await client.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'SMS sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending SMS', error: error.message }),
    };
  }
};

