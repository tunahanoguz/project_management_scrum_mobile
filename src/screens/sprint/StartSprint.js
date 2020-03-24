import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {
    TopBar,
    ExampleDatePicker,
    Button,
} from 'components';
import {Container, Divider, Title} from "../../styles";
import {startSprint} from "../../actions/sprintActions";

const StartSprint = ({navigation}) => {
    const sprintID = navigation.getParam('sprintID', "");
    const [estimatedFinishDate, setEstimatedFinishDate] = useState(new Date());

    const dispatch = useDispatch();

    const start = () => {
        dispatch(startSprint(sprintID, estimatedFinishDate));
        navigation.navigate('SprintDetail', {sprintID});
    };

    const setDate = (name, value) => {
        setEstimatedFinishDate(value);
    };

    return (
        <Container>
            <TopBar isBack={true} />

            <Container space>
                <Title>Sprint'i Başlat</Title>

                <Divider height={20}/>

                <ExampleDatePicker
                    name='estimatedFinishDate'
                    value={estimatedFinishDate}
                    handleChange={setDate}
                    text="Tahmini Bitiş Tarihi (*)"
                />

                <Button
                    action={start}
                    color='purple'
                    text="👍 BAŞLAT"
                />
            </Container>
        </Container>
    );
};

export default StartSprint;
