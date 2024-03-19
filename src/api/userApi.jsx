import { 
	atomFamily,
	selector, 
	selectorFamily 
} from 'recoil'

import { dateState } from '../store/State.jsx';
/*
* user : {
*	id: STRING,
*	name: STRING,
*	profile-img: URL,
* }
*/

/* Test Code */

// const userId = cookie.get('userid');
// const userId = '';

export const userState = atomFamily({
	key: 'userState',
	default: selectorFamily({
		key: 'userState/Default',
		get: userID => async () => {
			const response = await fetchUserStateQuery("id", userID);
			return response;
		}
	}),
});

export const getUserInfoById = async (userID) => {
	try {
		/* check id regex needed */
		const response = await fetchUserStateQuery("id", userID);
		console.log(response);
		return response;
	} catch (err) {
		throw err;
	};
}

export const getUserInfoByName = async (userName) => {
	try {
		/* check id regex needed */
		const response = await fetchUserStateQuery("name", userName);
		return response;
	} catch (err) {
		throw err;
	};
}

const fetchUserStateQuery = async (param, search) => {
	try {
		/* check id regex needed */
		const response = await fetch(`http://54.180.96.16:4242/users?${param}=${search}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status !== 200)
			throw new Error("fetchUserStateQuery : fetching path is invaild");
		return response.json();
	} catch (err) {
		throw err;
	};
}
/* Test Code End */

export const fetchUserCurrentBook = selectorFamily({
	key: 'FetchUserCurrentBook',
	get: (id) => async ({ get }) => {
		try {
			const today = get(dateState);
			const response = await fetch(`http://54.180.96.16:4242/books/${id}/list?date=${today}`, {
				method: "GET",
				headers: {
					"Content-Type": "appication/json",
				},
			});
			if (response.status !== 200)
				throw new Error('failed to fecth user current booking');
			return await response.json();
		} catch (error) {
			console.error(error);
		};
	},
});

export const fetchUserHistory = selectorFamily ({
	key: 'FetchUserHistory',
	get : (id) => async () => {
		try {
			const response = await fetch(`http://54.180.96.16:4242/books/${id}/history?`, {

				method: "GET",
				headers: {
					"Content-Type": "appication/json",
				},
			});
			if (response.status !== 200)
				throw new Error('failed to fecth user current booking');
			return response.json();
		} catch (error) {
			console.error(error);
		}
	},
});

export const UserlistStateQuery = selector({
	key: 'UserlistStateQuery',
	get: async () => {
		try {
			const response = await fetch(process.env.REACT_APP_URL + "/users", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					/* Token */
				},
			});
			if (response !== 200)
				throw new Error("failed to fetch Users Data");
		} catch (err) {
			throw err;
		}
	}
})

export default fetchUserStateQuery;