import {
	atom,
	selectorFamily,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';
import { Link, useSearchParams } from 'react-router-dom';
import {LoginTest } from './Logintest';
import {ReissueAccessToken} from './tokenAction';
import {useToken} from './useToken';

const Auth = () => {
	const {checkToken} = useToken();
	const loginState = checkToken();
	console.log(loginState);
	if (loginState === false)		//rt가 없으면
		LoginTest();				//로그인 쿼리 보내고 쿠키 저장, 함수 이름 바꿀 예정
	return (
		<div>
			<button>	
				<Link to='/'>Back to Home</Link>    
			</button>
		</div>
	);
};

export default Auth;