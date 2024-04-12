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

import { T404, T500 } from './components/tournament/TournamentError.jsx';
import ComingSoon from './pages/comingsoon.jsx';

import GoogleAnalycis from './components/GoogleAnalytics';


import './App.css';

// function App() {
//   return (
//     <ErrorBoundary fallback={<p>Something went wrong</p>}>
//       <RecoilRoot>
//         <Suspense fallback={<FullLoading />} >
//           {/* <Index /> */}
//           {/* <Header /> */}
//           <div className='main'>
//              <Routes>
//               <Route path="/" index element={<TournamentVote />} />
//               <Route path="/callback" element={<Auth />} />
//               <Route path='/*' element={<Error />} /> 
//               {/* <Route path="/" index element={<BookModal />} />
//               <Route path="/test" element={<Search />} />
//               <Route path="/user" element={<UserModal />} />
//               <Route path="/user/:id" element={<UserModal />} /> */}
//             </Routes>
//           </div>
//         </Suspense>
//       </RecoilRoot>
//     </ErrorBoundary>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <GoogleAnalycis>
        <ErrorBoundary fallback={<T500 />}>
          <RecoilRoot>
            <Suspense fallback={<FullLoading />} >
              <Routes>
                <Route path="/" index element={<ComingSoon />} />
                {/* <Route path="/callback" element={<Auth />} /> */}
                {/* <Route path="/" index element={<Tournament />}/> */}
                {/* <Route path={`/${process.env.REACT_APP_PANEL_URL}`} element={<Panel />} /> */}
                <Route path='/*' element={<T404 />} /> 
              </Routes>
            </Suspense>
          </RecoilRoot>
        </ErrorBoundary>
      </GoogleAnalycis>
    </BrowserRouter>
  );
}

export default App;
