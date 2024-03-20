import {
	atom,
	constSelector,
	selector,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { getAccessToken, Login, UserLoginQuery } from './Login';
import {useToken} from './useToken';
import { Cookie } from './Cookie';
import { getUserInfoById, userState } from '../api/userApi';

export const isLoggedInState = atom({
	key: 'isLoggedIn',
	default: false,
});

const accessTokenSelector = selector({
	key: 'AccessTokenSelector',
	get: ({ get }) => {
		const isLoggedIn = get(isLoggedInState);
		const { getCookies } = Cookie();
		const cookie = getCookies();
		console.log('inside selector',isLoggedIn, cookie);
		if (isLoggedIn || !cookie.userId || !cookie.refreshToken) {
			return null;
		}
		
		return get(getAccessToken({userId: cookie.userId, refreshToken: cookie.refreshToken}));
	}
})

const Auth = () => {
	const token = useToken();
	const [ params ] = useSearchParams(); 
	const setIsLoggedIn = useSetRecoilState(isLoggedInState);
	const navigate = useNavigate();
	const location = useLocation();

	const setUser = useSetRecoilState(userState);
	const regenAccessToken = useRecoilValue(accessTokenSelector);
	const login = useRecoilValue(params.get('code') ? UserLoginQuery(params.get('code')) : constSelector(''));

	useEffect(() => {
		const SetUserInfo = async (id) => {
			const user = await getUserInfoById(id);
			setUser({
				id: user.user_id,
				name: user.name,
				profile_img: user.profile_img,
			});
		};
		console.log('inside useEffect');
		if (!token.accessToken()) {
				if (!token.refreshToken() && login.length !== 0) {
					//try login
					console.log('try login inside');
					token.setAccessToken(login.accessToken);
					token.setRefreshToken(login.refreshToken, login.user_id);
					setIsLoggedIn(true);
					SetUserInfo(login.user_id);
				} else if (regenAccessToken) { //try get new access token
					console.log('try regen at inside', regenAccessToken);
					token.setAccessToken(regenAccessToken.accessToken);
					token.setRefreshToken(regenAccessToken.refreshToken, token.userid);
					setIsLoggedIn(true);
					SetUserInfo(token.userid);
				}
			
			if (location.state) {
				console.log(location.state);
				console.log('navigate to back');
				navigate(-1);
			} else {
				console.log('navigate to index')
				navigate('/');
			}
		}
	}, [params, token, regenAccessToken, login, setIsLoggedIn, navigate, location.state, setUser]);

}

export default Auth;