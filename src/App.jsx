import './App.css';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useRecoilRefresher_UNSTABLE,
} from 'recoil';
import { Router, Routes, Route } from './hooks/Route.jsx';
import Login from './pages/Login.jsx';
import User from './pages/User.jsx'
import { ConnectionStatus } from './components/Test.jsx'
import React, { Suspense } from 'react';

// function App() {
//   return (
//     <RecoilRoot>
//       <Router>
//         <Routes>
//           <Route path="/user" element={<User />} />
//           <Route path="/" element={<Login />} />
//         </Routes>
//       </Router>
//     </RecoilRoot>
//   );
// }



function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div><p>Loading...</p></div>}>
        {/* <ConnectionStatus /> */}
        <Login />
      </Suspense>
    </RecoilRoot>
  )
}

export default App;
