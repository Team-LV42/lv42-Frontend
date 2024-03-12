import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import UserView from "../UserView";
import Record from "../Record.jsx";
import { fetchUserCurrentBook, fetchUserHistory, userState, userTestState } from "../../api/userApi";
import { booksState } from '../../api/bookApi.jsx';

const userModalState = atom({
	key: 'UserModalState',
	default: '',
});

export function UserModal() {
	const [ params ] = useSearchParams();
	const [uModalState, setUModalState] = useRecoilState(userModalState);
	// const userID = params.get('userid'); 
	// cookie로 대체해야함
	const userID = 158010;
	const setBooks = useSetRecoilState(booksState);
	const searchParams = params.get('search');
	const userHistory = useRecoilValue(fetchUserHistory(userID));
	const userCurrentBook = useRecoilValue(fetchUserCurrentBook(userID));
	const targetUser = useRecoilValue(userState(userID))
	const renderActionButton = (params.get('search') === 'book' ? true : false);
	
	useEffect(() => {
		switch (searchParams) {
			case 'book':
				setUModalState(userCurrentBook)
				break;
			case 'history':
				setUModalState(userHistory)
				break;
		}
		if (uModalState)
			setBooks(uModalState);
	}, [searchParams, uModalState]);

	const passparams = (userID, param) => {
		if (userID)
			return (`?search=${param}`);
		return (`?param`);
	}
	return (
		<>
			{/* side nav bar */}
			<nav>
				<ul>
					{/* 둘중 하나만 누르도록 바꿔야함 */}
					<li><Link to={passparams(userID, 'book')}>예약 현황</Link></li>
					<li><Link to={passparams(userID, 'history')}>예약 기록</Link></li>
				</ul>
			</nav>
			<div className="record-list">
				<UserView object={targetUser}/>
				<div className="user modal-content">
					{/* <UserRecord records={} /> */}
					{uModalState && uModalState.map((record) => (
						<Record record={record} key={record._id} action={renderActionButton} />
					))}
				</div>
			</div>
		</>
	)
}