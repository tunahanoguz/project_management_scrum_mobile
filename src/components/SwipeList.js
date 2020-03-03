import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Animated, PanResponder, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import Container from "./Container";
import TopBar from "./TopBar";
import {colors, fonts, sizes} from "../styles";
import SwipeableListItem from "./SwipeableListItem";

class SwipeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            enable: true,
        };
    }

    setScrollnabled = (enabled) => {
        this.setState({enable: enabled});
    };

    items = ['Selam', 'Hi!', 'Bonjour!', 'Hallo!'];

    render() {
        return (
            <Container>
                <TopBar isBack={false} title='ExampleInput Swipe List'/>

                <Text style={fonts.title}>Liste</Text>

                <FlatList data={this.items} renderItem={({item}) => <SwipeableListItem item={item} setScrollEnabled={enable => this.setScrollnabled(enable)} />} keyExtractor={(item, index) => index.toString()} scrollEnabled={this.state.enable} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({});

export default SwipeList;