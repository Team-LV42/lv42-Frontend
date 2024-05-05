import { useNavigate } from "react-router-dom";

import useSideMenu from "../hooks/useSideMenu";

export const SideBar = ({ loggedInUser, loginState }) => {
	const { isSideBarOpen, onClickMenu } = useSideMenu();
	const navigate = useNavigate();

	const onClickLogin = () => {
		window.location.href = process.env.REACT_APP_LOGIN_URL;
	}

	return (
		<>
		<div
		id="sidebar-menu"
		class={`${isSideBarOpen ? 'side-shown' : 'side-hidden'} w-72 h-full peer flex flex-col items-center justify-center bg-white rounded-r-xl transition-all ease-[cubic-bezier(.4,0,.6,1)] z-50`}
		>
				{/* <!-- 사이드바 내부 헤더 --> */}
				<header class="absolute w-full h-12 flex flex-row items-center justify-between p-4 top-0 left-0">
					{/* <!-- 사이드바 닫기 버튼 --> */}
					<button id="menu-close-button" class="flex z-40" onClick={onClickMenu}>
						<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</header>
				{loginState ? (
					<>
					{/* <!-- 사이드바 상단 정보(로그인 후) --> */}
					<div
					onClick={() => {navigate(`/user/${loggedInUser.id}`);onClickMenu()}}
					class="w-full h-52 flex flex-col items-center justify-center pt-8"
					>
						<span
						class={`w-[4rem] h-[4rem] rounded-full cursor-pointer bg-basic bg-cover`}
						style={{ backgroundImage: `url(${loggedInUser.profile_img})`}}
						/>
						<p class="text-2xl font-bold cursor-pointer">{loggedInUser.name}</p>
						<p class="text-sm text-[#C8D2DD] font-medium cursor-pointer">{loggedInUser.displayname}</p>
					</div>
					</>
				) : (
					<>
					{/* <!-- 사이드바 상단 정보(로그인 전) --> */}
					<div class="w-full h-52 flex flex-col items-center justify-center pt-8">
						<span class="w-[4rem] h-[4rem] rounded-full bg-[#C8D2DD]" />
						<button
						onClick={onClickLogin}
						class="w-[5.5rem] h-9 flex items-center justify-center rounded-2xl border border-[#C8D2DD] my-3"
						>
							<p class="text-xl text-[#C8D2DD] font-bold">로그인</p>
						</button>
					</div>
					</>
				)}
				{/* <!-- 사이드바 리스트 --> */}
				<ul class="flex flex-col items-start justify-start w-full h-[calc(100%-5rem)] font-bold text-xl">
					{loginState && (
						<li onClick={() => {navigate(`/user/${loggedInUser.id}`);onClickMenu()}} class="w-full h-14 flex flex-row items-center justify-start my-1 p-5 px-8 hover:backdrop-brightness-50 cursor-pointer">
							<button>마이페이지</button>
						</li>
					)}
					<li onClick={() => {navigate('/');onClickMenu()}} class="w-full h-14 flex flex-row items-center justify-start my-1 p-5 px-8 hover:backdrop-brightness-50 cursor-pointer">
						<button>예약하기</button>
					</li>
					<li onClick={() => {navigate('/report');onClickMenu()}} class="w-full h-14 flex flex-row items-center justify-start my-1 p-5 px-8 hover:backdrop-brightness-50 cursor-pointer">
						<button>고장 신고하기</button>
					</li>
					<li onClick={() => {window.open("https://valiant-gerbera-c26.notion.site/LV42-d84bd84cac65455384335ef1db7a9702");onClickMenu()}} class="w-full h-14 flex flex-row items-center justify-start my-1 p-5 px-8 hover:backdrop-brightness-50 cursor-pointer">
						<button>사용법 알아보기</button>
					</li>
					<li onClick={() => {window.open("https://forms.gle/CWybJJPorTauRUuQ8");onClickMenu()}} class="flex flex-row items-center justify-start w-full h-14 my-1 p-5 px-8 hover:backdrop-brightness-50 cursor-pointer">
						<button>문의하기</button>
					</li>
				</ul>
				{/* <!-- 사이드바 내부 푸터 --> */}
				<footer onClick={() => window.open("https://github.com/Team-LV42")} class="absolute w-full h-32 top-[calc(100%-8rem)] left-0 flex flex-col items-center justify-center">
					<p class="font-medium text-sm text-[#C8D2DD]">contact us</p>
					<p class="fomt-medium text-sm text-bold">teamlv42@gmail.com</p>
					<span onclick="location.href='//github.com/orgs/Team-LV42/repositories'" class="w-8 h-8 rounded-full bg-basic bg-cover bg-[url('../public/logo/github-mark.svg')] my-3 cursor-pointer"></span>
				</footer>
			</div>
			<div 
			id="sidebar-bg"
			onClick={onClickMenu}
			class="invisible peer-[.side-shown]:visible backdrop-brightness-50 w-full h-full fixed top-0 left-0 z-40" />
		</>
	)
}

export default SideBar;