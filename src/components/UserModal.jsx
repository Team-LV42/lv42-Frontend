import { Suspense, useState, useEffect } from "react";
import { atom, useRecoilValue, selectorFamily } from 'recoil';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { useDate } from '../hooks/useDate';
import { fetchUserCurrentBook, fetchUserHistory, getUserInfoById, userState } from "../api/userApi";

import PageInfo from "./PageInfo";

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


// !login -> userpage
// login && id === user.id -> mypage

const userDataSelector = selectorFamily({
	key: 'UserDataSelector',
	get: userid => async ({ get }) => {
		if (userid === undefined || !userid) return null;
		
		let type;
		
		const id = get(userState).id;
		if (userid === id) type = 'my';
		else type = 'user';

		const data = get(fetchUserCurrentBook(userid)) || [];
		const user = await getUserInfoById(userid);
		return {data: data, type: type, user: user};
	}
});

const getUserNowPlaying = async (userID) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${userID}/nowplay`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
}

export default function UserModal() {
	const [isPlaying, setIsPlaying] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const date = useDate();
	const { data, type, user } = useRecoilValue(userDataSelector(id));

	useEffect(() => {
		const checkIsPlaying = async () => {
			const data = await getUserNowPlaying(id);
			setIsPlaying(data);
		}
		checkIsPlaying();
	}, [id])

	return (
		<>
			<PageInfo page={type} />
			<div class="w-full grow flex flex-col items-center justify-start overflow-hidden z-10 rounded-t-3xl bg-white">
				{/* <!-- 프로필 컨테이너 --> */}
				<div class="w-full min-h-36 flex flex-row items-center justify-around px-8 border-b border-gray-500">
					<span
					class="w-[4.5rem] h-[4.5rem] rounded-full bg-basic bg-cover"
					style={{ backgroundImage: `url(${user.profile_img})`}}
					/>
					<div class="h-[4.5rem] flex flex-col items-start justify-center px-5">
						<p class="text-2xl font-bold">{user.name}</p>
						<p class="font-medium text-[#9E9F9F]">{user.displayname}</p>
					</div>
					{isPlaying
					? (
					<div class="w-24 h-12 flex flex-row items-center justify-center rounded-3xl border border-gray-400">
						<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00C83B">
							<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clip-rule="evenodd" />
						</svg>
						<span class="w-14 h-10 flex flex-col items-start justify-center text-xs ml-[0.35rem] text-[#00C838]">
							<p class="text-center">NOW</p>
							<p class="text-center">PLAYING</p>
						</span>
					</div>
					) : (
					<div class="w-24 h-12 flex flex-row items-center justify-center rounded-3xl border border-gray-400">
						<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C8D2DD">
							<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z" clip-rule="evenodd" />
						</svg>
						<span class="w-14 h-10 flex flex-col items-start justify-center text-xs ml-[0.35rem] text-[#C8D2DD]">
							<p class="text-center">NOT</p>
							<p class="text-center">PLAYING</p>
						</span>
					</div>
					)}
				</div>
				<div class="w-full grow flex flex-col items-center justify-start overflow-scroll py-4 px-6">
					<Suspense fallback={<UserReservationLoadingSpinner />}>
						<UserReservationList list={data} />
						{/* <UserReservaitonHistoryList /> */}
					</Suspense>
				</div>
			</div>
		</>
	)
}

const UserReservationList = ({ list }) => {
	const [isChecked, setIsChecked] = useState(true);

	const onClickInput = () => {
		setIsChecked(!isChecked);
	};

	const listSizes = {
		4: 'peer-checked:h-[16rem]',
		5: 'peer-checked:h-[20rem]',
		6: 'peer-checked:h-[24rem]',
		7: 'peer-checked:h-[28rem]',
		8: 'peer-checked:h-[32rem]',
	}

	const renderListHeight = (length) => {
		if (length <= 3)
			return ('peer-checked:h-48');
		else if (3 < length && length < 9)
			return (listSizes[length]);
		else
			return ('peer-checked:h-auto');
	}

	return (
		<div class="w-full flex flex-col items-center justify-center mb-10">
			<input id="booking-list-accordion" checked={isChecked} type="checkbox" class="peer hidden" />
			<label onClick={onClickInput} for="booking-list-accordion" class="w-full h-16 flex flex-row items-center justify-between cursor-pointer peer-checked:[&>svg]:[transform-style-preserve-3d] peer-checked:[&>svg]:[transform:rotateX(180deg)]">
				<div class="flex flex-row items-center justify-center">
					<svg class="w-6 h-6 mx-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
					</svg>
					<span class="text-xl font-semibold text-[#4A4A4A]">예약현황</span>
				</div>
				<svg class="w-7 h-7 transition-all ease-[cubic-bezier(.4,0,.6,1)] duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
				</svg>
			</label>
			<div
			id="booking-list"
			class={`w-full ${renderListHeight(list.length)} h-0 flex items-center justify-center transition-all ease-[cubic-bezier(.4,0,.6,1)] duration-300 overflow-hidden`}
			>
				{ list.length !== 0 ? (
					<div id="booking-list-exist" class="w-[92%] h-full flex flex-col items-center justify-start list-none border-b border-[#C1C1C1]">
						{list.map((record, index) => {
							return <UserReservationItem key={index} item={record} />
						})}
					</div>
				) : (
					<div id="booking-list-empty" class="w-full h-full flex flex-col items-center justify-center">
						<p class="font-semibold text-xl text-[#4A4A4A]">예약이 없습니다</p>
						<a class="text-xs text-[#2997FF] hover:underline" href="/">지금 예약하러 가기 {'>'}</a>
					</div>
				)}
			</div>
		</div>
	)
}

const UserReservationLoadingSpinner = () => {
	return (
		<div id="booking-list-spinner" class="block" role="status">
			<svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
				<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
			</svg>
			<span class="sr-only">Loading...</span>
		</div>
	)
}

const UserReservationItem = ({ item }) => {
	const { tickToTime } = useDate();

	const getTypeID = (consoleType) => {
		switch (consoleType) {
			case 1:
				return 'XBOX';
			case 2:
				return 'SWITCH';
			case 3:
				return 'PS5';
		}; 
	}

	return (
		<li class="w-full h-16 flex flex-row items-center justify-center border-t border-[#C1C1C1]">
			<div class="w-36 h-full flex items-center justify-center font-bold px-2 font-outfit">
				<p>{tickToTime(item.start_time)} ~ {tickToTime(item.end_time + 1)}</p>
			</div>
			<div class="grow h-full flex flex-row items-center justify-start pl-12 booking-xbox">
				<p>{getTypeID(item.type)}</p>
			</div>
		</li>
	)
}

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
