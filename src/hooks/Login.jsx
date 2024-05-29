import {
	selectorFamily,
} from 'recoil';

/*login 쿼리 */
export const UserLoginQuery = selectorFamily({
	key: 'UserLoginQuery',
	get: (code) => async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login?code=${code}`, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (400 <= response.status && response.status <= 599)
				throw new Error("response is failed");
			
			return await response.json();
		} catch (err) {
			throw err;
		}
	}
});

/*at 재발급 쿼리 */
export const getAccessToken = selectorFamily({
	key: 'getAccessToken',
	get: ({userId, refreshToken}) => async () => {
		try {
			if (userId === undefined || refreshToken === undefined) {
				console.log('getAccessToken');
				return ;
			}
			const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh?userId=${userId}`, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${refreshToken}`,
				},
			});

			// if (response.status === 401) window.location.reload();
			if (400 <= response.status && response.status <= 599) return null;
			
			return response.json();
		} catch (err) {
			throw err;
		}
	}
});