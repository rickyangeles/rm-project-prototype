import React, { useState, useEffect, useContext} from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import HeadingApp from './RetreatSelection/Heading';
import RetreatSizeApp from './RetreatSelection/RetreatSize';
import RetreatTypeApp from './RetreatSelection/RetreatType';
import RetreatEventTypeApp from './RetreatSelection/RetreatEventType';
import GeneralActivitiesApp from './Activities/GeneralRecreation';
import WildlifeCenterApp from './Activities/WildlifeCenter';
import HighAdventureApp from './Activities/HighAdventure';
import HorseProgramsApp from './Activities/HorsePrograms';
import TeambuildingApp from './Activities/Teambuilding';
import PoolPartiesApp from './Activities/PoolParties';
import LargeGroupsApp from './Activities/LargeGroups';
import NothingSelectedApp from './Activities/NothingSelected';

import FormApp from './Form/Form';
import FooterApp from './Footer/Footer';
import { isOvernight } from './RetreatSelection/RetreatType';
import {AppContext} from './AppContext';



function App() {
    const context = useContext(AppContext)

    const [groupSize,                       setGroupSize] = useState(0);
    const [groupType,                       setGroupType] = useState(0);
    const [groupEventType,                  setGroupEventType] = useState(0);

    const [constHours,                      setConstHours] = useState("");
    const [constSize,                       setConstSize] = useState("");
    const [medianSize,                      setMedianSize] = useState("");

    const [highAdventuretotalSum,           setHighAdventuretotalSum] = useState("");
    const [generalRecreationtotalSum,       setGeneralRecreationtotalSum] = useState("");
    const [wildLifetotalSum,                setWildLifetotalSum] = useState("");
    const [teamBuildingtotalSum,            setTeamBuildingtotalSum] = useState("");
    const [horseProgramstotalSum,           setHorseProgramstotalSum] = useState("");
    const [poolPartytotalSum,               setPoolPartytotalSum] = useState("");

    
    const [highAdventuretotalGroupSum,      setHighAdventuretotalGroupSum] = useState(0);
    const [generalRecreationtotalGroupSum,  setGeneralRecreationtotalGroupSum] = useState(0);
    const [wildLifetotalGroupSum,           setWildLifetotalGroupSum] = useState(0);
    const [teamBuildingtotalGroupSum,       setTeamBuildingtotalGroupSum] = useState(0);
    const [horseProgramstotalGroupSum,      setHorseProgramstotalGroupSum] = useState(0);
    const [poolPartytotalGroupSum,          setPoolPartytotalGroupSum] = useState(0);

    const [totalGroupPrice,                 setTotalGroupPrice] = useState(0);


    const [highAdventure,                   setHighAdventure] = useState([]);
    const [wildLife,                        setWildLife] = useState([]);
    const [generalRecreation,               setGeneralRecreation] = useState([]);
    const [poolParties,                     setPoolParties] = useState([]);
    const [horsePrograms,                   setHorsePrograms] = useState([]);
    const [teamBuilding,                    setTeamBuilding] = useState([]);
    
    const [selectedHighAdventureItems,      setSelectedHighAdventureItems] = useState(0);
    const [selectedGeneralRecreationItems,  setSelectedGeneralRecreationItems] = useState(0);
    const [selectedWildLifeItems,           setSelectedWildLifeItems] = useState(0);
    const [selectedTeamBuildingItems,       setSelectedTeamBuildingItems] = useState(0);
    const [selectedHorseProgramsItems,      setSelectedHorseProgramsItems] = useState(0);
    const [selectedPoolPartyItems,          setSelectedPoolPartyItems] = useState(0);


    const initialValue = {
        groupSize,                      setGroupSize,
        groupType,                      setGroupType,
        groupEventType,                 setGroupEventType,
        constHours,                     setConstHours,
        constSize,                      setConstSize,
        medianSize,                     setMedianSize,

        highAdventure,                  setHighAdventure,
        wildLife,                       setWildLife,
        generalRecreation,              setGeneralRecreation,
        poolParties,                    setPoolParties,
        horsePrograms,                  setHorsePrograms,
        teamBuilding,                   setTeamBuilding,

        highAdventuretotalSum,          setHighAdventuretotalSum,
        generalRecreationtotalSum,      setGeneralRecreationtotalSum,
        wildLifetotalSum,               setWildLifetotalSum,
        teamBuildingtotalSum,           setTeamBuildingtotalSum,
        horseProgramstotalSum,          setHorseProgramstotalSum,
        poolPartytotalSum,              setPoolPartytotalSum,
        
        highAdventuretotalGroupSum,     setHighAdventuretotalGroupSum,
        generalRecreationtotalGroupSum, setGeneralRecreationtotalGroupSum,
        wildLifetotalGroupSum,          setWildLifetotalGroupSum,
        teamBuildingtotalGroupSum,      setTeamBuildingtotalGroupSum,
        horseProgramstotalGroupSum,     setHorseProgramstotalGroupSum,
        poolPartytotalGroupSum,         setPoolPartytotalGroupSum,

        totalGroupPrice,                setTotalGroupPrice,
        highAdventure,                  setHighAdventure,
        horsePrograms,                  setHorsePrograms,
        teamBuilding,                   setTeamBuilding,
        generalRecreation,              setGeneralRecreation,

        selectedHighAdventureItems,     setSelectedHighAdventureItems,
        selectedGeneralRecreationItems, setSelectedGeneralRecreationItems,
        selectedWildLifeItems,          setSelectedWildLifeItems,
        selectedTeamBuildingItems,      setSelectedTeamBuildingItems,
        selectedHorseProgramsItems,     setSelectedHorseProgramsItems,
        selectedPoolPartyItems,         setSelectedPoolPartyItems
        
    }
    return (
        
        <AppContext.Provider value={initialValue}>
            <div className="App">
                <Container>
                    <Row className="filter-bar">
                        <Col className="heading-intro" sm="12" lg="3">
                            <HeadingApp />
                        </Col>
                        <Col className="retreat-size" sm="12" lg="3">
                            <RetreatSizeApp />
                        </Col>
                        <Col className="event-type" sm="12" lg="3">
                            <RetreatEventTypeApp />
                        </Col>
                        <Col className="retreat-type" sm="12" lg="3">
                            <RetreatTypeApp />
                        </Col>
                    </Row>
                    <div className="activity-detail">
                        <p>Activities can generally accommodate 20 people per hour. Example, with a group size of 20-39 you would need 2 activities to keep everyone occupied over 2 hrs. The pricing automatically recognizes number of hours needed based on your group size.</p>
                    </div>
                    <Row>
                        <Col sm="12" lg="8">
                            {groupSize === 0 || groupType === 0 || groupEventType == 0 ? <NothingSelectedApp /> : null }
                            <HighAdventureApp />
                            <TeambuildingApp />
                            <WildlifeCenterApp />
                            <HorseProgramsApp />
                            <GeneralActivitiesApp />     
                            <PoolPartiesApp />
                            {groupSize === '80+ Persons' && groupType !== 0 ? <LargeGroupsApp /> : null }
                        </Col>
                        <Col className="sidebar" sm="12" lg="4">
                            <FooterApp />
                        </Col>
                    </Row>
                </Container>
            </div>
        </AppContext.Provider>
    );
}

export default App;
