import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import HeadingApp from './RetreatSelection/Heading';
import RetreatSizeApp from './RetreatSelection/RetreatSize';
import RetreatTypeApp from './RetreatSelection/RetreatType';
import GeneralActivitiesApp from './Activities/GeneralRecreation';
import WildlifeCenterApp from './Activities/WildlifeCenter';
import HighAdventureApp from './Activities/HighAdventure';
import HorseProgramsApp from './Activities/HorsePrograms';
import TeambuildingApp from './Activities/Teambuilding';
import PoolPartiesApp from './Activities/PoolParties';
import FormApp from './Form/Form';
import FooterApp from './Footer/Footer';

function App() {
  return (
    <div className="App">
      <Container>
        <Row className="filter-bar">
            <Col className="heading-intro" sm="12" lg="4">
                <HeadingApp />
            </Col>
          <Col className="retreat-size" sm="12" lg="4">
            <RetreatSizeApp />
          </Col>
          <Col className="retreat-type" sm="12" lg="4">
            <RetreatTypeApp />
          </Col>
        </Row>
        <br/>
        <br/>
        <br/>
        <Row>
            <Col sm="12" lg="8">
                <GeneralActivitiesApp />
                <WildlifeCenterApp />
                <HighAdventureApp />
                <TeambuildingApp />
                <HorseProgramsApp />
                <PoolPartiesApp />
            </Col>
            <Col className="sidebar" sm="12" lg="4">
                <FooterApp />
            </Col>
        </Row>
        <Row>
          <Col sm="12" lg="12">
            <FormApp />
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default App;
