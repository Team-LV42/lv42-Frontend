
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

import { useModal } from '../hooks/useModal';
import Nav from '../components/nav.jsx';
import Login from './Login.jsx';

export const Index = () => {
	const params = useLocation();
	const navigator = useNavigate();
	const { isopen, modalDataState, closeModal, } = useModal();

	// useEffect(() => {
	// 	switch (params.pathname) {
	// 		case '/user':
	// 			setModal({
	// 				action: 'user',
	// 				content: <UserModal />,
	// 			});
	// 			setActionStatus(true);
	// 			break ;
	// 		case '/book':
	// 			setModal({
	// 				action: 'book',
	// 				content: <BookModal />,
	// 			});
	// 			setActionStatus(true);
	// 			break ;
	// 		//reset
	// 		case '/':
	// 			setModal({
	// 				action: '',
	// 				content: '',
	// 			});
	// 			setActionStatus(false);
	// 			break ;
	// 	}
	// 	console.log(actionStatus);
	// }, [params, setActionStatus, actionStatus, setModal]);

	const onClickDimmer = () => {
		closeModal();
	};

	console.log(modalDataState)

	return (
		<>
			<nav>
				<Nav />
				<Login />
				<p><Link to="/test">예약 현황</Link></p>
				<p><Link to="/book">Book</Link></p>
				<p><Link to="/user">User</Link></p>
			</nav>
			{isopen && (
				<div className="modal-dimmer" onClick={() => onClickDimmer()}>
					<div className="modal-body" onClick={(event) => event.stopPropagation()}>
						<button onClick={closeModal}>close</button>
						<div className="modal-content">
							<p>{modalDataState.title}</p>
							<div>
								{modalDataState.content}
							</div>
							<button className="modal-action-button" onClick={modalDataState.callback}>확인</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Index;