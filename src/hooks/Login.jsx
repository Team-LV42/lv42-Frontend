import {
	atom,
	selectorFamily,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';

import { useCallback } from 'react';
import { useSearchParams, redirect } from 'react-router-dom';
import { Cookie } from './Cookie';
import { accessTokenState } from './useToken';
import { userState, usersState } from '../api/userApi';

/*로그인 쿼리 보내고 쿠키 저장하기*/
// export function Login() {
// 	const [params] = useSearchParams();
// 	const code = params.get('code');
// 	const authRes = useRecoilValue(UserLoginQuery(code));
// 	SetTokens(authRes);
// 	redirect('/');
// };

// /*반환된 값을 토큰으로 저장*/
// export function SetTokens(authRes){
// 	const { getCookies, setCookie } = useCookie();
// 	const cookies = getCookies();
// 	const setAccessToken = useSetRecoilState(accessTokenState);
// 	const userid = authRes.user_id !== undefined ? authRes.user_id : cookies.userId;

// 	console.log(authRes);
// 	//test add
// 	const setUserState = useSetRecoilState(userState);
// 	const user = useRecoilValue(usersState(userid));
// 	setCookie('refreshToken', authRes.refreshToken, 14); // set refresh token cookie
// 	setCookie('userId', userid, 14);
// 	setAccessToken(authRes.accessToken);
// 	setUserState({
// 		id: user.user_id,
// 		name: user.name,
// 		profile_img: user.profile_img,
// 	});
// }


/*login 쿼리 */
export const UserLoginQuery = selectorFamily({
	key: 'UserLoginQuery',
	get: (code) => async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login?code=${code}`, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (400 <= response.status && response.status <= 599)
				throw new Error("response is failed");
			
			return await response.json();
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
			if (userId === undefined || refreshToken === undefined) {
				console.log('getAccessToken');
				return ;
			}
			const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh?userId=${userId}`, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${refreshToken}`,
				},
			});

			// if (response.status === 401) window.location.reload();
			if (400 <= response.status && response.status <= 599) return null;
			
			return response.json();
		} catch (err) {
			throw err;
		}
	}
});