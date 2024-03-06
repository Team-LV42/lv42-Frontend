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
//import User from './pages/user.jsx'
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
