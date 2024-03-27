import { useEffect, Suspense } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { atom, useRecoilValue, useRecoilState, useRecoilCallback } from 'recoil';

import useDate from '../hooks/useDate.jsx';
import useModal from '../hooks/useModal.jsx';
import {
	booksState,
	fetchBookRecordsListQuery,
	patchBookRecord,
	postBookRecord
} from '../api/bookApi.jsx';
import { userState } from '../api/userApi';
import { consoleTypeState } from '../store/State.jsx';
import { reservationModal, failedReservationModal } from '../store/Modal';

import Record from './Record';

export const selectState = atom({
	key: 'selectState',
	default: {
		s: -1,
		e: -1,
	},
});

const Book = ({bookid}) => {
	const [selects, setSelects] = useRecoilState(selectState);
	const [books, setBooks] = useRecoilState(booksState);
	const [consoleType, setConsoleType] = useRecoilState(consoleTypeState);
	const user = useRecoilValue(userState);

	const { openModal, closeModal } = useModal();
	const { date, tickToTime, timeToTick } = useDate();

	const userID = user.id;
	const bookList = useRecoilValue(fetchBookRecordsListQuery);
	const navigate = useNavigate();

	const updateAddBook = useRecoilCallback(({ set }) => (newRecord) => {
		set(booksState, (prevBooks) => [...prevBooks, newRecord]);
	}, [booksState]);

	const updateDelBook = useRecoilCallback(({ set }) => (newRecord) => {
		set(booksState, (prevBooks) => prevBooks.filter((book) => book.id !== newRecord._id));
	}, [booksState]);

	useEffect(() => {
		const eventSource = new EventSource(`http://54.180.96.16:4242/sse/subscribe?userId=${userID}`, {
			withCredentials: false,
		});

		eventSource.addEventListener('ADD', (event) => {
			const newRecord = JSON.parse(event.data);
			const prevType = consoleType;
			if (!newRecord) return ;

			if (consoleType !== newRecord.type) {
				console.log(newRecord.type);
				setConsoleType(newRecord.type);
			}
			
			// updateAddBook(newRecord);
			setBooks(prevBooks => [...prevBooks, newRecord]);
			setConsoleType(prevType);
		});

		eventSource.addEventListener('DEL', (event) => {
			const newRecord = JSON.parse(event.data);
			const prevType = consoleType;
			if (!newRecord) return ;
			
			if (consoleType !== newRecord.type)
				setConsoleType(newRecord.type);
			// updateDelBook(newRecord);
			setBooks(prevBooks => prevBooks.filter((book) => book.id !== newRecord._id));
			setConsoleType(prevType);
		});

		eventSource.onerror = (error) => {
			console.error( error);
		}

		return () => {
			eventSource.close();
			console.log('eventSource is closed');
		}
	}, [userID]);

	useEffect(() => {
		console.log('updated books', books);
	}, [books])

	useEffect(() => {
		if (books.length === 0)
			setBooks(bookList);
	}, [bookList, setBooks]);

	// 다른타입으로 변경된 경우 해당 타입의 데이터로 갈아끼움
	useEffect(() => {
		setBooks(bookList);
		// updateBook(bookList);
		setSelects({s: -1, e: -1});
	}, [setBooks, setSelects, consoleType, setConsoleType]);

	//date 훅에 넣기?
	
	const onClickRecord = (time) => {
		const addSelect = (time) => {
			if (selects.s === -1) { // 비어있을 때
				setSelects({ s: time, e: -1 });
			} else if (selects.e === -1) { // 첫 번째는 값이 있고 두 번째가 비어있을 때
				if (selects.s === time) { // 첫 번째의 값을 제거한 상황
					setSelects({ s: -1, e: -1 });
				} else { // 두 번째의 값을 선택한 상황
					setSelects({ s: selects.s, e: time });
				}
			} else if (selects.s !== -1 && selects.e !== -1) { // 첫번째와 두번째 모두 값이 있을 때
				if (selects.s === time) // 첫 번째를 제거한 상황
					setSelects({ s: selects.e, e: -1});
				else if (selects.e === time)	// 두 번째를 제거한 상황
					setSelects({ s: selects.s, e: -1 });
				else // 전혀 다른곳을 누른 상황
					setSelects({ s: -1, e: -1 });
			} else { //두 번째만 값이 있을 때
				setSelects({ s: time, e: -1 });
			}
		};

		if (selects.s !== -1 && time !== selects.s) {
			let start = selects.s;
			let end = time;
			if (selects.s > time) {
				start = time;
				end = selects.s;
			}
			for (let i = start; i <= end; i++) {
				if (searchBooks(i).length !== 0) {
					setSelects({ s: -1, e: -1});
					return;
				}
			}
		}
		addSelect(time);
	};

	const checkSelects = (time) => {
		if (selects.s === time || selects.e === time)
			return true;
		if (selects.s <= time && time <= selects.e)
			return true;
		if (selects.e !== -1 && selects.e <= time && time <= selects.s)
			return true;
		return false;
	}

	const searchBooks = (time) => {
		return books.filter((book) => (book.start_time <= time && time <= book.end_time));
	}

	const setData = (selects) => {
		if (selects.s === -1) {
			console.error('no selected time');
			return ;
		}
		if (selects.e === -1) {
			return ({
				start: selects.s,
				end: selects.s,
				date: date,
				consoleType: consoleType,
			})
		}
		return ({
			start: (selects.s > selects.e) ? selects.e : selects.s,
			end: (selects.s > selects.e) ? selects.s : selects.e,
			date: date,
			consoleType: consoleType,
		});
	};

	const getTypeID = (consoleType) => {
		switch (consoleType) {
			case 1:
				return 'xbox';
			case 2:
				return 'nintendo';
			case 3:
				return 'ps5';
			default:
				return '';
		}; 
	}

	const getSelectedTime = () => {
		if (selects.s === -1)
			return '~';
		if (selects.e === -1) {
			return `${tickToTime(selects.s)}~${tickToTime(selects.s + 1)}`;
		}
		const start = (selects.s > selects.e) ? selects.e : selects.s;;
		const end = (selects.s > selects.e) ? selects.s : selects.e;
		return `${tickToTime(start)}~${tickToTime(end + 1)}`;
	};

	const onClickReservation = () => {
		if (selects.s !== -1)
			openModal(reservationModal(getSelectedTime, submitBookForm));
		else
			openModal(failedReservationModal(closeModal));
	}

	async function submitBookForm(e) {
		try {
			e.preventDefault();
			if (selects.s !== -1 && selects.e !== -1 && selects.e - selects.s > 4) {
				console.log('2시간 초과 예약신청했음') //notification;
				setSelects({s: -1, e: -1});
				closeModal();
				return ;
			}

			let response;
			const data = setData(selects);

			bookid = false;
			if (bookid) {
				response = await patchBookRecord(userID, bookid, data);
			} else {
				response = await postBookRecord(userID, data);
			}
			closeModal();

			//삭제하거나 추가한 내용들 새로고침 없이 갱신하는 방법으로 유지하기
			navigate(0);
		} catch (error) {
			console.error(`BookForm: handleSubmitBookForm: ${error}`);
			closeModal();
		}
	}

	return (
		<>
		<div className='content' id='main-content'>
			<div className='tabs'>
				<span className={`tab${consoleType === 1 ? '-active' : ''}`} id="xbox-tab"   onClick={(e) => {e.preventDefault(); setConsoleType(1)}}><p>Xbox</p></span>
				<span className={`tab${consoleType === 2 ? '-active' : ''}`} id="nintendo-tab"  onClick={(e) => {e.preventDefault(); setConsoleType(2)}}><p>Switch</p></span>
				<span className={`tab${consoleType === 3 ? '-active' : ''}`} id="ps5-tab"  onClick={(e) => {e.preventDefault(); setConsoleType(3)}}><p>PS5</p></span>
			</div>
			<div className="slot-list slot-list-active"  id={`${getTypeID(consoleType)}-slot-list`}>
				{Array.from({length: 48}, (_, i) => {
					const book = searchBooks(i);
					return (
						<Record
							key={i}
							record={book.length !== 0 ? book[0] : ''}
							time={i}
							onClick={(e) => {
								e.preventDefault();
								onClickRecord(i);
							}}
							isDeletable={(book.length !== 0 && userID === book[0].user_id) || user.admin}
							isSelected={checkSelects(i)}
							type='book'
						/>
					)})}
			</div>
		</div>
		<div className={`sub-content-wrapper ${selects.e !== -1 ? `finished-${getTypeID(consoleType)}` : ''}`} id="sub" onClick={() => onClickReservation()}>
			<a href="#" onClick={(e) => e.preventDefault()}>
				<div className={`sub-content ${selects.e !== -1 ? `finished-${getTypeID(consoleType)}` : ''}`}>
					<div className="section">
						<div className="time-wrap">
							<p>{getSelectedTime()}</p>
						</div>
					</div>
					<div className="section">
						<div className="comment-wrap">
							<p>{selects.s === -1 ? '원하는 시간대 슬롯을 선택하세요' : '예약하기'}</p>
						</div>
					</div>
				</div>
			</a>
		</div>
	</>
	);
}

// dummyComponent.jsx
const DummyForm = () => {
	return (
		<>
		<div className='content' id='main-content'>
			<div className='tabs'>
				<span className="tab" id="xbox-tab"><p>XboX</p></span>
				<span className="tab" id="nintendo-tab"><p>Nintendo</p></span>
				<span className="tab" id="ps5-tab"><p>PS5</p></span>
			</div>
			<div className="slot-list slot-list-active" >
				{Array.from({length: 48}, (_, i) => {
					return (
						<Record
							key={i}
							record={''}
							time={i}
							type='book'
						/>
					)})}
			</div>
		</div>
		<div className="sub-content-wrapper"id="sub">
			<a href="#">
				<div className="sub-content">
					<div className="section">
						<div className="time-wrap">
							<p></p>
						</div>
					</div>
					<div className="section">
						<div className="comment-wrap">
							<p>원하는 시간대 슬롯을 선택하세요</p>
						</div>
					</div>
				</div>
			</a>
		</div>
	</>
	)
}

const BookForm = () => {
	const [params, setParams] = useSearchParams();
	const bookid = (params.get('type')) ? params.get('bookid') : '';

	return (
		<>
			<Suspense fallback={<DummyForm />}>
				<Book bookid={bookid}/>
			</Suspense>
		</>
	)
}

export default BookForm;