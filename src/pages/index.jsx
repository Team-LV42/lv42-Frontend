import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Search from '../components/Search';

import { userState } from '../api/userApi';
import { isLoggedInState } from '../hooks/Auth';
import { Cookie } from '../hooks/Cookie';

import useSideMenu from '../hooks/useSideMenu';
import useModal from '../hooks/useModal';
import useDate from '../hooks/useDate';
import useToken from '../hooks/useToken';
import useNotification from '../hooks/useNotification';

export const Index = () => {
	const { isopen, modalDataState, closeModal, } = useModal();
	const { isNotiOpen, noti } = useNotification();
	const { isSideBarOpen, onClickMenu } = useSideMenu();
	const { getCookies } = Cookie();
	const cookie = getCookies();
	const navigate = useNavigate();
	const location = useLocation();
	const date = useDate();
	const { logout } = useToken();

	const loginState = useRecoilValue(isLoggedInState);
	const loggedInUser = useRecoilValue(userState);

	const onClickDimmer = () => {
		closeModal();
	};

	const onClickLogin = () => {
		window.location.href = process.env.REACT_APP_LOGIN_URL;
	}

	//relogin
	useEffect(() => {
		if (!loginState && cookie.refreshToken && location.pathname !== '/callback') {
			navigate('/callback', { state: { from: location.pathname }});
		}
	}, []);
	
	return (
		<>
		{/*====================================notification MODAL======================================= */}
		<div className={`alert ${isNotiOpen ? 'active' : ''}`}  id="warning-alert">
			<div className="warning red">
				<p>{noti.title ? noti.title : ''}</p>
			</div>
			<div className="warning-message">
				<p>{noti.content ? noti.content : ''}</p>
			</div>
		</div>
		{/*====================================SIDE-BAR MENU ===================================== */}
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
									<p>{loggedInUser.displayname}</p>
								</div>
							</div>
						</div>
					) : (
						<div className="section" id="center-section">
							<div className="wrapper" id="empty-wrapper"></div>
							<div className="wrapper" id="profile-img-wrapper" onClick={onClickLogin}>
								<div id="profile-img">
									<img />
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
							<>
							<li className="menu-item" key='1'>
								<Link to="/user" onClick={onClickMenu}>내 정보</Link>
							</li>
							<li className="menu-item" key='2'>
								<Link onClick={() => {
									logout();
									window.location.reload();
									// navigate(0);
								}}>로그아웃</Link>
							</li>
							</>
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
			{ /*-------------------------------- MODAL  -------------------------------- */}
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
			{isopen && modalDataState.type === 'login' && (
				<div className="modal" id="login-modal" onClick={() => onClickDimmer()}>
					<div className="modal-content" onClick={(event) => event.stopPropagation()}>
						<div className="time-wrap red">
							<p>{modalDataState.title}</p>
						</div>
						<div className="comment-wrap">
							{modalDataState.content}
						</div>
						<div className="select-wrap">
							<div className="left" onClick={modalDataState.callback}>
								<img src="42logo.svg" alt="42logo" id="logo-42" />
								<span>로그인</span>
							</div>
							<div className="right" onClick={closeModal}>
								<span>닫기</span>
							</div>
						</div>
					</div>
				</div>
			)}
			{isopen && modalDataState.type === 'search' && (
				<Search />
			)}
		</>
	)
}

export default Index;