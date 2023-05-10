import React, {useContext} from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Form } from 'react-bootstrap';
import { AppContext } from '../AppContext';


var constType = "";
export var isOvernight = false; 


const RetreatEventTypeApp = () => {
    const context = useContext(AppContext);
    const onEventTypeChange = (e) => {
        context.setGroupEventType(e.target.value)
        constType = e.target.value; 
        
       context.setGroupEventType(constType);
    } 

    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="event-type">
                                <Form.Label>Select Group Type</Form.Label>
                                <Form.Control as="select" onChange={onEventTypeChange}>
                                    <option id="type" value="none">Select Group Type</option>
                                    <option value="Team Building">Team Building</option>
                                    <option value="School Field Trip">School Field Trip</option>
                                    <option value="Family/Friends Outing">Family/Friends Outing</option>
                                    <option value="Other">Other</option>    
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                    </Form> 
                </Col>
            </Row>
        </Container>
    )
}

export default RetreatEventTypeApp;
