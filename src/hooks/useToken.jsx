import { atom, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { Cookie } from './Cookie';

import { logoutUser } from '../api/userApi';

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
    const navigate = useNavigate();

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
      logoutUser(userid, rt);
      removeCookie('refreshToken');
      removeCookie('userId');
      navigate('/');
      window.location.reload();
    }

    return { refreshToken, accessToken, setRefreshToken, setAccessToken, userid, logout };
}

export default useToken;
