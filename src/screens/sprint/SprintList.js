import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from "react-redux";
import {withNavigation} from 'react-navigation';
import {
    TopBar,
    ListActionModal,
    List,
    Button,
} from 'components';
import {Container} from "../../styles";
import {deleteSprint, editSprint, getAllSprints} from "../../actions/sprintActions";

class SprintList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            selectedItemID: null,
            selectedItem: null,
        };
    }

    createdBy = this.props.navigation.getParam('createdBy', "");
    userIDs = this.props.navigation.getParam('userIDs', "");

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
        const {loading, error, sprints, user} = this.props;
        return (
            <Container flex={this.createdBy === user.uid ? 0.8 : 0.94}>
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
        const {navigation, user} = this.props;
        const projectID = navigation.getParam('projectID', "");

        return (
            <Container>
                <TopBar isBack={true} />

                <Container space>
                    {this.renderSprints()}

                    {this.createdBy === user.uid && (
                        <Container flex={0.2} verticalMiddle>
                            <Button
                                action={() => navigation.navigate('CreateSprint', {projectID, userIDs: this.userIDs})}
                                color='green'
                                text="🏃 YENİ SPRİNT OLUŞTUR"/>
                        </Container>
                    )}
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
        user: state.authReducer.user,
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
