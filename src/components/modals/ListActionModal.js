import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated
} from 'react-native';
import PropTypes from 'prop-types';
import {Divider, fonts, sizes} from "../../styles";
import Icon from "react-native-vector-icons/Feather";
import styled from "styled-components";

class ListActionModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            animatedValue: new Animated.Value(sizes.deviceHeight),
        };
    }

    static getDerivedStateFromProps(props, state) {
        const toValue = props.isOpen ? 0 : sizes.deviceHeight;
        Animated.timing(state.animatedValue, {
            toValue,
            duration: 500,
            useNativeDriver: true,
        }).start();

        return null;
    }

    renderContainer = ({isOpen, toggleFunc, editText, editAction, deleteText, deleteAction}) => {
        const {animatedValue} = this.state;
        if (isOpen){
            return (
                <Animated.View style={styles.container}>
                    <TouchableOpacity onPress={() => toggleFunc()} style={{flex: 1, justifyContent: 'center', transform: [{translateY: animatedValue}],}} activeOpacity={1}>
                        <Animated.View style={{
                            height: sizes.deviceWidth / 3,
                            justifyContent: 'center',
                            marginTop: 60,
                            transform: [{translateY: animatedValue}],
                        }}>
                            <ModalButtonContainer>
                                <ModalButton onPress={() => editAction()}>
                                    <Icon name='edit' size={24} color='white'/>
                                    <Divider height={10} />
                                    <Text style={[fonts.mediumText, {color: 'white'}]}>{editText}</Text>
                                </ModalButton>

                                <Divider width={30} />

                                <ModalButton onPress={() => deleteAction()}>
                                    <Icon name='trash-2' size={24} color='white'/>
                                    <Divider height={10} />
                                    <Text style={[fonts.mediumText, {color: 'white'}]}>{deleteText}</Text>
                                </ModalButton>
                            </ModalButtonContainer>
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
            );
        } else {
            return null;
        }
    };

    render(){
        return (this.renderContainer(this.props));
    }
}

const ModalButtonContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ModalButton = styled.TouchableOpacity`
    width: ${sizes.deviceWidth / 3}px;
    height: ${sizes.deviceWidth / 3}px;
    justify-content: center;
    align-items: center;
    background-color: teal;
    border-width: 1px;
    border-style: dashed;
    border-color: teal;
    border-radius: 15px;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: sizes.deviceWidth,
        height: sizes.deviceHeight - 54,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
});

ListActionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleFunc: PropTypes.func.isRequired,
    editText: PropTypes.string.isRequired,
    editAction: PropTypes.func.isRequired,
    deleteText: PropTypes.string.isRequired,
    deleteAction: PropTypes.func.isRequired,
};

export default ListActionModal;
