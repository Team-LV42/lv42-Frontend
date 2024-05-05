import { useRecoilState } from 'recoil';

import sideBarState from '../store/SideBar';

export const useSideMenu = () => {
	const [isSideBarOpen, setSideBar] = useRecoilState(sideBarState);

	const onClickMenu = () => {
		setSideBar(!isSideBarOpen);
	};

	const closeMenu = () => {
		setSideBar(false);
	}

	return { isSideBarOpen, onClickMenu, closeMenu };
}

export default useSideMenu;