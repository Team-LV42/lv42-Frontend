import { atom, selectorFamily } from 'recoil';

export const toggleState = atom({
	key: 'toggleState',
	default: {},
});

export const getToggleContentVisibility = selectorFamily({
	key: 'getToggleContentVisibility',
	get: (index) => ({ get }) => {
		const toggleItems = get(toggleState);
 		return toggleItems[index]?.isVisible || false;
	},
	set: (index) => ({ set }, isVisible) => {
	  set(toggleState, (prev) => ({
		...prev,
		[index]: { ...prev[index], isVisible },
	  }));
	},
  });