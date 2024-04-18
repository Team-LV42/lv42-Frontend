import { atom, useRecoilState } from 'recoil';

const selectBtn = atom({
	key: 'SelectBtnAtom',
	default: 0,
})

const Dualsense = () => {
	const [btn, setBtn] = useRecoilState(selectBtn);

	const onChange = (btnid) => {
		setBtn(btnid);
	}

	return (
		<>
		<h1>선택 버튼 :  {btn}</h1>
		<div class="controller">
			<div class="controller__container">
				<div class="controller__body">
					<div class="controller__trigger controller__trigger--left"></div>
					<div class="controller__trigger controller__trigger--right"></div>
					<div class="controller__body-top controller__body-top--left"></div>
					<div class="controller__body-top controller__body-top--right"></div>
					<div class="controller__body-top controller__body-top--center"></div>
					<div class="controller__grip controller__grip--left">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div class="controller__grip controller__grip--right">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div class="controller__sticks-container">
						<div class="controller__backdrop"></div>
						<div class="controller__clip"></div>
						<div class="controller__grip-underlay controller__grip-underlay--left">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<div class="controller__grip-underlay controller__grip-underlay--right">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<div class="controller__sticks" >
							<div onClick={() => setBtn(13)}>
								<div class="controller__stick">
									<div>
										<div></div>
									</div>
									<div>
										<div></div>
									</div>
								</div>
							</div>
							<div onClick={() => setBtn(14)}>
								<div class="controller__stick">
									<div>
										<div></div>
									</div>
									<div>
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="controller__touch-pad">
						<div>
							<div></div>
							<div></div>
						</div>
						<div>
							<div></div>
							<div></div>
						</div>
					</div>
					<div class="controller__speaker">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div class="controller__start"></div>
					<div class="controller__headphone"></div>
					<div class="controller__buttons">
						<div onClick={() => setBtn(5)} class="controller__button controller__button--triangle"></div>
						<div onClick={() => setBtn(8)} class="controller__button controller__button--square"></div>
						<div onClick={() => setBtn(6)} class="controller__button controller__button--circle"></div>
						<div onClick={() => setBtn(7)} class="controller__button controller__button--cross"></div>
					</div>
					<div class="controller__dpad">
						<div onClick={() => setBtn(1)} class="controller__dbutton controller__dbutton--top">
							<div></div>
						</div>
						<div onClick={() => setBtn(2)} class="controller__dbutton controller__dbutton--right">
							<div></div>
						</div>
						<div onClick={() => setBtn(3)} class="controller__dbutton controller__dbutton--bottom">
							<div></div>
						</div>
						<div onClick={() => setBtn(4)} class="controller__dbutton controller__dbutton--left">
							<div></div>
						</div>
					</div>
					<div class="controller__auxiliary-button controller__auxiliary-button--share">
						<div></div>
					</div>
					<div class="controller__auxiliary-button controller__auxiliary-button--options">
						<div></div>
					</div>
					<div class="controller__logo">
						<div>
							<div></div>
							<div></div>
						</div>
						<div></div>
					</div>
					<div class="controller__mute">
						<div></div>
						<div></div>
					</div>
					<div class="controller__patch controller__patch--left"></div>
					<div class="controller__patch controller__patch--right"></div>
				</div>
			</div>
		</div>

		</>
	);
}

export default Dualsense;