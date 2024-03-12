import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { 
	dateState,
	moveDateState,
	dateSelector,

	} from "../store/State.jsx";
import { useCallback } from "react";

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

	//해당부분 수정하기 selector 사용??
	const today = new Date();
	setS_Date(ConvertDateFormat(today));

	const setDate = (day) => {
		setS_Date(ConvertDateFormat(day));
	}
	
	const setMovedDate = (dayCount) => {
		setMoveDate(dayCount);
	}
	return { date, move, setDate, moveDate, setMovedDate };
};

export default useDate;