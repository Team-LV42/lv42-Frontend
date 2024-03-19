import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil';

import Login from './pages/Login.jsx';
import Header from './components/Header.jsx';
import Auth from './hooks/Auth.jsx';
import Book from './containers/Book.jsx';
import Search from './components/Search.jsx';
import UserModal from './components/UserModal.jsx';
import BookModal from './components/BookModal.jsx';

import Index from './pages/index.jsx';

import ErrorBoundary from './components/ErrorBoundary.jsx';

import './App.css';

function App() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <RecoilRoot>
        <Suspense fallback={<div><p>Loading...</p></div>} >
          <Index />
          <Header />
          <div className='main'>
             <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/test" element={<Search />} />
              <Route path="/callback" element={<Auth />} />
              <Route path="/user" element={<UserModal />} />
              <Route path="/book" element={<BookModal />} />
            </Routes>
          </div>
        </Suspense>
      </RecoilRoot>
    </ErrorBoundary>
  );
}

export default App;
