import { useNavigate } from 'react-router-dom';

import useToken from '../hooks/useToken';

const PageInfo = ({ page }) => {
	const navigate = useNavigate();
	const { logout } = useToken();

	const onClickLogout = () => {
		logout();
		navigate('/');
	}

	return (
		// <!-- 상단 정보 -->
		<div class="w-full min-h-40 flex flex-row items-end justify-between px-9 pb-5 pt-10">
			{ page === 'index' && (
				<p class="text-2xl font-bold">예약하기</p>
			)}
			{ page === 'user' && (
				<p class="text-2xl font-bold">유저 정보</p>
			)}
			{ page === 'my' && (
				<>
					<a class="text-[#2997ff] lg:text-sm text-xs hover:underline" onClick={onClickLogout} >로그아웃</a>
					<p class="text-2xl font-bold">마이페이지</p>
				</>
			)} 
			<span class="w-24 h-14 bg-basic bg-logo cursor-pointer" onClick={() => navigate('/')}></span>
		</div>
	)
}

export default PageInfo;