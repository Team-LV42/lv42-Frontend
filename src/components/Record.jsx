import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { consoleTypeState } from '../store/State.jsx';
import { useModal } from '../hooks/useModal.jsx';
import { deleteBookRecord } from '../api/bookApi.jsx';

export default function Record({ record, type, time, onClick, isDeletable = false, isSelected = false }) {
	const { openModal, closeModal } = useModal();
	const consoleType = useRecoilValue(consoleTypeState);
	const navigate = useNavigate()

	const getDuration = (start, end) => {
		const hour = (end - start) / 2;
		return (`${hour}h`);
	};

	//date
	const timeToTick = (tick) => {
		if (tick < 0)
			return '';
		const hour = Math.floor(tick / 2);
		const minute = Math.floor(tick % 2 * 30);
		return (hour < 10 ? '0' + hour : hour) + ':' + ((minute) < 10 ? '00': minute);
	};

	const deleteAction = async () => {
		await deleteBookRecord(record._id, record.user_id);
		closeModal();
		navigate(0);
	};
	
	const deleteModal = {
		title: getDuration(record.start_time, record.end_time),
		content: '취소하시겠습니까?',
		callback: () => deleteAction(),
	};

	const typeToString = (type, flag) => {
		let str;
		switch (type) {
			case 1:
				str = 'Xbox';
				break ;
			case 2:
				str = 'Nintendo';
				break ;
			case 3:
				str = 'PS5';
				break ;
			default :
				str = '';
				break ;
		}
		if (flag)
			return str.toLowerCase();
		return str;
	};
	
	return (
		<>
			{type === 'user' && record.length !== 0 && (
				<span
				className="slot"
				value={time}
				onClick={(event) => {
					event.preventDefault();
					(isDeletable && openModal(deleteModal));
				}}
				// onClick="showModal('reservationModal')"
			>
				<div className="slot-time"><p>{record.date}</p><p>{getDuration(record.start_time, record.end_time)}</p></div>
				<div className={`slot-value content-type-${record.type}`}><p>{typeToString(record.type, 0)}</p></div>
			</span>
			)}
			{type === 'book' && record.length === 0 && (
				<span
					className={`slot ${isSelected ? (`selected-${typeToString(consoleType, 1)}`) : ''}`}
					value={time}
					onClick={(event) => {
						event.preventDefault();
						onClick(event);
					}}
					type='empty'
					// onClick="showModal('reservationModal')"
				>
					<div className="slot-wrapper">
						<div className="slot-time">{timeToTick(time)} ~</div>
						<div className="slot-value">{isSelected ? 'SELECTED' : '-'}</div>
					</div>
				</span>
			)}
			{type === 'book' && record.length !== 0 && (
				<span
					className={`slot reserved ${isSelected ? 'selected' : ''}`}
					value={time}
					onClick={(event) => {
						event.preventDefault();
						(isDeletable && openModal(deleteModal))
					}}
					type='reserve'
					// onClick="showModal('reservationModal')"
				>
					<div className="slot-wrapper">
						<div className="slot-time">{timeToTick(time)} ~</div>
						<div className="slot-value">{record.user[0].name}</div>
					</div>
				</span>
			)}
			{type === 'admin' && (
				<button
					className='time-button'
					value={time}
					onClick={(event) => {
						event.preventDefault();
						(isDeletable && openModal(deleteModal))
					}}
				>
					<div>{timeToTick(time)}</div>
					<div>{getDuration(record.start_time, record.end_time)}</div>
					<div>
						<h1>{record.user[0].name}</h1>
						<p>{typeToString(record.type, 0)}</p>
						<span>{record.date}</span>	
					</div>
				</button>
			)}
		</>
	);
};