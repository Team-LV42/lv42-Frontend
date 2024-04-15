import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { modalState, actionState } from '../store/Modal';

export const useModal = () => {
	const [modalDataState, setModalDataState] = useRecoilState(modalState);
	const [isopen, setActionStatus] = useRecoilState(actionState);
	
	const closeModal = useCallback(() => 
		setActionStatus(false), [setActionStatus]);
  
	const openModal = useCallback(
	  ({ title, content, callback, type = 'normal' }) => {
		setModalDataState({
			type: type,
			title: title,
			content: content,
			callback: callback
		});
		setActionStatus(true);
	}, [setModalDataState, setActionStatus]);
  
	return { isopen, modalDataState, closeModal, openModal };
};

export default useModal;