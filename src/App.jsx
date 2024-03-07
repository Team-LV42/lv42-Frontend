import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil';

import Login from './pages/Login.jsx';
import Auth from './hooks/Auth.jsx'
import Book from './containers/Book';

import ErrorBoundary from './components/ErrorBoundary.jsx';

import './App.css';

function App() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <RecoilRoot>
        <Suspense fallback={<div><p>Loading...</p></div>} >
          <Routes>
            <Route path="/test" element={<Book />} />
            <Route path="/callback" element={<Auth />} />
            <Route index element={<Login />} />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </ErrorBoundary>
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
