import {StatusBar, Dimensions} from 'react-native';
import styled, {css} from 'styled-components';

export const colors = {
    green: "#0c9463",
    darkGreen: "#024630",
    gray: "rgba(0, 0, 0, 0.2)",
    red: "#b22222",
    lightGray: 'rgba(0, 0, 0, 0.05)',
    yellow: "#FFB129",
    purple: "#482CA5",
    orange: "#FD8344",
    highPriorityLight: "#FFEDEE",
    highPriorityDark: "#1DC7AC",
    mediumPriorityLight: "#FFEAC5",
    mediumPriorityDark: "#FFB129",
    lowPriorityLight: "#E9F9F7",
    lowPriorityDark: "#FE4A54",
};

export const profilePhotoColors = ["midnightblue", "teal", "indigo", "orangered"];

export const gradients = {
    purpleGradient: ['#6E00DD', '#A826C7'],
    greenGradient: ['#08AEEA', '#2AF598'],
    grayGradient: ['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)'],
    grayGradientTwo: ['#cfd9df', '#e2ebf0'],
    darkGradient: ['#060518', '#060518'],
    orangeGradient: ['#F26400', '#E90D07'],
};

export const container = {
    classicContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export const sizes = {
    statusBarHeight: StatusBar.currentHeight,
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Dimensions.get('window').height,
};

export const fonts = {
    title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 24,
        includeFontPadding: false,
        marginBottom: 10,
    },
    boldTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        includeFontPadding: false,
        marginBottom: 10,
    },
    normalText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        includeFontPadding: false,
    },
    mediumText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        includeFontPadding: false,
    },
    cardTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        includeFontPadding: false,
    },
};

export const Container = styled.View`
    flex: ${({flex}) => flex ? flex : 1};
    flex-direction: column;
    justify-content: flex-start;
    background-color: #F3F5FA;
    ${({space}) => space && css`
        padding-top: 30px;
        padding-horizontal: 30px;
    `};
    ${({verticalMiddle}) => verticalMiddle && css`
        justify-content: center;
    `};
    ${({justifyEnd}) => justifyEnd && css`
        justify-content: flex-end;
    `};
    ${({justifyBetween}) => justifyBetween && css`
        justify-content: space-between;
    `};
    ${({horizontalMiddle}) => horizontalMiddle && css`
        align-items: center;
    `};
    ${({alignEnd}) => alignEnd && css`
        align-items: flex-end;
    `};
    ${({alignBetween}) => alignBetween && css`
        align-items: space-between;
    `};
    ${({white}) => white && css`
        background-color: white;
    `};
    ${({row}) => row && css`
        flex-direction: row;
    `};
    ${({column}) => column && css`
        flex-direction: column;
    `};
`;

export const InnerContainer = styled.View`
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    ${({nonSpace}) => nonSpace && css`
        padding: 0;
    `};
    ${({padding}) => padding ? css`
        padding: ${padding}px;
    ` : null};
    ${({nonRadius}) => nonRadius && css`
        border-radius: 0;
    `};
    ${({horizontalCenter}) => horizontalCenter && css`
        align-items: center;
    `};
`;

export const DirectionContainer = styled.View`
    ${({flex}) => flex && css`
        flex: ${flex};
    `};
    ${({row}) => row && css`
        flex-direction: row;
    `};
    ${({column}) => column && css`
        flex-direction: column;
    `};
    ${({justifyStart}) => justifyStart && css`
        justify-content: flex-start;
    `};
    ${({justifyCenter}) => justifyCenter && css`
        justify-content: center;
    `};
    ${({justifyEnd}) => justifyEnd && css`
        justify-content: flex-end;
    `};
    ${({justifyBetween}) => justifyBetween && css`
        justify-content: space-between;
    `};
    ${({alignStart}) => alignStart && css`
        align-items: flex-start;
    `};
    ${({alignCenter}) => alignCenter && css`
        align-items: center;
    `};
    ${({alignEnd}) => alignEnd && css`
        align-items: flex-end;
    `};
    ${({alignBetween}) => alignBetween && css`
        align-items: space-between;
    `};
    ${({flexWrap}) => flexWrap && css`
        flex-wrap: wrap;
    `};
`;

export const CardTitle = styled.Text`
    font-family: Poppins-Medium;
    ${({normal}) => normal && css`
        font-size: 16px;
        color: #282D41;
    `};
    ${({light}) => light && css`
        font-size: 13px;
        color: #9A9CA6;
    `};
`;

export const CardOrderContainer = styled.View`
    width: 50px;
    height: 50px;
    justifyContent: center;
    alignItems: center;
    margin-right: 12px;
    background-color: orangered;
    border-radius: 15px;
`;

export const CardOrderText = styled.Text`
    font-family: Poppins-Medium;
    font-size: 24px;
    color: white;
`;

export const Divider = styled.View`
    ${({width}) => width && css`
        width: ${width}px;
    `};
    ${({height}) => height && css`
        width: ${height}px;
    `};
`;

export const DotDivider = styled.View`
    width: ${({size}) => size ? size : 8}px;
    height: ${({size}) => size ? size : 8}px;
    background-color: lightgray;
    margin-left: ${({margin}) => margin ? margin : 8}px;
    margin-right: ${({margin}) => margin ? margin : 8}px;
    border-radius: 100px;
`;

export const Title = styled.Text`
    font-family: Poppins-Medium;
    font-size: 24px;
    include-font-padding: false;
    color: midnightblue;
`;

export const Text = styled.Text`
    include-font-padding: false;
    color: #1B2136;
    font-size: 14px;
    ${({normal}) => normal && css`
        font-family: Poppins-Regular;
    `};
    ${({medium}) => medium && css`
        font-family: Poppins-Medium;
    `};
    ${({color}) => color && css`
        color: ${color};
    `};
    ${({size}) => size && css`
        font-size: ${size}px;
    `};
`;

export const TextMedium = styled.Text`
    font-family: Poppins-Medium;
    font-size: 14px;
    include-font-padding: false;
    color: #1B2136;
`;

export const TextNormal = styled.Text`
    font-family: Poppins-Regular;
    font-size: 14px;
    include-font-padding: false;
    color: #1B2136;
`;
