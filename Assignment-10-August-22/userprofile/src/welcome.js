import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
//import { useNavigate } from 'react-router-dom'
export default function Welcome() {

  return (
    
    <div> 
    <Link to={"/login"}><Button variant="contained">Go to Login Page</Button></Link>
      {/* <Button onClick={navigate('login')}>Go to Login Page</Button> */}
    </div>
  )
}
