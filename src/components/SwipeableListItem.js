import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Animated, PanResponder} from 'react-native';
import PropTypes from 'prop-types';
import {colors, fonts, sizes} from "../styles";
import Icon from "react-native-vector-icons/Feather";

class SwipeableListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            enable: true,
            position: new Animated.ValueXY(),
        };

        this.gestureDelay = -35;

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderGrant: (evt, gestureState) => {
                const position = this.state.position.__getValue();
                const {x, y} = position;

                if (x > -200){
                    this.state.position.setOffset(this.state.position.__getValue());
                    this.state.position.setValue({ x: 0, y: 0 });
                } else {
                    this.state.position.setOffset({x: 0, y: 0});
                    this.state.position.setValue({ x: 0, y: 0 });
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx < -35) {
                    this.setScrollViewEnabled(false);
                    let newX = gestureState.dx + this.gestureDelay;
                    this.state.position.setValue({x: newX, y: 0});
                } else {
                    this.setScrollViewEnabled(true);
                    this.state.position.setValue({x: 0, y: 0});
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx >= -100) {
                    Animated.timing(this.state.position, {
                        toValue: {x: 0, y: 0},
                        duration: 500,
                    }).start();
                } else if (gestureState.dx < -100 && gestureState.dx > -200) {
                    // this.position.setValue({x: 100, y: 0});
                    Animated.timing(this.state.position, {
                        toValue: {x: -100, y: 0},
                        duration: 500,
                    }).start();
                } else {
                    Animated.timing(this.state.position, {
                        toValue: {x: -200, y: 0},
                        duration: 500,
                    }).start();
                }
            },
        });
    }

    setScrollViewEnabled = (enabled) => {
        this.props.setScrollEnabled(enabled);
    };

    alertSomething = console.log("asd");

    render(){
        return (
            <View style={styles.itemOuter}>
                <Animated.View style={[this.state.position.getLayout()]} {...this._panResponder.panHandlers}>
                    <View style={styles.itemInner}>
                        <Text style={fonts.mediumText}>{this.props.item}</Text>
                    </View>
                    <TouchableOpacity style={[styles.itemAbsolute, {right: 0, backgroundColor: 'blue',}]} onPress={this.alertSomething}>
                        <Icon name='edit' size={20} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemAbsolute, {right: 100, backgroundColor: 'red',}]} onPress={() => alert("asd!")}>
                        <Icon name='trash-2' size={20} color='white' />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemOuter: {
        marginRight: -200,
    },
    itemInner: {
        width: sizes.deviceWidth,
        marginRight: 200,
        paddingVertical: 30,
        paddingHorizontal: 30,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    itemAbsolute: {
        width: 100,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
});

SwipeableListItem.propTypes = {
    item: PropTypes.string.isRequired,
    setScrollEnabled: PropTypes.func.isRequired,
};

export default SwipeableListItem;