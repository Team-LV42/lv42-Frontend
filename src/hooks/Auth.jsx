import { atom, selector, useRecoilValue } from 'recoil';
import { useSetRecoilState,} from 'recoil';
import { UserLoginState } from '../pages/Login';
import { Link, redirect, useSearchParams } from 'react-router-dom';

const url = "http://54.180.96.16:3000/login?code=";

const codeState = atom({
	key: 'codeState',
	default: '',
});

const UserLoginQuery = selector({
	key: 'UserLoginQuery',
	get: async ({ get }) => {
		try {
			const code = get(codeState);
			const response = await fetch(url + code, {
				method: "get",
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
	const setCodeState = useSetRecoilState(codeState);
	const setUserState = useSetRecoilState(UserLoginState);
	const authRes = useRecoilValue(UserLoginQuery);
	const code = params.get('code');

	setUserState(code);
	setCodeState(code);

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