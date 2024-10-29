import moment from 'moment';
import { Logger } from '../configs';
import { randomUUID } from 'crypto';

type TCustomRequest = Request & { traceId?: string; performanceStart?: number };

export const logRequest = (request: TCustomRequest) => {
  // add trace id to easily trace if the request succeed or failed
  request.traceId = randomUUID();
  // add performance starting point for observability
  request.performanceStart = performance.now();

  // log the event when the request is received, also include the other info traceid, datetime, eventname, method and url
  Logger.log(
    `[${request?.traceId}][${moment().format()}][RECEIVED] ${request?.method} ${
      request?.url
    }`
  );
  return;
};

export const logResponse = (
  response: Response,
  request?: TCustomRequest
): Response => {
  // calculate execution time in ms for observability
  const execTime = performance.now() - request?.performanceStart!;
  // log the event when the request is completed, add additonal info response status and execution time(ms)
  Logger.log(
    `[${request?.traceId}][${moment().format()}][COMPLETED] ${
      request?.method
    } ${request?.url} ${response.status} ${execTime.toFixed(2)}ms`
  );

  if (response.status === 500) {
    // for unhandled errors, always return an "Internal Server Error" message
    console.error(500);
  }

  return response;
};

export const logError = (
  error: Error & { status?: number },
  request: Request & { traceId?: string }
) => {
  // skip logging of error if there's a status like StatusError
  if (error.status) {
    return;
  }

  // log the event when the api throws unhandled errors, include the error message and stack trace
  Logger.log(
    `[${request?.traceId}][${moment().format()}][ERROR]`,
    JSON.stringify({
      error: error.message,
      stack: error.stack,
    })
  );
};
