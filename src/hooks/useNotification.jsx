import { useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { notiState, notiActionState } from '../store/modal';

const useNotification = () => {
	const [isNotiOpen, setActionNoti] = useRecoilState(notiActionState);
	const [noti, setNotiState] = useRecoilState(notiState);

	const openNoti = useCallback(
		({ title, content }) => {
			setNotiState({
				title: title,
				content: content,
			});
			setActionNoti(true);
	}, [setActionNoti, setNotiState]);

	useEffect(() => {
		if (isNotiOpen)
			setTimeout(() => {
				setActionNoti(false);
			}, 1500);
	}, [isNotiOpen, setActionNoti]);

	return { isNotiOpen, openNoti, noti };
}

export default useNotification;