import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Index from './pages/index';

export const MainRoutes = () => {
	return (
		<>
			{/* <!-- 화면 컨테이너 --> */}
			<div class="w-[calc(100dvw)] h-[calc(100dvh)] flex items-center justify-center bg-basic bg-cover bg-default md:bg-default-desktop">
				{/* <!-- 전체 컨테이너 --> */}
				<div class="relative max-w-[450px] w-full h-full flex flex-col items-center justify-center">
					<Index />
					<Header />
					<Outlet />
				</div>
			</div>
		</>
	)
}

export const IssueRoutes = () => {
	return (
		<>
		<Outlet />
		</>
	)
}