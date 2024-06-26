import { useEffect	} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Search from '../components/Search';
import SideBar from '../components/SideBar';
import OnBoardingGuide from '../components/onboarding/OnBoardingGuide';
import OnBoardingConsoleGuide from '../components/onboarding/OnBoardingConsoleGuide';

import { userState } from '../api/user';
import { isLoggedInState } from '../hooks/Auth';
import { Cookie } from '../hooks/Cookie';

import useModal from '../hooks/useModal';
import useNotification from '../hooks/useNotification';
import useSideMenu from '../hooks/useSideMenu';
import useDate from '../hooks/useDate';

export const Index = () => {
	const { isopen, modalDataState, closeModal, } = useModal();
	const { closeMenu } = useSideMenu();
	const { isNotiOpen, noti } = useNotification();
	const navigate = useNavigate();
	const location = useLocation();
	const { getCookies } = Cookie();
	
	const cookie = getCookies();
	const loginState = useRecoilValue(isLoggedInState);
	const loggedInUser = useRecoilValue(userState);

	// date initial
	// eslint-disable-next-line no-unused-vars
	const date = useDate();

	const modalTypeStyle = {
		'1': 'font-color-xbox',
		'2': 'font-color-switch',
		'3': 'font-color-ps5',
	};
	
	// rt, userid가 있으면 재로그인 시도
	useEffect(() => {
		closeModal();
		closeMenu();
		if (!loginState && cookie.refreshToken && location.pathname !== '/callback') {
			navigate('/callback', { state: { from: location.pathname }});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return (
		<>
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
		<Search />
		{ /*-------------------------------- MODAL  -------------------------------- */}
		{isopen && modalDataState.type === 'normal' && (
			<div
			id="booking-modal"
			onClick={closeModal}
			class="modal-hidden fixed w-full h-full top-0 left-0 flex items-center justify-center backdrop-brightness-50 z-40"
			>
				<div
				onClick={(event) => event.stopPropagation()}
				class="w-80 h-36 bg-white shadow-modal rounded-xl"
				>
					<div class="w-full h-2/3 flex flex-col items-center justify-center border-b border-[#818181]">
						<p class={`font-Bolwby-One text-lg ${modalDataState.consoleType && modalTypeStyle[modalDataState.consoleType]}`}>{modalDataState.title}</p>
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
			onClick={closeModal}
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
		{isopen && modalDataState.type === 'onboarding-guide' && (
			<OnBoardingGuide closeModal={closeModal}/>
		)}
		{isopen && modalDataState.type === 'onboarding-console-guide' && (
			<OnBoardingConsoleGuide closeModal={closeModal} data={modalDataState} user={loggedInUser} />
		)}
		</>
	)
}

export default Index;