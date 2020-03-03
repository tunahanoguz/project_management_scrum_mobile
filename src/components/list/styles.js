import styled, {css} from 'styled-components';

export const ListContainer = styled.View`
    flex: 1;
    background-color: white;
    padding: 0px 20px 0px 20px;
    border-radius: 15px;
`;

export const StyledListItem = styled.View`
    flex-direction: row;
    padding-vertical: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #F3F5FA;
    ${({first}) => first && css`
        margin-top: 10px;
    `};
`;

export const ListItemStart = styled.View`
    margin-right: 10px;
`;

export const ListItemEnd = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ListItemEndLeft = styled.TouchableOpacity`
    flex: 0.9;
    justify-content: center;
`;

export const ListItemEndRight = styled.TouchableOpacity`
    flex: 0.1;
    align-items: center;
    padding-right: 6px;
`;

export const ListItemOrder = styled.View`
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    ${({color}) => color ? css`
        background-color: ${color};
    ` : css`
        background-color: orangered;
    `};
`;

export const OrderText = styled.Text`
    font-family: Poppins-Medium;
    font-size: 20px;
    color: white;
    include-font-padding: false;
`;

export const ListItemText = styled.Text`
    font-family: Poppins-Medium;
    ${({normal}) => normal && css`
        font-size: 15px;
        color: #282D41;
    `};
    ${({light}) => light && css`
        font-size: 13px;
        color: #9A9CA6;
    `};
`;
