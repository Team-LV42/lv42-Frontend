import React, { useEffect } from 'react';
import {
	useRecoilState,
	useSetRecoilState,
	useRecoilValue,
} from 'recoil';
import { useNavigate } from 'react-router-dom';

import {
	controllerType,
	deviceIDState,
	btnListState,
	malfTypeState,
	btnMalfState,
	deviceTypeState,
	pageState,
} from '../store/report';

import {
	deviceListSelector,
	deviceButtonListSelector,
	setSelected
} from '../api/reportApi';

import useSideMenu from '../hooks/useSideMenu';
import AddableList from '../components/AddableList';

export const DeviceSideMenu = () => {
	const navigate = useNavigate();
	const { isSideBarOpen, onClickMenu } = useSideMenu();

	return (
		<>
		<div id="sidebar-menu" class={`${isSideBarOpen ? 'side-shown' : 'side-hidden'} peer flex items-center justify-center w-72 h-full bg-white rounded-r-md transition-all ease-in-out z-50`}>
			<header class="absolute flex flex-row items-center justify-between p-4 top-0 left-0 w-full h-12">
				<button id="menu-close-button" class="z40" onClick={onClickMenu}>
					<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</header>
			<ul class="flex flex-col items-start justify-start w-full h-4/5 font-bold text-xl">
				<li onClick={() => {navigate('/report'); onClickMenu();}} class="flex flex-row items-center justify-start w-full h-14 my-1 p-5 hover:backdrop-brightness-50 cursor-pointer">
					<button>고장수리 신고하기</button>
				</li>
				<li onClick={() => window.open("https://forms.gle/CWybJJPorTauRUuQ8")} class="flex flex-row items-center justify-start w-full h-14 my-1 p-5 hover:backdrop-brightness-50 cursor-pointer">
					<button>문의하기</button>
				</li>
			</ul>
		</div>
		<div id="sidebar-bg" class={`invisible peer-[${isSideBarOpen ? 'side-shown' : 'side-hidden'}]:visible backdrop-brightness-50 w-full h-full absolute top-0 left-0 z-40`}></div>
		</>
	)
}

const DeviceHeader = ({ page }) => {
	const consoleType = useRecoilValue(controllerType);
	const deviceType = useRecoilValue(deviceTypeState);

	const setPage = useSetRecoilState(pageState);
	const { onClickMenu } = useSideMenu();

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
			<header className="fixed flex flex-row items-center justify-start p-4 top-0 left-0 w-full h-12 z-30 bg-white">
				<button id="menu-button" className="flex" onClick={onClickMenu}>
					<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>
				</button>
				<div className="h-8 w-8 hidden bg-basic bg-logo"></div>
			</header>
			<div className="flex flex-row items-end justify-between md:p-10 md:px-12 px-9 py-5 pt-10 w-full md:h-44 h-32 border-b border-black">
				<div>
					{page !== 'main' && (
						<a className="text-[#2997ff] lg:text-sm text-xs hover:underline cursor-pointer" onClick={() => setPage('main')} >변경 {'>'}</a>
					)}
					<p className="md:text-3xl text-2xl font-bold">
						{page === 'main'
						? ('기기 고장 신고')
						: (showDeviceAndConsoleType())}
					</p>
				</div>
				<span className="md:w-32 md:h-20 w-24 h-14 bg-basic bg-logo cursor-pointer" /* onClick={() => navigate('/')} */></span>
			</div>
			
		</>
	)
}

const DeviceIssueReporting = () => {
	const page = useRecoilValue(pageState);

	return (
		<>
			{page === 'done' 
			? (
				<DoneIssueReporting />
			)
			: (
			<div className="overflow-auto font-outfit w-full min-h-dvh flex flex-col items-center justify-center">
				<DeviceHeader page={page} />
				<div class="overflow-hidden flex flex-col items-center justify-start px-6 w-full grow relative z-10">
					<div class="absolute left-0 top-0 w-full h-1/3 bg-gradient-to-b from-gray-200 z-20"></div>
					{page === 'main' && <MainIssueReporting />}
					{page === 'controller' && <ControllerIssueReporting />}
					{(page === 'etc' || page === 'console') && <EtcIssueReporting />}
				</div>
				<DeviceSideMenu />
			</div>
			)}
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

	useEffect(() => {
		if (deviceID !== '')
		setDeviceID('');
		if (deviceType === 1)
		setDeviceID(deviceList[0].id);
	}, [consoleType, deviceType])

	return (
		<>
			<div class="flex flex-col items-center my-5 justify-around lg:w-[800px] w-full min-h-16 z-30">
				<p className="text-start md:text-2xl text-lg font-semibold w-full my-2 px-2">게임 선택</p>
				<div className='w-full flex flex-row items-around justify-around text-sm'>
					<button
					className={`flex flex-row items-center justify-center text-center mx-2 grow md:h-14 h-9 md:text-lg border border-black ${consoleType === 1 ? 'button-active' : 'button-inactive'} pointerhover:hover:bg-gray-300 rounded p-2`}
					onClick={() => setConsoleType(1)}
					>
						<p className="mx-1 w-4 h-4 bg-basic bg-xbox"></p>
						<p className="mx-1 inline">XBOX</p>
					</button>
					<button
					className={`flex flex-row items-center justify-center text-center mx-2 grow md:h-14 h-9 md:text-lg border border-black ${consoleType === 2 ? 'button-active' : 'button-inactive'} pointerhover:hover:bg-gray-300 rounded p-2`}
					onClick={() => setConsoleType(2)}
					>
						<p className="mx-1 w-5 h-5 bg-basic bg-cover bg-switch"></p>
						<p className="mx-1 inline">Switch</p>
					</button>
					<button
					className={`flex flex-row items-center justify-center text-center mx-2 grow md:h-14 h-9 md:text-lg border border-black ${consoleType === 3 ? 'button-active' : 'button-inactive'} pointerhover:hover:bg-gray-300 rounded p-2`}
					onClick={() => setConsoleType(3)}
					>
						<p className="mx-1 w-6 h-4 bg-basic bg-cover bg-ps5"></p>
						<p className="mx-1 inline">PS5</p>
					</button>
				</div>
			</div>
			{consoleType !== 0 && (
			<>
				<div className="flex flex-col items-center my-5 justify-around lg:w-[800px] w-full min-h-16 z-30">
					<p className="text-start md:text-2xl text-lg font-semibold w-full my-2 px-2">기기 선택</p>
					<div className="w-full flex flex-row items-around justify-around text-sm">
						<button
						className={`flex flex-row items-center justify-around text-center grow mx-2 md:h-14 h-9 md:text-lg border border-black ${deviceType === 1 ? 'button-active' : 'button-inactive'} pointerhover:hover:bg-gray-300 rounded p-2`}
						onClick={() => setDeviceType(1)}
						>
							<p className="inline">본체</p>
						</button>
						<button
						className={`flex flex-row items-center justify-around text-center grow mx-2 md:h-14 h-9 md:text-lg border border-black ${deviceType === 2 ? 'button-active' : 'button-inactive'} pointerhover:hover:bg-gray-300 rounded p-2`}
						onClick={() => setDeviceType(2)}
						>
							<p className="inline">컨트롤러</p>
						</button>
						<button
						className={`flex flex-row items-center justify-around text-center grow mx-2 md:h-14 h-9 md:text-lg border border-black ${deviceType === 3 ? 'button-active' : 'button-inactive'} pointerhover:hover:bg-gray-300 rounded p-2`}
						onClick={() => setDeviceType(3)}
						>
							<p className="inline">기타</p>
						</button>
					</div>
				</div>
			</>
			)}
			{deviceType === 2 && deviceList.length !== 0 && (
				<>
				<div className="flex flex-col items-start my-5 justify-around lg:w-[800px] w-full min-h-16 z-30">
					<div className="flex flex-row items-center justify-start">
						<p className="text-start md:text-2xl text-lg flex flex-row items-center justify-start font-semibold w-full my-2 px-2">
							컨트롤러 선택
						</p>
						<div className="cursor-pointer relative group">
							<p className="flex flex-wrap md:w-72 w-52 h-5 rounded-md items-center justify-center text-center md:text-[1rem] text-xs tip-hidden absolute md:top-0.5 md:left-8 -top-0.5 left-6 border border-gray-500 group-hover:tip-shown">
								컨트롤러 앞/뒷면의 번호를 참고해주세요
							</p>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="md:w-6 md:h-6 w-4 h-4 ">
								<path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
							</svg>
						</div>
					</div>
					<div className="w-full flex flex-row flex-wrap items-around justify-around text-sm">
						{deviceList.map((device, index) => (
							<button
							key={index}
							className={`controller-under-repair bg-basic bg-controller-icon flex flex-row flex-wrap my-1 items-center justify-center text-center grow mx-2 md:h-20 h-16 border border-black pointerhover:hover:bg-gray-300 ${deviceID === device.id ? 'button-active' : 'button-inactive'} rounded p-2`}
							onClick={() => device.status === 2 && setDeviceID(device.id)}
							>
								<p className="text-center w-full md:text-lg text-sm">{device.id}</p>
								<p className="inline mx-1 md:text-sm text-xs">{device.status === 2 ? 'O' : 'X'}</p>
								<p className="inline mx-1 md:text-sm text-xs">{controllerStatus(device.status)}</p>
							</button>
						))}
					</div>
				</div>
				</>
			)}
			{(deviceID !== '' || deviceType === 3) && (
				<div
				className="flex flex-row items-end justify-end lg:w-[800px] w-full min-h-32 z-30 py-6"
				onClick={onClickNext}
				>
					<button
					onClick={() => setPage(deviceType)}
					className="group relative flex items-center justify-start p-3 rounded-3xl w-32 h-12 bg-gray-300 pointerhover:hover:bg-gray-400"
					>
						<p className="ml-2 text-lg">Next</p>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute top-3 left-[4.5rem] transition-all group-hover:ml-5 w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
						</svg>
					</button>
				</div>
			)}
		</>
	)
}

const postReport = async (select, setPage) => {
	const base64url = btoa(unescape(encodeURIComponent(JSON.stringify(select))));
	console.log(JSON.parse(atob(base64url)));
	const response = await fetch(`${process.env.REACT_APP_API_URL}/reports?data=${base64url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.status === 200)
		setPage('done');
	return await response.json();
};

const ControllerIssueReporting = () => {
	const deviceBtnList = useRecoilValue(deviceButtonListSelector);
	const setPage = useSetRecoilState(pageState);

	const [malfTypeList, setMalfTypeList] = useRecoilState(malfTypeState);
	const setBtnList = useSetRecoilState(btnListState);
	const setBtnMalfTypeList = useSetRecoilState(btnMalfState);

	const deviceID = useRecoilValue(deviceIDState);
	
	const [select, setSelect] = useRecoilState(setSelected);

	useEffect(() => {
		if (deviceBtnList.length !== 0) {
			setMalfTypeList(deviceBtnList.controller_malf_type_list);
			setBtnList(deviceBtnList.controller_btn_list);
			setBtnMalfTypeList(deviceBtnList.controller_btn_malf_type_list);
		}
	}, [deviceBtnList, setMalfTypeList, setBtnList, setBtnMalfTypeList]);

	const onDescriptionSet = (value) => {
		setSelect({
			name: 'etc_description',
			value: value,
		});
	}

	const getConsoleName = () => {
		if (deviceID.startsWith('x'))
			return ('bg-xbox-btn-info');
		if (deviceID.startsWith('nj'))
			return ('bg-switch-btn-info');
		if (deviceID.startsWith('np'))
			return ('bg-switch-pro-btn-info');
		if (deviceID.startsWith('p'))
			return ('bg-ps5-btn-info');
	}

	return (
		<>
			{malfTypeList.length !== 0 && (
			<div className="flex flex-col items-center my-5 justify-around lg:w-[800px] w-full min-h-16 z-20">
				<p className="md:text-2xl text-start text-lg font-semibold w-full my-2 px-2">
					어떤 상태인가요?
				</p>
				<div className="w-full flex flex-wrap flex-row items-around justify-around text-sm">
					{malfTypeList.map((malf, index) => {
						return (
							<button
							key={index}
							onClick={() => setSelect({ name: 'controller_malf_type', value: malf.name })}
							className={`${select.controller_malf_type === malf.name ? 'button-active' : 'button-inactive'} flex flex-row items-center justify-around text-center my-1 md:h-14 grow mx-2 md:text-lg h-9 border border-black pointerhover:hover:bg-gray-300 rounded p-2`}
							>
								<p className="inline">{malf.description}</p>
							</button>
						);
					})}
				</div>
			</div>
			)}
			{select.controller_malf_type === 'button' && (
				<div className="flex flex-col items-center my-5 justify-around lg:w-[800px] w-full min-h-16 z-30">
					<p className="md:text-2xl text-start text-lg font-semibold w-full my-2 px-2">
						고장 위치와 문제를 선택해주세요
					</p>
					<span /* onclick="openModal('bigImgModal')" */ className={`cursor-pointer relative bg-basic ${getConsoleName()} bg-white md:w-96 md:h-80 w-72 h-44 border border-black rounded-md shadow-md mt-2 mb-3`}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute top-3 left-3 w-4 h-4">
							<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
						</svg>
					</span>
					<AddableList />
				</div>
			)}
			<div className="flex flex-col items-center my-5 justify-around lg:w-[800px] w-full min-h-16 z-20">
				<p className="md:text-2xl text-start text-lg font-semibold w-full my-2 px-2">어떤 문제가 발생했는지 알려주세요</p>
				<textarea
				onBlur={(e) => onDescriptionSet(e.target.value)}
				className="md:text-lg text-sm w-full h-48 rounded-md border border-gray-500 p-4 resize-y"
				maxLength="150"
				placeholder="ex) 본체의 전원이 켜지지 않아요"
				></textarea>
			</div>
			{select.console_type && select.device && select.controller_malf_type && (select.controller_malf_btn_list.length !== 0 || select.etc_description !== '') && (
				<div className="flex flex-row items-end justify-end lg:w-[800px] w-full min-h-32 z-30 py-6">
					<button onClick={() => postReport(select, setPage)} className="group relative flex items-center justify-start p-3 rounded-3xl w-32 h-12 bg-gray-300 pointerhover:hover:bg-gray-400">
						<p className="ml-2 text-lg">Submit</p>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute top-3 left-[5rem] transition-all group-hover:ml-4 w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
						</svg>
					</button>
				</div>
			)}
		</>
	)
};

const DoneIssueReporting = () => {
	const navigate = useNavigate();

	return (
		<div className="overflow-auto font-outfit w-[calc(100dvw)] h-[calc(100dvh)]">
			<div className="w-full h-full flex flex-col items-center justify-center">
				<span className="bg-basic bg-logo w-20 h-12"></span>
				<div className="text-4xl leading-tight font-bold text-center my-4">
					<p>고장 신고가</p>
					<p>접수되었습니다</p>
				</div>
				<div className="text-xl leading-tight font-normal text-center">
					<p>수리된 내용은</p>
					<p>매월 1일 슬랙 채널에서</p>
					<p>확인하실 수 있습니다</p>
				</div>
				<button onClick={() => navigate(0)} className="w-[210px] h-[46px] mt-16 rounded-3xl bg-gray-300 pointerhover:hover:bg-gray-400 font-semibold text-[17px]">
					<p>고장신고 홈으로 돌아가기</p>
				</button>
				<button onClick={() => window.open("https://forms.gle/CWybJJPorTauRUuQ8")} className="w-[210px] h-[46px] mt-7 rounded-3xl bg-gray-300 pointerhover:hover:bg-gray-400 font-semibold text-[17px]">
					<p>서비스 관련 문의하기</p>
				</button>
			</div>
		</div>
	)
}

const EtcIssueReporting = () => {
	const [select, setSelect] = useRecoilState(setSelected);
	const setPage = useSetRecoilState(pageState);

	useEffect(() => {
		setSelect({
			name: 'device',
			value: 'etc',
		});
	}, [])

	const onDescriptionSet = (value) => {
		setSelect({
			name: 'etc_description',
			value: value,
		});
	};

	return (
		<>
		<div className="flex flex-col items-center my-5 justify-around lg:w-[800px] w-full min-h-16 z-20">
			<p className="md:text-2xl text-start text-lg font-semibold w-full my-2 px-2">어떤 문제가 발생했는지 알려주세요</p>
			<textarea
			onBlur={(e) => onDescriptionSet(e.target.value)}
			className="md:text-lg text-sm w-full h-48 rounded-md border border-gray-500 p-4 resize-y"
			maxLength="150"
			placeholder="ex) 본체의 전원이 켜지지 않아요"
			></textarea>
		</div>
		{select.etc_description !== '' && (
			<div className="flex flex-row items-end justify-end lg:w-[800px] w-full min-h-32 z-30 py-6">
				<button onClick={() => postReport(select, setPage)} className="group relative flex items-center justify-start p-3 rounded-3xl w-32 h-12 bg-gray-300 pointerhover:hover:bg-gray-400">
					<p className="ml-2 text-lg">Submit</p>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute top-3 left-[5rem] transition-all group-hover:ml-4 w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</button>
			</div>
		)}
		</>
	)
};

export default DeviceIssueReporting;