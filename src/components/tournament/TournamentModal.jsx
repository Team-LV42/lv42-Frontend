import useModal from "../../hooks/useModal";

const TournamentModal = () => {
	const { isopen, modalDataState, closeModal, } = useModal();

	const onClickDimmer = () => {
		closeModal();
	}

	return (
		<>
			{isopen && modalDataState.type === 'playerStat' && (
				<div classNameName="modal" onClick={() => onClickDimmer()}>
					<div classNameName="modal-content" onClick={(event) => event.stopPropagation()}>
						<div classNameName="time-wrap">
							<p>{modalDataState.title}</p>
						</div>
						<div classNameName="comment-wrap">
							<p>{modalDataState.content}</p>
						</div> 
					</div>
				</div>
			)}
			{isopen && modalDataState.type === 'voteSubmit' && (
				<div classNameName="modal" onClick={() => onClickDimmer()}>
					<div classNameName="modal-content" onClick={(event) => event.stopPropagation()}>
						<div classNameName="time-wrap">
							<p>{modalDataState.title}</p>
						</div>
						<div classNameName="comment-wrap">
							<p>{modalDataState.content}</p>
						</div>
						<div classNameName="select-wrap">
							<div classNameName="left red" onClick={modalDataState.callback}>
								<span classNameName="material-symbols-outlined">
									cancel
								</span>
								<span >투표하기</span>
							</div>
							<div classNameName="right" onClick={closeModal}>
								<span>취소</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default TournamentModal;