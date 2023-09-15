import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import RoutePage from './pages/RoutePage';

// react router
//import { Link } from 'react-router-dom';

function App() {
  return (
    <>
    <div className='App'>
    <header className="App-header">
       <Link to='/'>
       <h1>Bucket Drive</h1> 
       </Link>
      
       <Link to="/bucket" style={{position:'absolute', top:10, right:5}}>
        <img src='https://icons-for-free.com/iconfiles/png/512/dustbin+empty+recycle+recycling+remove+trash+icon-1320184212528461396.png'  style={{width:'40px', height: '40px'}} alt='Bucket' />
      </Link>
    </header>
     <main>
     <RoutePage />
  
     </main>
      
    </div>
    </>
  );
}

export default App;
