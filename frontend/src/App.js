import logo from './logo.svg';
import './App.css';
import { Button, Col, Row } from './components';
import { useState } from 'react';
import { Doctor, Pharmacy } from './screens';

const DOCTOR = false, PHARMACY = true

function App() {
  const [currentPage, setCurrentPage] = useState(PHARMACY)
  
  return (
    <Col>
      <Row>
        <Button 
          disabled={currentPage === DOCTOR} 
          onClick={() => setCurrentPage(DOCTOR)}
        >
          DOCTOR
        </Button>

        <Button 
          disabled={currentPage === PHARMACY}
          onClick={() => setCurrentPage(PHARMACY)}
        >
          PHARMACY
        </Button>
      </Row>

      {currentPage === DOCTOR && <Doctor />}
      {currentPage === PHARMACY && <Pharmacy />}
    </Col>
  );
}

export default App;
