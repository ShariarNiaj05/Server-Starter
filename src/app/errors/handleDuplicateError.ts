/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/errorInterface';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"(^")"/);
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: 'err.keyValue',
      message: `${extractedMessage} is already exist`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleDuplicateError;
