import { useSetRecoilState } from 'recoil';
import { accessTokenState, getAccessToken } from './useToken'; // 경로는 실제 파일 위치에 맞게 조정하세요.
import { useRecoilValue } from 'recoil';
import { useCookie } from './Cookie';

export function ReissueAccessToken() {
    const { getCookies, setCookie } = useCookie();
    const setAccessToken = useSetRecoilState(accessTokenState);
    const cookies = getCookies();
    const refreshToken = cookies.refreshToken;
    const userId = cookies.userId;
    setCookie('refreshToken', refreshToken, 14); // set refresh token cookie
	setCookie('userId', userId, 14);
    const newAccessToken = 'your_new_access_token'; // 임시 토큰 값, 실제 로직으로 대체 필요
    setAccessToken(newAccessToken);
}
