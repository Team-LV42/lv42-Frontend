import {
	atom,
	selectorFamily,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';
import { Link, useSearchParams } from 'react-router-dom';

export function setCookie(cname, cvalue, exdays) {
	const expires = new Date();
	expires.setDate(expires.getDate() + exdays);
	document.cookie = cname + "=" + cvalue + "; expires=" + expires.toUTCString() + "; path=/";
}

export const accessTokenState = atom({
	key: 'accessTokenState',
	default: null,
});
