import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import TabItem from "./TabItem";

const TabList = ({tabs, selectedTab, tabButtonAction}) => {

    return (
        <TabContainer>
            {tabs.map((tab, index) => (
                <TabItem
                    key={index}
                    item={tab}
                    tabButtonAction={tabButtonAction}
                    selectedTab={selectedTab}
                    order={index}
                />
            ))}
        </TabContainer>
    );
};

const TabContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 30px -10px 30px 0;
`;

TabList.propTypes = {
    tabs: PropTypes.array.isRequired,
    selectedTab: PropTypes.number.isRequired,
    tabButtonAction: PropTypes.func.isRequired,
};

export default TabList;
