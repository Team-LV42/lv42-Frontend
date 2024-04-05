import useModal from "../../hooks/useModal";

const TournamentModal = () => {
	const { isopen, modalDataState, closeModal, } = useModal();

	const onClickDimmer = () => {
		closeModal();
	}

	return (
		<>
			{isopen && modalDataState.type === 'login' && (
				<div className="modal" id="login-modal" onClick={() => onClickDimmer()}>
					<div className="modal-content" onClick={(event) => event.stopPropagation()}>
						<div className="time-wrap red">
							<p>{modalDataState.title}</p>
						</div>
						<div className="comment-wrap">
							{modalDataState.content}
						</div>
						<div className="select-wrap">
							<div className="left" onClick={modalDataState.callback}>
								<img src="42logo.svg" alt="42logo" id="logo-42" />
								<span>로그인</span>
							</div>
							<div className="right" onClick={closeModal}>
								<span>닫기</span>
							</div>
						</div>
					</div>
				</div>
			)}
			{isopen && modalDataState.type === 'playerStat' && (
				<div className="modal" id="player-info-modal" onClick={() => onClickDimmer()}>
					<div className="modal-content" onClick={(event) => event.stopPropagation()}>
						{modalDataState.content}
					</div>
				</div>
			)}
			{isopen && modalDataState.type === 'voteSubmit' && (
				<div className="modal" onClick={() => onClickDimmer()}>
					<div className="modal-content" onClick={(event) => event.stopPropagation()}>
						<div className="time-wrap">
							<p>{modalDataState.title}</p>
						</div>
						<div className="name-wrap flex-row-start">
							<p>{modalDataState.content}</p>
						</div>
						<div className="warn-wrap flex-row-center red">
							<span className="material-symbols-outlined">
								gpp_maybe
							</span>
							<p>이후, 수정할 수 없습니다</p>
						</div>
						<div className="select-wrap">
							<div className="left red" onClick={modalDataState.callback}>
								<span >투표하기</span>
							</div>
							<div className="right" onClick={closeModal}>
								<span>닫기</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default TournamentModal;