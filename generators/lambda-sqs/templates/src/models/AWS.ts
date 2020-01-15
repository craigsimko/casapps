export type SQSMessageAttributeDataType = 'String' | 'Number' | 'Binary' | string;

export interface SQSMessageAttribute {
  stringValue?: string;
  binaryValue?: string;
  stringListValues: never[]; // Not implemented. Reserved for future use.
  binaryListValues: never[]; // Not implemented. Reserved for future use.
  dataType: SQSMessageAttributeDataType;
}

export interface SQSRecordAttributes {
  ApproximateReceiveCount: string;
  SentTimestamp: string;
  SenderId: string;
  ApproximateFirstReceiveTimestamp: string;
}

export interface SQSMessageAttributes {
  [name: string]: SQSMessageAttribute;
}

export interface SQSRecord {
  messageId: string;
  receiptHandle: string;
  body: string;
  attributes: SQSRecordAttributes;
  messageAttributes: SQSMessageAttributes;
  md5OfBody: string;
  eventSource: string;
  eventSourceARN: string;
  awsRegion: string;
}

export interface SQSEvent {
  Records: SQSRecord[];
}
