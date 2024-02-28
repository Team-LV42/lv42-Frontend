import {
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
} from "recoil";



const UserLoginState = atom({
	key: 'UserLoginState',
	default: '',
});

const UserLoginQuery = selector({
	key: 'UserLoginQuery',
	get: async () => {
		try {
			const response = await fetch("", {
				method: "get",
				mode: "no-cors",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (400 <= response.status && response.status <= 599)
				throw new Error("response is failed");
			return response;
		} catch (err) {
			console.log("fetch error: " + err);
		}
	}
})

function Login() {
	const [userState, setUserState] = useRecoilState(UserLoginState);
	const getUser = useRecoilValue(UserLoginQuery);

	const onClick = () => {
		setUserState(getUser());
	}
	return (
		<div>
			<button value={userState} onClick={onClick}>Login</button>
		</div>
	)
};

export default Login;