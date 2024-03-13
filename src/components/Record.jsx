// import { Link } from 'react-router-dom';

import { useModal } from '../hooks/useModal.jsx';
import { fetchBookRecordDelete } from '../api/bookApi.jsx';

export default function Record({ record, type, time, callback, action = false }) {
	const { openModal, closeModal } = useModal();

	const deleteAction = () => {
		fetchBookRecordDelete(record._id, record.user_id);
		closeModal();
	};
	
	const deleteModal = {
		title: '예약 삭제',
		content: '진짜 삭제하시겠습니까?',
		callback: () => deleteAction(),
	};

	const typeToString = (type) => {
		switch (type) {
			case 1:
				return ('Xbox');
			case 2:
				return ('Switch');
			case 3:
				return ('PS5');
		}
	};

	console.log(record);

	return (
		<li>
			{type === 'user' && (
				<a className='record'>
					<div>{time}</div>
					<div>
						<h1>{record.user[0].name}</h1>
						<p>{typeToString(record.type)}</p>
						<span>{record.date}</span>
					</div>
					{action && (
						<div>
							<button onClick={() => openModal(deleteModal)}>삭제</button>
							{/* <button><Link to={`/book?type=modify&bookid=${record._id}`}>수정</Link></button> */}
							{/* <button><Link to={`/book?type=delete&bookid=${record._id}`}>삭제</Link></button> */}
						</div>
					)}
				</a>
			)}
			{type === 'book' && !record && (
				<a className='record' value={time} onClick={(event) => callback(event)}>
					<div>{time}</div>
					<div>
						대충  예약안됌
					</div>
				</a>
				)}
			{type === 'book' && record && (
				<a className='record' value={time} onClick={(event) => callback(event)}>
					<div>{time}</div>
					<div>
						<h1>{record.user[0].name}</h1>
						<p>{typeToString(record.type)}</p>
						<span>{record.date}</span>	
					</div>
				</a>
			)}
		</li>
	);
};