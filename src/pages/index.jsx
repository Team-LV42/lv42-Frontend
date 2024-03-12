
import { Link } from 'react-router-dom';
import Login from './Login.jsx';

export const Index = () => {


	return (
		<>
			<Login />
			<h1>테스트 페이지 연결링크</h1>
			<p><Link to="/test">예약 현황</Link></p>
			<p><Link to="/book">Book</Link></p>
			<p><Link to="/user">User</Link></p>
		</>
	)
}

export default Index;