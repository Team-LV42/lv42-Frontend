import React, { useEffect, useState } from 'react';
import {
	useRecoilState,
	useSetRecoilState,
	useRecoilValue,
} from 'recoil';

import {
	controllerType,
	deviceIDState,
	btnListState,
	malfTypeState,
	btnMalfState,
	deviceTypeState,
	pageState,
	deviceTotalSelectedMalfList,
} from '../store/report';

import {
	deviceListSelector,
	deviceButtonListSelector,
	setSelected
} from '../api/reportApi';

const DeviceHeader = ({ page }) => {
	const consoleType = useRecoilValue(controllerType);
	const deviceType = useRecoilValue(deviceTypeState);

	const showDeviceAndConsoleType = () => {
		let console, device;
		if (consoleType === 1) console = 'XBOX';
		if (consoleType === 2) console = 'NINTENDO';
		if (consoleType === 3) console = 'PS5';

		if (deviceType === 1) device = '본체';
		if (deviceType === 2) device = '컨트롤러';
		if (deviceType === 3) device = '기타';

		return (`${console} / ${device}`);
	}

	return (
		<>
			<img alt="logo" />
			{page === 'main'
			? (<p>기기 고장 신고</p>)
			: (showDeviceAndConsoleType())}
		</>
	)
}

const DeviceIssueReporting = () => {
	const page = useRecoilValue(pageState);

	return (
		<>
			<DeviceHeader page={page} />
			{page === 'main' && <MainIssueReporting />}
			{page === 'controller' && <ControllerIssueReporting />}
			{(page === 'etc' || page === 'console') && <EtcIssueReporting />}
		</>
	)
};

const MainIssueReporting = () => {
	const [consoleType, setConsoleType] = useRecoilState(controllerType);
	const [deviceType, setDeviceType] = useRecoilState(deviceTypeState);
	const deviceList = useRecoilValue(deviceListSelector);
	const [deviceID, setDeviceID] = useRecoilState(deviceIDState);
	const setPage = useSetRecoilState(pageState);
	const setSelect = useSetRecoilState(setSelected);	

	const onClickNext = () => {
		if (deviceType === 0) return ;

		if (deviceType === 1)
			setPage('console');
		else if (deviceType === 2)
			setPage('controller');
		else if (deviceType === 3)
			setPage('etc');

		setSelect({ name: 'console_type', value: consoleType });
		setSelect({ name: 'device', value: deviceID });
	};

	const controllerStatus = (status) => {
		if (status === 0) return '고장';
		if (status === 1) return '수리중';
		if (status === 2) return '정상';
	};

	return (
		<div className='content' id='main-content'>
			<h3>게임기 선택</h3>
			<div className='tabs'>
				<span className='tab bg-black' onClick={() => setConsoleType(1)}>xbox</span>
				<span className='tab bg-black' onClick={() => setConsoleType(2)}>nintendo</span>
				<span className='tab bg-black' onClick={() => setConsoleType(3)}>ps5</span>
			</div>
			{consoleType !== 0 && (
			<>
				<h3>기기 종류 선택</h3>
				<div className="options">
					<span className='option' onClick={() => setDeviceType(1)}>본체</span>
					<span className='option' onClick={() => setDeviceType(2)}>컨트롤러</span>
					<span className='option' onClick={() => setDeviceType(3)}>기타</span>
				</div>
			</>
			)}
			{deviceList.length !== 0 && (
				<div>
					<h3>컨트롤러 선택</h3>
					{deviceList.map((device, index) => (
							<div className='option' key={index} onClick={() => device.status === 2 && setDeviceID(device.id)}>
								<p>{device.name}</p>
								<p>{controllerStatus(device.status)}</p>
							</div>
					))}
				</div>
			)}
			{deviceID !== '' && (
				<div onClick={() => onClickNext()}>
					<span>Next</span>
					<span>right-arrow</span>
				</div>
			)}
		</div>
	)
}

const AddableItemList = () => {
	const [select, setSelect] = useRecoilState(setSelected);

	const btnList = useRecoilValue(btnListState);
	const btnMalfTypeList = useRecoilValue(btnMalfState);

	const [btnId, setBtnId] = useState(0);
	const [btnMalf, setBtnMalf] = useState('');

	const [selectBtnState, setSelectBtnState] = useState(false);
	const [selectMalfTypeState, setSelectMalfTypeState] = useState(false);

	const onClickSelectBtn = () => {
		setSelectBtnState(!selectBtnState);
	}

	const onClickSelectType = () => {
		setSelectMalfTypeState(!selectMalfTypeState);
	}

	useEffect(() => {
		if (btnId !== 0 && btnMalf !== '') {
			setSelect({
				name: 'controller_malf_btn_list',
				value:{
					'controller_btn_id': btnId,
					'controller_btn_malf_type': btnMalf
				}});
			setBtnId(0);
			setBtnMalf('');
		}
	}, [btnId, btnMalf, setSelect]);

	return (
		<>
			<div className='options'>
				{select.controller_malf_btn_list.length !== 0 && (
					<>
						{select.controller_malf_btn_list.map((btn, index) => (
							<div key={index}>
								<div className='option'>
									<p>{btn.controller_btn_id}</p>
								</div>
								<div className='option'>
									<p>{btn.controller_btn_malf_type}</p>
								</div>
							</div>
						))}
					</>
				)}
				{btnId && (
					<>
					<div>
						<div className='option'>
							<p>{btnId}</p>
						</div>
						<div className='option'>
							<p>{btnMalf}</p>
						</div>
					</div>	
					</>
				)}
				<div className='option' onClick={onClickSelectBtn}>Select Button</div>
				<div className='option' onClick={onClickSelectType}>Select Button</div>
				<div className={`option ${selectBtnState || selectMalfTypeState ? '' : 'none'}`} >
					{selectBtnState && btnList.map((btn, index) => (
						<>
							<div key={btn.id} className='option' onClick={() => {
								setBtnId(btn.id)
								onClickSelectBtn();
							}}>
								<p>{btn.id}</p>
							</div>
						</>
					))}
					{selectMalfTypeState && btnMalfTypeList.map((malf, index) => (
						<>
							<div key={malf.id} className='option long' onClick={() => {
								setBtnMalf(malf.name);
								onClickSelectType();
							}}>
								<p>{malf.description}</p>
							</div>
						</>
					))}
				</div>
			</div>
		</>
	)
}

const ControllerIssueReporting = () => {
	const deviceBtnList = useRecoilValue(deviceButtonListSelector);

	const [malfTypeList, setMalfTypeList] = useRecoilState(malfTypeState);
	const setBtnList = useSetRecoilState(btnListState);
	const setBtnMalfTypeList = useSetRecoilState(btnMalfState);
	
	const setSelect = useSetRecoilState(setSelected);

	// test
	const selected = useRecoilValue(deviceTotalSelectedMalfList);

	useEffect(() => {
		if (deviceBtnList.length !== 0) {
			console.log('devicebtnlist:', deviceBtnList);
			setMalfTypeList(deviceBtnList.controller_malf_type_list);
			setBtnList(deviceBtnList.controller_btn_list);
			setBtnMalfTypeList(deviceBtnList.controller_btn_malf_type_list);
		}
	}, [deviceBtnList, setMalfTypeList, setBtnList, setBtnMalfTypeList]);

	useEffect(() => {
		console.log(selected);
	}, [selected]);

	const postReport = async () => {
		// const selected = {
		// 	'console_type': 'ps5',
		// 	'device': 'pc2',
		// 	'malf_type': 'button',
		// 	'controller_btn_malf_list': [{"btn_type":1,"btn_malf_type":"unpress"},{"btn_type":2,"btn_malf_type":"undefined_movement"}],
		// 	'etc_description': 'good',
		// };

		const base64url = btoa(JSON.stringify(selected));
		console.log(JSON.parse(atob(base64url)));
		const response = await fetch(`${process.env.REACT_APP_API_URL}/reports?data=${base64url}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await response.json();
	};

	return (
		<>
			{malfTypeList.length !== 0 && (
				<>
					<h3>상태 선택</h3>
					<div className='options'>
						{malfTypeList.map((malf, index) => {
							return (
							<div key={index} className='option' onClick={() => setSelect({ name: 'controller_malf_type', value: malf.name })}>
								<p>{malf.description}</p>
							</div>
							);
						})}
					</div>
				</>
			)}
			{selected.controller_malf_type === 'button' && (
				<>
					<h3>버튼 선택</h3>
					<img alt='컨트롤러' />
					<div className='options'>
						<AddableItemList />
					</div>
				</>
			)}
			<div onClick={postReport}>
				submit
			</div>
		</>
	)
};

const EtcIssueReporting = () => {

};

export default DeviceIssueReporting;