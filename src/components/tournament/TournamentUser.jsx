import useModal from '../../hooks/useModal';

const TournamentUser = ({ player }) => {
	const { closeModal } = useModal();
	return (
		<>
		<div className="section top flex-row-center">
			<div className="section left" />
			<div className="section center">
				<div className="team-name flex-column-center">
					<p>{player.team_name}</p>
				</div>
				<div className="profile-img flex-column-center">
					<span id="profile-img">
						<img src={player.profile_img} alt="profile-img" />
					</span>
				</div>
				<div className="intra-id flex-column-center">
					<p>{player.name}</p>
				</div> 
			</div>
			<div className="section right flex-column-start">
				<span className="material-symbols-outlined" onClick={closeModal}>
					close
				</span>
			</div>
		</div>

		<div className="section middle grid">
			<div className="rank title">
				<p>예선 순위</p>
			</div>
			<div className="rank">
				<p>{player.preliminary_rank}위</p>
			</div>
			<div className="formation title">
				<p>사용 전술</p>
			</div>
			<div className="formation">
				<p>{player.formation}</p>
			</div>
			<div className="coach title">
				<p>좋아하는 감독</p>
			</div>
			<div className="coach">
				<p>{player.favorite_coach}</p>
			</div>
			<div className="career title">
				<p>축구 게임 구력</p>
			</div>
			<div className="career">
				<p>{player.career}</p>
			</div>
		</div>

		<div className="section bottom grid">
			<div className="comment title">
				<p>상대에게 한마디</p>
			</div>
			<div className="comment">
				<p>{player.message}</p>
			</div>
		</div>
		</>
	)
}

export default TournamentUser;