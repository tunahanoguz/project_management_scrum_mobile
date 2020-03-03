import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import TabList from "./TabList";
import {Container} from "../../styles";

const TabContent = ({tabs, selectedTab, tabButtonAction, tabContents}) => {
    return (
        <Container>
            <TabList tabs={tabs} tabButtonAction={tabButtonAction} selectedTab={selectedTab}/>
            {tabContents()}
        </Container>
    );
};

TabContent.propTypes = {
    tabs: PropTypes.array.isRequired,
    selectedTab: PropTypes.number.isRequired,
    tabButtonAction: PropTypes.func.isRequired,
    tabContents: PropTypes.func.isRequired,
};

export default TabContent;