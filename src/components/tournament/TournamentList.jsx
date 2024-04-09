import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { postVotePlayer } from '../../api/tournamentApi';
import { tournament8Group } from '../../store/tournament';
import { userState } from '../../api/userApi';
import { accessTokenState } from '../../hooks/useToken';
import { loginModal } from '../../store/Modal';
import useModal from '../../hooks/useModal';

import TournamentUser from './TournamentUser';

const TournamentList = () => {
	const { openModal } = useModal();
	const data = useRecoilValue(tournament8Group);
	const user = useRecoilValue(userState);
	const navigate = useNavigate();

	const at = useRecoilValue(accessTokenState);
	
	const loginModalAction = () => {
		window.location.href = process.env.REACT_APP_LOGIN_URL;
	}

	const onClickSubmit = async (at, id) => {
		await postVotePlayer(at, id, navigate);
	}

	const voteModal = (name, at, id) => {
		return ({
			type: 'voteSubmit',
			title: '이 플레이어에게 투표하시겠습니까?',
			content: name,
			callback: () => onClickSubmit(at, id),
		});
	}
	
	const userModal = (player) => {
		return ({
			type: 'playerStat',
			content: <TournamentUser player={player} />,
		});
	}

	useEffect(() => {
		if (data && data.fin === true)
		{
			setTimeout(() => {
				openModal({
					type: 'alert',
					content: '승부예측 이벤트가 마감되었습니다.',
				});
			}, 500);
		}
	}, [data]);

	return (
		<div className="main">
			<div className="tournament grid">
			{data.left.length !== 0 && data.left.map((player, index) => {
				return (
					<div key={index + 1} className={`p${index + 1} flex-column-end`}>
						<div className={`l-player flex-row-center ${player.tournament_participant_id === data.vote ? 'voted' : ''}`}>
							{!data.fin && !data.vote && (
								<div
									className="vote flex-column-center"
									onClick={() => {
										openModal(user.id !== 0 ? voteModal(player.name, at, player.tournament_participant_id) : loginModal(loginModalAction));
										}}
									>
									<p className="check">✔️</p>
									<p className="text">VOTE</p>
								</div>
							)}
							<div className="profile flex-column-center" onClick={() => openModal(userModal(player))}>
								<span className={`team-logo team-${player.club_name}`} />
								<div className="team-name flex-column-center">
									<p>{player.name}</p>
								</div>
							</div>
						</div>
					</div>
				)
			})}
			<TournamentBracket />
			{data.right !== 0 && data.right.map((player, index) => {
				return (
					<div key={index + 1 + 4} className={`p${index + 1 + 4} flex-column-start`}>
						<div className={`r-player flex-row-center ${player.tournament_participant_id === data.vote ? 'voted' : ''}`}>
							<div className="profile flex-column-center" onClick={() => openModal(userModal(player))}>
								<span className={`team-logo team-${player.club_name}`} />
								<div className="team-name flex-column-center">
									<p>{player.name}</p>
								</div>
							</div>
							{!data.fin && !data.vote && (
								<div
									className="vote flex-column-center"
									onClick={() => {
										openModal(user.id !== 0 ? voteModal(player.name, at, player.tournament_participant_id) : loginModal(loginModalAction));
										}}
									>
									<p className="text">VOTE</p>
									<p className="check">✔️</p>
								</div>
							)}
						</div>
					</div>
				)
			})}
			</div>
		</div>
	)
}

const TournamentBracket = () => {
	return (
		<>
			<div className="q1"></div>
			<div className="q2 border-high-left"></div>
			<div className="q3 border-low-left"></div>
			<div className="q4"></div>
			<div className="q5"></div>
			<div className="q6 border-high-left"></div>
			<div className="q7 border-low-left"></div>
			<div className="q8"></div>
			<div className="q9"></div>
			<div className="q10 border-high-right"></div>
			<div className="q11 border-low-right"></div>
			<div className="q12"></div>
			<div className="q13"></div>
			<div className="q14 border-high-right"></div>
			<div className="q15 border-low-right"></div>
			<div className="q16"></div>

			<div className="sf1"></div>
			<div className="sf2 border-high-left"></div>
			<div className="sf3 border-low-left"></div>
			<div className="sf4"></div>
			<div className="sf5"></div>
			<div className="sf6 border-high-right"></div>
			<div className="sf7 border-low-right"></div>
			<div className="sf8"></div>

			<div className="f1 border-bottom"></div>
			<div className="f2"></div>
		</>
	);
}

export default TournamentList;