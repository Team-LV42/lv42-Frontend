import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	atom,
	useRecoilState,
	useSetRecoilState,
	useRecoilValue,
} from 'recoil';

import ToggleList from '../components/ToggleList';
import AddDeviceForm from '../components/dashboard/AddDevice';
import UpdateDeviceForm from '../components/dashboard/UpdateDevice';
import { toggleState } from '../store/toggle';
import { controllerType, deviceTypeState, deviceIDState } from '../store/report';
import '../styles/dashboard.css';
import { deviceListSelector } from '../api/report';
import { getReportsList, deleteDevice, deleteReport } from '../api/dashboard';

import '../styles/dashboard.css';

const TestToggle = {
	0: {
		title: '[TEST] 테스트 기기 추가',
		content: <AddDeviceForm />, 
		isVisible: false,
	},
	1: {
		title: '[TEST] 고장 유형 추가',
		content: 'Toggle content 3',
		isVisible: false,
	},
	2: {
		title: '[TEST] 버튼 고장 유형 추가',
		content: 'Toggle content 4',
		isVisible: false,
	},
	3: {
		title: '[TEST] 기기 상태 수정',
		content: <UpdateDeviceForm />,
		isVisible: false,
	},
};

export const requestState = atom({
	key: 'RequestState',
	default: 'none',
});

const TestDashBoard = () => {
	return (
		<div class="dashboard">
			<div class="sidebar">
				<h3>신고</h3>
				<ul>
				<li>#1 pc1</li>
				<li>#2 pc2</li>
				<li>#3 pc3</li>
				<li>#4 pc4</li>
				<li>#5 pc5</li>
				</ul>
			</div>
			<div class="main-content">
				<h3>상세정보</h3>
				<div class="timeline">
					<div class="timeline-item">
						<div class="dot success"></div>
						<span>고장 접수</span>
						<span>4월 8일, 2024, 13:40AM</span>
					</div>
					<div class="timeline-item">
						<div class="dot success"></div>
						<span>수리 접수</span>
						<span>4월 15일, 2024, 12:00AM</span>
					</div>
					<div class="timeline-item">
						<div class="dot"></div>
						<span>수리 완료</span>
					</div>
				</div>
				<div>
					<p>r1: 더블 클릭</p>
					<p>기타: 뻑뻑해요</p>
				</div>
				<div class="buttons">
					<button>수리완료</button>
					<button>수리 항목</button>
					<button>취소</button>
				</div>
			</div>
			</div>
	)
}

const IssueList = ({ list }) => {
	const request = useRecoilValue(requestState);

	return (
		<>
		{list.length !== 0 && request === 'reports' && list.map((report, index) => {
			return (
				<div className='option' key={index}>
					<span>_ID: {report._id} </span>
					<span>Device ID: {report.device} </span>
					<span>Console: {report.console_type} </span>
					<span>기타 설명: {report.etc_description} </span>
					<span>상태: {report.status} </span>
					<p>생성 일시: {report.createdAt} </p>
					<p>수정 일시: {report.updatedAt} </p>
					<p>고장 접수 내용</p>
					<div>
						{report.controller_malf_btn_list.map((malf, index) => (
							<div key={malf._id}>
								<span>고장버튼 ID: {malf.controller_btn_id} </span>
								<span>고장증상 : {malf.controller_btn_malf_type} </span>
							</div>
						))}
					</div>
					<button onClick={() => deleteReport(report._id)}>신고 삭제</button>
				</div>
			)
		})}
		</>
	)
}


const Dashboard = () => {
	const navigate = useNavigate();
	const setToggleState = useSetRecoilState(toggleState);
	const [request, setRequest] = useRecoilState(requestState);

	const [consoleType, setConsoleType] = useRecoilState(controllerType);
	const [deviceType, setDeviceType] = useRecoilState(deviceTypeState);

	const [deviceId, setDeviceId] = useRecoilState(deviceIDState);
	const deviceList = useRecoilValue(deviceListSelector);
	const issueList = useRecoilValue(getReportsList);
	
	const addToggleItem = () => {
		setToggleState((prev) => ({
		  ...prev,
		  [Object.keys(prev).length]: {
			title: `Toggle ${Object.keys(prev).length + 1}`,
			content: `Toggle content ${Object.keys(prev).length + 1}`,
			isVisible: false,
		  },
		}));
	};

	
	const showDeviceAndConsoleType = (console_id, status_id) => {
		let console, status;
		if (console_id === 1) console = 'XBOX';
		if (console_id === 2) console = 'NINTENDO';
		if (console_id === 3) console = 'PS5';

		if (status_id === 0) status = '고장';
		if (status_id === 1) status = '수리중';
		if (status_id === 2) status = '정상';

		return (`${console} / ${status}`);
	}

	useEffect(() => {
		setToggleState(TestToggle);
	}, [setToggleState]);
	
	return (
		<>
			<TestDashBoard />
			<div className="container">
				<div className="dashboard-content">
					<div className="section">
						<h3>#기기 목록</h3>
						<div className="options">
							<button className="option" onClick={() => {setConsoleType(1); setRequest('none')}}>XBox</button>
							<button className="option" onClick={() => {setConsoleType(2); setRequest('none')}}>Switch</button>
							<button className="option" onClick={() => {setConsoleType(3); setRequest('none')}}>PS5</button>
						</div>
						{consoleType !== 0 && request === 'none' && (
							<div className="options">
								<button className="option" onClick={() => setDeviceType(1)}>본체</button>
								<button className="option" onClick={() => setDeviceType(2)}>컨트롤러</button>
								<button className="option" onClick={() => setDeviceType(3)}>기타</button>
							</div>
						)}
						{deviceList.length !== 0 && request === 'none' && (
							<div className="device-list">
								{deviceList.map((device) => (
									<div
									key={device.id}
									className={`device-item option ${deviceId === device.id ? 'selected' : ''}`}
									onClick={() => deviceId === device.id
										? setDeviceId('')
										: setDeviceId(device.id)
									}
									>
										<div>{device.id}</div>
										<div>{device.name}</div>
										<div>{showDeviceAndConsoleType(device.console_id, device.status)}</div>
									</div>
								))}
							</div>
						)}
						<p>선택된 기기: {deviceId}</p>
						<button onClick={() => deleteDevice(deviceId)}>삭제</button>
						</div>
						<div className="section">
							<h3>#고장 신고 <button className='sml-option' onClick={() => setRequest('reports')}>조회</button></h3>
							<IssueList list={issueList} />
						</div>
						<div className="section">
							<h3>#고장 유형 <button className='sml-option'>조회</button></h3>
							<div className="options">
								<button className="option">1</button>
								<button className="option">2</button>
								<button className="option">3</button>
								<button className="option">4</button>
								<button className="option">5</button>
								<button className="option">6</button>
							</div>
						</div>
					<div className="section">
						<h3>#테스트 기능</h3>
						<ToggleList />
					</div>
				</div>
			</div>
		</>
	)
}

export default Dashboard;