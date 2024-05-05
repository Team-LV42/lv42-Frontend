import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil';

import Auth from './hooks/Auth.jsx';
import Search from './components/Search.jsx';
import User from './components/User.jsx';
import Book from './components/Book.jsx';
import FullLoading from './components/loading/FullLoading.jsx';
import { MainRoutes, IssueRoutes } from './Router.jsx';

import { Error404, Error500 } from './components/redirect/Error';
import ErrorBoundary from './components/ErrorBoundary.jsx';

import Report from './pages/report.jsx';
import DashBoard from './pages/dashboard.jsx';

import GoogleAnalycis from './components/GoogleAnalytics';
import './App.css';

const App = () => {
  return (
	<BrowserRouter>
	  <GoogleAnalycis>
		<ErrorBoundary fallback={<Error500 />}>
		  <RecoilRoot>
			<Suspense fallback={<FullLoading />} >
				<Routes>
					<Route path="/" element={<MainRoutes />}>
						<Route index element={<Book />} />
						<Route path="callback" element={<Auth />} />
						<Route path="test" element={<Search />} /> 
						<Route path="user/:id" element={<User />} />
					</Route>
					<Route path="/" element={<IssueRoutes />} >
						<Route path="report" element={<Report />} />
						<Route path={`${process.env.REACT_APP_PANEL_URL}`} index element={<DashBoard />} />
					</Route>
					<Route path='/*' element={<Error404 />} /> 
				</Routes>
			</Suspense>
		  </RecoilRoot>
		</ErrorBoundary>
	  </GoogleAnalycis>
	</BrowserRouter>
  );
}

export default App;
