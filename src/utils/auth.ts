import jwt from 'jsonwebtoken';

function generateToken() {
  const secret = process.env.REACT_APP_SECRET || 'random-secret-value';
  return jwt.sign({}, secret);
}

export function getToken() {
  let token = '';

  if (!token) {
    token = generateToken();
    return token;
  }

  return token;
}
