import React from 'react';
import {TopBar} from "components";
import {
    Container,
    Divider,
    InnerContainer,
    Text,
    Title
} from "../../styles";

const TeamDescription = ({navigation}) => {
    const description = navigation.getParam('description', "");

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
        </Container>
    );
};

export default TeamDescription;
