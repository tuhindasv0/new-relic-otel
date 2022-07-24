import { Stack, StackProps } from 'aws-cdk-lib';
const widget_service = require('../lib/widget_service');

import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class NewRelicOtelStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    new widget_service.WidgetService(this, 'Widgets');
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'NewRelicOtelQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
