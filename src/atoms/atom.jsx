import { atom } from 'jotai';
import Cookies from 'js-cookie';

const initialJwtData = {
  register: Cookies.get('jwt-register') || null,
  login: Cookies.get('jwt-login') || null,
  id: null,
};

export const jwtAtom = atom(initialJwtData);
