import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { JwtDto } from './authentication.types';

const TOKEN_COOKIE = 'auth.token';
const USER_TPE = 'auth.userType';
const ID = 'auth._id';

export function createSessionCookies({ _id, userType, token }: JwtDto) {
  setCookie(null, ID, _id, {
    maxAge: 7200,
    path: '/',
  });
  setCookie(null, USER_TPE, userType, {
    maxAge: 7200,
    path: '/',
  });
  setCookie(null, TOKEN_COOKIE, token, {
    maxAge: 7200,
    path: '/',
  });
}

export function cleanSessionCookies() {
  destroyCookie(null, ID, { path: '/' });
  destroyCookie(null, USER_TPE, { path: '/' });
  destroyCookie(null, TOKEN_COOKIE, { path: '/' });
}

export function getToken() {
  const cookies = parseCookies();
  return cookies[TOKEN_COOKIE];
}
export function getProfessionalId() {
  const cookies = parseCookies();
  return cookies[ID];
}
