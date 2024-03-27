import { Suspense, useEffect } from "react";
import { atom, useRecoilState, useRecoilValue, selectorFamily, selector } from 'recoil';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { useDate } from '../hooks/useDate.jsx';

import Record from "./Record.jsx";
import { fetchUserCurrentBook, fetchUserHistory, usersState, userState } from "../api/userApi";

const userBookState = atom({
	key: 'UserBookState',
	default: [],
});

const userPageState = atom({
	key: 'UserPageState',
	default: 'status',
});

const userRenderComponent = selectorFamily({
	key: 'UserRenderComponent',
	get: userID => ({ get }) => {
		const state = get(userPageState);
		if (state === 'status')
			return get(fetchUserCurrentBook(userID));
		if (state === 'history')
			return get(fetchUserHistory(userID));
	}
})

const targetUserSelector = selectorFamily({
	key: 'TargetUser',
	get: userID => ({ get }) => {
		const searchUser = get(usersState(userID));
		return searchUser !== null ? searchUser : get(userState);
	}
});

const HistoryDate = () => {
	const { getMonth, getWeek, setMovedDate } = useDate();

	const onClickDate = (value) => {
		setMovedDate(value);
	}

	return (
		<>
		<div className="date-wrapper">
			<div className="button" id="left-button" onClick={() => onClickDate(-1)}>
				<span className="material-symbols-outlined">
					navigate_before
				</span>
			</div>
			<div className="date" id="month">
				<p>{getMonth()},</p>
			</div>
			<div className="date" id="week">
				<p>WEEK {getWeek()}</p>
			</div>
			<div className="button" id="right-button" onClick={() => onClickDate(1)}>
				<span className="material-symbols-outlined">
					navigate_next
				</span>
			</div>
		</div>
		</>
	);
}

const HistoryList = ({list, isSelected}) => {
	const date = useDate();

	return (
		<>
		<div className={`list ${isSelected ? 'now' : ''}`}>
			<span className="history-slot">
			<div className="slot-date">
				<p className="day-of-week">{date.getWeekDay()}</p>
				<p className="day">day {date.getDay()}</p>
			</div>
			{list && list.map((record) => (
				<HistoryRecord record={record} date={date} />
			))}
			</span>
		</div>
		</>
	);
}

const HistoryRecord = ({ record, date }) => {
	const typeToString = (type) => {
		let str;
		switch (type) {
			case 1:
				str = 'Xbox';
				break ;
			case 2:
				str = 'Nintendo';
				break ;
			case 3:
				str = 'PS5';
				break ;
			default :
				str = '';
				break ;
		}
		return str;
	};

	return (
		<>
		<div className="slot-time-value">
			<div className="slot-content">
				<div className="slot-time">
					<p>{`${date.tickToTime(record.start_time)} ~ ${date.tickToTime(record.end_time)}`}</p>
				</div>
				<div className="slot-value red">
					<p>{typeToString(record.type)}</p>
				</div>
			</div>
		</div>
		</>
	);
}

export default function UserModal() {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const date = useDate();
	const user = useRecoilValue(userState);
	const [books, setBooks] = useRecoilState(userBookState);
	const userID = id ? id : user.id;
	const targetUser = useRecoilValue(targetUserSelector(userID));
	
	const [pageStatus, setPageStatus] = useRecoilState(userPageState);
	const render = useRecoilValue(userRenderComponent(userID));

	useEffect(() => {
		console.log(render);
		setBooks(render);
	}, [render, pageStatus, setBooks])

	const isDeletable = (pageStatus === 'status' ? true : false);

	const onClickTab = (state) => {
		setPageStatus(state);
		setBooks(render);
	};

	return (
		<>
			{/* side nav bar */}
			<Suspense fallback="Loading...</p>" >
				<div className="content" id="user-content">
					<Suspense fallback="loading user">
						<div className="user">
							{targetUser && (
								<>
								<div className="section" id="user-img-section">
									<div className="wrapper" id="user-img">
										<img src={targetUser.profile_img} alt="profileImg" />
									</div>
								</div>
								<div className="user-info">
									<div className="wrapper" id="username-wrapper">
										<div className="username">
											<p>{targetUser.name}</p>
											<div className="user-status">
												{/* user status */}
												<img id="inactive" />
											</div>
										</div>
										<div className="name">
											<p>{targetUser.displayname}</p>
										</div>
									</div>
								</div>
								</>
							)}
							{!targetUser && (
							<>
							{/* skeleton */}
							</>
							)}
						</div>
					</Suspense>
					<div className="wrapper" id="slot-list-wrapper">
						<div className="tabs">
							<span className="tab" id="status-tab" onClick={() => onClickTab('status')}><p>예약현황</p></span>
							<span className="tab" id="history-tab" onClick={() => onClickTab('history')}><p>예약기록</p></span>
						</div>
						<Suspense fallback="loading... list">
							<div className="slot-list-active" id={`${pageStatus}-slot-list`}>
								{pageStatus === 'history' && (
								<>
								<HistoryDate />
								<HistoryList isSelected={true}/>

								</>
							)}
							{pageStatus === 'status' && books && books.map((record) => (
								<Record
									record={record}
									key={record._id}
									type={'user'}
									isDeletable={isDeletable}
								/>
							))}
							</div>
						</Suspense>
					</div>
				</div>
			</Suspense>
		</>
	)
}