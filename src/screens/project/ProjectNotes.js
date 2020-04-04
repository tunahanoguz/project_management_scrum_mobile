import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {getProjectNotes} from "../../actions/projectActions";
import {Container, Text} from "../../styles";
import {AbsoluteButton, TopBar} from "../../components";

const ProjectNotes = ({navigation}) => {
    const projectID = navigation.getParam('projectID');

    const dispatch = useDispatch();
    const notes = useSelector(state => state.projectReducer.projectNotes);

    useEffect(() => {
        dispatch(getProjectNotes(projectID));
    }, []);

    const renderNotes = () => {
        return notes.map((note, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('EditProjectNote', {projectID, note: note.note, noteIndex: index})}
            >
                <Text medium>{`${index + 1}. ${note.note}`}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <Container>
            <TopBar isBack={true}/>

            <Container space>
                {renderNotes()}
            </Container>

            <AbsoluteButton
                icon='plus'
                backgroundColor='indigo'
                pressFunc={() => navigation.navigate('AddProjectNote', {projectID})}
                style={{
                    bottom: 10,
                    right: 10,
                }}
            />
        </Container>
    );
};

// const styles = StyleSheet.create({
//
// });

export default ProjectNotes;
