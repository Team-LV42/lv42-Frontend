import { useNavigate } from 'react-router-dom';

import useToken from '../hooks/useToken';
import useModal from '../hooks/useModal';

const PageInfo = ({ page }) => {
	const navigate = useNavigate();
	const { openModal } = useModal();
	const { logout } = useToken();
	
	const onClickLogout = () => {
		logout();
		navigate('/');
	}

	return (
		// <!-- 상단 정보 -->
		<div class="w-full min-h-40 flex flex-row items-end justify-between px-9 pb-5 pt-10">
			{ page === 'index' && (
				<div class="flex flex-row items-center justify-center gap-2">
					<p class="text-2xl font-bold">예약하기</p>
					<span onClick={() => openModal({type: 'onboarding'})} class="w-5 h-5 flex items-center justify-center bg-black rounded-full text-white cursor-pointer">
						<p>?</p>
					</span>
				</div>
			)}
			{ page === 'user' && (
				<div>
					<p class="text-2xl font-bold">유저 정보</p>
				</div>
			)}
			{ page === 'my' && (
				<>
				<div>
					<a class="text-[#2997ff] lg:text-sm text-xs hover:underline" onClick={onClickLogout} >로그아웃</a>
					<p class="text-2xl font-bold">마이페이지</p>
				</div>
				</>
			)} 
			<span class="w-24 h-14 bg-basic bg-logo cursor-pointer" onClick={() => navigate('/')}></span>
		</div>
	)
}

export default PageInfo;