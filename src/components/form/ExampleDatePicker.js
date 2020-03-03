import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import 'moment/locale/tr'
import {colors, fonts} from "../../styles";

class ExampleDatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            date: new Date(),
        };
    }

    openDatePicker = () => {
        this.setState({show: true});
    };

    renderDate = (value) => {
        moment.locale('tr');
        return moment(value).format('LLL');
    };

    render(){
        const {show} = this.state;
        const {value, name, text, handleChange} = this.props;
        return (
            <Fragment>
                <TouchableOpacity onPress={() => this.openDatePicker()} style={styles.datePickerButton}>
                    <Icon name='calendar' size={24} style={styles.iconStyle} color='rgba(100, 100, 100, 1)'/>
                    <View>
                        <Text style={styles.datePickerButtonText}>{text}</Text>
                        <Text style={fonts.normalText}>{this.renderDate(value)}</Text>
                    </View>
                </TouchableOpacity>

                <DateTimePickerModal mode='datetime' isVisible={show} locale='tr_TR' date={value} is24Hour={true} display='default' onConfirm={(date) => {
                    this.setState({show: false});
                    if (date !== undefined){
                        handleChange(name, date);
                    }
                }} onCancel={() => this.setState({show: false})}/>
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

ExampleDatePicker.propTypes = {
    value: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

export default ExampleDatePicker;