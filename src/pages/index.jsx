import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Search from '../components/Search';
import SideBar from '../components/SideBar';

import { userState } from '../api/userApi';
import { isLoggedInState } from '../hooks/Auth';
import { Cookie } from '../hooks/Cookie';


import useModal from '../hooks/useModal';
import useDate from '../hooks/useDate';
import useToken from '../hooks/useToken';
import useNotification from '../hooks/useNotification';
import useSideMenu from '../hooks/useSideMenu';

export const Index = () => {
	const { isopen, modalDataState, closeModal, } = useModal();
	const { closeMenu } = useSideMenu();
	const { isNotiOpen, noti } = useNotification();
	const { getCookies } = Cookie();
	const cookie = getCookies();
	const navigate = useNavigate();
	const location = useLocation();
	const date = useDate();

	const loginState = useRecoilValue(isLoggedInState);
	const loggedInUser = useRecoilValue(userState);

	const onClickDimmer = () => {
		closeModal();
	};

	//relogin
	useEffect(() => {
		closeModal();
		closeMenu();
		if (!loginState && cookie.refreshToken && location.pathname !== '/callback') {
			navigate('/callback', { state: { from: location.pathname }});
		}
	}, []);
	
	return (
		<>
		{/* <div class="hidden booking-btn-active-xbox booking-btn-active-switch booking-btn-active-ps5 slot-selected-ps5 slot-selected-xbox slot-selected-switch "/> */}
		{/*====================================notification MODAL======================================= */}
		<div
		id="warning"
		class={`${isNotiOpen ? 'popup-shown' : 'popup-hidden'} fixed w-72 h-14 top-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center bg-color-switch rounded-2xl text-white font-bold z-40 transition-all ease-[cubic-bezier(.4,0,.6,1)] duration-300`}
		>
			<p>{noti.title || ''}</p>
			<p>{noti.content || ''}</p>
		</div>
		{/*====================================SIDE-BAR MENU ===================================== */}
		<SideBar
			loggedInUser={loggedInUser}
			loginState={loginState}
		/>
		{ /*-------------------------------- MODAL  -------------------------------- */}
			{isopen && modalDataState.type === 'normal' && (
				<div
				id="booking-modal"
				onClick={onClickDimmer}
				class="modal-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center backdrop-brightness-50 z-40"
				>
					<div
					onClick={(event) => event.stopPropagation()}
					class="w-80 h-36 bg-white shadow-modal rounded-xl"
					>
						<div class="w-full h-2/3 flex flex-col items-center justify-center border-b border-[#818181]">
							<p class="font-Bolwby-One text-lg font-color-ps5">{modalDataState.title}</p>
							<p class="font-semibold text-2xl">{modalDataState.content}</p>
						</div>
						<div class="w-full h-1/3 flex flex-row items-center justify-center">
							<div
							onClick={modalDataState.callback} 
							class="w-1/2 h-full flex items-center justify-center border-r border-[#818181] cursor-pointer"
							>
								<p>예</p>
							</div>
							<div onClick={closeModal} class="w-1/2 h-full flex items-center justify-center cursor-pointer">
								<p>아니오</p>
							</div>
						</div>
					</div>
				</div>
			)}
			{isopen && modalDataState.type === 'login' && (
				<div
				id="login-modal"
				onClick={onClickDimmer}
				class="modal-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center backdrop-brightness-50 z-40"
				>
					<div
					onClick={(event) => event.stopPropagation()}
					class="w-80 h-36 bg-white shadow-modal rounded-xl"
					>
						<div class="w-full h-2/3 flex flex-col items-center justify-center border-b border-[#818181]">
							<p class="font-Bolwby-One text-lg font-color-switch">{modalDataState.title}</p>
							<p class="font-semibold text-2xl">{modalDataState.content}</p>
						</div>
						<div class="w-full h-1/3 flex flex-row items-center justify-center">
							<div
							onClick={modalDataState.callback}
							class="w-1/2 h-full flex items-center justify-center border-r border-[#818181] cursor-pointer"
							>
								<p>42 로그인</p>
							</div>
							<div onClick={closeModal} class="w-1/2 h-full flex items-center justify-center cursor-pointer">
								<p>닫기</p>
							</div>
						</div>
					</div>
				</div>
			)}
			<Search />
		</>
	)
}

export default Index;