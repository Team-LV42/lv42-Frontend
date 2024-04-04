import { atom, selector } from "recoil";
import { ConvertDateFormat } from "../hooks/useDate";
import { Cookie } from "../hooks/Cookie";

/* TypeState<NUMBER> 1:xbox 2:switch 3:ps5 */
/* default: ps5							   */
export const consoleTypeState = atom({
	key: 'ConsoleTypeState',
	default: 3,
});

// export const consolleTypeState = selector({
// 	key: 'ConsoleTypeState',
// 	get: () => {
// 		return Cookie.getCookie('consoleType') === '' ? 3 : Number(Cookie.getCookie('consoleType'));
// 	},
// 	set: ({set}, value) => {
// 		Cookie.setCookie('consoleType', value);
// 	}
// })

export const dateState = atom({
	key: 'DateState',
	default: '',
});

export const moveDateState = atom({
	key: 'MoveDateState',
	default: 0,
});