import { useNavigate } from 'react-router-dom';

const OnBoardingConsoleGuide = ({ closeModal, data, user }) => {
	const navigate = useNavigate();

	const consoleBgStyles = {
		'xbox': 'bg-xbox-controller',
		'switch': 'bg-switch-controller',
		'ps5': 'bg-ps5-controller',
	};

	const content = {
		'xbox': {
			0: 'xbox를 예약하셨군요!',
			1: '컨트롤러의 xbox 버튼을 눌러',
			2: '컨트롤러의 xbox 버튼을 3초간 누르고,',
			3: '콘솔 종료를 선택해주세요.',
		},
		'switch': {
			0: 'switch를 예약하셨군요!',
			1: '조이콘의 홈 버튼을 눌러',
			2: '조이콘의 홈 버튼을 눌러 홈으로 이동 후,',
			3: '우측 하단의 전원메뉴 > 슬립모드로 전환',
		},
		'ps5': {
			0: 'ps5를 예약하셨군요!',
			1: '컨트롤러의 PS5 버튼을 눌러',
			2: '컨트롤러의 PS5 버튼을 3초간 누르고,',
			3: '우측 하단의 전원 아이콘 > 대기모드로 전환',
		},
	};

	return (
		<div onClick={closeModal} id="user-onboarding-modal-console-guide" class="modal-shown fixed w-full h-full top-0 left-0 flex items-center justify-center backdrop-brightness-50 z-40">
				<div onClick={(event) => event.stopPropagation()} class="relative w-80 h-[80%] max-h-[42rem] flex flex-col items-center justify-center bg-white shadow-modal rounded-2xl">					  
					<div class="w-full h-full flex flex-col items-center justify-center py-10 min-[376px]-[gap-6] gap-2">
						<div class="w-full flex flex-col items-center justify-center h-10">
							<p class="text-3xl font-bold mb-2">예약 성공</p>
							<p class="text-sm font-medium">{content[data.content][0]}</p>
						</div>
						<div class="w-full flex flex-col items-center justify-center mb-10">
							<p class="text-xl font-bold mb-2">어떻게 게임을 시작하나요?</p>
							<p class="text-sm font-medium">{content[data.content][1]}</p>
							<p class="text-sm font-medium mb-2">콘솔의 전원을 켜주세요.</p>
							<span class={`w-44 h-24 bg-basic ${consoleBgStyles[data.content]}`}></span>
						</div>
						<div class="w-full flex flex-col items-center justify-center mb-6">
							<p class="text-xl font-bold mb-2">어떻게 게임을 종료하나요?</p>
							<p class="text-sm font-medium">{content[data.content][2]}</p>
							<p class="text-sm font-medium mb-2">{content[data.content][3]}</p>
						</div>
						<button onClick={() => navigate('/')} class="w-[210px] h-[46px] mb-6 rounded-3xl bg-gray-300 pointerhover:hover:bg-gray-400 font-semibold text-[17px]">
							예약 홈으로 돌아가기
						</button>
						<button onClick={() => navigate(`/user/${user.id}`)} class="w-[210px] h-[46px] rounded-3xl bg-gray-300 pointerhover:hover:bg-gray-400 font-semibold text-[17px]">
							내 예약 바로가기
						</button>
					</div>
				</div>
				  
			</div>
	)
}

export default OnBoardingConsoleGuide;