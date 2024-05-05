import {
	atom,
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

export const userState = atom({
	key: 'UserState',
	default: {
		id: 0,
		name: '',
		admin: false,
		displayname: '',
		profile_img: '',
	},
});


//특정한 사용자 검색을 위한 api
export const getUserInfoById = async (userID) => {
	try {
		/* check id regex needed */
		const response = await fetchUserStateQuery("id", userID);
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
		/* check id regex 	needed */
		const response = await fetch(`${process.env.REACT_APP_API_URL}/users?${param}=${search}`, {
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

export const logoutUser = async (authToken) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authToken}`, 
			}
		})
	} catch (error) {
		console.error('logoutUser:', error);
	}
}
/* Test Code End */

export const fetchUserCurrentBook = selectorFamily({
	key: 'FetchUserCurrentBook',
	get: (id) => async ({ get }) => {
		try {
			if (id === 0) return [];
			const today = get(dateState);
			const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}/list?date=${today}`, {
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
			if (id === 0) return null;
			const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}/history`, {

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

export default fetchUserStateQuery;