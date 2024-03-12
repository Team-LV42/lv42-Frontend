

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