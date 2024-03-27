import { useRecoilState, useRecoilValue, selector } from "recoil";
import { useEffect } from 'react';
import { 
	dateState,
	moveDateState,
	} from "../store/State.jsx";

export const dateSelector = selector({
	key: 'DateSelector',
	get: ({ get }) => {
		return ConvertDateFormat(get(dateObjectSelector));
	},
});

export const dateObjectSelector = selector({
	key: 'DateObjectSelector',
	get: ({ get }) => {
		const moveDate = get(moveDateState);
		const date = new Date(get(dateState));
		date.setDate(date.getDate() + moveDate);
		return (date);
	}
})

export const ConvertDateFormat = (day) => {
	const year = day.getFullYear();
	const month = day.getMonth() + 1;
	const date = day.getDate();
	
	const wide = (value) => {
		if (value >= 10)
		return value;
	return `0${value}`;
	}
	return `${year}-${wide(month)}-${wide(date)}`;
};

export const useDate = () => {
	const [date, setS_Date] = useRecoilState(dateState);
	const [move, setMoveDate] = useRecoilState(moveDateState);
	const moveDate = useRecoilValue(dateSelector);
	const moveDateObject = useRecoilValue(dateObjectSelector);

	//해당부분 수정하기 selector 사용??
	
	const setDate = (day) => {
		setS_Date(toFormat(day));
	};
	
	const setMovedDate = (dayCount) => {
		setMoveDate(move + dayCount);
	};
	
	const wide = (value) => {
		if (value >= 10)
		return value;
		return `0${value}`;
	};
	
	const toFormat = (day) => {
		const year = day?.getFullYear();
		const month = day?.getMonth() + 1;
		const date = day?.getDate();
		
		return `${year}-${wide(month)}-${wide(date)}`;
	};
	
	useEffect(() => {
		const today = new Date();
		
		setS_Date(toFormat(today));
	}, []);
	
	const getMonth = () => {
		return new Intl.DateTimeFormat('en-GB', {
			month: 'long',
			timeZone: 'Asia/Seoul',
		}).format(moveDateObject);
	};

	const getWeekDay = () => {
		return new Intl.DateTimeFormat('en-GB', {
			weekday: 'short',
			timeZone: 'Asia/Seoul',
		}).format(moveDateObject);
	};

	const getDay = () => {
		return new Intl.DateTimeFormat('en-GB', {
			day: 'numeric',
			timeZone: 'Asia/Seoul',
		}).format(moveDateObject);
	};

	const getWeek = () => {
		const date = new Date(moveDateObject);
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDayOfMonth = new Date(year, month, 1);
		const firstDayOfWeek = firstDayOfMonth.getDay(); // 월의 첫 번째 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
		const offset = 7 - firstDayOfWeek; // 첫 번째 주의 남은 요일 수
		const weeks = Math.ceil((date.getDate() - offset) / 7) + 1; // 해당 일자의 주 차
		return weeks;
	};

	const tickToTime = (tick) => {
		const hour = Math.floor(tick / 2);
		const minute = Math.floor(tick % 2 * 30);
		return (hour < 10 ? '0' + hour : hour) + ':' + ((minute) < 10 ? '00': minute);
	};

	const timeToTick = (time) => {
		const [hour, minute] = time.split(':');
		return parseInt(hour) * 2 + (parseInt(minute) / 30);
	};

	const getDuration = (start, end) => {
		const hour = (end + 1 - start) / 2;
		return (`${hour}h`);
	};

	return {
		date,
		move,
		setDate,
		moveDate,
		setMovedDate,
		toFormat,
		timeToTick,
		tickToTime,
		getDuration,
		getMonth,
		getWeek,
		getWeekDay,
		getDay,
	};
};

export default useDate;