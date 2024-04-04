import { useEffect } from 'react';
import { atom, useRecoilState, useRecoilValue, selector } from "recoil";

import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Cookie } from '../hooks/Cookie';

import { isLoggedInState } from "../hooks/Auth";
import { useToken, accessTokenState } from '../hooks/useToken';
import useModal from '../hooks/useModal';

const voteIDState = atom({
	key: 'VoteIDState',
	default: undefined,
});


//참가 선수 리스트
const playerList = selector({
	key: 'PlayerList',
	get: async ({ get }) => {
		const at = get(accessTokenState);
		const response = await fetch(`${process.env.REACT_APP_API_URL}/tournament`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${at ? at : ''}`
			},
		});

		const data = await response.json();
		return data;
	}
});


const ModalArea = () => {
	const { isopen, modalDataState, closeModal, } = useModal();

	const onClickDimmer = () => {
		closeModal();
	}

	return (
		<>
			{isopen && modalDataState.type === 'playerStat' && (
				<div className="modal" onClick={() => onClickDimmer()}>
					<div className="modal-content" onClick={(event) => event.stopPropagation()}>
						<div className="time-wrap">
							<p>{modalDataState.title}</p>
						</div>
						<div className="comment-wrap">
							<p>{modalDataState.content}</p>
						</div> 
					</div>
				</div>
			)}
			{isopen && modalDataState.type === 'voteSubmit' && (
				<div className="modal" onClick={() => onClickDimmer()}>
					<div className="modal-content" onClick={(event) => event.stopPropagation()}>
						<div className="time-wrap">
							<p>{modalDataState.title}</p>
						</div>
						<div className="comment-wrap">
							<p>{modalDataState.content}</p>
						</div>
						<div className="select-wrap">
							<div className="left red" onClick={modalDataState.callback}>
								<span className="material-symbols-outlined">
									cancel
								</span>
								<span >투표하기</span>
							</div>
							<div className="right" onClick={closeModal}>
								<span>취소</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

const voteModal = (name, onSubmit) => {
	return ({
		type: 'voteSubmit',
		title: '이 플레이어에게 투표하시겠습니까?',
		content: name,
		callback: () => onSubmit(),
	});
}

const userModal = (userInfo, User) => {
	return ({
		type: 'playerStat',
		content: <User player={userInfo} />,
	});
}

const User = ({ player }) => {
	return (
		<div>
			<div>
				<p>{player.team_name}</p>
				<p>{player.club_name}</p>
				<span>
					<img href={player.clubImg} />
					<p>{player.name}</p>
				</span>
			</div>
			<div>
				<div>
					<p>예선 순위</p>
					<span>
						{player.preliminary_rank}
					</span>
				</div>
				<div>
					<p>사용 전술</p>
					<span>
						{player.tactic}
					</span>
				</div>
				<div>
					<p>좋아하는 감독</p>
					<span>
						{player.favorite_coach}
					</span>
				</div>
				<div>
					<p>축구 게임 구력</p>
						<span>
					{player.carrer}
					</span>
				</div>
				<div>
					<p>한 마디</p>
					<span>
						{player.message}
					</span>
				</div>
			</div>
		</div>
	)
}

const Header = () => {

	const onClickLogin = () => {
		window.location.href = process.env.REACT_APP_LOGIN_URL;
	}

	return (
		<div>
			<Link to="/">홈</Link>
			<Link>로고</Link>
			<button onClick={() => onClickLogin()}>로그인</button>
		</div>
	);
}

const PlayerList = () => {
	const [ votePlayer, setVotePlayer ] = useRecoilState(voteIDState);
	const data = useRecoilValue(playerList);
	const navigate = useNavigate();

	const at = useRecoilValue(accessTokenState);
	
	const onClickPlayer = (id) => {
		setVotePlayer(id);
	}

	const onClickSubmit = async (at) => {
		try {
			if (votePlayer === undefined || data.user === 0) return null;
			const response = await fetch(`${process.env.REACT_APP_API_URL}/tournament?vote=${votePlayer}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${at}`
				},
			});
			navigate(0);
		} catch (error) {
			console.error('Failed to Post Vote Player: ',error);
		}
	}

	useEffect(() => {
		// data.players.sort((a, b) => {
		// 	return a.preliminary_rank - b.preliminary_rank;
		// });
	}, [data]);

	const leftGroup = data.players.length !== 0 ? data.players.slice(0, 4) : [];
	const rightGroup = data.players.length !== 0 ? data.players.slice(4) : [];
	
	return (
		<>
		{data.length !== 0 && (
		<div>
			{data.vote === undefined ? (
				<div>
					<span>TestButton</span>
					<div>
						<p>현재 선택 선수 : {votePlayer}번</p>
					</div>
					<button onClick={() => onClickSubmit(at)}>확인</button>
				</div>
			) : (
				<div>
					<p>투표 완료</p>
					<span>{data.vote}번 선수 투표완료</span>
				</div>
			
			)}
			<div>
				{leftGroup.length !== 0 && leftGroup.map((player) => {
					return (
						<div key={player.tournament_participant_id} onClick={() => onClickPlayer(player.tournament_participant_id)}>
							<img src={player.clubImg} alt={player.club_name} />
							<p>{player.name}</p>
							<p>{player.tournament_participant_id}</p>
							<p>{player.team_name}</p>
						</div>
					)
				})}
			</div>
			<div>
				{/* spacer && line */}
			</div>
			<div>
				{rightGroup.length !== 0 && rightGroup.map((player) => {
						return (
							<div key={player.tournament_participant_id} onClick={() => onClickPlayer(player.tournament_participant_id)}>
							<img src={player.clubImg} alt={player.club_name} />
							<p>{player.name}</p>
							<p>{player.tournament_participant_id}</p>
							<p>{player.team_name}</p>
						</div>
						)
					})}
			</div>
		</div>
		)}
			
		</>
	)
}

const Tournament = () => {
	const cookie = Cookie().getCookies();
	const loginState = useRecoilValue(isLoggedInState);
	
	const location = useLocation();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (!loginState && cookie.refreshToken) {
			navigate('/callback', { state: { from: location.pathname }});
		}
	}, []);

	

	return (
		<>
			<Header />
			<PlayerList />
			<ModalArea />
		</>
	)
}

export default Tournament;