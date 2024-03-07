import { atom } from "recoil";

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

