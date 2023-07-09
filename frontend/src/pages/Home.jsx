import React from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/nav/Navbar';
import FishList from '../components/fish/FishList';

function Home() {
  return (
    <Layout>
      <Navbar />
      <FishList/>
    </Layout>
  );
}

export default Home