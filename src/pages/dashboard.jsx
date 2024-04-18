import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import ToggleList from '../components/ToggleList';
import { toggleState } from '../store/toggle';
import '../styles/dashboard.css';

const TestToggle = {
	0: {
		title: '[TEST] 테스트 기기 추가',
		content: '', 
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
		content: 'Toggle content 5',
		isVisible: false,
	},
};


const Dashboard = () => {
	const setToggleState = useSetRecoilState(toggleState);
	
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
	
	const postNewDevice = async ({ deviceId, consoleType, deviceStatus }) => {
		try {
			if (!deviceId || !consoleType || !deviceStatus) {
				console.log("postNewDevice: invailed input format");
				return false;
			}
			
			const response = await fetch(`${process.env.REACT_APP_JUNKIM2}/devices?id=${deviceId}&console_id=${consoleType}&status=${deviceStatus}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			
			return await response.json();
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	useEffect(() => {
		setToggleState(TestToggle);	
	}, []);
	
	return (
		<>
			<div className="container">
				<div className="dashboard-content">
					<div className="section">
						<h3>#기기 목록</h3>
						<div className="options">
							<button className="option">XBox</button>
							<button className="option">Switch</button>
							<button className="option">PS5</button>
						</div>
						</div>
						<div className="section">
						<h3>#고장 신고 <button className='sml-option'>조회</button></h3>
						<div className="options">
							<button className="option">본체</button>
							<button className="option">컨트롤러</button>
							<button className="option">기타</button>
						</div>
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