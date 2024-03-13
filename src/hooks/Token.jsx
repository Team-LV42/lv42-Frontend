import {
	atom,
	selectorFamily,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';

import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCookie } from './Cookie';

const testUrl = "http://54.180.96.16:4242/auth/login?code=";

export const accessTokenState = atom({
	key: 'accessTokenState',
	default: null,
});

export function useToken(){
	const {getCookies} = useCookie();
	const currentAccessToken = useRecoilValue(accessTokenState);
	const setAccessToken = useSetRecoilState(accessTokenState);
	const cookies = getCookies();

	const checkToken = useCallback(() => {
		const refreshToken = getRefreshToken();

		console.log("CheckToken-RT = " + refreshToken);
		console.log("CheckToken-AT = " + currentAccessToken);
		if (refreshToken === undefined)								//RT가 없으면
			return false;
		if (currentAccessToken === null || currentAccessToken === "")// AT가 없거나 null이면
			ReissueAccessToken();
		return true;
	}, []);

	const getRefreshToken = useCallback(() => {
		return cookies.refreshToken;
	}, []);
	// const ReissueAccesToken = useCallback(() => {
	// 	const newAccessToken = useRecoilValue(getAccessTokenSelector);
	// 	const refreshToken = cookies.refreshToken;
	// 	const userId = cookies.userId;
	// 	const getAccessTokenSelector = getAccessToken({userId, refreshToken});

	// 	setAccessToken(newAccessToken.accessToken);	// 새로운 AT로 업데이트
	// });
	return {checkToken, getRefreshToken};
}


/*rt가 없으면 false, at만 없으면 at재발급*/
// export function CheckToken() {
// 	const {getCookies} = useCookie();

// 	const cookies = getCookies();
// 	const refreshToken = cookies.refreshToken;

// 	console.log("CheckToken-RT = " + refreshToken);
// 	const currentAccessToken = useRecoilValue(accessTokenState);
// 	console.log("CheckToken-AT = " + currentAccessToken);
// 	if (refreshToken === undefined)								//RT가 없으면
// 		return false;
// 	if (currentAccessToken === null || currentAccessToken === "")// AT가 없거나 null이면
// 		ReissueAccessToken();
// 	return true;
// }

function ReissueAccessToken() {
	const {getCookies} = useCookie();

	const setAccessToken = useSetRecoilState(accessTokenState);
	const cookies = getCookies();
	const refreshToken = cookies.refreshToken;
	const userId = cookies.userId;
	const getAccessTokenSelector = getAccessToken({userId, refreshToken});
	const newAccessToken = useRecoilValue(getAccessTokenSelector);

	setAccessToken(newAccessToken.accessToken);	// 새로운 AT로 업데이트
}

/*로그인 쿼리 보내고 쿠키 저장하기*/
export function LoginTest() {
	const {setCookie} = useCookie();

	const [params] = useSearchParams();
	const code = params.get('code');
	const authRes = useRecoilValue(UserLoginQuery(code));
	const setAccessToken = useSetRecoilState(accessTokenState);
	setCookie('refreshToken', authRes.refreshToken, 14); // set refresh token cookie
	setCookie('userId', authRes.user_id, 14);
	console.log("LoginTest-user_id! : " + authRes.user_id);
	setAccessToken(authRes.accessToken);
	console.log("LoginTest-recoilAT! : " + useRecoilValue(accessTokenState));
}	

/*login 쿼리 */
export const UserLoginQuery = selectorFamily({
	key: 'UserLoginQuery',
	get: (code) => async () => {
		try {
			const response = await fetch(testUrl + code, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (400 <= response.status && response.status <= 599)
				throw new Error("response is failed");
			
			const responseData = await response.text();
			const json = responseData ? JSON.parse(responseData) : {};
			console.log(json);
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
			const response = await fetch(testUrl + userId, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
					"Auth": refreshToken,
				},
			});
			if (400 <= response.status && response.status <= 599)
				throw new Error("response is failed");
			
			const responseData = await response.text();
			const json = responseData ? JSON.parse(responseData) : {};
			console.log(json);
			return json;
		} catch (err) {
			throw err;
		}
	}
});