import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";

import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Cookie } from '../hooks/Cookie';

import { isLoggedInState } from "../hooks/Auth";
import { accessTokenState } from '../hooks/useToken';
import { userState } from '../api/userApi';

import TournamentList from '../components/tournament/TournamentList';
import TournamentFooter from '../components/tournament/TournamentFooter';
import TournamentHeader from '../components/tournament/TournamentHeader';
import TournamentModal from '../components/tournament/TournamentModal';

const Tournament = () => {
	const cookie = Cookie().getCookies();
	const loginState = useRecoilValue(isLoggedInState);
	const user = useRecoilValue(userState);
	
	const location = useLocation();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (!loginState && cookie.refreshToken) {
			navigate('/callback', { state: { from: location.pathname }});
		}
	}, []);

	return (
		<>
			<TournamentModal />
			<TournamentHeader user={user} />
			<TournamentList />
			<TournamentFooter />
		</>
	)
}

export default Tournament;