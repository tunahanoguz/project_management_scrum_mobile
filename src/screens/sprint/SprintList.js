import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {connect} from "react-redux";
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';
import {deleteSprint, editSprint, getAllSprints} from "../../actions/sprintActions";
import TopBar from "../../components/TopBar";
import SprintCard from "../../components/cards/SprintCard";
import ListActionModal from "../../components/modals/ListActionModal";
import Loading from "../../components/Loading";
import CenteredContainer from "../../components/containers/CenteredContainer";
import {colors, Container} from "../../styles";
import AbsoluteButton from "../../components/buttons/AbsoluteButton";
import List from "../../components/list/List";
import Button from "../../components/buttons/Button";

class SprintList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            selectedItemID: null,
            selectedItem: null,
        };
    }

    componentDidMount() {
        const {navigation, getAllSprints} = this.props;
        const projectID = navigation.getParam('projectID', "");
        getAllSprints(projectID);
    }

    setIsModalOpen = () => {
        this.setState(state => ({isModalOpen: !state.isModalOpen}));
    };

    setIsModalOpenWithID = (item) => {
        this.setState(state => ({isModalOpen: !state.isModalOpen, selectedItem: item, selectedItemID: item?.id}));
    };

    editSprint = () => {
        this.setIsModalOpen();
        const {navigation} = this.props;
        const {selectedItem} = this.state;
        const projectID = navigation.getParam('projectID', "");
        navigation.navigate('EditSprint', {sprint: selectedItem, projectID});
    };

    deleteSprint = () => {
        const {navigation, deleteSprint} = this.props;
        const {selectedItemID} = this.state;
        const projectID = navigation.getParam('projectID', "");
        deleteSprint(projectID, selectedItemID);
        this.setIsModalOpen();
    };

    renderSprints = () => {
        const {loading, error, sprints} = this.props;
        return (
            <Container flex={0.8}>
                <List
                    loading={loading}
                    error={error}
                    data={sprints}
                    type='sprint'
                    orderColor='purple'
                    isFunctioned={false}
                    modalFunc={this.setIsModalOpenWithID}
                />
            </Container>
        );
    };

    render(){
        const {isModalOpen} = this.state;
        const {navigation} = this.props;
        const projectID = navigation.getParam('projectID', "");
        return (
            <Container>
                <TopBar isBack={true} />

                <Container space>
                    {this.renderSprints()}

                    <Container flex={0.2} verticalMiddle>
                        <Button action={() => navigation.navigate('CreateSprint', {projectID})} color='green' text="🏃 YENİ SPRİNT OLUŞTUR"/>
                    </Container>
                </Container>

                <ListActionModal
                    isOpen={isModalOpen}
                    toggleFunc={this.setIsModalOpenWithID}
                    editText={"Sprint'i Düzenle"}
                    editAction={this.editSprint}
                    deleteText={"Sprint'i Sil"}
                    deleteAction={this.deleteSprint}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
    return {
        sprints: state.sprintReducer.sprints,
        loading: state.sprintReducer.loading,
        error: state.sprintReducer.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSprints: (projectID) => dispatch(getAllSprints(projectID)),
        deleteSprint: (projectID, sprintID) => dispatch(deleteSprint(projectID, sprintID)),
        editSprint: (name, status, estimatedFinishDate) => dispatch(editSprint(name, status, estimatedFinishDate)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SprintList));
