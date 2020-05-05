import React, {useEffect} from 'react';
import {AbsoluteButton, TopBar} from "components";
import {useDispatch, useSelector} from "react-redux";
import {getTeamDescription, editTeamDescription} from "../../actions/teamActions";
import {
    Container,
    Divider,
    InnerContainer,
    Text,
    Title
} from "../../styles";

const TeamDescription = ({navigation}) => {
    const dispatch = useDispatch();
    const teamID = navigation.getParam('teamID', "");
    const description = useSelector(reducer => reducer.teamReducer.teamDescription);

    useEffect(() => {
        if (teamID){
            dispatch(getTeamDescription(teamID));
        }
    }, [teamID]);

    return (
        <Container>
            <TopBar isBack={true}/>

            <Container space>
                <Title>Takım Açıklaması</Title>

                <Divider height={20} />

                <InnerContainer>
                    <Text normal>{description}</Text>
                </InnerContainer>
            </Container>

            <AbsoluteButton
                icon='edit'
                backgroundColor='indigo'
                pressFunc={() =>  navigation.navigate('EditTeamDescription', {teamID, description})}
                style={{
                    bottom: 10,
                    right: 10,
                }}
            />
        </Container>
    );
};

export default TeamDescription;
