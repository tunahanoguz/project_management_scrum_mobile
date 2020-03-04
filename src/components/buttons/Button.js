import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({color, half, leftRounded, rightRounded, text, action}) => {
    return (
        <ButtonContainer
            color={color}
            onPress={() => action()}
            half={!!half}
            leftRounded={!!leftRounded}
            rightRounded={!!rightRounded}
        >
            <ButtonText>{text}</ButtonText>
        </ButtonContainer>
    );
};

const ButtonContainer = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding-vertical: 16px;
    border-radius: 30px;
    ${({color}) => color === 'orange' && css`
        background-color: orangered;
    `};
    ${({color}) => color === 'green' && css`
        background-color: teal;
    `};
    ${({color}) => color === 'seagreen' && css`
        background-color: seagreen;
    `};
    ${({color}) => color === 'purple' && css`
        background-color: indigo;
    `};
    ${({color}) => color === 'blue' && css`
        background-color: midnightblue;
    `};
    ${({half}) => half && css`
        flex: 0.5;
    `};
    ${({leftRounded}) => leftRounded && css`
        border-top-start-radius: 30px;
        border-bottom-start-radius: 30px;
        border-top-end-radius: 0;
        border-bottom-end-radius: 0;
    `};
    ${({rightRounded}) => rightRounded && css`
        border-top-end-radius: 30px;
        border-bottom-end-radius: 30px;
        border-top-start-radius: 0;
        border-bottom-start-radius: 0;
    `};
    ${({direction}) => direction === 'left' && css`
        align-self: flex-end;
    `};
    ${({direction}) => direction === 'right' && css`
        align-self: flex-start;
    `};
`;

const ButtonText = styled.Text`
    font-family: Poppins-Medium;
    font-size: 14px;
    include-font-padding: false;
    color: white;
    text-transform: uppercase;
`;

Button.propTypes = {
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
};

export default Button;
