import { atom } from "recoil";

export const userModalState = atom({
	key: 'userModalState',
	default: false,
});

export const modalState = atom({
	key: 'modalState',
	default: {
		action: 'none',
		content: '', // string | JSX
	},
})