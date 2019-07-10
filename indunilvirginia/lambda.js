let AWS = require('aws-sdk');
let SL_AWS = require('slappforge-sdk-aws');
const sqs = new SL_AWS.SQS(AWS);

exports.handler = function (event, context, callback) {

    sqs.receiveMessage({
        QueueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.SIGMA_AWS_ACC_ID}/gettest.fifo`,
        AttributeNames: ['All'],
        MaxNumberOfMessages: '100',
        VisibilityTimeout: '300',
        WaitTimeSeconds: '100',
        MessageAttributeNames: ['sa', 'saa']
    }).promise()
        .then(receivedMsgData => {
            if (!!(receivedMsgData) && !!(receivedMsgData.Messages)) {
                let receivedMessages = receivedMsgData.Messages;
                receivedMessages.forEach(message => {
                    // your logic to access each message through out the loop. Each message is available under variable message 
                    // within this block
                     console.log("message Success");
                 console.log( message );
                });
            } else {
                 console.log("Success");
                 //console.log( data );
                // No messages to process
            }
        })
        .catch(err => {
             console.log("err happend");
                 console.log( err );
            // error handling goes here
        });




    callback(null, { "message": "Successfully executed with get" });
}