import { useNavigate } from 'react-router-dom'

const TournamentHeader = ({ user }) => {
	const navigate = useNavigate();

	const onClickLogin = () => {
		window.location.href = process.env.REACT_APP_LOGIN_URL;
	}

	return (
		<div className="header">
			<div className="section left flex-row-center">
				<img src="./FC24 LOGO white.png" alt="fc24-logo" />
			</div>
			<div className="section center flex-column-center">
      			<p id="lv42">LV42</p>
      			<p id="fifa-cup">FIFA CUP</p>
			</div>
			<div className="section right">
				{user.id === 0 ? (
					<div className="signed-out flex-column-center" onClick={onClickLogin}>
						<span className="material-symbols-outlined">
							login
						</span>
					</div>
				) : (
					<span className="signed-in flex-column-center border-black">
						<img src={user.profile_img} alt="user-img" />
					</span>
				)}
			</div>
		</div>
	);
}

export default TournamentHeader;