import { atom, selector } from 'recoil';

import { accessTokenState } from '../hooks/useToken';


//참가 선수 리스트
export const playerList = selector({
	key: 'PlayerList',
	get: async ({ get }) => {
		const at = get(accessTokenState);
		const response = await fetch(`${process.env.REACT_APP_API_URL}/tournament`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${at ? at : ''}`
			},
		});
		const data = await response.json();
		data.players.sort((a,b) => a.bracket_pos - b.bracket_pos);
		return data;
	}
});

export const postVotePlayer = async (at, id, navigate) => {
	try {
		if (id === undefined) return null;
		const response = await fetch(`${process.env.REACT_APP_API_URL}/tournament?vote=${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${at}`
			},
		});
		await response;
		navigate(0);
	} catch (error) {
		console.error('Failed to Post Vote Player: ',error);
	}
}
