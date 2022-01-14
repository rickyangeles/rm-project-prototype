import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'; 

class FormApp extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            groupName: "",
            groupType: "",
            date: "",
            comments: "",
        }
        this.onClicking = this.onClicking.bind(this);
    }

    onClicking = (e) => {
        e.preventDefault();
        console.log(this.state.firstName);
        console.log(this.state.lastName);
        console.log(this.state.email);
        console.log(this.state.phoneNumber);
        console.log(this.state.groupName);
        console.log(this.state.groupType);
        console.log(this.state.date);
        console.log(this.state.comments);
        alert("Thanks for contacting us!");
    }

    onFirstNameChange = (e) => this.setState({ ...this.state, firstName: e.target.value});
    onLastNameChange = (e) => this.setState({ ...this.state, lastName: e.target.value});
    onEmailChange = (e) => this.setState({ ...this.state, email: e.target.value});
    onPhoneNumberChange = (e) => this.setState({ ...this.state, phoneNumber: e.target.value});
    onGroupNameChange = (e) => this.setState({ ...this.state, groupName: e.target.value});
    onGroupTypeChange = (e) => this.setState({ ...this.state, groupType: e.target.value});
    onDateChange = (e) => this.setState({ ...this.state, date: e.target.value});
    onCommentsChange = (e) => this.setState({ ...this.state, comments: e.target.value});

    render() {
        return (
            <div>
                <Container fluid="lg">
                    <h1 style={{ textAlign: 'center' }}>Heading for Form</h1>
                    <br/>
                    <br/>
                    <Form onSubmit={this.onClicking}>
                        <Row>
                            <Col sm="12" lg="6">
                                <Form.Group style={{ textAlign: 'left' }}>
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Please enter first name" onChange={this.onFirstNameChange} />
                                </Form.Group>
                            </Col>

                            <Col sm="12" lg="6">
                                <Form.Group style={{ textAlign: 'left' }}>
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Please enter last name" onChange={this.onLastNameChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm="12" lg="6">
                                <Form.Group style={{ textAlign: 'left' }}>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" placeholder="Please enter email" onChange={this.onEmailChange} />
                                </Form.Group>
                            </Col>

                            <Col sm="12" lg="6">
                                <Form.Group style={{ textAlign: 'left' }}>
                                    <Form.Label>Phone Number:</Form.Label>
                                    <Form.Control placeholder="Please enter phone number" onChange={this.onPhoneNumberChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm="12" lg="6">
                                <Form.Group style={{ textAlign: 'left' }}>
                                    <Form.Label>Group Name: (optional)</Form.Label>
                                    <Form.Control placeholder="Please enter group name" onChange={this.onGroupNameChange} />
                                </Form.Group>
                            </Col>

                            <Col sm="12" lg="6">
                                <Form.Group style={{ textAlign: 'left' }}>
                                    <Form.Label>Group Type:</Form.Label>
                                    <Form.Control as="select" onChange={this.onGroupTypeChange}>
                                        <option id="type">Please select group type:</option>
                                        <option id="families">Families</option>
                                        <option id="children">Children</option>
                                        <option id="teens">Teens</option>
                                        <option id="men">Men</option>
                                        <option id="women">Women</option>
                                        <option id="other">Other</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm="12" lg="6">
                                <Form.Group style={{ textAlign: 'left' }}>
                                    <Form.Label>Desired Dates:</Form.Label>
                                    <Form.Control placeholder="Please enter desired dates" onChange={this.onDateChange} />
                                </Form.Group>
                            </Col>

                            <Col sm="12" lg="6">
                                <Form.Group style={{ textAlign: 'left' }}>
                                    <Form.Label>Comments or Questions?</Form.Label>
                                    <Form.Control as="textarea" rows={3} onChange={this.onCommentsChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <Form.Group onSubmit={this.onClicking}>
                                    <Button variant="primary" type="submit" size="lg">Submit</Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default FormApp;