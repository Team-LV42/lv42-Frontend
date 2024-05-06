import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useModal from '../hooks/useModal';
import useDate from '../hooks/useDate';
import useToken from '../hooks/useToken';

import { deleteModal } from '../store/Modal';
import { deleteBookRecord } from '../api/bookApi';
import { bookSelector } from '../store/book';
import { useEffect } from 'react';

export const Record = ({ index, type, state, onClick, isDeletable = false, isSelected = false }) => {
	const { openModal, closeModal } = useModal();
	const { tickToTime, getDuration, curTick, setUpdateTick } = useDate();
	const navigate = useNavigate();
	const accessToken = useToken().accessToken();
	const record = useRecoilValue(bookSelector({type, index}));

	const [bgcolor, setBgcolor] = useState('');

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
				str = 'switch';
				break ;
			case 3:
				str = 'PS5';
				break ;
		}
		if (flag)
			return str.toLowerCase();
		return str;
	};

	const displayRecordDesciption = () => {
		if (curTick > index)
			return ('-');
		return (isSelected ? 'SELECTED' : '슬롯 선택하기');
	};

	const slotSelectedStyles = {
		'xbox': 'slot-selected-xbox',
		'switch': 'slot-selected-switch',
		'ps5' : 'slot-selected-ps5',
	};

	const calcurateTimeDifference = (slotTick, curTick) => {
		const now = new Date();
		if (slotTick !== curTick)
			return false;
		else
			return Math.floor(now.getMinutes() / 10) % 3 / 3 * 100;
	}

	useEffect(() => {
		setUpdateTick(true);
	}, []);
	
	useEffect(() => {
		const newTime = calcurateTimeDifference(index, curTick);
		setBgcolor(`linear-gradient(rgb(198, 198, 198) ${newTime}%, white 10%)`);
	}, [curTick]);

	return (
		<>
			{state === 'book' && record === null && (
				<div
				value={index}
				id={index}
				onClick={(event) => {
					event.preventDefault();
					onClick(event);
				}}
				class={`${isSelected ? slotSelectedStyles[typeToString(type, 1)] : 'slot-empty'} ${curTick > index ? 'slot-elapsed' : ''} w-full h-[4.5rem] flex flex-row items-center justify-around px-4 border-b border-[#C1C1C1]`}
				// style={{ backgroundImage: curTick === index && bgcolor}}
				>
					<div class="w-36 h-full flex items-center justify-center text-lg font-bold px-2 font-outfit">
						<p>{tickToTime(index)}~</p>
					</div>
					<div class="grow h-full flex items-center justify-center">
						<p>{displayRecordDesciption()}</p>
					</div>
				</div>
			)}
			{state === 'book' && record !== null && (
				<div
				value={index}
				id={index}
				onClick={(event) => {
					event.preventDefault();
					{isDeletable && curTick <= index && openModal(deleteModal(record, getDuration, deleteAction))}
					{isDeletable || navigate(`/user/${record.user_id}`)}
				}}
				class={` ${curTick > index ? 'slot-elapsed' : ''} w-full h-[4.5rem] flex flex-row items-center justify-around px-4 border-b border-[#C1C1C1] slot-full`}
				// style={{ backgroundImage: curTick === index && bgcolor }}
				>
					<div class="w-36 h-full flex items-center justify-center text-lg font-bold px-2 font-outfit">
						<p>{tickToTime(index)}~</p>
					</div>
					<div class="grow h-full flex items-center justify-center">
						<p>{record.user[0].name}</p>
					</div>
				</div>
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