import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { JwtDto } from './authentication.types';

const TOKEN_COOKIE = 'auth.token';
const USER_TPE = 'auth.role';
const ID = 'auth.uuid';

const time = 86400;
export function createSessionCookies({ uuid, role, token }: JwtDto) {
  setCookie(null, ID, uuid, {
    maxAge: time,
    path: '/',
  });
  setCookie(null, USER_TPE, role, {
    maxAge: time,
    path: '/',
  });
  setCookie(null, TOKEN_COOKIE, token, {
    maxAge: time,
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
