import React, { useState } from 'react';
import { postNewDevice } from '../../api/dashboard';

export const AddDeviceForm = () => {
	const [formStatus, setFormStatus] = useState('');

	const onSubmitForm = async () => {
		const console_id = document.getElementById('console_id').value;
		const device_type = document.getElementById('device_type').value;
		const id = document.getElementById('id').value;
		const name = document.getElementById('name').value;
		const status = document.getElementById('status').value;

		const response = await postNewDevice(id, name, console_id, device_type, status);
		setFormStatus(response ? '성공' : '실패');
	}

	return (
		<>
			<h3>!!!기기 중복 주의!!!</h3>
			{formStatus !== '' && <p>response_result: {formStatus}</p>}
			<form onSubmit={onSubmitForm}>
				<select name="콘솔" id="console_id">
					<option value="1">XBox</option>
					<option value="2">Nintendo</option>
					<option value="3">PS5</option>
				</select>
				<select name="기기 종류" id="device_type">
					<option value="1">본체</option>
					<option value="2">컨트롤러</option>
					<option value="3">기타</option>
				</select>
				<input name="기기 ID" id="id" type="text" placeholder="기기 ID"></input>
				<input name="기기 이름"id="name"  type="text" placeholder="기기 이름"></input>
				<select name="기기 상태" id="status">
					<option value="2">정상</option>
					<option value="1">수리중</option>
					<option value="0">고장</option>
				</select>
				<div>
					<button type="submit" className='option'>추가</button>
				</div>
			</form>
		</>
	)
}

export default AddDeviceForm;