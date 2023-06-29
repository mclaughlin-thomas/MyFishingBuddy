import {Toaster} from 'react-hot-toast';
import React from 'react';

export default function App() {
  return (
    <>
        <Toaster position='top-right'
         toastOptions={{
            style: {
                fontSize: '1.8rem'
            }
        }}
        >Hi
        </Toaster>
        
        <Routes></Routes>
    </>
  )
}
