import { selector } from 'recoil';

import {
	controllerType,
	deviceIDState,
	deviceTypeState,
	deviceTotalSelectedMalfList
} from '../store/report';

export const deviceListSelector = selector({
	key: 'DeviceList',
	get: async ({ get }) => {
		try {
			const consoleType = get(controllerType);
			const deviceType = get(deviceTypeState);
			if (consoleType === 0 || deviceType === 0) return [];
			
			const response = await fetch(`${process.env.REACT_APP_API_URL}/devices?console_type=${consoleType}&device_type=${deviceType}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
	
			return await response.json();
		} catch (error) {
			console.log(error);
			return [];
		}
	}
});

export const deviceButtonListSelector = selector({
	key: 'DeviceButtonList',
	get: async ({ get }) => {
		try {
			const cid = get(deviceIDState);
			if (cid === '') return [];

			const response = await fetch(`${process.env.REACT_APP_API_URL}/reports/types?device=${cid}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			return await response.json();
		} catch (error) {
			console.log(error);
			return [];
		}
	}
});

export const setSelected = selector({
	key: 'SetSelected',
	get: ({get}) => get(deviceTotalSelectedMalfList),
	set: ({set}, newValue) => {
	  set(deviceTotalSelectedMalfList, (oldValue) => {
		const { name, value } = newValue;
		if (Array.isArray(oldValue[name])) {
		  return {
			...oldValue,
			[name]: [...oldValue[name], value],
		  };
		} else {
		  return {
			...oldValue,
			[name]: value,
		  };
		}
	  });
	},
  });