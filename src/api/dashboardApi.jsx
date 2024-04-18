import { selector } from 'recoil';

export const getReportsList = selector({
	key: 'GetReportsListSelector',
	get: ({ get }) => async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/reports`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					// "Authorization": `Bearer ${get(token)}`
				},
			});
		} catch (error) {
			console.log(error);
			return [];
		}
	}
});

export const postMalfType_TEST = async ({ name, description }) => {
	try {
		if (!name || !description) {
			console.log("postMalfType_TEST: invailed input format");
			return false;
		}
		const response = await fetch(`${process.env.REACT_APP_API_URL}/reports/testMalfunctionType?name=${name}&description=${description}`, {
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

export const postBtnMalfType_TEST = async ({ name, description }) => {
	try {
		if (!name || !description) {
			console.log("postBtnMalfTytpe_TEST: invailed input format");
			return false;
		}	
		const response = await fetch(`${process.env.REACT_APP_API_URL}/reports/testButtonMalfunctionType?name=${name}&description=${description}`, {
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

export const updateDeviceStatus_TEST = async ({ id, status }) => {
	try {
		if (!id || !status) {
			console.log("updateDeviceStatus_TEST: invailed input format");
			return false;
		}
		const response = await fetch(`${process.env.REACT_APP_API_URL}/devices/testUpdateDeviceStatus?id=${id}&status=${status}`, {
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