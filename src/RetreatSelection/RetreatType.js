import React, {useContext} from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Form } from 'react-bootstrap';
import { AppContext } from '../AppContext';
var constType = "";
export var isOvernight = false; 
export var groupType = "";

const RetreatTypeApp = () => {
    const context = useContext(AppContext);
    const onTypeChange = (e) => {
        context.setGroupType(e.target.value)
        constType = e.target.value; 
        switch (constType) {
          case 'Day Group':
            isOvernight = false; 
            break;
          case 'Overnight Group': 
            isOvernight = true; 
            break; 
          default: 
            //console.log("the type isn't working");
        }
        groupType = constType;
       console.log(groupType);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="retreat-type">
                                <Form.Label>Select Group Type</Form.Label>
                                <Form.Control as="select" onChange={onTypeChange}>
                                    <option id="type" value="none">Group Type:</option>
                                    <option defaultValue id="day" value="day">Day Group</option>
                                    <option id="overnight" value="overnight">Overnight Group</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RetreatTypeApp;