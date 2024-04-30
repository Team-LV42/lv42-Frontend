import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from 'recoil';

import useDate from '../hooks/useDate.jsx';
import useModal from '../hooks/useModal.jsx';
import useNotification from "../hooks/useNotification.jsx";
import useToken from '../hooks/useToken.jsx';
import {
	postBookRecord,
} from '../api/bookApi.jsx';
import { userState } from '../api/userApi.jsx';
import { consoleTypeState } from '../store/State.jsx';
import {
	reservationModal,
	loginModal,
	reserveTimeLimitError,
	reserveSubmitError,
	reserveSubmitHistoryTick,
	failedReservationModal,
} from '../store/Modal.jsx';
import { booksState, selectState, initialBooksSelector } from "../store/book";

import Record from "./Record.jsx";

const Book = () => {
	const [selects, setSelects] = useRecoilState(selectState);
	const [books, setBooks] = useRecoilState(booksState);
	const initialBooks = useRecoilValue(initialBooksSelector);
	const [consoleType, setConsoleType] = useRecoilState(consoleTypeState);
	const today = useDate();
	const user = useRecoilValue(userState);

	const { openModal, closeModal } = useModal();
	const { openNoti } = useNotification();
	const { date, tickToTime, curTick} = useDate();
	const accessToken = useToken().accessToken();

	const userID = user.id;
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			window.location.hash = `#${curTick}`;
		}, 100);
	}, []);

	useEffect(() => {
		if (books.init === false && initialBooks)
			setBooks(initialBooks);
		const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}/sse/subscribe?userId=${userID}`, {
			withCredentials: false,
		});

		eventSource.addEventListener('ADD', (event) => {
			const data = JSON.parse(event.data);
		
			setBooks((prevBooks) => {
			const updatedBooks = { ...prevBooks };
		
			updatedBooks[data.type] = prevBooks[data.type].map((book, index) => {
				if (index >= data.start_time && index <= data.end_time) {
					return data;
				} else {
					return book;
				}
			});
		
			return updatedBooks;
			});
		});
		
		eventSource.addEventListener('DEL', (event) => {
			const data = JSON.parse(event.data);
		
			setBooks((prevBooks) => {
			const updatedBooks = { ...prevBooks };
		
			updatedBooks[data.type] = prevBooks[data.type].map((book) => {
				if (book === null) {
				return null; // null인 경우 그대로 null 반환
				} else if (book.id === data.id) {
				return null; // 아이디가 일치하면 null로 변경 (삭제)
				} else {
				return book; // 그 외에는 기존 값 그대로 반환
				}
			});
		
			return updatedBooks;
			});
		});

		eventSource.onerror = (error) => {
			console.error( error);
		}

		return () => {
			eventSource.close();
			console.log('eventSource is closed');
		}
	}, [initialBooks, setBooks]);

	useEffect(() => {
		setSelects({s: -1, e: -1});
	}, [setSelects]);

	const onClickRecord = (time) => {
		const addSelect = (time) => {
			if (time < curTick) {
				openNoti(reserveSubmitHistoryTick());
				return ;
			}
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
		return books[consoleType].filter((book) => {
			if (!book)
				return false;
			else if (book.start_time <= time && time <= book.end_time)
				return true;
			else
				return false;
		});
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
		if (user.id === 0)
			openModal(loginModal(loginModalAction));
		else if (selects.s !== -1)
			openModal(reservationModal(getSelectedTime, submitBookForm));
		else
			openModal(failedReservationModal(closeModal));
	}

	const loginModalAction = () => {
		window.location.href = process.env.REACT_APP_LOGIN_URL;
	}

	const submitBookForm = async (e) => {
		try {
			e.preventDefault();
			if (selects.s !== -1 && selects.e !== -1 && Math.abs(selects.e - selects.s) >= 4) {
				openNoti(reserveTimeLimitError());
				closeModal();
				setSelects({s: -1, e: -1});
				return ;
			}

			const data = setData(selects);
			const response = await postBookRecord(userID, data, accessToken);

			if (response.status === 400) {
				openNoti(reserveSubmitError());
			}
			setSelects({s: -1, e: -1});
			closeModal();
			//삭제하거나 추가한 내용들 새로고침 없이 갱신하는 방법으로 유지하기
			if (response.status === 200)
				window.location.reload();
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
					{books[consoleType].map((book, index) => {
						return (
							<Record
								key={index}
								index={index}
								type={consoleType}
								onClick={(e) => {
									e.preventDefault();
									onClickRecord(index);
								}}
								// isDeletable={(book !== null && userID === book[0].user_id) || user.admin}
								isSelected={checkSelects(index)}
								state='book'
							/>
						)
					}
			)}
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

const BookConsoleTab = () => {

}

const BookActionWrapper = ({ selects }) => {
	return (
		<>
		</>
	)
}

export default Book;