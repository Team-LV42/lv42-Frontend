import {
	atom,
	selectorFamily,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';

import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCookie } from './Cookie';
import { accessTokenState } from './useToken';

const testUrl = "http://54.180.96.16:4242/auth";

/*로그인 쿼리 보내고 쿠키 저장하기*/
export function Login() {
	const [params] = useSearchParams();
	const code = params.get('code');
	const authRes = useRecoilValue(UserLoginQuery(code));
	SetTokens(authRes);
}	

/*반환된 값을 토큰으로 저장*/
export function SetTokens(authRes){
	const { setCookie } = useCookie();

	const setAccessToken = useSetRecoilState(accessTokenState);
	setCookie('refreshToken', authRes.refreshToken, 14); // set refresh token cookie
	setCookie('userId', authRes.user_id, 14);
	setAccessToken(authRes.accessToken);
}

/*login 쿼리 */
export const UserLoginQuery = selectorFamily({
	key: 'UserLoginQuery',
	get: (code) => async () => {
		try {
			const response = await fetch(`${testUrl}/login?code=${code}`, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (400 <= response.status && response.status <= 599)
				throw new Error("response is failed");
			
			const responseData = await response.text();
			const json = responseData ? JSON.parse(responseData) : {};
			return json;
		} catch (err) {
			throw err;
		}
	}
});

/*at 재발급 쿼리 */
export const getAccessToken = selectorFamily({
	key: 'getAccessToken',
	get: ({userId, refreshToken}) => async () => {
		try {
			const response = await fetch(`${testUrl}/refresh?userId=${userId}`, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
					"authoriztion": refreshToken,
				},
			});
			if (400 <= response.status && response.status <= 599)
				throw new Error("response is failed");
			
			const responseData = await response.text();
			const json = responseData ? JSON.parse(responseData) : {};
			return json;
		} catch (err) {
			throw err;
		}
	}
});