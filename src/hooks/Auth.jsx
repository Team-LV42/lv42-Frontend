import {
	atom,
	constSelector,
	selector,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { getAccessToken, UserLoginQuery } from './Login';
import {useToken} from './useToken';
import { Cookie } from './Cookie';
import { getUserInfoById, userState } from '../api/user';

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
		if (isLoggedIn || !cookie.userId || !cookie.refreshToken) {
			return null;
		}
		
		return get(getAccessToken({userId: cookie.userId, refreshToken: cookie.refreshToken}));
	}
})

const SetUserInfo = async (id, setUser, admin) => {
	const user = await getUserInfoById(id);
	setUser({
		id: user.user_id,
		name: user.name,
		admin: admin,
		displayname: user.displayname,
		profile_img: user.profile_img,
	});
};

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
		if (!token.accessToken()) {
				if (!token.refreshToken() && login.length !== 0) {
					//try login
					token.setAccessToken(login.accessToken);
					token.setRefreshToken(login.refreshToken, login.user_id);
					setIsLoggedIn(true);
					SetUserInfo(login.user_id, setUser, login.admin);
				} else if (regenAccessToken) { //try get new access token
					token.setAccessToken(regenAccessToken.accessToken);
					token.setRefreshToken(regenAccessToken.refreshToken, token.userid);
					setIsLoggedIn(true);
					SetUserInfo(token.userid, setUser, regenAccessToken.admin);
				} else {
					token.logout();
				}
			if (location.state) {
				navigate(location.state.from, { state: { from: location.pathname }});
			} else {
				console.log('navigate to index')
				navigate('/');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

}

export default Auth;