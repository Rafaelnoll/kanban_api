import rateLimit from 'express-rate-limit';

const oneMinuteTime = 60 * 1000;

function requestLimiter(limitOfRequests: number) {
  return rateLimit({
    windowMs: oneMinuteTime,
    max: limitOfRequests,
    message:
      'Você atingiu o limite de solicitações. Tente novamente mais tarde.',
  });
}

export default requestLimiter;
