import { useState} from 'react';

import useModal from '../hooks/useModal';

const OnBoarding = () => {
	const { closeModal } = useModal();
	const [indicator, setIndicator] = useState(1);

	const indicatorStyles = {
		false: 'page-dot',
		true: 'page-dot-now',
	};

	const pageStyles = {
		1: '-translate-x-0',
		2: '-translate-x-1/4',
		3: '-translate-x-2/4',
		4: '-translate-x-3/4',
	};

	return (
		<div onClick={closeModal} id="user-onboarding-modal" class="modal-shown fixed w-full h-full top-0 left-0 items-center justify-center backdrop-brightness-50 z-40">
				<div onClick={(event) => event.stopPropagation()} class="relative md:w-[40rem] w-80 h-[80%] overflow-hidden bg-white shadow-modal rounded-2xl">
					<div id="page-numbering" class="absolute w-14 h-2 flex top-4 left-1/2 -translate-x-1/2 flex-row items-center justify-center gap-2">
						<span id="page1" class={`w-2 h-2 rounded-full ${indicatorStyles[indicator === 1]}`}></span>
						<span id="page2" class={`w-2 h-2 rounded-full ${indicatorStyles[indicator === 2]}`}></span>
						<span id="page3" class={`w-2 h-2 rounded-full ${indicatorStyles[indicator === 3]}`}></span>
						<span id="page4" class={`w-2 h-2 rounded-full ${indicatorStyles[indicator === 4]}`}></span>
					</div>
					<svg onClick={closeModal} class="absolute w-6 h-6 top-0 left-full -translate-x-[150%] translate-y-1/2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
					<div
					id="user-onboarding-pages"
					class={`${pageStyles[indicator]} absolute w-[400%] h-[92%] top-[8%] left-0 transition-all ease-[cubic-bezier(.4,0,.6,1)] duration-300 flex flex-row`}>
						<div class="w-1/4 h-full flex flex-col items-center justify-start">
							<div class="w-full h-24 flex flex-col items-center justify-start font-medium text-sm">
								<p class="text-2xl font-bold mb-2">STEP 1</p>
								<p>로그인 후,</p>
								<p>원하는 콘솔을 선택해주세요.</p>
							</div>
							<div class="w-full grow flex flex-col items-center justify-start p-5">
								<span class="w-full h-full bg-basic bg-user-onboarding-1"></span>
							</div>
						</div>
						<div class="w-1/4 h-full flex flex-col items-center justify-start">
							<div class="w-full h-24 flex flex-col items-center justify-start font-medium text-sm">
								<p class="text-2xl font-bold mb-2">STEP 2</p>
								<p>원하는 시간의 슬롯을 선택해주세요.</p>
								<p>만약 2칸이상의 슬롯을 선택하려면,</p>
								<p>끝나는 시간의 슬롯을 선택해주세요.</p>
							</div>
							<div class="w-full grow flex flex-col items-center justify-start p-5">
								<span class="w-full h-full bg-basic bg-user-onboarding-2"></span>
							</div>
						</div>
						<div class="w-1/4 h-full flex flex-col items-center justify-start">
							<div class="w-full h-24 flex flex-col items-center justify-start font-medium text-sm">
								<p class="text-2xl font-bold mb-2">STEP 3</p>
								<p>예약 시간을 확인한 후,</p>
								<p>예약하기 버튼을 눌러 예약!</p>
							</div>
							<div class="w-full grow flex flex-col items-center justify-start p-5">
								<span class="w-full h-full bg-basic bg-user-onboarding-3"></span>
							</div>
						</div>
						<div class="w-1/4 h-full flex flex-col items-center justify-start">
							<div class="w-full h-24 flex flex-col items-center justify-start font-medium text-sm">
								<p class="text-2xl font-bold mb-2">취소하기</p>
								<p>마이페이지 또는 예약 페이지에서</p>
								<p>내가 예약한 슬롯을 확인하고,</p>
								<p>예약한 슬롯을 눌러 취소할 수 있습니다.</p>
							</div>
							<div class="w-full grow flex flex-col items-center justify-start p-5">
								<span class="w-full h-full bg-basic bg-user-onboarding-4"></span>
							</div>
						</div>
					</div>
					{indicator !== 1 && (
					<svg onClick={() => setIndicator(prev => prev - 1)} id="prev-page-btn" class="absolute w-7 h-7 top-1/2 block left-0 -translate-y-full translate-x-1/2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
					</svg>
					)}
					{indicator !== 4 && (
					<svg onClick={() => setIndicator(prev => prev + 1)} id="next-page-btn" class="absolute w-7 h-7 top-1/2 block left-full -translate-y-full -translate-x-[150%] cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
					</svg>
					)}
				</div>
			</div>
	)
}


export default OnBoarding;