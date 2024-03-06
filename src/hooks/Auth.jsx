import {
	atom,
	selector,
	selectorFamily,
	useRecoilValue, 
	useSetRecoilState, 
	useRecoilState,
} from 'recoil';
import { Link, useSearchParams } from 'react-router-dom';
import { moment } from 'moment';
import { CookiesProvieder } from 'react-cookie';
const url = "http://54.180.96.16:3000/login?code=";
const testUrl = "http://54.180.96.16:4242/auth/login?code=";

const codeState = atom({
	key: 'codeState',
	default: '123',
});

const UserLoginQuery = selectorFamily({
	key: 'UserLoginQuery',
	get: (code) => async () => {
		try {
			const response = await fetch(testUrl + code, {
				method: "get",
				// mode: "no-cors",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (400 <= response.status && response.status <= 599)
				throw new Error("response is failed");
			
			const responseData = await response.text();
			const json = responseData ? JSON.parse(responseData) : {}; // 응답 데이터가 있을 때만 JSON 파싱
			console.log(json);
			return json;
		} catch (err) {
			throw err;
		}
	}
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setRefreshToken(refreshToken) {
	const expires = new Date();
    expires.setDate(expires.getDate() + 14);
	//setCookie("Authorized", refreshToken, {expires});
	console.log("setcookie" + expires);
	setCookie('refreshToken', refreshToken, expires);
}

const Auth = () => {
	const [params] = useSearchParams();
	const code = params.get('code');
	
	// setCodeState(code);

	const authRes = useRecoilValue(UserLoginQuery(code));
	console.log("AT : " + authRes.accessToken);
	console.log("RT : " + authRes.refreshToken);

	if (authRes.refreshToken)
		setRefreshToken(authRes.refreshToken);
	if (authRes.accessToken)
		setAcessToken(authRes.accessToken);
	return (
		<div>
			{authRes.status === 200 ? "Success Login" : "Failed Login"}
			<button>
				<Link to='/'>Back to Home</Link>	
			</button>
		</div>
	)
};

export default Auth;