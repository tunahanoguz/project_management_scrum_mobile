import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import {
    ListItemEnd, ListItemEndLeft, ListItemEndRight,
    ListItemOrder,
    ListItemStart,
    ListItemText, OrderText,
    StyledListItem
} from "./styles";

const ListItem = ({order, orderColor, item, itemID, topTitle, bottomTitle, isFunctioned, modalFunc, goToScreenFunc, type}) => {

    const renderTitle = (title) => {
        const titleLength = title.length;
        if (titleLength > 16) {
            return title.substring(0, 16) + "...";
        } else {
            return title;
        }
    };

    return (
        <StyledListItem first={order === 1}>
            <ListItemStart>
                <ListItemOrder color={orderColor}>
                    <OrderText normal>{order}</OrderText>
                </ListItemOrder>
            </ListItemStart>

            <ListItemEnd>
                <ListItemEndLeft onPress={() => type === 'file' ? goToScreenFunc(item.downloadURL, item.contentType) : goToScreenFunc(item)}>
                    <ListItemText normal>{renderTitle(topTitle)}</ListItemText>
                    <ListItemText light>{bottomTitle}</ListItemText>
                </ListItemEndLeft>
                {isFunctioned && (
                    <ListItemEndRight onPress={() => modalFunc(itemID)}>
                        <Icon name='more-vertical' size={24} color='midnightblue' />
                    </ListItemEndRight>
                )}
            </ListItemEnd>
        </StyledListItem>
    );
};

ListItem.propTypes = {
    order: PropTypes.number.isRequired,
    orderColor: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    itemID: PropTypes.string.isRequired,
    topTitle: PropTypes.string.isRequired,
    bottomTitle: PropTypes.string.isRequired,
    isFunctioned: PropTypes.bool.isRequired,
    modalFunc: PropTypes.func.isRequired,
    goToScreenFunc: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
};

export default ListItem;
