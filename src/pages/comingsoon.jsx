import useSideMenu from "../hooks/useSideMenu";

import { DeviceSideMenu }from './report';

export const ComingSoon = () => {
	const { onClickMenu } = useSideMenu();

	return (
		<div class="w-screen h-svh relative flex flex-row items-center justify-center bg-basic bg-cover md:bg-default-desktop bg-default">
		<header class="absolute flex flex-row items-center justify-between p-4 top-0 left-0 w-full h-12">
			<button id="menu-button" class="flex" onClick={onClickMenu}>
				<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>
			</button>
			<div class="h-8 w-8 hidden bg-basic bg-logo"></div>
		</header>
		<div class= "flex flex-col justify-center items-center bg-basic w-80 h-40 bg-logo-hazy font-outfit font-bold text-2xl">
			<p>서비스</p>
			<p>준비중입니다</p>
		</div>
		<DeviceSideMenu />
	</div>
	)
}

export default ComingSoon;