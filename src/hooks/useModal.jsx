import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { modalState, actionState } from '../store/Modal';

export const useModal = () => {
	const [modalDataState, setModalDataState] = useRecoilState(modalState);
	const [isopen, setActionStatus] = useRecoilState(actionState);
	
	const closeModal = useCallback(() => 
		setActionStatus(false), [setActionStatus]);
  
	const openModal = useCallback(
	  ({ title, content, callback }) => {
		setModalDataState({
			title: title,
			content: content,
			callback: callback
		});
		setActionStatus(true);
		console.log(content);
	}, [setModalDataState, setActionStatus]);
  
	return { isopen, modalDataState, closeModal, openModal };
};