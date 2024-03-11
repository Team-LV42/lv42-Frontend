
export function setCookie(cname, cvalue, exdays) {
	const expires = new Date();
	expires.setDate(expires.getDate() + exdays);
	document.cookie = cname + "=" + cvalue + "; expires=" + expires.toUTCString() + "; path=/";
}

export function getCookies() {
    const cookies = document.cookie.split(';').reduce((cookiesObj, cookie) => {
        const [name, value] = cookie.split('=').map(item => item.trim());
        cookiesObj[name] = value;
        return cookiesObj;
    }, {});

    return cookies;
}