import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { useCookie } from './Cookie';
import { ReissueAccessToken } from './tokenAction';
import { getAccessToken, SetTokens } from './Login';
export const accessTokenState = atom({
    key: 'accessTokenState',
    default: null,
});

export function useToken() {
    const { getCookies, setCookie } = useCookie();
    const currentAccessToken = useRecoilValue(accessTokenState);
    const setAccessToken = useSetRecoilState(accessTokenState);
    const cookies = getCookies();

    const checkToken = useCallback(() => {
        const refreshToken = cookies.refreshToken;
        if (!refreshToken) return false;
        if (!currentAccessToken) {
            const authRes = getAccessToken();
            SetTokens(authRes, setAccessToken);
        }
        return true;
    }, [currentAccessToken, cookies.refreshToken]);

    return { checkToken };
}
