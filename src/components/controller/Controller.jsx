import { useRecoilValue } from 'recoil';

import { controllerType } from '../../store/report';
import DualSense from './Dualsense';

import '../../styles/controller/dualsense.css';


const Controller = () => {
	const type = useRecoilValue(controllerType);

	return (
		<>
			<DualSense />
		</>
	)
}

export default Controller;