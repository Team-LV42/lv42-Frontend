import { atom } from 'recoil';

export const sideBarState = atom({
	key: 'SideBarState',
	default: false,
});

export default sideBarState;