import React, {Component} from 'react';
import {View, Text, StyleSheet, default as Animated, PanResponder, default as Dimensions} from 'react-native';
import PropTypes from 'prop-types';

class EmptyScreen extends Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY(0, 0);
        this.scrollStopped = false;
        const SCREEN_WIDTH = Dimensions.get('window').width;
        const SCROLL_THRESHOLD = SCREEN_WIDTH / 15;

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderTerminationRequest: () => false,
            onPanResponderGrant: () => {
                this.position.setOffset({x: this.position.x, y: 0});
                this.position.setValue({x: 0, y: 0});
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}

                if (gestureState.dx >= SCROLL_THRESHOLD){
                    const x = gestureState.dx - SCROLL_THRESHOLD;
                    this.position.setValue({x, y: 0});
                } else {
                    const x = gestureState.dx + SCROLL_THRESHOLD;
                    this.position.setValue({ x, y: 0 });
                }


            },
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        });
    }

    enableScrollView(isEnabled) {
        if (this.scrollStopped !== isEnabled) {
            this.props.swipingCheck(isEnabled);
            this.scrollStopped = isEnabled;
        }
    }


    render(){
        return (
            <Text>Hey!</Text>
        );
    }
}

const styles = StyleSheet.create({});

export default EmptyScreen;