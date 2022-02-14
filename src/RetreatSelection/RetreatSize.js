import React, {useContext, useEffect, useState} from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Form } from 'react-bootstrap';
import { AppContext } from '../AppContext';

let constHours = "";
let constSize = "";
let medianSize = "";

const RetreatSizeApp = () => {
    const context = useContext(AppContext);
    const onSizeChange = (e) => {
        //this.setState({ ...this.state, size: e.target.value });
        context.setGroupSize(e.target.value)
        constSize = e.target.value; 
        switch (constSize) {
          case '20-39 Persons':
            constHours = 2;
            medianSize = 30;
            break;
          case '40-59 Persons': 
            constHours = 3;
            medianSize = 50;
            break;
          case '60-79 Persons':
            constHours = 4;
            medianSize = 70;
            break;
          case '80+ Persons':
            constHours = 5;
            medianSize = 80;  
            break;
          default: 
        } 
        context.setConstHours(constHours);
        context.setConstSize(constSize);
        context.setMedianSize(medianSize);
    }
        return (
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="retreat-size">
                                    <Form.Label>Enter Group Size</Form.Label>
                                    <Form.Control as="select" onChange={onSizeChange}>
                                        <option id="size">Group Size:</option>
                                        <option id="20-39">20-39 Persons</option>
                                        <option id="40-59">40-59 Persons</option>
                                        <option id="60-9">60-79 Persons</option>
                                        <option id="80+">80+ Persons</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
}

export default RetreatSizeApp;