const TournamentUser = ({ player }) => {
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

export default TournamentUser;