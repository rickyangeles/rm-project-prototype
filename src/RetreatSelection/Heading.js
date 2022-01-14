import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container} from 'react-bootstrap';

const Header = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Group Information & Estimate</h3>
                    <p>Price updated automatically as information and activities are selected</p>
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default Header;