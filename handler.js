'use strict';
const AWS = require('aws-sdk');
const cloudwatch = new AWS.CloudWatch({apiVersion: '2010-08-01'});
const axios = require('axios');
const axiosRetry = require('axios-retry');

axiosRetry(axios, {retries: 5});

async function sendMessage(message) {
  await axios.post(process.env.WEBHOOK_URL, message);
};

function generateMessage(event) {
  return {
    'msg_type': 'text',
    'content': {
      "text": JSON.stringify(event)
    } 
  };
};

exports.processEvent = async function(event) {
  console.log(event);
  await sendMessage(generateMessage(event));
};
