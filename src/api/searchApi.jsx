

const testUrl = "http://52.79.233.180:4242/users";

export const searchUserByPattern = async (pattern) => {
	try {
		/* check id regex needed */
		const response = await fetch(`${testUrl}?pattern=${pattern}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return await response.json();
	} catch (err) {
		throw err;
	};
}

export const addDummyData = async (name) => {
	try {
		/* check id regex needed */
		const response = await fetch(`${testUrl}/add/${name}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return await response.json();
	} catch (err) {
		throw err;
	};
}