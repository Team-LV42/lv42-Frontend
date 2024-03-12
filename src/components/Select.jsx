const Select = ({ type, value = 0, onchange}) => {
	if (type === 'hour') {
		return (
			<select name="hour" value={value} onChange={(event) => onchange(event)}>
				{Array.from({ length: 24 }, (_, i) => (
					<option key={i} value={i}>
						{(i < 10) ? '0' + i : i}시
					</option>
				))}
			</select>
		)
	} else if (type === 'minute') {
		return (
			<select name="minute" value={value} onChange={(event) => onchange(event)}>
				{Array.from({ length: 6 }, (_, i) => (
					<option key={i * 10} value={i * 10}>
						{(i * 10) < 10 ? '00' : i * 10}분
					</option>
				))}
			</select>
		)
	}
}

export default Select;