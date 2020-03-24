import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    TopBar,
    List,
} from 'components';
import {Container} from "../../styles";
import {getAllNotifications} from "../../actions/notificationActions";

const NotificationList = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notificationReducer.notifications);
    const loading = useSelector(state => state.notificationReducer.loading);
    const error = useSelector(state => state.notificationReducer.error);

    const user = useSelector(state => state.authReducer.user);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemID, setSelectedItemID] = useState(false);

    useEffect(() => {
        dispatch(getAllNotifications(user.uid));
    }, []);

    const setIsOpenModal = (itemID) => {
        setIsModalOpen(!isModalOpen);
        setSelectedItemID(itemID);
    };

    return (
        <Container>
            <TopBar
                isBack={false}
                title="Takımlar"
            />

            <Container space>
                <Container flex={0.94}>
                    <List
                        orderColor='orangered'
                        isFunctioned={false}
                        modalFunc={setIsOpenModal}
                        data={notifications}
                        type='notification'
                        loading={loading}
                        error={error}
                    />
                </Container>
            </Container>
        </Container>
    );
};

export default NotificationList;
