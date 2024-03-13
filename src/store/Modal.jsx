import { atom } from "recoil";

export const modalState = atom({
	key: 'modalState',
	default: {
		title: '', //string
		content: '', // string | JSX
		callback: null, //callback => void,
	},
});

export const actionState = atom({
	key: 'actionState',
	default: false,
});