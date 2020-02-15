import {StatusBar, Dimensions} from 'react-native';

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

export const gradients = {
    purpleGradient: ['#6E00DD', '#A826C7'],
    greenGradient: ['#08AEEA', '#2AF598'],
    grayGradient: ['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)'],
    grayGradientTwo: ['#cfd9df', '#e2ebf0'],
    darkGradient: ['#060518', '#060518'],
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