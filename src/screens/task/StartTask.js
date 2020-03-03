import React, {Fragment, useState, useEffect} from 'react';
import {Animated, Keyboard, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import * as yup from 'yup';
import {Formik} from 'formik';
import styled, {css} from 'styled-components';
import {getAllSprints} from "../../actions/sprintActions";
import {Container, Divider, InnerContainer, sizes, Text, Title} from "../../styles";
import TopBar from "../../components/TopBar";
import SelectInput from "../../components/form/SelectInput";
import RoundedButton from "../../components/buttons/RoundedButton";
import {getSingleTeam, getTeamMembers} from "../../actions/teamActions";
import {getSingleProject} from "../../actions/projectActions";
import {taskSprint} from "../../validationSchema";
import Icon from "react-native-vector-icons/Feather";
import {SvgUri, SvgXml} from "react-native-svg";
import WaveSvg from '../../../assets/images/wave.svg';
import ProfilePicture from "../../components/ProfilePicture";
import Carousel, {Pagination} from "react-native-snap-carousel";

const StartTask = ({navigation}) => {
    const dispatch = useDispatch();
    const sprints = useSelector(state => state.sprintReducer.sprints);
    const team = useSelector(state => state.teamReducer.team);
    const teamMembers = useSelector(state => state.teamReducer.teamMembers);

    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(-sizes.deviceWidth / 2));
    const [searchValue, setSearchValue] = useState("");
    const [members, setMembers] = useState([]);
    const [searchedMembers, setSearchedMembers] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);

    const [step, setStep] = useState(0);

    const project = navigation.getParam('project', "");
    const {id, teamID} = project;
    const task = navigation.getParam('task', "");

    useEffect(() => {
        dispatch(getAllSprints(id));
        dispatch(getSingleTeam(teamID));
    }, []);

    useEffect(() => {
        if (Object.keys(team).length !== 0) {
            setMembers([]);
            const membersValue = team.members;

            setMembers(membersValue);
        }
    }, [team]);

    useEffect(() => {
        if (members.length !== 0) {
            dispatch(getTeamMembers(members));
        }
    }, [members]);

    useEffect(() => {
        const value = step === 0 ? -sizes.deviceWidth / 2 : 0;
        Animated.timing(animatedValue, {
            toValue: value,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [step]);

    const sprintList = () => {
        const list = [];
        for (let i = 0; i < sprints.length; i++) {
            const sprint = {
                id: sprints[i].id,
                text: sprints[i].name,
            };

            list.push(sprint);
        }

        return list;
    };

    const firstStepValidationSchema = yup.object().shape({
        sprint: taskSprint
    });

    const firstStepHandleSubmit = (values) => {
        setStep(1);
    };

    const renderFirstStep = () => {
        return (
            <Formik
                initialValues={{sprint: 0}}
                validationSchema={firstStepValidationSchema}
                onSubmit={values => firstStepHandleSubmit(values)}
            >
                {({values, handleChange, errors, setFieldValue, setFieldTouched, touched, isValid, handleSubmit}) => {
                    return (
                        <Fragment>
                            <SelectInput
                                value={values.sprint}
                                name='sprint'
                                text="Sprint seçiniz (*)"
                                selections={sprintList()}
                                setSelectedItem={setFieldValue}
                                errorMessage={touched.sprint && errors.sprint ? errors.sprint : ""}
                            />

                            <RoundedButton
                                disabled={!isValid}
                                color='green'
                                icon='arrow-right'
                                pressFunc={handleSubmit}
                            />
                        </Fragment>
                    );
                }}
            </Formik>
        );
    };

    const searchTeamMember = () => {
        Keyboard.dismiss();
        const value = searchValue.toLowerCase();
        const filteredMembers = teamMembers?.filter(member => member.fullName.toLowerCase().includes(value));
        setSearchedMembers(filteredMembers);
    };

    const memberItem = ({item}) => {
        return (
            <InnerContainer horizontalCenter>
                <ProfilePicture size={80} picture={item.photoURL !== null ? item.photoURL : ""}/>
                <Divider height={10}/>
                <Text medium size={20}>{item.fullName}</Text>
            </InnerContainer>
        );
    };

    const renderSearchedMembers = () => {
        if (searchedMembers.length !== 0) {
            return (
                <Fragment>
                    <View>
                        <Carousel
                            data={searchedMembers}
                            renderItem={memberItem}
                            sliderWidth={sizes.deviceWidth - 60}
                            itemWidth={sizes.deviceWidth - 60}
                            itemHeight={sizes.deviceHeight / 4}
                            onSnapToItem={(index) => setActiveSlide(index)}
                        />
                    </View>

                    <Pagination
                        dotsLength={searchedMembers?.length}
                        activeDotIndex={activeSlide}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)'
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />

                    <BackButton onPress={() => setStep(0)}>
                        <Icon name='arrow-left' size={24} color='white' />
                    </BackButton>
                </Fragment>
            );
        }
    };

    const renderSecondStep = () => {
        return (
            <Fragment>
                <SearchContainer>
                    <SearchInput
                        placeholder="Kişi arayın"
                        value={searchValue}
                        onChangeText={text => setSearchValue(text)}
                    />
                    <SearchButton onPress={() => searchTeamMember()}>
                        <Icon name='search' size={20} color='white'/>
                    </SearchButton>
                </SearchContainer>

                {renderSearchedMembers()}
            </Fragment>
        );
    };

    const renderAllSteps = () => {
        if (step === 0) {
            return renderFirstStep();
        } else {
            return renderSecondStep();
        }
    };

    return (
        <Container>
            <TopBar isBack={true}/>

            <ProgressBarOuter>
                <AnimatedProgressBarInner
                    length={animatedValue}
                    style={{transform: [{translateX: animatedValue}]}}
                />
            </ProgressBarOuter>

            <Container space>
                <Title>İşi Başlat ({step + 1}/2)</Title>

                <Divider height={10}/>

                {renderAllSteps()}
            </Container>
        </Container>
    );
};

const ProgressBarOuter = styled.View`
    flex-direction: row;
    width: 100%;
    height: 5px;
    background-color: #281C9D;
`;

const ProgressBarInner = styled.View`
    width: 100%;
    height: 5px;
    background-color: orangered;
`;

const SearchContainer = styled.View`
    flex-direction: row;
    width: 100%;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 15px;
`;

const SearchInput = styled.TextInput`
    flex: 0.8;
    padding-top: 14px;
    padding-bottom: 12px;
    padding-horizontal: 20px;
    font-family: Poppins-Medium;
    include-font-padding: false;
`;

const SearchButton = styled.TouchableOpacity`
    flex: 0.2;
    justify-content: center;
    align-items: center;
    background-color: indigo;
    border-radius: 15px;
`;

const BackButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    align-self: center;
    justify-content: center;
    align-items: center;
    background-color: black;
`;

const AnimatedProgressBarInner = Animated.createAnimatedComponent(ProgressBarInner);

export default StartTask;
