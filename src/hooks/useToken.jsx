import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Cookie } from './Cookie';
import { ReissueAccessToken } from './tokenAction';
import { getAccessToken, SetTokens } from './Login';

const accessTokenState = atom({
    key: 'accessTokenState',
    default: null,
});

export function useToken() {
    const { getCookies, setCookie } = Cookie();
    const cookies = getCookies();
    const [ at, setat ] = useRecoilState(accessTokenState);
    const rt = cookies.refreshToken;
    const userid = cookies.userId;
    // const authRes = useRecoilValue(getAccessToken({userId: cookies.userId, refreshToken: cookies.refreshToken}));

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

    return { refreshToken, accessToken, setRefreshToken, setAccessToken, userid };
}

export default useToken;