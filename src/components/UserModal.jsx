import { Suspense } from "react";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { useDate } from '../hooks/useDate.jsx';

import UserView from "./UserView";
import Record from "./Record.jsx";
import { fetchUserCurrentBook, fetchUserHistory, userState } from "../api/userApi";
import { booksState } from '../api/bookApi.jsx';

const userPageState = atom({
	key: 'UserPageState',
	default: 'status',
});

export default function UserModal() {
	// cookie로 대체해야함
	const userID = 158010;
	const date = useDate();
	const [books, setBooks] = useRecoilState(booksState);
	const targetUser = useRecoilValue(userState(userID));

	const userHistory = useRecoilValue(fetchUserHistory(userID));
	const userCurrentBook = useRecoilValue(fetchUserCurrentBook(userID));
	const [pageStatus, setPageStatus] = useRecoilState(userPageState);

	const isDeletable = (pageStatus === 'status' ? true : false);

	const onClickTab = () => {
		if (pageStatus === 'status') {
			setPageStatus('history');
			setBooks(userHistory);
		} else {
			setPageStatus('status');
			setBooks(userCurrentBook);
		}
	};

	const passparams = (userID, param) => {
		if (userID)
			return (`?search=${param}`);
		return (`?param`);
	}
	return (
		<>
			{/* side nav bar */}
			<Suspense fallback="Loading...</p>" >
				<div className="content" id="user-content">
					<div className="user">
						{targetUser && (
							<>
							<div className="user-img-box">
								<div className="user-img">
									<img className="user-img" src={targetUser.profile_img} />
								</div>
							</div>
							<div className="user-info">
								<div className="user-name"><p>{targetUser.name}</p></div>
								<div className="user-playtime"><p>80h</p></div>
								<div className="user-status user-status-type-3"><p>Nintendo</p></div>
							</div>
							</>
						)}
						{!targetUser && (
						<>
							<div className="user-img-box">
								<div className="user-img">
									<img />
								</div>
							</div>
							<div className="user-info">
								<div className="user-name"><p></p></div>
								<div className="user-playtime"><p></p></div>
								<div className="user-status user-status-type-3"><p></p></div>
							</div>
						</>
						)}
					</div>
				</div>
				<div className="wrapper">
					<div className="tabs">
						<span className="tab" id="status-tab" onClick={() => onClickTab()}><p>예약현황</p></span>
						<span className="tab" id="history-tab" onClick={() => onClickTab()}><p>예약기록</p></span>
					</div>
					<div className="slot-list-active" id={`${pageStatus}-slot-list`}>
						{books && books.map((record) => (
							<Record record={record} key={record._id} type={'user'} isDeletable={isDeletable} />
						))}
					</div>
				</div>
			</Suspense>
		</>
	)
}