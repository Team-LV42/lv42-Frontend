import { atom } from "recoil";

export const modalState = atom({
	key: 'modalState',
	default: {
		type: 'normal',
		title: '', //string
		content: '', // string | JSX
		callback: null, //callback => void,
	},
});

export const actionState = atom({
	key: 'actionState',
	default: false,
});

export const deleteModal = (record, getDuration, deleteAction) => {
	return ({
		title: getDuration(record.start_time, record.end_time),
		content: '취소하시겠습니까?',
		callback: () => deleteAction(),
	})
};

export const reservationModal = (getSelectedTime, submitBookForm) => {
	return ({
		title: getSelectedTime(),
		content: '예약하시겠습니까?',
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