import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import TopBar from "../../components/TopBar";
import {getMyTasks} from "../../actions/taskActions";
import {colors} from "../../styles";
import moment from "moment";

const MyTasks = ({navigation}) => {
    const sprintID = navigation.getParam('sprintID', "");
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const myTasks = useSelector(state => state.taskReducer.myTasks);

    useEffect(() => {
        dispatch(getMyTasks(sprintID, user.uid));
    }, []);

    const renderDate = (date) => {
        moment.locale('tr-TR');
        return moment(date).format('LLL');
    };

    const taskItem = (item, bgColor) => {
        const {task, estimatedFinishDate} = item;
        return (
            <TaskContainer color={bgColor}>
                <TaskTitle>{task}</TaskTitle>
                <TaskDateContainer>
                    <TaskDateText>{renderDate(estimatedFinishDate.toDate())}</TaskDateText>
                </TaskDateContainer>
            </TaskContainer>
        );
    };

    const renderTaskList = () => {
        return (
            <FlatList data={myTasks} renderItem={({item, index}) => {
                let bgColor = null;
                if (index % 2 === 0)
                    bgColor = colors.lightGray;
                return taskItem(item, bgColor);
            }} keyExtractor={(item, index) => item.id.toString()} />
        );
    };

    return (
        <Container>
            <TopBar isBack={true} />

            <Title>Benim İşlerim 💪</Title>
            {renderTaskList()}
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: white;
`;

const InnerContainer = styled.View`
    flex: 1;
    padding: 30px;
`;

const Title = styled.Text`
    font-family: Poppins-Medium;
    font-size: 24px;
    include-font-padding: false;
    margin: 30px 0 30px 30px;
`;

const TaskContainer = styled.View`
    background-color: ${({color}) => color ? color : 'white'};
    padding: 20px 30px;
    border-bottom-width: 2px;
    border-bottom-color: rgba(0, 0, 0, 0.05);
`;

const TaskTitle = styled.Text`
    font-family: Poppins-Medium;
    font-size: 16px;
    include-font-padding: false;
`;

const TaskDateContainer = styled.View`
    flex-direction: row;
    margin-top: 10px;
`;

const TaskDateText = styled.Text`
    font-family: Poppins-Regular;
    font-size: 14px;
    include-font-padding: false;
`;

export default MyTasks;