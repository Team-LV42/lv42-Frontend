import { selector } from 'recoil';

import { requestState } from '../pages/dashboard';

export const getReportsList = selector({
	key: 'GetReportsListSelector',
	get: async ({ get }) => {
		try {
			const state = get(requestState);
			if (state !== 'reports') return [];
			const response = await fetch(`${process.env.REACT_APP_API_URL}/reports`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					// "Authorization": `Bearer ${get(token)}`
				},
			});

			return await response.json();
		} catch (error) {
			console.log(error);
			return [];
		}
	}
});

export const postNewDevice = async (deviceId, deviceName, consoleType, deviceType, deviceStatus) => {
	try {
		if (!deviceId || !consoleType || !deviceStatus || !deviceName || !deviceType) {
			console.log("postNewDevice: invailed input format");
			return false;
		}
		
		const response = await fetch(`${process.env.REACT_APP_API_URL}/devices?id=${deviceId}&console_id=${consoleType}&name=${deviceName}&device_type=${deviceType}&status=${deviceStatus}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		
		return await response.json();
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const postNewMalfType_TEST = async (name, description) => {
	try {
		if (!name || !description) {
			console.log("postMalfType_TEST: invailed input format");
			return false;
		}
		const response = await fetch(`${process.env.REACT_APP_API_URL}/reports/types/malfunction_type?name=${name}&description=${description}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// "Authorization": `Bearer ${get(token)}`
			},
		});

		return await response.json();
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const postNewBtnMalfType_TEST = async (name, description) => {
	try {
		if (!name || !description) {
			console.log("postBtnMalfTytpe_TEST: invailed input format");
			return false;
		}	
		const response = await fetch(`${process.env.REACT_APP_API_URL}/reports/types/button_malfunction_type?name=${name}&description=${description}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// "Authorization": `Bearer ${get(token)}`
			},
		});

		return await response.json();
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const updateDeviceStatus_TEST = async (id, status ) => {
	try {
		if (!id || !status) {
			console.log("updateDeviceStatus_TEST: invailed input format");
			return false;
		}
		const response = await fetch(`${process.env.REACT_APP_API_URL}/devices?id=${id}&status=${status}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				// "Authorization": `Bearer ${get(token)}`
			},
		});

		return await response.json();
	} catch (error) {
		console.log(error);
		return false;
	}
}


export const deleteDevice = async (device_id) => {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/devices`, {
		method: 'DELETE',
		headers: {
			'Content-Type': "application/json",
		}
	})

	if (response.status === 200) {
		console.log('성공');
	}
	else
		console.log('실패');
};

export const deleteReport = async (report_id) => {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/reports`, {
		method: 'DELETE',
		headers: {
			'Content-Type': "application/json",
		}
	})

	if (response.status === 200) {
		console.log('성공');
	}
	else
		console.log('실패');
}

export const updateReport = async (report_id, status) => {
	if (!report_id || !status) return false;
	const response = await fetch(`${process.env.REACT_APP_API_URL}/reports?id=${report_id}&status=${status}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': "application/json",
		}
	})

	if (response.status === 200) {
		console.log('성공');
	}
	else
		console.log('실패');
}