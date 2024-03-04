import {
	atom,
	selector,
	selectorFamily,
	useRecoilValue, 
	useSetRecoilState, 
	useRecoilState,
} from 'recoil';
import { Link, useSearchParams } from 'react-router-dom';

const url = "http://54.180.96.16:3000/login?code=";
const testUrl = "http://13.124.198.32:3000/login?code=";

const codeState = atom({
	key: 'codeState',
	default: '123',
});

const UserLoginQuery = selectorFamily({
	key: 'UserLoginQuery',
	get: ( code ) => async () => {
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
			console.log(await response.json());
			return response;
		} catch (err) {
			throw err;
		}
	}
});

const Auth = () => {
	const [ params ] = useSearchParams();
	const code = params.get('code');
	
	// setCodeState(code);

	const authRes = useRecoilValue(UserLoginQuery(code));
	console.log(authRes);
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