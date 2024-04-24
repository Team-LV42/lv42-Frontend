import { Outlet } from 'react-router-dom';

import Header from './components/Header.jsx';
import Index from './pages/index.jsx';

export const MainRoutes = () => {
	return (
		<>
			<Index />
			<Header />
			<Outlet />
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