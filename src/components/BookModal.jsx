import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from 'recoil';

import useDate from '../hooks/useDate.jsx';
import { booksState, getRecordByBookID, fetchBookRecordDelete } from '../api/bookApi.jsx';
import { consoleTypeState } from '../store/State.jsx';

import Select from './Select.jsx';

const DaysInMonth = ({today, callback, number}) => {
	console.log(today);
	const date = new Date(today);
	const length = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

	console.log(date);
	console.log(length);

	return (
		<>
			{Array.from({ length: length }, (_, index) => (
				<a 
					onClick={() => callback(index + 1)}
					className={`date-button ${index + 1 === number ? 'date-button-selected' : ''}`}
					key={index}
				>
					<div>
						{index + 1}
						<p>{daysOfWeek[(date.getDay() + index - 1) % 7]}</p>
					</div>
				</a>
			))}
		</>
	);
}

// function TimePicker() {
// 	const hours = [...Array(24).keys()].map(n => `${n}시`);
// 	const minutes = [...Array(60).keys()].map(n => `${n}분`);
  
// 	const [selectedHour, setSelectedHour] = useState(hours[0]);
// 	const [selectedMinute, setSelectedMinute] = useState(minutes[0]);
  
// 	const hourRefs = useRef([]);
// 	const minuteRefs = useRef([]);
  
// 	useEffect(() => {
// 	  const selectedHourIndex = hours.indexOf(selectedHour);
// 	  const selectedMinuteIndex = minutes.indexOf(selectedMinute);
  
// 	  hourRefs.current[selectedHourIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
// 	  minuteRefs.current[selectedMinuteIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
// 	}, [selectedHour, selectedMinute]);
  
// 	return (
// 	  <div className="time-picker">
// 		<div className="time-picker-section">
// 		  <label htmlFor="hour-select">시간</label>
// 		  <div className="time-picker-wheel">
// 			{hours.map((hour, index) => (
// 			  <div 
// 				key={hour} 
// 				ref={el => hourRefs.current[index] = el}
// 				className={`time-picker-item ${hour === selectedHour ? 'selected' : ''}`}
// 				onClick={() => setSelectedHour(hour)}
// 			  >
// 				{hour}
// 			  </div>
// 			))}
// 		  </div>
// 		</div>
// 		<div className="time-picker-section">
// 		  <label htmlFor="minute-select">분</label>
// 		  <div className="time-picker-wheel">
// 			{minutes.map((minute, index) => (
// 			  <div 
// 				key={minute} 
// 				ref={el => minuteRefs.current[index] = el}
// 				className={`time-picker-item ${minute === selectedMinute ? 'selected' : ''}`}
// 				onClick={() => setSelectedMinute(minute)}
// 			  >
// 				{minute}
// 			  </div>
// 			))}
// 		  </div>
// 		</div>
// 	  </div>
// 	);
//   }

const TestForm = ({bookid}) => {
	const [selectedStartHour, setSelectedStartHour] = useState(0);
	const [selectedStartMinute, setSelectedStartMinute] = useState(0);
	const [selectedEndHour, setSelectedEndHour] = useState(0);
	const [selectedEndMinute, setSelectedEndMinute] = useState(0);
	const [books, setBooks] = useRecoilState(booksState);
	const consoleType = useRecoilValue(consoleTypeState);
	const modifyRecord = useRecoilValue(getRecordByBookID(bookid));
	const navigate = useNavigate();

	const date = useDate();

	useEffect(() => {
		console.log(modifyRecord.length);
		if (modifyRecord.length > 0 && modifyRecord !== null) {
			console.log(modifyRecord);
			const record = modifyRecord[0];
			const startHour = Math.floor(record.start_time / 6);
			const startMinute = Math.floor(record.start_time % 6 * 10);
			const endHour = Math.floor(record.end_time / 6);
			const endMinute = Math.floor(record.end_time % 6 * 10);
	
			setSelectedStartHour(startHour);
			setSelectedStartMinute(startMinute);
			setSelectedEndHour(endHour);
			setSelectedEndMinute(endMinute);
		}
	}, [bookid]);
	
	const handleStartHourChange = (e) => {
	  	setSelectedStartHour(parseInt(e.target.value, 10));
	};
  
	const handleStartMinuteChange = (e) => {
	 	setSelectedStartMinute(parseInt(e.target.value, 10));
	};

	const handleEndHourChange = (e) => {
		setSelectedEndHour(parseInt(e.target.value, 10));
	};
	
	const handleEndMinuteChange = (e) => {
		setSelectedEndMinute(parseInt(e.target.value, 10));
	};

	async function handleSubmitBookForm(e) {
		try {
			e.preventDefault();
			
			const startTick = (selectedStartHour * 6) + selectedStartMinute / 10;
			const endTick = (selectedEndHour * 6) + selectedEndMinute / 10;
			let response;

			if (endTick - startTick < 3) {
				console.error("BookForm: 30분보다 길어야 하지 않나요?");
				return ;
			}
			// const userID = cookie.get('userid');
			
			if (bookid) {
				response = await fetch(`http://54.180.96.16:4242/books?userId=158010&bookId=${bookid}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						// Token
					},
					body: JSON.stringify({
						"start": startTick,
						"end"  : endTick,
						"date" : date.date,
						"type" : consoleType,
					}),
				});
			} else {
				response = await fetch("http://54.180.96.16:4242/books?userId=158010", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						// Token
					},
					body: JSON.stringify({
						"start": startTick,
						"end"  : endTick,
						"date" : date.date,
						"type" : consoleType,
					}),
				});
			}
		
			if (response.status != 200) {
				console.error("BookForm: failed to post form data");
				return;
			}

			const newRecord = await response.json();
			const book = newRecord.pop();
			setBooks((oldbooks) => [...oldbooks, book]);
			console.log("BookForm: success to post form data", book, books);
			// navigate('/');
		} catch (error) {
			console.error(`BookForm: handleSubmitBookForm: ${error}`);
		}	
	}

	return (
		<form onSubmit={handleSubmitBookForm}>
			<p>시작 시간</p>
			<label>
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
			</label>
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
	
	// 테스트 코드 -> 모달로 변경
	useEffect(() => {
		console.log(bookid);
		if (params.get('type') === 'delete' && bookid.length !== 0) {
			const result = window.confirm("진짜 지울거임??");
			if (result && fetchBookRecordDelete(bookid, userid)) {
				// delete
				alert('성공적으로 삭제함.');
				navigate('/user');
				return ;
			}
		}
	}, []);

	return (
		<>
			{/* <TimePicker /> */}
			<TestForm bookid={bookid}/>
			{/* <div className="date-picker"> */}
				{/* <div className="scroll-container">
					<DaysInMonth today={date} callback={onClickDate} number={selectedDate} />
				</div> */}
				{/* <div className="selected-time"> */}
					{/* <span>{startTime}</span> */}
					{/* <p>시작 시간</p>
					<span>13:50</span>
					<span className="material-symbols-outlined">double_arrow</span>
					<p>종료 시간</p>
					<span>17:50</span> */}
				{/* </div>
				<div className="time-picker">
					<div className="time-picker-left"> */}
						{/* {Array.from({ length: 24 }, (_, index) => (
							<button 
								className={`time-button ${selectedTime === index ? 'time-button-selected' : ''}`} 
								key={index}
								onClick={() => onClickTime(index)}
							>
								{index}:00
							</button>
						))} */}
					{/* </div>
					<div className="time-picker-right"> */}
						{/* {Array.from({ length: 6 }, (_, index) => (
							<button 
								className={`time-button ${selectedHour === index ? 'time-button-selected' : ''}`} 
								key={index}
								onClick={() => onClickHour(index)}
							>
								{index * 10}
							</button>
						))} */}
					{/* </div>
				</div>
				<div className='submit-container'>
					<button className='time button'>예약 신청</button>
				</div>
			</div> */}
		</>
	)
}

export default BookForm;