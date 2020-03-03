import React from 'react';
import styled, {css} from "styled-components";
import {Text} from "react-native";
import PropTypes from 'prop-types';
import {Divider} from "../../styles";

const TabItem = ({item, order, selectedTab, tabButtonAction}) => {
    const {icon, name} = item;
    return (
        <Tab selected={order === selectedTab} onPress={() => tabButtonAction(order)}>
            <Text style={{fontSize: 16,}}>{icon}</Text>
            <Divider height={6}/>
            <TabText selected={order === selectedTab}>{name}</TabText>
        </Tab>
    );
};

const Tab = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    padding-vertical: 15px;
    border-radius: 15px;
    border-width: 2px;
    border-style: dashed;
    border-color: #E6E8EE;
    ${({selected}) => selected && css`
        background-color: white;
        border-style: solid;
        border-color: white;
    `};
`;

const TabText = styled.Text`
    font-family: Poppins-Medium;
    font-size: 14px;
    color: #8A929B;
    ${({selected}) => selected && css`
        color: #282D41;
    `}
`;

TabItem.propTypes = {
    item: PropTypes.object.isRequired,
    order: PropTypes.number.isRequired,
    selectedTab: PropTypes.number.isRequired,
    tabButtonAction: PropTypes.func.isRequired,
};

export default TabItem;