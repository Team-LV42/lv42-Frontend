
// useCookie 커스텀 훅
export function Cookie() {
  // 쿠키를 설정하는 함수
  const setCookie = (cname, cvalue, exdays) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + exdays);
    document.cookie = `${cname}=${cvalue}; expires=${expires.toUTCString()}; path=/`;
  };

  // 쿠키를 가져오는 함수
  const getCookies = () => {
    return document.cookie.split(';').reduce((cookiesObj, cookie) => {
      const [name, value] = cookie.split('=').map(item => item.trim());
      cookiesObj[name] = value;
      return cookiesObj;
    }, {});
  };

  // 쿠키를 제거하는 함수
  const removeCookie = (cname) => {
    setCookie(cname, '', -1); // 쿠키 만료 날짜를 과거로 설정하여 제거
  };

  return { setCookie, getCookies, removeCookie };
}


// export function setCookie(cname, cvalue, exdays) {
// 	const expires = new Date();
// 	expires.setDate(expires.getDate() + exdays);
// 	document.cookie = cname + "=" + cvalue + "; expires=" + expires.toUTCString() + "; path=/";
// }

// export function getCookies() {
//     const cookies = document.cookie.split(';').reduce((cookiesObj, cookie) => {
//         const [name, value] = cookie.split('=').map(item => item.trim());
//         cookiesObj[name] = value;
//         return cookiesObj;
//     }, {});

//     return cookies;
// }