import { selector, selectorFamily } from 'recoil'
// import userState from '../store/userState.jsx'

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

const userState = atom({
	key: 'userState',
	default: [], 
});

/* Test Code End */

// fetching User Info by Id
export const UserStateQuery = selectorFamily({
	key: 'UserStateQuery',
	get: (id) => async () => {
		try {
			/* check id regex needed */
			const response = await fetch(process.env.REACT_APP_URL + "/user?userid=" + id, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.status != 200)
				throw new Error("userApi: fetch user info failed");
			if (response.json() === undefined)
				throw new Error("userApi: fetched data is not json");
			return response.json();
		} catch (err) {
			throw err;
		}
	},
	set: ({set}, value) => {
		set(userState, value)
	}
});

//fetching user list by Admin
export const UsersStateQuery = selector({
	key: 'UsersStateQuery',
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

export default UserStateQuery;