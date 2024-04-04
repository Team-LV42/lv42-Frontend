import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { voteIDState, playerList, postVotePlayer } from '../../api/tournamentApi';
import { accessTokenState } from '../../hooks/useToken';
import useModal from '../../hooks/useModal';

import TournamentUser from './TournamentUser';

const TournamentList = () => {
	const [ votePlayer, setVotePlayer ] = useRecoilState(voteIDState);
	const { openModal } = useModal();
	const data = useRecoilValue(playerList);
	const navigate = useNavigate();

	const at = useRecoilValue(accessTokenState);
	
	const onClickPlayer = (id) => {
		setVotePlayer(id);
	}

	const onClickSubmit = async (at) => {
		postVotePlayer(at, votePlayer);
		navigate(0);
	}

	const voteModal = (name) => {
		return ({
			type: 'voteSubmit',
			title: '이 플레이어에게 투표하시겠습니까?',
			content: name,
			callback: () => onClickSubmit(),
		});
	}
	
	const userModal = (player) => {
		return ({
			type: 'playerStat',
			content: <TournamentUser player={player} />,
		});
	}

	const leftSize = 4;
	const rightSize = 4;
	const leftGroup = data.players.length !== 0 ? data.players.slice(0, 4) : [];
	const rightGroup = data.players.length !== 0 ? data.players.slice(4) : [];

	return (
		<div className="main">
			<div className="tournament grid">
			{leftGroup.length !== 0 && leftGroup.map((player, index) => {
				return (
					<div key={index + 1} className={`p${index + 1} flex-column-end`}>
						<div className="l-player flex-row-center border-black">
							<div
								className="vote flex-column-center"
								onClick={() => {
									onClickPlayer(player.tournament_participant_id);
									openModal(voteModal(player.name));
									}}
								>
								<p className="check">✔️</p>
								<p className="text">VOTE</p>
							</div>
							<div className="profile flex-column-center" onClick={() => openModal(userModal(player))}>
								<div className="team-logo flex-column-center">
									<img src="/menu-logo.svg" alt="team-logo" />
								</div>
								<div className="team-name flex-column-center">
									<p>{player.name}</p>
								</div>
							</div>
						</div>
					</div>
				)
			})}
			<TournamentBracket />
			{rightGroup.length !== 0 && rightGroup.map((player, index) => {
				return (
					<div key={index + 1 + leftSize} className={`p${index + 1 + leftSize} flex-column-start`}>
						<div className="r-player flex-row-center border-black">
							<div className="profile flex-column-center" onClick={() => openModal(userModal(player))}>
								<div className="team-logo flex-column-center">
									<img src="/menu-logo.svg" alt="team-logo" />
								</div>
								<div className="team-name flex-column-center">
									<p>{player.name}</p>
								</div>
							</div>
							<div
								className="vote flex-row-center"
								onClick={() => {
									onClickPlayer(player.tournament_participant_id);
									openModal(voteModal(player.name));
									}}
								>
								<p className="text">VOTE</p>
								<p className="check">✔️</p>
							</div>
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