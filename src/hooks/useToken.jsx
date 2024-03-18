import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { useCookie } from './Cookie';

export const accessTokenState = atom({
    key: 'accessTokenState',
    default: null,
});

export function useToken() {
    const { getCookies } = useCookie();
    const currentAccessToken = useRecoilValue(accessTokenState);
    const setAccessToken = useSetRecoilState(accessTokenState);
    const cookies = getCookies();

    const checkToken = useCallback(() => {
        const refreshToken = cookies.refreshToken;
        console.log("CheckToken-RT = " + refreshToken);
        console.log("CheckToken-AT = " + currentAccessToken);
        if (!refreshToken) return false;
        if (!currentAccessToken) {
            // 여기서 재발급 로직을 호출합니다.
            // ReissueAccessToken(); // 이 부분은 적절한 조치가 필요합니다.
        }
        return true;
    }, [currentAccessToken, cookies.refreshToken]);

    return { checkToken };
}
