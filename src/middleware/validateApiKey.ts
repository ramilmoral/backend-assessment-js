import { Env } from '..';
import { error } from 'itty-router';

export const validateApiKey = (request: Request, env?: Env) => {
  const apiKey: string | null = request.headers.get('x-api-key');

  // Validate API Key
  if (apiKey !== env?.API_KEY) {
    return error(401);
  }
};
