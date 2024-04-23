import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";

import { controllerType, deviceTypeState } from "../../store/report";
import { deviceListSelector } from "../../api/reportApi";
import { updateDeviceStatus_TEST } from '../../api/dashboardApi';
import { requestState } from '../../pages/dashboard';

export const UpdateDeviceForm = () => {
	const [request, setRequest] = useRecoilState(requestState);
	const [consoleType, setConsoleType] = useRecoilState(controllerType);
	const [deviceType, setDeviceType] = useRecoilState(deviceTypeState);
	
	const [deviceId, setDeviceId] = useState(0);
	const [deviceStatus, setDeviceStatus] = useState(2);
	const deviceList = useRecoilValue(deviceListSelector);

	const onClickSubmit = async () => {
		const response = await updateDeviceStatus_TEST(deviceId, deviceStatus);
		window.location.reload();
	}

	const controllerStatus = (status) => {
		if (status === 0) return '고장';
		if (status === 1) return '수리중';
		if (status === 2) return '정상';
	};

	useEffect(() => {
		deviceList.map((device) => {
			if (device.id === deviceId) {
				setDeviceStatus(device.status);
				return ;
			}
		})
	}, [deviceId, deviceList]);

	return (
		<>
			<div>
				<h3>선택된 기기 : {deviceId !== 0 ? deviceId : '없음'}</h3>
				<label>콘솔 타입</label>
				<select value={consoleType} onChange={(e) => {setConsoleType(e.target.value); setRequest('updateDevice')}}>
					<option value={0}>콘솔을 선택해주세요</option>
					<option value={1}>XBOX</option>
					<option value={2}>NINTENDO</option>
					<option value={3}>PS5</option>
				</select>
			</div>
			<div>
				<label>기기 타입</label>
				<select value={deviceType} onChange={(e) => setDeviceType(e.target.value)}>
					<option value={0}>기기를 선택해주세요</option>
					<option value={1}>본체</option>
					<option value={2}>컨트롤러</option>
					<option value={3}>기타</option>
				</select>
			</div>
			<div>
				{deviceList.length !== 0 && request === 'updateDevice' && (
					<div>
						<h3>기기 선택</h3>
						{deviceList.map((device, index) => (
							<div key={index} className="option" onClick={() => setDeviceId(device.id)}>
								<p>{device.name}</p>
								<p>{controllerStatus(device.status)}</p>
							</div>
						))}
					</div>
				)}
				{deviceId !== '' && (
					<>
						<h3>선택기기: {controllerStatus(deviceStatus)}</h3>
						<select onChange={(e) => setDeviceStatus(parseInt(e.target.value))} id="status" defaultValue={2}>
							<option value="2">정상</option>
							<option value="1">수리중</option>
							<option value="0">고장</option>
						</select>
						<button onClick={onClickSubmit}>수정하기</button>
					</>
				)}
			</div>
		</>
	)
};

export default UpdateDeviceForm;