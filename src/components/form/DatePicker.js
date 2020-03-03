import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import {colors} from "../../styles";

class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            date: new Date(),
        };
    }

    datePickerHandleChange = (event, date) => {
        this.setState({show: false, date});
    };

    openDatePicker = () => {
        this.setState({show: true});
    };

    handleDateChange = (event, date) => {
        const {name, handleDateChange} = this.props;
        this.setState({show: false});
        handleDateChange(name, date);
    };

    render(){
        const {show, date} = this.state;
        const {text} = this.props;
        return (
            <Fragment>
                <TouchableOpacity onPress={() => this.openDatePicker()} style={styles.datePickerButton}>
                    <Icon name='calendar' size={24} style={styles.iconStyle} color='rgba(100, 100, 100, 1)'/>
                    <Text style={styles.datePickerButtonText}>{text}</Text>
                </TouchableOpacity>

                {show && <DateTimePicker value={date} is24Hour={true} display='default' onChange={this.handleDateChange}/>}
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    datePickerButton: {
        flexDirection: 'row',
        backgroundColor: colors.lightGray,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    iconStyle: {
        marginRight: 10,
    },
    datePickerButtonText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        includeFontPadding: false,
        color: 'rgba(0, 0, 0, 0.4)',
    },
});

DatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    handleDateChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default DatePicker;