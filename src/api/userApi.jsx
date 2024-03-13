import { 
	atomFamily,
	selector, 
	selectorFamily 
} from 'recoil'

import { dateState } from '../store/State.jsx';
import { useDate } from '../hooks/useDate.jsx';
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
		get: userID => () => {
			return fetchUserState(userID);
		}
	}),
});

const fetchUserState = async (userID) => {
	try {
		/* check id regex needed */
		const response = await fetch(`http://54.180.96.16:4242/users/${userID}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status != 200)
			throw new Error("userApi: fetch user info failed");
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
			if (response.status != 200)
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
			if (response.status != 200)
				throw new Error('failed to fecth user current booking');
			return response.json();
		} catch (error) {
			console.error(error);
		}
	},
});

// fetching User Info by Id
export const fetchUserStateQuery = selectorFamily({
	key: 'FetchUserStateQuery',
	get: (id) => async () => {
		try {
			/* check id regex needed */
			/* process.env.REACT_APP_URL */
			const response = await fetch("http://54.180.96.16:4242/users/" + id, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.status != 200)
				throw new Error("userApi: fetch user info failed");
			return response.json();
		} catch (err) {
			console.error(err);
		}
	},
	set: ({set}, value) => {
		set(userState, value)
	}
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
			if (response != 200)
				throw new Error("failed to fetch Users Data");
		} catch (err) {
			throw err;
		}
	}
})

export default fetchUserStateQuery;