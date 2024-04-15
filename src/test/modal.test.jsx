


import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

//modal state
// type ModalType = {
// 	isOpen: boolean;
// 	title: string;
// 	content: JSX.Element | string;
// 	callBack?: () => any;
//   };

  export const modalState = atom({
	key: "modalState",
	default: {
	  action: '',
	  content: '',
	}
  });

// modal hooks
// type OpenModalType = {
// 	title: string;
// 	content: JSX.Element | string;
// 	callback?: () => any;
//   };
  
  export const useModal = () => {
	const [modalDataState, setModalDataState] = useRecoilState(modalState);
  
	const closeModal = useCallback(
	  () =>
		setModalDataState((prev) => {
		  return { ...prev, isOpen: false };
		}),
	  [setModalDataState]
	);
  
	const openModal = useCallback(
	  ({ title, content, callback }) =>
		setModalDataState({
		  isOpen: true,
		  title: title,
		  content: content,
		//   callBack: callback
		}),
	  [setModalDataState]
	);
  
	return { modalDataState, closeModal, openModal };
  };

//modal component
export const Modal = () => {
	const { modalDataState, closeModal } = useModal();
  
	return (
	  <>
		{modalDataState.isOpen && (
		  <ModalDimmer> 
			<ModalBody>
			  <ModalTitle>{modalDataState.title}</ModalTitle>
			  <ModalContents>{modalDataState.content}</ModalContents>
			  <ModalFooter>
				<ModalButtonWithBorder onClick={closeModal}>Cancel</ModalButtonWithBorder>
				{/* <ModalButton onClick={modalDataState.callBack}>Ok</ModalButton> */}
			  </ModalFooter>
			</ModalBody>
		  </ModalDimmer>
		)}
	  </>
	);
  };


const userModal = () => {
	const [params] = useSearchParams();
	const queryParse = (params) => {
		
	};



}

const bookModal = () => {

}

function App() {
	const [modal, setModal] = useRecoilState(modalState);
	const [params] = useSearchParams();
	const { openModal } = useModal();
  
	const modalData = {
	  title: 'Modal Title',
	  content: 'Modal Content',
	};

	// useEffect(() => {
	// 	if (params.get(''))

 	// })
  
	return (
	  <div>
		{/* <button onClick={() => openModal(modalData)}>OPEN MODAL</button> */}
		<Modal />
	  </div>
	);
}