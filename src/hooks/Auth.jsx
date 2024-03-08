import {
	atom,
	selectorFamily,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';
import { Link, useSearchParams } from 'react-router-dom';
import { setCookie, accessTokenState } from './Token';
const testUrl = "http://54.180.96.16:4242/auth/login?code=";



const UserLoginQuery = selectorFamily({
	key: 'UserLoginQuery',
	get: (code) => async () => {
		try {
			const response = await fetch(testUrl + code, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (400 <= response.status && response.status <= 599)
				throw new Error("response is failed");
			
			const responseData = await response.text();
			const json = responseData ? JSON.parse(responseData) : {};
			console.log(json);
			return json;
		} catch (err) {
			throw err;
		}
	}
});

const Auth = () => {
	const setAccessToken = useSetRecoilState(accessTokenState);
	const [params] = useSearchParams();
	const code = params.get('code');
	
	const authRes = useRecoilValue(UserLoginQuery(code));

	if (authRes.accessToken) {
		setAccessToken(authRes.accessToken);
	}
	setCookie('refreshToken', authRes.refreshToken, 14); // set refresh token cookie
	console.log("AT : " + authRes.accessToken);
	console.log("AT : " + useRecoilValue(accessTokenState));

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