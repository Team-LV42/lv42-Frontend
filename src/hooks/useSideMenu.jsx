import { useRecoilState } from 'recoil';

import sideBarState from '../store/SideBar';

export const useSideMenu = () => {
	const [isSideBarOpen, setSideBar] = useRecoilState(sideBarState);

	const onClickMenu = () => {
		setSideBar(!isSideBarOpen);
	};

	return { isSideBarOpen, onClickMenu };
}

export default useSideMenu;