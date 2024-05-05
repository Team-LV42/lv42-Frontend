import React, { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from 'recoil';

import useDate from '../hooks/useDate';
import useModal from '../hooks/useModal';
import useNotification from "../hooks/useNotification";
import useToken from '../hooks/useToken';
import {
	postBookRecord,
} from '../api/bookApi';
import { userState } from '../api/userApi';
import { consoleTypeState } from '../store/State';
import {
	loginModal,
	reservationModal,
	reserveTimeLimitError,
	reserveSubmitError,
	reserveSubmitHistoryTick,
	failedReservationModal,
	testReservationOnlyModal,
} from '../store/Modal';
import { booksState, selectState, initialBooksSelector } from "../store/book";

import Record from "./Record";
import BookSkeleton from "./loading/BookSkeleton";
import PageInfo from "./PageInfo";

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
		/* SSE 및 이벤트 핸들러 등록 */
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
				if (book && book._id === data._id) {
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

		/* 로딩시 tick위치로 이동 */
		setTimeout(() => {
			window.location.hash = `#${curTick}`;
		}, 100);

		return () => {
			eventSource.close();
			console.log('eventSource is closed');
		}
	}, []);

	useEffect(() => {
		if (books.init === false && initialBooks)
			setBooks(initialBooks);
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
				return 'switch';
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
		<PageInfo page={'index'} />
		{/* <!-- 내용 컨테이너 --> */}
		<Suspense fallback={<BookSkeleton />}>
		<div class="w-full grow flex flex-col items-center justify-start overflow-hidden z-10 rounded-t-3xl bg-white">
			{/* <!-- 탭 컨테이너 --> */}
			<div class="w-full min-h-24 top-0 flex flex-row items-center justify-around px-5">
				<div
				onClick={() => openNoti(testReservationOnlyModal())}
				// onClick={(e) => {e.preventDefault(); setConsoleType(1)}}
				class={`${consoleType === 1 ? 'tab-selected' : 'tab-not-selected'} grow h-10 flex items-center justify-center mx-2 rounded-3xl bg-color-xbox cursor-pointer pointerhover:hover:brightness-75`}
				>
					<p class="font-Bolwby-One text-white w-20 text-center">XBOX</p>
				</div>
				<div
				onClick={() => openNoti(testReservationOnlyModal())}
				// onClick={(e) => {e.preventDefault(); setConsoleType(2)}}
				class={`${consoleType === 2 ? 'tab-selected' : 'tab-not-selected'} grow h-10 flex items-center justify-center mx-2 rounded-3xl bg-color-switch cursor-pointer pointerhover:hover:brightness-75`}
				>
					<p class="font-Bolwby-One text-white w-20 text-center">Switch</p>
				</div>
				<div
				onClick={(e) => {e.preventDefault(); setConsoleType(3)}}
				class={`${consoleType === 3 ? 'tab-selected' : 'tab-not-selected'} grow h-10 flex items-center justify-center mx-2 rounded-3xl bg-color-ps5 cursor-pointer pointerhover:hover:brightness-75`}
				>
					<p class="font-Bolwby-One text-white w-20 text-center">PS5</p>
				</div>
			</div>
			{/* <!-- 슬롯 컨테이너 --> */}
			<div class={`relative w-full overflow-y-scroll bg-white`}>
				{/* <!-- 테스트기간 안내문(xbox, switch) --> */}
				<div class={`absolute w-full h-full ${consoleType === 3 ? 'hidden' : 'flex' } flex-col items-center justify-center top-0 left-0 pb-24 backdrop-blur-sm text-2xl font-bold z-50`}>
					<p>현재 테스트 기간으로</p>
					<p>PS5만 지원됩니다</p>
					<p>테스트 기간 : ~5/30</p>
				</div>
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
							isDeletable={(book !== null && userID === book.user_id) || user.admin}
							isSelected={checkSelects(index)}
							state='book'
						/>
					)})}
				{/* <!-- 여백용 빈공간 --> */}
				<div class="w-full h-28 bg-[#F4F6F8] flex flex-col items-center justify-center p-5">
					<svg class="w-14 h-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#C1C1C1">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
						</svg>
					<p class="text-xl font-extrabold text-[#C1C1C1]">END OF DAY</p>
				</div>
				{selects.s !== -1 && 
				<BookActionWrapper
					selects={selects}
					consoleType={getTypeID(consoleType)}
					action={onClickReservation}
					selectedTime={getSelectedTime()}
				/>
				}
			</div>
		</div>
		</Suspense>
	</>
	);
}

const BookConsoleTab = () => {

}

const BookActionWrapper = ({ selects, consoleType, action, selectedTime }) => {

	const consoleTypeStyles = {
		'xbox': 'booking-btn-active-xbox',
		'switch': 'booking-btn-active-switch',
		'ps5': 'booking-btn-active-ps5',
	}

	return (
		<div
		onClick={action}
		className={`${selects.s !== -1 && consoleTypeStyles[consoleType]} fixed w-[16rem] h-20 top-[calc(100%-8rem)] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center rounded-[2rem] active:shadow-selected cursor-pointer shadow-not-selected z-30`}
		>
			<p class="text-white text-sm font-Bolwby-One">{selectedTime}</p>
			<p class="text-white text-2xl font-semibold text-start">예약하기</p>
		</div>
	)
}

export default Book;