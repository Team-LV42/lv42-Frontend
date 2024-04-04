import { atom, selector } from 'recoil';

import { accessTokenState } from '../hooks/useToken';

export const voteIDState = atom({
	key: 'VoteIDState',
	default: undefined,
});


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
		return data;
	}
});

export const postVotePlayer = async (at, votePlayer) => {
	try {
		if (votePlayer === undefined) return null;
		const response = await fetch(`${process.env.REACT_APP_API_URL}/tournament?vote=${votePlayer}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${at}`
			},
		});
	} catch (error) {
		console.error('Failed to Post Vote Player: ',error);
	}
}
