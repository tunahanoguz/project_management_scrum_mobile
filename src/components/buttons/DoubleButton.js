import React from 'react';
import PropTypes from 'prop-types';
import {DirectionContainer} from "../../styles";
import Button from "./Button";

const DoubleButton = ({firstColor, secondColor, firstText, secondText, firstAction, secondAction}) => {
    return (
        <DirectionContainer row>
            <Button
                color={firstColor}
                text={firstText}
                action={firstAction}
                half
                leftRounded
            />

            <Button
                color={secondColor}
                text={secondText}
                action={secondAction}
                half
                rightRounded
            />
        </DirectionContainer>
    );
};

DoubleButton.propTypes = {
    firstColor: PropTypes.string.isRequired,
    secondColor: PropTypes.string.isRequired,
    firstText: PropTypes.string.isRequired,
    secondText: PropTypes.string.isRequired,
    firstAction: PropTypes.func.isRequired,
    secondAction: PropTypes.func.isRequired,
};

export default DoubleButton;
