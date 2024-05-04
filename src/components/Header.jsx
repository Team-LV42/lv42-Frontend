import { atom } from 'recoil';

import useSideMenu from '../hooks/useSideMenu';
import useModal from '../hooks/useModal';

export const menuState = atom({
	key: 'MenuState',
	default: false,
});

const Header = () => {
	const { onClickMenu } = useSideMenu();
	const { openModal } = useModal();

	return (
		<header class="w-full h-12 fixed flex flex-row items-center justify-between p-4 top-0 bg-white">
			{/* <!-- 사이드바 열기 버튼 --> */}
			<button id="menu-button" class="flex" onClick={() => onClickMenu()}>
				<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>
			</button>
			{/* <!-- 검색 버튼 --> */}
			<button id="search-buttom" class="flex" onClick={() => openModal({type: 'search'})}>
				<svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
				</svg>
			</button>
		</header>
	)
};

export default Header;