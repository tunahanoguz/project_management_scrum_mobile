import React, {Component, Fragment} from 'react';
import {View, Picker, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {colors, fonts, sizes} from "../../styles";

class SelectInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: null,
        };
    }

    renderErrorMessage = (errorMessage) => {
        if (errorMessage !== ""){
            return <Text style={styles.errorMessage}>{errorMessage}</Text>;
        } else {
            return null;
        }
    };

    renderSelections = (selections) => {
        return (selections.map(selection => {
            return (
                <Picker.Item
                    key={selection.id}
                    label={selection.text}
                    value={selection.id}
                />
            );
        }));
    };

    render(){
        const {value, name, text, selections, setSelectedItem, errorMessage} = this.props;
        return (
            <Fragment>
                <View style={styles.selectInput}>
                    <Picker
                        selectedValue={value}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedItem(name, itemValue);
                        }}>
                        <Picker.Item label={text} value={null} />
                        {this.renderSelections(selections)}
                    </Picker>
                </View>
                {this.renderErrorMessage(errorMessage)}
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    selectInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 3,
        paddingHorizontal: 10,
        backgroundColor: colors.lightGray,
        borderRadius: 10,
    },
    selectInputText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        includeFontPadding: false,
        color: 'rgba(0, 0, 0, 0.4)',
    },
    picker: {
        width: '100%',
    },
    selectModal: {
        width: sizes.deviceWidth,
        height: sizes.deviceHeight,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'red'
    },
    innerModal: {
        width: sizes.deviceWidth / 2.5,
        height: sizes.deviceWidth / 2.5,
        marginBottom: 56,
        backgroundColor: 'white',
    },
    errorMessage: {
        ...fonts.mediumText,
        color: colors.red,
        marginBottom: 20,
    },
});

SelectInput.propTypes = {
    value: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    selections: PropTypes.array.isRequired,
    setSelectedItem: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
};

export default SelectInput;
