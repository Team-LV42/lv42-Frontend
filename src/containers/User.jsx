import { useRecoilState, useRecoilValue } from "recoil";
import { UserStateQuery, userState } from "../api/userApi.js"
import { useSearchParams } from "react-router-dom";
import UserView from "../components/UserView.jsx"

export function LoggedInUser() {
	/* cookie.get(id) */
	const logInUserId = '';
	// const [userInfo, setUserInfo] = useRecoilState(UserStateQuery(logInUserId));
	const userInfo = useRecoilValue(userState(logInUserId));
	const [params, setParams] = useSearchParams();
	const userID = params.get('userid');
	let	specificUser;

	const [modalOpen, setModalOpen] = useRecoilState(userModalState);

	if (modalOpen)
		specificUser = useRecoilValue(UserStateQuery(userID)); 
	if (userID)
		setModalOpen(true)	;
	if (userInfo === undefined)
		return (<div>Failed</div>);
	console.log(userInfo);

	const onModalClose = () => {
		setModalOpen(false);
		params.delete('userid');
		setParams(params);
	}
	
	return (
		<>
			<div>
				<UserView object={userInfo} />
				{/* modal-content 부분 만들어서 userId가 설정되면 modal-content가 렌더링되도록 하고
				버튼이 눌리면 modalState를 수정해서 보여지게 함 */}
				{/* {userId !== undefined && 
				<UserView 
					object={specificUser} 
					type="modal" 
				/>} */}
			</div>
			{/* modal content render */}
			{ 
				modalOpen && 
				<>
					<div className={`modal-background`}></div>
					<div className={`modal-container`}>
						<button className={`modal-close-btn`} onClick={onModalClose}>X</button>
						<div className={`modal-content`}>
							<UserView object={specificUser} />
							{/* <h>{specificUser.name}</h> */}
							{/* <p>{specificUser.id}</p> */}
						</div>
					</div>
				</>
			}
		</>
	);
}
export default LoggedInUser;