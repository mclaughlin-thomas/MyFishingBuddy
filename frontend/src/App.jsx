import {Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import React from 'react';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import Auth from './pages/Auth';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
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
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
    </>
  );
}

export default App;