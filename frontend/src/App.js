import logo from './logo.svg';
import './App.css';
import { Button, Col, Row } from './components';
import { useState } from 'react';
import { Auth, Doctor, Pharmacy } from './screens';

const DOCTOR = 'doctor', PHARMACY = 'pharmacy'

function App() {
  const [user, setUser] = useState(null)
  const currentPage = user?.role

  function handleLogin({ user, token }) {
    setUser(user)
    global.token = token
  }
  
  return (
    <Col>
      {!user && (
        <Auth handleLogin={handleLogin} />
      )}

      {currentPage === DOCTOR && <Doctor token={global.token} user={user}/>}
      {currentPage === PHARMACY && <Pharmacy token={global.token} user={user}/>}
    </Col>
  );
}

export default App;
