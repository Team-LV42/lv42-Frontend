
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

import useSideMenu from '../hooks/useSideMenu';
import { useModal } from '../hooks/useModal';

export const Index = () => {
	const { isopen, modalDataState, closeModal, } = useModal();
	const { isSideBarOpen, onClickMenu } = useSideMenu();


	const onClickDimmer = () => {
		closeModal();
	};

	return (
		<>
			{/* <nav>
				<Nav />
				<Login />
				<p><Link to="/test">예약 기록_TEST</Link></p>
				<p><Link to="/book">Book</Link></p>
				<p><Link to="/user">User</Link></p>
			</nav> */}
				<div className={`sidebar-menu ${isSideBarOpen ? 'open' : ''}`} id="sidebar-menu">
				<div className="header">
					<div className="section" id="left-section">
						<span className="material-symbols-outlined" onClick={onClickMenu}>
							close
						</span>
					</div>
					<div className="section" id="center-section">
						<div className="wrapper" id="empty-wrapper"></div>
						<div className="wrapper" id="profile-img-wrapper">
							<div id="profile-img">
								<img src="https://cdn.intra.42.fr/users/de563dec5217d29e672547181e703a97/small_tajeong.jpg" alt="profileImg" />
							</div>
						</div>
						<div className="wrapper" id="description-wrapper">
							<div className="username">
								<p>junkim2</p>
							</div>
							<div className="name">
								<p>Junho</p>
							</div>
						</div>
					</div>
					<div className="section" id="right-section">
						<span className="material-symbols-outlined">
							settings
						</span>
					</div>
				</div>
				<div className="container">
					<ul className="menu-list">
						<li className="menu-item">
							<a href="/">홈화면</a>
						</li>
						<li className="menu-item">
							<a href="/">내정보</a>
						</li>
						<li className="menu-item">
							<a href="/">로그인</a>
						</li>
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
			{isopen && (
				<div className="modal" onClick={() => onClickDimmer()}>
					<div className="modal-content" onClick={(event) => event.stopPropagation()}>
						<div className="time-wrap">
							<p>{modalDataState.title}</p>
						</div>
						<div className="comment-wrap">
							<p>{modalDataState.content}</p>
						</div>
						<div className="select-wrap">
							<div class="left red" onClick="closeModal('cancelModal')">
								<span class="material-symbols-outlined">
									cancel
								</span>
								<span onClick={modalDataState.callback}>예</span>
							</div>
							<div class="right" onClick={closeModal}>
								<span>아니요</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Index;