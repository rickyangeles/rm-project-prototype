import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';

class DescriptionApp extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                   <Col>
                    <h1>Refreshing Mountain Activities Budget Calculator</h1>
                    <br/>
                    <h6>Plan a budget for your event, based on the group size you have and the activities 
                        you are most interested in.  Select the activities you like and the calculator 
                        will estimate an average price per person.
                    </h6>
                   </Col> 
                </Row>
            </Container>
        )
    }
}

export default DescriptionApp;