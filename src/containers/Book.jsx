import {
	fetchBookRecordsListQuery,
	booksRecordTestQuery,
	booksState,
} from "../api/bookApi";
import {
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import { useEffect } from 'react';

// import Loading from '../components/Loading.jsx';
import { consoleTypeState } from "../store/State";

// components 분리
function Record({record}) {
	return (
		<li>
			<div>
				<h1>{record.user_id}</h1>
				<p>{record.date}</p>
			</div>
		</li>
	);
}

export const dateState = atom({
	key: 'DateState',
	default: '',
});

const moveDateState = atom({
	key: 'MoveDateState',
	default: 0,
});

export const dateSelector = selector({
	key: 'dateSelector',
	get: ({ get }) => {
		const moveDate = get(moveDateState);
		const date = new Date(get(dateState));
		date.setDate(date.getDate() + moveDate);
		return ConvertDateFormat(date);
	},
})
const ConvertDateFormat = (day) => {
	const year = day.getFullYear();
	const month = day.getMonth() + 1;
	const date = day.getDate();

	const wide = (value) => {
		if (value >= 10)
			return value;
		return `0${value}`;
	}
	return `${year}-${wide(month)}-${wide(date)}`;
}

const SetDateToday = (setDate) => {
	const today = new Date();
	setDate(ConvertDateFormat(today));
};

export function Book() {
	const [books, setBooks] = useRecoilState(booksState);
	const [date, setDate] = useRecoilState(dateState);
	const [moveDate, setMoveDate] = useRecoilState(moveDateState);
	const calcDate = useRecoilValue(dateSelector);
	const setConsoleType = useSetRecoilState(consoleTypeState);
	const bookList = useRecoilValue(fetchBookRecordsListQuery);

	/* test code block */
	const consoleType = useRecoilValue(consoleTypeState);

	// console.log(books);
	// console.log(consoleType);
	/* end test code block */
	useEffect(() => {
		const FetchAndSetBookList = async () => {
			try {
				setBooks(bookList);
			} catch (error) {
				console.error("Error fetching book list", error);
			}
		};

		// 첫 렌더때 초기화
		if (!date)
			SetDateToday(setDate);
		// 로딩 될 때마다 예약목록 가져옴
		FetchAndSetBookList();
	}) //첫 마운트때만 실행하도록 빈 배열 전달?
	return (
		<div>
			<div>
				<button onClick={() => setConsoleType(1)}>Xbox</button>
				<button onClick={() => setConsoleType(2)}>Nintendo Switch</button>
				<button onClick={() => setConsoleType(3)}>PS5</button>
			</div>
			<div>
				<p>현재 날짜: {calcDate}</p>
				<button onClick={() => setMoveDate(moveDate - 1)}>이전</button>
				<button onClick={() => setMoveDate(0)}>오늘</button>
				<button onClick={() => setMoveDate(moveDate + 1)}>다음</button>
			</div>
			<ul>
				{books.map((record) => (
					<Record record={record} key={record._id} />
				))}
			</ul>
		</div>
	)
}

export default Book;