import { atom } from "recoil";

export const modalState = atom({
	key: 'modalState',
	default: {
		type: 'normal',
		title: '', //string
		content: '', // string | JSX
		callback: null, //callback => void,
		consoleType: 0, //number | string
	},
});

export const actionState = atom({
	key: 'actionState',
	default: false,
});

export const notiState = atom({
	key: 'notiState',
	default: {
		type: 'notification',
		title: '', //string
		content: '', // string | JSX
	},
});

export const notiActionState = atom({
	key: 'notiActionState',
	default: false,
});

export const reserveTimeLimitError = () => {
	return ({
		title: '예약은 한번에 최대',
		content: `${process.env.REACT_APP_RESERVATION_TICK_RANGE / 2}시간까지만 가능합니다.`,
	});
};

export const reserveSubmitError = () => {
	return ({
		content: '예약 실패',
	});
};

export const reserveSubmitHistoryTick = () => {
	return ({
		content: '지나간 시간은 예약 할 수 없습니다.'
	});
};

export const loginModal = (callback) => {
	return ({
		type: 'login',
		content: '로그인이 필요합니다',
		callback: () => callback(),
	})
}

export const searchModal = () => {
	return ({
		type: 'search',
		title: '유저 검색',
		content: '',
		
	})
}

export const deleteModal = (record, getDuration, deleteAction, type) => {
	return ({
		title: getDuration(record.start_time, record.end_time),
		content: '취소하시겠습니까?',
		consoleType: type,
		callback: () => deleteAction(),
	})
};

export const reservationModal = (getSelectedTime, submitBookForm, type) => {
	return ({
		title: getSelectedTime(),
		content: '예약하시겠습니까?',
		consoleType: type,
		callback: (e) => submitBookForm(e),
	})
};

export const failedReservationModal = (closeModal) => {
	return ({
		title: '예약 실패',
		content: '예약할 시간을 선택해주세요',
		callback: () => closeModal(),
	})
};

export const testReservationOnlyModal = () => {
	return ({
		title: '~6/4 (화)까지 테스트 기간으로',
		content: 'PS5 만 예약 가능합니다',
	})
};

export const submitReservationSuccessModal = (console) => {
	return ({
		type: 'onboarding-console-guide',
		content: console,
	});
};