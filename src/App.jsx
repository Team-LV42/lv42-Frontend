import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil';

import Login from './pages/Login.jsx';
import Header from './components/Header.jsx';
import Auth from './hooks/Auth.jsx';
import Search from './components/Search.jsx';
import UserModal from './components/UserModal.jsx';
import BookModal from './components/BookModal.jsx';
import FullLoading from './components/loading/FullLoading.jsx';
import Index from './pages/index.jsx';

import { Error404, Error500 } from './components/redirect/Error';
import ErrorBoundary from './components/ErrorBoundary.jsx';

import Report from './pages/report.jsx';
import DashBoard from './pages/dashboard.jsx';
import ComingSoon from './pages/comingsoon'

import GoogleAnalycis from './components/GoogleAnalytics';


import './App.css';
import Controller from './components/controller/Controller.jsx';

// function App() {
//   return (
//     <BrowserRouter>
//       <ErrorBoundary fallback={<Error500 />}>
//         <RecoilRoot>
//           <Suspense fallback={<FullLoading />} >
//             {/* <Index /> */}
//             {/* <Header /> */}
//             <div className='main'>
//               <Routes>
//                 {/* <Route path="/" index element={<TournamentVote />} /> */}
//                 <Route path="/" index element={<BookModal />} />
//                 <Route path="/callback" element={<Auth />} />
//                 <Route path="/test" element={<Search />} />
//                 <Route path="/user" element={<UserModal />} />
//                 <Route path="/user/:id" element={<UserModal />} />
//                 <Route path='/*' element={<Error404 />} /> 
//               </Routes>
//             </div>
//           </Suspense>
//         </RecoilRoot>
//       </ErrorBoundary>
//     </BrowserRouter>
//   );
// }

function App() {
  return (
	<BrowserRouter>
	  <GoogleAnalycis>
		<ErrorBoundary fallback={<Error500 />}>
		  <RecoilRoot>
			<Suspense fallback={<FullLoading />} >
				{/* <Header /> */}
				<Routes>
					<Route path="/" index element={<ComingSoon />} />
					<Route path="/report" element={<Report />} />
					<Route path={`/${process.env.REACT_APP_PANEL_URL}`} index element={<DashBoard />} />
					{/* <Route path="/c" element={<Controller />} />  */}
						{/* <Route path="/callback" element={<Auth />} /> */}
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
