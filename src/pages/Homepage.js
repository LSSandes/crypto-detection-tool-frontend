import React from 'react'
import Banner from '../components/banner/Banner'
import Coins_table from '../components/Coins_table'
const Homepage = () => {
  return (
    <>
      {/* Homepage will have 
        1. Banner 
        2. Table*/}
      <Banner/> 
      <Coins_table />
    </>
  )
}

export default Homepage
