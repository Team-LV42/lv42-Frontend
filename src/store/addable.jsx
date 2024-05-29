import { selectorFamily } from 'recoil';

import { deviceTotalSelectedMalfList } from './report';
import { setSelected } from '../api/report';

export const getAddableContent = selectorFamily({
	key: 'getAddableContent',
	get: (index) => ({ get }) => {
		const items = get(setSelected);
 		return items.controller_malf_btn_list[index] || false;
	},
	set: (index) => ({ set }, newValue) => {
		set(deviceTotalSelectedMalfList, (prev) => {
			let newItems = [...prev.controller_malf_btn_list];
			if (!newValue)
				newItems = newItems.filter((item, i) => i !== index);
			else {
				newItems[index] = newValue;
			}
			return {
				...prev,
				controller_malf_btn_list: newItems,
			};
		});
	},
});
