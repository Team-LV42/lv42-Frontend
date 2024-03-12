import React from 'react';
import { RecoilRoot, atom, selector, useRecoilValue } from 'recoil';
import moment from 'moment';
import {Cookies} from 'react-cookie';

const AuthTokenQuery = selector({
	key : 'AuthTokenQuery',
	get: async () => {
		try {
			const response = await fetch("54.180.96.16:3000/auth/refresh?userId HTTP/1.1", {
				method: "get",
				mode: "no-cors",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `bearer ${document.cookie}`,
				},
			});
			if (response.status == 200)
				return response.Authrize;
			else if(response.status == 402)
				return "unauthorized RT";
			else
				throw new Error("response is failed");
		} catch (err) {
			console.log("fetch error: " + err);
		}
	}
})

function setRefreshToken(refreshToken) {
	const expires =  moment().add('14','d').toDate();
	Cookies.set("Authorized", refreshToken, {expires});
}

export function checkToken(authToken) {
	const refreshToken = document.cookie;
	//const	newAuthToken = useRecoilValue(AuthTokenQuery);
	if (refreshToken == "") {
		if (authToken == "") {	//둘 다 없을 때
			return('AT와 RT 모두 없습니다. 로그인 화면으로 이동합니다.');
			//window.location.href = '/login';
		}
		else {			//AT만 있을 때
			return('RT가 유효하지 않습니다. 로그인 화면으로 이동합니다.');
			//window.location.href = '/login';
		}
	}
	else{
		if (authToken != "") {	//RT만 있을 때
			return('AT가 유효하지 않습니다. AT를 재발급 합니다.');
			//const newAuthToken = useRecoilValue(AuthTokenQuery); // 이 부분은 다른 방식으로 처리해야 함
			//return(newAuthToken);
		}
		else {			//둘 다 있을 때
			console.log("AT : "+authToken);
			console.log("RT : "+refreshToken);
			return('AT, RT 모두 유효합니다. 작업을 계속합니다.');
		}
	}
}



// export function Test() {
//	 const isAuthToken = useRecoilValue(isAuthTokenSelector); // isAuthTokenSelector 사용

//   if (!isAuthToken) {
//     const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)refreshToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

//     if (authToken) {
//       console.log('AT가 없습니다. AT를 발급해야 합니다.');
// 	  const	newAuthToken = useRecoilValue(AuthTokenQuery);
// 	  if (!!newAuthToken){
// 		console.log('RT가 유효하지 않습니다. 로그인 화면으로 이동');
//       	window.location.href = '/login';
// 		return null;
// 	  }
// 	  console.log(`AuthToken : ${newAuthToken}\n`);
// 	  console.log('AT가 발급되었습니다. 메인 화면으로 이동합니다.');
// 	  window.location.href = '/user';
//     } else {
// 	  console.log('AT, RT 모두 없습니다. 로그인 화면으로 이동');
//       window.location.href = '/login';
//     }
//     return null;
//   }
//   else{
// 	console.log('AT가 있습니다. 메인 화면으로 이동합니다.');
// 	  window.location.href = '/user';
// 	  return null;
//   }
// }