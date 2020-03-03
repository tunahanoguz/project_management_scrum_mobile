import React, {Fragment, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import List from "../../components/list/List";
import {getProjectsForTeam} from "../../actions/projectActions";
import ListActionModal from "../../components/modals/ListActionModal";
import {Container, Divider, Title} from "../../styles";
import {withNavigation} from 'react-navigation';
import TopBar from "../../components/TopBar";

const TeamProjectsList = ({navigation}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemID, setSelectedItemID] = useState(false);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.projectReducer.loading);
    const error = useSelector(state => state.projectReducer.error);
    const projects = useSelector(state => state.projectReducer.projects);

    useEffect(() => {
        const teamID = navigation.getParam('teamID', "");
        dispatch(getProjectsForTeam(teamID));
    }, []);

    const setIsOpenModal = (itemID) => {
        setIsModalOpen(!isModalOpen);
        setSelectedItemID(itemID);
    };

    return (
        <Container>
            <TopBar isBack={true} />
            <Container space flex={0.92}>
                <Title>Takım Projeleri</Title>
                <Divider height={10}/>
                <List loading={loading} error={error} data={projects} orderColor='orange' type='project' isFunctioned={false} modalFunc={setIsOpenModal} />
            </Container>

            {/*<ListActionModal isOpen={isModalOpen} toggleFunc={this.setIsOpenModal} editText="Takımı Düzenle"*/}
            {/*                 editAction={this.editTeamAction} deleteText="Takımı Sil"*/}
            {/*                 deleteAction={this.deleteTeamAction}/>*/}
        </Container>
    );
};

export default withNavigation(TeamProjectsList);