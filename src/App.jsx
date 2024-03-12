import './App.css';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useRecoilRefresher_UNSTABLE,
} from 'recoil';
import { Route, Routes } from 'react-router-dom'
// import { Router, Routes, Route } from './hooks/Route.jsx';
import Login from './pages/Login.jsx';
import Auth from './hooks/Auth.jsx'
<<<<<<< Updated upstream
import User from './pages/user.jsx'
import { ConnectionStatus } from './components/Test.jsx'
import React, { Suspense } from 'react';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div><p>Loading...</p></div>} >
        <Routes>
          <Route path="/callback" element={<Auth />} />
          <Route index element={<Login />} />
        </Routes>
      </Suspense>
    </RecoilRoot>
=======
import Book from './containers/Book';
import Nav from './components/nav.jsx';
import { UserModal } from './components/user/UserModal.jsx';
import BookModal from './components/BookModal.jsx';

import Index from './pages/index.jsx';

import ErrorBoundary from './components/ErrorBoundary.jsx';

import './App.css';

function App() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <RecoilRoot>
        <Suspense fallback={<div><p>Loading...</p></div>} >
          <Nav />
          <Routes>
            <Route path="/test" element={<Book />} />
            <Route path="/callback" element={<Auth />} />
            <Route index element={<Index />} />
            <Route path="/user" element={<UserModal />} />
            <Route path="/book" element={<BookModal />} />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </ErrorBoundary>
>>>>>>> Stashed changes
  );
}



// function App() {
//   return (
//     <RecoilRoot>
//       <Suspense fallback={<div><p>Loading...</p></div>}>
//         {/* <ConnectionStatus /> */}
//         <Login />
//       </Suspense>
//     </RecoilRoot>
//   )
// }

export default App;
