import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useModal from '../hooks/useModal';
import useDate from '../hooks/useDate';
import useToken from '../hooks/useToken';

import { deleteModal } from '../store/modal';
import { deleteBookRecord } from '../api/book';
import { bookSelector } from '../store/book';
import { useEffect } from 'react';

export const Record = forwardRef(({ index, type, state, onClick, isDeletable = false, isSelected = false }, ref) => {
	const { openModal, closeModal } = useModal();
	const { tickToTime, getDuration, curTick, setUpdateTick } = useDate();
	const navigate = useNavigate();
	const accessToken = useToken().accessToken();
	const record = useRecoilValue(bookSelector({type, index}));

	// const [bgcolor, setBgcolor] = useState('');

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
			default :
				return '';
		}
		if (flag)
			return str.toLowerCase();
		return str;
	};

	const displayRecordDesciption = (state) => {
		if (state === 'testing') return process.env.REACT_APP_RESERVATION_TEST_MSG;
		if (state === 'block') return process.env.REACT_APP_RESERVATION_BLOCK_MSG;
		if (curTick > index)
			return ('-');
		return (isSelected ? 'SELECTED' : '슬롯 선택하기');
	};

	const slotSelectedStyles = {
		'xbox': 'slot-selected-xbox',
		'switch': 'slot-selected-switch',
		'ps5' : 'slot-selected-ps5',
	};

	// const calcurateTimeDifference = (slotTick, curTick) => {
	// 	const now = new Date();
	// 	if (slotTick !== curTick)
	// 		return false;
	// 	else
	// 		return Math.floor(now.getMinutes() / 10) % 3 / 3 * 100;
	// }

	useEffect(() => {
		setUpdateTick(true);
	}, [setUpdateTick]);
	
	// useEffect(() => {
	// 	const newTime = calcurateTimeDifference(index, curTick);
	// 	setBgcolor(`linear-gradient(rgb(198, 198, 198) ${newTime}%, white 10%)`);
	// }, [curTick, index]);

	return (
		<>
			{record === null && (
				<div
				ref={ref}
				value={index}
				id={index}
				onClick={(event) => {
					event.preventDefault();
					state === 'book' && onClick(event);
				}}
				class={`${isSelected ? slotSelectedStyles[typeToString(type, 1)] : 'slot-empty'} ${curTick > index ? 'slot-elapsed' : ''} w-full h-[4.5rem] flex flex-row items-center justify-around px-4 border-b border-[#C1C1C1]`}
				// style={{ backgroundImage: curTick === index && bgcolor}}
				>
					<div class="w-36 h-full flex items-center justify-center text-lg font-bold px-2 font-outfit">
						<p>{tickToTime(index)}~</p>
					</div>
					<div class="grow h-full flex items-center justify-center">
						<p>{displayRecordDesciption(state)}</p>
					</div>
				</div>
			)}
			{record !== null && (
				<div
				ref={ref}
				value={index}
				id={index}
				onClick={(event) => {
					event.preventDefault();
					isDeletable && curTick <= index && openModal(deleteModal(record, getDuration, deleteAction, type));
					isDeletable || navigate(`/user/${record.user_id}`);
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
		</>
	);
});

export default Record;