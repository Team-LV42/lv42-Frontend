import { atom, selector } from "recoil";
import { ConvertDateFormat } from "../hooks/useDate";
import { useCookie } from "../hooks/Cookie";

/* TypeState<NUMBER> 1:xbox 2:switch 3:ps5 */
/* default: ps5							   */
export const consoleTypeState = atom({
	key: 'ConsoleTypeState',
	default: null,
	effects: [
		({ setSelf, trigger }) => {
			const {getCookies} = useCookie();
			if (trigger === 'get') {
				const Cookies = getCookies();
				const type = Cookies.type; 

				setSelf(parseInt(type, 10));
			}
		},
		({ onSet }) => {
			onSet(newType => {
				const {setCookie} = useCookie();
				setCookie("type", newType, 14);
			});
		},
	],
});

export const dateState = atom({
	key: 'DateState',
	default: '',
});

export const moveDateState = atom({
	key: 'MoveDateState',
	default: 0,
});

export const dateSelector = selector({
	key: 'dateSelector',
	get: ({ get }) => {
		const moveDate = get(moveDateState);
		const date = new Date(get(dateState));
		date.setDate(date.getDate() + moveDate);
		return ConvertDateFormat(date);
	},
})
