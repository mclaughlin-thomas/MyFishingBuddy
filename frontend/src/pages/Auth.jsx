import React, { useEffect } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register'
import Layout from '../components/Layout';
import classes from './Auth.module.scss';
import userAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Auth() {
  
  const {auth} = userAuth();
  const nav = useNavigate();

  useEffect(()=>{
    if (auth){
      nav('/');
    }
  },[auth, nav])

  return (
    <Layout>
      <div className={classes.form_container}>
        <Login/>
        <Register/>
      </div>
    </Layout>
  );
}

export default Auth