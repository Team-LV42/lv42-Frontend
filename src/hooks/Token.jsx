import {
	atom,
	selectorFamily,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';
import { Link, useSearchParams } from 'react-router-dom';

const testUrl = "http://54.180.96.16:4242/auth/login?code=";

export function setCookie(cname, cvalue, exdays) {
	const expires = new Date();
	expires.setDate(expires.getDate() + exdays);
	document.cookie = cname + "=" + cvalue + "; expires=" + expires.toUTCString() + "; path=/";
}

export const accessTokenState = atom({
	key: 'accessTokenState',
	default: null,
});

function getCookies() {
    const cookies = document.cookie.split(';').reduce((cookiesObj, cookie) => {
        const [name, value] = cookie.split('=').map(item => item.trim());
        cookiesObj[name] = value;
        return cookiesObj;
    }, {});

    return cookies;
}

/*rt가 없으면 false, at만 없으면 at재발급*/
export function CheckToken() {
	const setAccessToken = useSetRecoilState(accessTokenState);
	
	const cookies = getCookies();
	const refreshToken = cookies.refreshToken;
	const userId = cookies.userId;

	console.log("RT = " + refreshToken);
	console.log("AT = " + setAccessToken);
	if (refreshToken === undefined)								//RT가 없으면
		return false;
	if (setAccessToken === "")									//AT만 없으면
		getAccessToken(userId, refreshToken);				//AT 요청 쿼리 보내기
	return true;
}

/*로그인 쿼리 보내고 쿠키 저장하기*/
export function LoginTest() {
	const [params] = useSearchParams();
	const code = params.get('code');
	const authRes = useRecoilValue(UserLoginQuery(code));
	
	setCookie('refreshToken', authRes.refreshToken, 14); // set refresh token cookie
	setCookie('userId', authRes.userId, 14);
	console.log("AT : " + authRes.accessToken);
	console.log("AT : " + useRecoilValue(accessTokenState));
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
	get: (userId, refreshToken) => async () => {
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