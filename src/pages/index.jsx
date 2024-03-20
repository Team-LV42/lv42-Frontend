import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userState } from '../api/userApi';
import { isLoggedInState, accessTokenSelector } from '../hooks/Auth';
import { Cookie } from '../hooks/Cookie';

import useSideMenu from '../hooks/useSideMenu';
import useModal from '../hooks/useModal';

const loginUrl="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-a74331b456cc2db0bfb71c584a1d8b8cc6369d5c8b8f775d59a19e6483b9ddbd&redirect_uri=http%3A%2F%2F13.124.198.32%3A4242%2Fcallback&response_type=code";

export const Index = () => {
	const { isopen, modalDataState, closeModal, } = useModal();
	const { isSideBarOpen, onClickMenu } = useSideMenu();
	const { getCookies } = Cookie();
	const cookie = getCookies();
	const navigate = useNavigate();
	const location = useLocation();

	const loginState = useRecoilValue(isLoggedInState);
	const loggedInUser = useRecoilValue(userState);

	const onClickDimmer = () => {
		closeModal();
	};

	const onClickLogin = () => {
		window.location.href = loginUrl;
	}

	//relogin
	useEffect(() => {
		if (!loginState && cookie.refreshToken) {
			console.log('callback');
			navigate('/callback', { state: { from: location }});
		}
	}, [])

	return (
		<>
			<div className={`sidebar-menu ${isSideBarOpen ? 'open' : ''}`} id="sidebar-menu">
				<div className="header">
					<div className="section" id="left-section">
						<span className="material-symbols-outlined" onClick={onClickMenu}>
							close
						</span>
					</div>
					{/* userinfo */}
					{loginState ? (
						<div className="section" id="center-section">
							<div className="wrapper" id="empty-wrapper"></div>
							<div className="wrapper" id="profile-img-wrapper">
								<div id="profile-img">
									<img src={loggedInUser.profile_img} alt="profileImg" />
								</div>
							</div>
							<div className="wrapper" id="description-wrapper">
								<div className="username">
									<p>{loggedInUser.name}</p>
								</div>
								<div className="name">
									<p>뭐요?</p>
									{/* <p>{loggedInUser.name}</p> */}
								</div>
							</div>
						</div>
					) : (
						<div className="section" id="center-section">
							<div className="wrapper" id="empty-wrapper"></div>
							<div className="wrapper" id="profile-img-wrapper" onClick={onClickLogin}>
								<div id="profile-img">
									<img alt="뭐요" />
								</div>
							</div>
							<div className="wrapper" id="description-wrapper" onClick={onClickLogin}>
								<div className="username">
									<p>Login</p>
								</div>
								<div className="name">
									<p>...</p>
								</div>
							</div>
						</div>
					)}

					<div className="section" id="right-section">
						<span className="material-symbols-outlined">
							settings
						</span>
					</div>
				</div>
				<div className="container">
					<ul className="menu-list">
						<li className="menu-item">
							<Link to="/" onClick={onClickMenu}>홈</Link>
						</li>
						{loginState && (
							<li className="menu-item">
								<Link to="/user" onClick={onClickMenu}>내 정보</Link>
							</li>
						)}
					</ul>
				</div>
				<div className="empty-space"></div>
				<div className="footer">
					<div className="section" id="info">
						<div className="contact-wrap">
							<p>contact us</p>
						</div>
						<div className="email-wrap">
							<p>junkim2@student.42seoul.kr</p>
						</div>
					</div>
					<div className="section"></div>
				</div>
			</div>
			{ /* ------------------ modal Component -------------------------------- */}
			{isopen && modalDataState.type === 'normal' && (
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
								<span >예</span>
							</div>
							<div className="right" onClick={closeModal}>
								<span>아니요</span>
							</div>
						</div>
					</div>
				</div>
			)}
			{isopen && modalDataState.type === 'notification' && (
				<div>
					<p>test</p>
				</div>
			)}
		</>
	)
}

export default Index;