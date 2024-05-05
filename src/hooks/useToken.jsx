import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { Cookie } from './Cookie';

import { logoutUser, userState } from '../api/userApi';

export const accessTokenState = atom({
    key: 'accessTokenState',
    default: null,
});


export function useToken() {
    const { getCookies, setCookie, removeCookie } = Cookie();
    const cookies = getCookies();
    const [ at, setat ] = useRecoilState(accessTokenState);
    const rt = cookies.refreshToken;
    const userid = cookies.userId;
    const resetAccessToken = useResetRecoilState(accessTokenState);
    const resetUserState = useResetRecoilState(userState);

    const refreshToken = () => {
		  return rt ? rt : null;
    };

    const setRefreshToken = (refreshToken, userid) => {
      setCookie('refreshToken', refreshToken, 14);
      setCookie('userId', userid, 14);
    }

    const accessToken = () => {
		  return at ? at : null;
    }

    const setAccessToken = (accessToken) => {
      setat(accessToken);
    }

    const logout = () => {
      logoutUser(userid);
      resetAccessToken();
      resetUserState();
      removeCookie('refreshToken');
      removeCookie('userId');
    }

    return { refreshToken, accessToken, setRefreshToken, setAccessToken, userid, logout };
}

export default useToken;
