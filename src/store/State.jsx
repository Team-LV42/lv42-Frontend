import { atom, selector } from "recoil";
import { ConvertDateFormat } from "../hooks/useDate";
import { useCookie } from "../hooks/Cookie";

/* TypeState<NUMBER> 1:xbox 2:switch 3:ps5 */
/* default: ps5							   */
export const consoleTypeState = atom({
	key: 'ConsoleTypeState',
	default: 3,
});

export const dateState = atom({
	key: 'DateState',
	default: '',
});

export const moveDateState = atom({
	key: 'MoveDateState',
	default: 0,
});