import { useState } from "react";
import { selector, selectorFamily, useRecoilValue } from "recoil";

import '../styles/panel.css';
import { tournament8Group } from "../store/tournament";


const fetchVotersByWinnerID = selectorFamily({
	key: 'VotersByWinnderIDSelector',
	get: id => async () => {
		if (id === 0 || !id) return [];
		const response = fetch(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_PANEL_API_URL}?id=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
		const data = (await response).json();
		return data;
	}
})

const TournamentTest = () => {
	const [targetID, setTargetID] = useState(0);
	const players = useRecoilValue(tournament8Group);
	const voters = useRecoilValue(fetchVotersByWinnerID(targetID ? targetID : 0));

	const onChange = (event) => {
		if (event.target.value.length === 0)
			setTargetID(0);
		setTimeout(() => {
			setTargetID(event.target.value);
		}, 1000);
	}
	
	return (
		<div className="panel">
			<h1>와!!! 관리자 페이지!!!</h1>
			<input onChange={(e) => onChange(e)} type="number" placeholder=":id" />
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{voters.length !== 0 && voters.map((user, index) => {
						console.log(user);
						return (
							<tr key={index}>
								<td>{user.user_id}</td>
								<td>{user.name}</td>
								{/* <td><button onClick="editUser(1)">Edit</button> <button onClick="deleteUser(1)">Delete</button></td> */}
							</tr>
						)})}
				</tbody>
			</table>
		</div>
	)
}

export default TournamentTest;