import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useModal from '../hooks/useModal';
import useDate from '../hooks/useDate';
import useToken from '../hooks/useToken';

import { deleteModal } from '../store/Modal';
import { deleteBookRecord } from '../api/bookApi';
import { bookSelector } from '../store/book';

export const Record = ({ index, type, state, onClick, isDeletable = false, isSelected = false }) => {
	const { openModal, closeModal } = useModal();
	const { tickToTime, getDuration, curTick } = useDate();
	const navigate = useNavigate();
	const accessToken = useToken().accessToken();
	const record = useRecoilValue(bookSelector({type, index}));

	const deleteAction = async () => {
		await deleteBookRecord(record._id, record.user_id, accessToken);
		closeModal();
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
			{state === 'user' && record !== null && (
				<span
				className="slot"
				value={index}
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
			{state === 'book' && record === null && (
				<span
					className={`slot ${isSelected ? (`selected-${typeToString(type, 1)}`) : ''}${curTick > index ? 'disabled' : ''}`}
					value={index}
					id={index}
					onClick={(event) => {
						event.preventDefault();
						onClick(event);
					}}
					type='empty'
					// onClick="showModal('reservationModal')"
				>
					<div className="slot-wrapper">
						<div className="slot-time">{tickToTime(index)} ~</div>
						<div className="slot-value">{isSelected ? 'SELECTED' : '-'}</div>
					</div>
				</span>
			)}
			{state === 'book' && record !== null && (
				<span
					className={`slot reserved ${isSelected ? 'selected' : ''}${curTick > index ? 'disabled' : ''}`}
					value={index}
					id={index}
					onClick={(event) => {
						event.preventDefault();
						(isDeletable && curTick <= index && openModal(deleteModal(record, getDuration, deleteAction)))
					}}
					type='reserve'
					// onClick="showModal('reservationModal')"
				>
					<div className="slot-wrapper">
						<div className="slot-time">{tickToTime(index)} ~</div>
						<div className="slot-value">{record.user[0].name}</div>
					</div>
				</span>
			)}
			{state === 'admin' && (
				<button
					className='time-button'
					value={index}
					onClick={(event) => {
						event.preventDefault();
						(isDeletable && openModal(deleteModal))
					}}
				>
					<div>{tickToTime(index)}</div>
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

export default Record;