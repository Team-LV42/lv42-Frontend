import { selector } from 'recoil';

import { playerList } from '../api/tournamentApi';

export const tournament8Group = selector({
	key: 'Tournament8Group',
	get: ({ get }) => {
		const data = get(playerList);
		const left = data.players.slice(0, 4);
		const right = data.players.slice(4, 8);
		const vote = data.vote ? data.vote : false;
		const fin = data.fin;
		return { left, right, vote, fin };
	}
})
