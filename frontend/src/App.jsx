import {Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import React from 'react';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import Auth from './pages/Auth';

export default function App() {
  return (
    <>
        <Toaster
         position='top-right'
         toastOptions={{
            style: {
              fontSize: '1.8rem'
            }
        }}
        >Hi
        </Toaster>
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
    </>
  )
}
