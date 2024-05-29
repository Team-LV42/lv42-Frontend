export const searchUserByPattern = async (pattern) => {
	try {
		/* check id regex needed */
		const response = await fetch(`${process.env.REACT_APP_API_URL}/users?pattern=${pattern.toLowerCase()}`, {
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
		const response = await fetch(`${process.env.REACT_APP_API_URL}/users/add/${name}`, {
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