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
	useResetRecoilState,
	useSetRecoilState,
} from "recoil";
import { useEffect, Component } from 'react';

import Loading from '../components/Loading.jsx';
import Record from '../components/Record.jsx';
import { consoleTypeState } from "../store/State";

import useDate from "../hooks/useDate.jsx";

export function Book() {
	const [books, setBooks] = useRecoilState(booksState);
	const {move, moveDate, setMovedDate} = useDate();
	const setConsoleType = useSetRecoilState(consoleTypeState);
	const bookList = useRecoilValue(fetchBookRecordsListQuery);
	const resetBooks = useResetRecoilState(fetchBookRecordsListQuery);

	/* test code block */
	const consoleType = useRecoilValue(consoleTypeState);
	
	/* end test code block */
	// console.log(movedDate);

	useEffect(() => {
		const FetchAndSetBookList = async () => {
			try {
				if (books.length === 0)
					setBooks(bookList);
				console.log(moveDate);
			} catch (error) {
				console.error("Error fetching book list", error);
			}
		};
		console.log('effect');
		// 로딩 될 때마다 예약목록 가져옴
		FetchAndSetBookList();
	}, [bookList, moveDate, setBooks]) //첫 마운트때만 실행하도록 빈 배열 전달?

	useEffect(() => {
		setBooks(bookList);
	}, [setMovedDate]);
	return (
		<div>
			<div>
				<button onClick={() => setConsoleType(1)}>Xbox</button>
				<button onClick={() => setConsoleType(2)}>Nintendo Switch</button>
				<button onClick={() => setConsoleType(3)}>PS5</button>
			</div>
			<div>
				<p>현재 날짜: {moveDate}</p>
				<button onClick={() => setMovedDate(move - 1)}>이전</button>
				<button onClick={() => setMovedDate(0)}>오늘</button>
				<button onClick={() => setMovedDate(move + 1)}>다음</button>
			</div>
			<ul className='record-list'>
				{books.map((record) => (
					consoleType === parseInt(record.type) && 
					<Record
						record={record}
						time={record.start_time}
						key={record._id}
						isDeletable={true}
						type='admin'
					/>
				))}
			</ul>
		</div>
	)
}

export default Book;