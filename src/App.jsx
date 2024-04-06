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

import Error from './components/redirect/Error';
import ErrorBoundary from './components/ErrorBoundary.jsx';

import Tournament from './pages/Tournament.jsx';

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
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <RecoilRoot>
            <Suspense fallback={<FullLoading />} >
              <Routes>
                <Route path="/callback" element={<Auth />} />
                <Route path="/" index element={<Tournament />}/>
                <Route path='/*' element={<Error />} /> 
              </Routes>
            </Suspense>
          </RecoilRoot>
        </ErrorBoundary>
      </GoogleAnalycis>
    </BrowserRouter>
  );
}

export default App;
