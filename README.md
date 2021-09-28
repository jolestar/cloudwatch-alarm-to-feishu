# Send CloudWatch alarms to a Feishu group

This is an example of how to send CloudWatch alarms to a Feishu group. 

> This repo is fork from widdix/cloudwatch-alarm-to-microsoft-teams and just change the message format from teams to feishu.

## Configure Feishu

1. Open the group in Feishu that you want to send CloudWatch alarms to.
1. Add a bot of type `Incoming Webhook` for the group.
1. Copy the webhook URL.

## Deploy to AWS

1. Clone or [download](https://github.com/jolestar/cloudwatch-alarm-to-feishu/zipball/master/) this respository
1. Select a region: `export AWS_REGION=us-east-1`.
1. Choose a unique suffix (replace `$UniqueSuffix` with e.g. your domain/username): `export SUFFIX=$UniqueSuffix`.
2. Create a S3 bucket for SAM: `aws s3 mb s3://cw-to-teams-${SUFFIX}`
3. Install Node.js dependencies: `npm install`
4. Package the Lambda function code: `aws cloudformation package --s3-bucket cw-to-teams-${SUFFIX}  --template-file template.yml --output-template-file template.sam.yml`
5. Deploy the CloudFormation stack (replace `$WebhookURL` with your URL from Microsoft Teams): `aws cloudformation deploy --parameter-overrides "WebhookURL=$WebhookURL" --template-file template.sam.yml --stack-name cw-to-teams --capabilities CAPABILITY_IAM`
