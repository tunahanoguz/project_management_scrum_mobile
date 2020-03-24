import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    TopBar,
    List,
    Button,
    ListActionModal,
} from 'components';
import {Container} from "../../styles";
import {getAllTaskFiles} from "../../actions/taskActions";

const TaskFileList = ({navigation}) => {
    const taskID = navigation.getParam('taskID', "");

    const dispatch = useDispatch();
    const loading = useSelector(state => state.taskReducer.loading);
    const error = useSelector(state => state.taskReducer.error);
    const files = useSelector(state => state.taskReducer.files);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemID, setSelectedItemID] = useState(false);

    useEffect(() => {
        dispatch(getAllTaskFiles(taskID));
    }, []);

    const fileList = () => {
        return (
            <Container flex={0.8}>
                <List
                    loading={loading}
                    error={error}
                    data={files}
                    orderColor='orange'
                    isFunctioned={true}
                    modalFunc={setModalState}
                    type='file'
                />
            </Container>
        );
    };

    const createFile = () => {
        return (
            <Container
                flex={0.2}
                verticalMiddle
            >
                <Button
                    action={() => navigation.navigate('CreateTaskFile', {taskID})}
                    color='purple'
                    text="Yeni Dosya Yükle"
                />
            </Container>
        );
    };

    const setModalState = (itemID) => {
        setIsModalOpen(!isModalOpen);
        setSelectedItemID(itemID);
    };

    const editFile = () => {
        navigation.navigate('EditTaskFile', {selectedItemID});
    };

    const deleteFile = () => {
        navigation.navigate('EditTaskFile', {selectedItemID});
    };

    return (
        <Container>
            <TopBar isBack={true} />

            <Container space>
                {fileList()}
                {createFile()}
            </Container>

            <ListActionModal
                isOpen={isModalOpen}
                toggleFunc={setModalState}
                editText="Dosyayı Düzenle"
                editAction={editFile}
                deleteText="Dosyayı Sil"
                deleteAction={deleteFile}
            />
        </Container>
    );
};

export default TaskFileList;
