import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { atom, useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import useDate from '../hooks/useDate.jsx';
import { booksState, getRecordByBookID, fetchBookRecordsListQuery } from '../api/bookApi.jsx';
import { consoleTypeState } from '../store/State.jsx';
import Record from './Record';

import Select from './Select.jsx';

const selectState = atom({
	key: 'selectState',
	default: [],
});

const TestForm = ({bookid}) => {
	const [selects, setSelects] = useRecoilState(selectState);
	const [books, setBooks] = useRecoilState(booksState);
	const setConsoleType = useSetRecoilState(consoleTypeState);

	const userID = 158010;

	const bookList = useRecoilValue(fetchBookRecordsListQuery(userID));
	const navigate = useNavigate();

	useEffect(() => {
		if (books.length === 0)
			setBooks(bookList);
	}, [bookList]);
	
	const timeToTick = (tick) => {
		const hour = Math.floor(tick / 2);
		const minute = Math.floor(tick % 2 * 30);
		return (hour < 10 ? '0' + hour : hour) + ':' + ((minute * 10) < 10 ? '0' + (minute * 10) : minute * 10);
	};
	
	const onClickRecord = (event) => {
		const time = event.target.value;

		const checkSelect = (time) => {
			return selects.includes(time);
		};
		
		const addSelect = (event) => {
			const newSelects = [...selects, parseInt(event.target.value, 10)];
			setSelects(newSelects);	
		};
	
		const delSelect = (event) => {
			const newSelects = selects.filter((select) => select !== parseInt(event.target.value, 10));
			setSelects(newSelects);
		};

		if (checkSelect)
			delSelect(time);
		else
			addSelect(time);
	}

	const searchBooks = (time) => {
		return books.filter((book) => { 
			if (book.start <= time && book.end >= time)
				return (book);
		});
	}

	async function handleSubmitBookForm(e) {
		try {
			e.preventDefault();
			
			// const userID = cookie.get('userid');
			
			// if (bookid) {
			// 	response = await fetch(`http://54.180.96.16:4242/books?userId=158010&bookId=${bookid}`, {
			// 		method: "PATCH",
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 			// Token
			// 		},
			// 		body: JSON.stringify({
			// 			"start": startTick,
			// 			"end"  : endTick,
			// 			"date" : date.date,
			// 			"type" : consoleType,
			// 		}),
			// 	});
			// } else {
			// 	response = await fetch("http://54.180.96.16:4242/books?userId=158010", {
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 			// Token
			// 		},
			// 		body: JSON.stringify({
			// 			"start": startTick,
			// 			"end"  : endTick,
			// 			"date" : date.date,
			// 			"type" : consoleType,
			// 		}),
			// 	});
			// }
		
			// if (response.status != 200) {
			// 	console.error("BookForm: failed to post form data");
			// 	return;
			// }

		} catch (error) {
			console.error(`BookForm: handleSubmitBookForm: ${error}`);
		}	
	}

	return (
		<form onSubmit={handleSubmitBookForm}>
			<div>
				<button onClick={() => setConsoleType(1)}>Xbox</button>
				<button onClick={() => setConsoleType(2)}>Nintendo Switch</button>
				<button onClick={() => setConsoleType(3)}>PS5</button>
			</div>
			<div className="record-list">
				{Array.from({length: 48}, (_, i) => {
					const book = searchBooks(i);
					return (
						<Record
							key={i}
							className={`time-button ${selects.includes(i) ? 'selected-time' : ''}`}
							record={book}
							time={i}
							callback={() => onClickRecord()}
							type='book'
						/>
					)
				})}
			</div>
			{/* <label>
				<Select type="hour" value={selectedStartHour} onchange={(event) => handleStartHourChange(event)} />
			</label>
			<label>
				<Select type="minute" value={selectedStartMinute} onchange={(event) => handleStartMinuteChange(event)} />
			</label>
			<p>종료시간</p>
			<label>
				<Select type="hour" value={selectedEndHour} onchange={(event) => handleEndHourChange(event)} />
			</label>
			<label>
				<Select type="minute" value={selectedEndMinute} onchange={(event) => handleEndMinuteChange(event)} />
			</label> */}
			<button type="submit">신청하기</button>
		</form>
	);
}

const BookForm = () => {
	const [params, setParams] = useSearchParams();
	const {date} = useDate();
	const navigate = useNavigate();

	const userid = 158010;
	const bookid = (params.get('type')) ? params.get('bookid') : '';

	return (
		<>
			<TestForm bookid={bookid}/>
		</>
	)
}

export default BookForm;