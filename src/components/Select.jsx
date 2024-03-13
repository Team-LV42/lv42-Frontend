const Select = ({ type, value = 0, onchange}) => {
	

	return (
		<select name="reservation" value={value} onChange={(event) => onchange(event)}>
			{Array.from({ length: 48 }, (_, i) => (
				<option key={i} value={i}>
					{(i < 10) ? '0' + i : i}시
				</option>
			))}
		</select>
	)
}

export default Select;