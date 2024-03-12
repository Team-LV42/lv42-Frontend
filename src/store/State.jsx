import { atom, selector } from "recoil";
import { ConvertDateFormat } from "../hooks/useDate";

/* TypeState<NUMBER> 1:xbox 2:switch 3:ps5 */
/* default: ps5							   */
export const consoleTypeState = atom({
	key: 'ConsoleTypeState',
	default: null,
	effects: [
		({ setSelf, trigger }) => {
			if (trigger === 'get')
				/* cookie.get('type') */
				setSelf(parseInt('3', 10));

			/* cookie. */
		},
		({ onSet }) => {
			onSet(newType => {
				/* cookie.set('type', newType) */
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
