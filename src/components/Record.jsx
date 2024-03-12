import { Link } from 'react-router-dom';

export default function Record({ record, action }) {
	const convertTickToTime = (tick) => {
		const hour = Math.floor(tick / 6);
		const minute = Math.floor(tick % 6);
		return (hour < 10 ? '0' + hour : hour) + ':' + ((minute * 10) < 10 ? '0' + (minute * 10) : minute * 10);
	}

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

	return (
		<li>
			<a className='record'>
				<div>
					<h1>{record.user[0].name}</h1>
					<p>{typeToString(record.type)}</p>
					<p>{convertTickToTime(record.start_time)} - {convertTickToTime(record.end_time)}</p>
					<span>{record.date}</span>
				</div>
				{action && (
				<div>
					<button><Link to={`/book?type=modify&bookid=${record._id}`}>수정</Link></button>
					<button><Link to={`/book?type=delete&bookid=${record._id}`}>삭제</Link></button>
				</div>
				)}
			</a>
		</li>
	);
};