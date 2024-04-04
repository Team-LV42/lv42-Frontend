import { useEffect } from 'react';
import { atom, useRecoilState, useRecoilValue, selector } from "recoil";

import { useNavigate, useLocation } from 'react-router-dom';
import { Cookie } from '../hooks/Cookie';

import { isLoggedInState } from "../hooks/Auth";
import { useToken, accessTokenState } from '../hooks/useToken';
import useModal from '../hooks/useModal';
import { userState } from '../api/userApi';

const voteIDState = atom({
	key: 'VoteIDState',
	default: undefined,
});


//참가 선수 리스트
const playerList = selector({
	key: 'PlayerList',
	get: async () => {
		const at = get(accessTokenState);
		const response = await fetch(`${process.env.REACT_APP_API_URL}/tournament`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `${at ? at : ''}`
			},
		});

		const data = await response.json();
		return {
			players: data.players,
			user: data.vote,
		};
	}
});


const ModalArea = () => {
	const { isopen, modalDataState, closeModal, } = useModal();

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

const PlayerList = () => {
	const [ votePlayer, setVotePlayer ] = useRecoilState(voteIDState);
	const { players, user } = useRecoilValue(playerList);
	
	const onClickPlayer = (event) => {
		setVotePlayer(event.target.value);
	}

	const onClickSubmit = async () => {
		try {
			if (votePlayer === undefined || user.id === 0) return null;
			const response = await fetch(`${process.env.REACT_APP_API_URL}/tournament?vote_id=${votePlayer}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			console.error('Failed to Post Vote Player: ',error);
		}
	}

	const leftGroup = players !== 0 ? players.slice(0, 4) : [];
	const rightGroup = players !== 0 ? players.slice(4) : [];
	
	return (
		<>
			<div>
				<div>
					{leftGroup.map((player) => {
						return (
							<div key={player.id} onClick={() => onClickPlayer(player.id)}>
								<img src={player.clubImg} alt={player.club_name} />
								<p>{player.name}</p>
								<p>{player.team_name}</p>
							</div>
						)
					})}
				</div>
				<div>
					{/* spacer && line */}
				</div>
				<div>
					{rightGroup.map((player) => {
							return (
								<div key={player.id} onClick={() => onClickPlayer(player.id)}>
									<img src={player.clubImg} alt={player.club_name} />
									<p>{player.name}</p>
									<p>{player.team_name}</p>
								</div>
							)
						})}
				</div>
			</div>
		</>
	)
}

const Tournament = () => {
	const auth = useToken();
	const cookie = Cookie().getCookies();
	const loginState = useRecoilValue(isLoggedInState);
	
	const location = useLocation();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (!loginState) {
			navigate('/callback', { state: { from: location.pathname }});
		}
	}, []);

	

	return (
		<>
			<div>
				<PlayerList />
				<div>
					{
					isVotedUser 
					? <button> 이미 투표하였습니다 </button>
					: <button onClick={() => onClickSubmit()}>투표하기</button>
					}
				</div>
			</div>
		</>
	)
}

export default Tournament;