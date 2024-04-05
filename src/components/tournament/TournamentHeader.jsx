import { useNavigate } from 'react-router-dom'

const TournamentHeader = ({ user }) => {
	const navigate = useNavigate();

	const onClickLogin = () => {
		window.location.href = process.env.REACT_APP_LOGIN_URL;
	}

	return (
		<div className="header">
			<div className="section left flex-row-center">
				<span className="material-symbols-outlined home" onClick={() => navigate('/')}>
					home
				</span>
			</div>
			<div className="section center flex-row-center">
				<img src="/lfc-logo.svg" alt="lfc-logo" />
			</div>
			<div className="section right">
				{user.id === 0 ? (
					<span className="material-symbols-outlined signed-out" onClick={onClickLogin}>
						account_circle
					</span>
				) : (
					<span className="signed-in border-black">
						<img src={user.profile_img} alt="user-img" />
					</span>
				)}
			</div>
		</div>
	);
}

export default TournamentHeader;