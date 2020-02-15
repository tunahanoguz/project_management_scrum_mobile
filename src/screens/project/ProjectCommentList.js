import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import Container from "../../components/Container";
import TopBar from "../../components/TopBar";
import {colors, fonts} from "../../styles";
import ParentCommentCard from "../../components/cards/ParentCommentCard";
import ChildCommentCard from "../../components/cards/ChildCommentCard";

class ProjectCommentList extends Component {
    render() {
        return (
            <Container>
                <TopBar isBack={true}/>

                <ParentCommentCard comment={{comment: "asdasdsad", userID: 2}} />
                <ChildCommentCard comment={{comment: "asdasdsad", userID: 2}} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({});

export default withNavigation(ProjectCommentList);