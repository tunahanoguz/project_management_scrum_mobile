import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList, Animated, StyleSheet, Dimensions} from 'react-native';
import Container from "../../components/Container";
import TopBar from "../../components/TopBar";
import InnerContainer from "../../components/InnerContainer";
import {colors, fonts} from "../../styles";
import Input from "../../components/form/Input";
import Icon from "react-native-vector-icons/Feather";
import FullScreenModal from "../../components/modals/FullScreenModal";
import {priorities} from "../../constants";
import DatePicker from "../../components/form/DatePicker";
import {editTask} from '../../actions/taskActions';
import {connect} from "react-redux";

class EditTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            priority: "",
            isPriorityModalOpen: false,
            priorityModalAnimatedValue: new Animated.Value(-Dimensions.get('window').height),
            startDate: null,
            finishDate: null,
        };
    }

    componentDidUpdate() {
        const animatedValue = this.state.isPriorityModalOpen ? 0 : -Dimensions.get('window').height;
        Animated.timing(this.state.priorityModalAnimatedValue, {
            toValue: animatedValue,
            duration: 100,
        }).start();
    }

    inputErrorControl = (text) => {
        if (text.length === 0) {
            return "empty";
        } else {
            this.setState({disabled: false});
            return null;
        }
    };

    setInputState = (stateName, value) => {
        this.setState({[stateName]: value});
    };

    togglePriorityModal = () => {
        this.setState(state => ({isPriorityModalOpen: !state.isPriorityModalOpen}));
    };

    setIsPriorityModalOpen = (name, value) => {
        this.setState({[name]: value});
    };

    priorityModalContainer = () => {
        return (
            <FlatList
                data={priorities}
                renderItem={({item, index}) => <Text>{item.name}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    };

    setDate = (stateName, date) => {
        this.setState({[stateName]: date});
    };

    render() {
        // const {id, title, description} = this.props.navigation.getParam('task', {});
        const {title, description, startDate, finishDate, priorityModalAnimatedValue} = this.state;
        return (
            <Container>
                <TopBar isBack={true}/>

                <InnerContainer>
                    <Text style={fonts.title}>Görevi Düzenle</Text>

                    <Input
                        iconName='type'
                        value={title}
                        placeholder="Görev Adı"
                        name='title'
                        setStateFunc={this.setInputState}
                        isValid={this.inputErrorControl}/>

                    <Input
                        iconName='type'
                        value={description}
                        placeholder="Görev Açıklaması"
                        name='description'
                        setStateFunc={this.setInputState}
                        isValid={this.inputErrorControl}
                    />

                    <View>
                        <TouchableOpacity
                            style={styles.priorityModalButton}
                            onPress={() => this.togglePriorityModal()}
                        >
                            <View style={styles.priorityModalButtonInnerContainer}>
                                <Icon
                                    name='award'
                                    size={24}
                                    style={{marginRight: 10,}}
                                    color='rgba(100, 100, 100, 1)'
                                />

                                <Text style={styles.priorityModalButtonText}>Öncelik</Text>
                            </View>

                            <Icon
                                name='chevron-down'
                                size={24}
                                color='rgba(0, 0, 0, 0.4)'
                            />
                        </TouchableOpacity>
                    </View>

                    <DatePicker
                        handleDateChange={this.setDate}
                        name='startDate'
                        text="Başlangıç Tarihi"
                    />

                    <DatePicker
                        handleDateChange={this.setDate}
                        name='finishDate'
                        text="Beklenen Bitiş Tarihi"
                    />

                    <Text>{startDate?.toString()}</Text>

                    <Text>{finishDate?.toString()}</Text>
                </InnerContainer>

                <FullScreenModal
                    bottom={priorityModalAnimatedValue}
                    toggleFunc={this.setIsPriorityModalOpen}
                >
                    {this.priorityModalContainer()}
                </FullScreenModal>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    priorityModalButton: {
        flexDirection: 'row',
        backgroundColor: colors.lightGray,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priorityModalButtonInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priorityModalButtonText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        includeFontPadding: false,
        color: 'rgba(0, 0, 0, 0.4)',
    },
});

const mapStateToProps = (state) => {
    return {
        tasks: state.taskReducer.tasks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        edit: task => dispatch(editTask(task))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
