import React, {Component, Fragment} from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Feather';
import validate from "validate.js";
import {connect} from "react-redux";
import {colors, fonts, sizes} from "../../styles";
import TopBar from "../../components/TopBar";
import Input from "../../components/form/Input";
import RoundedButton from "../../components/buttons/RoundedButton";
import Divider from "../../components/Divider";
import {createTeam} from "../../actions/teamActions";
import FilteredUserCard from "../../components/cards/FilteredUserCard";
import AddedUserCard from "../../components/cards/AddedUserCard";
import {roles} from "../../constants";

class CreateTeam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamName: "",
            teamNameError: "",
            teamDescription: "",
            teamDescriptionError: "",
            searchValue: "",
            filteredMembers: [],
            addedMembers: [],
            firstStep: true,
            showAddedMembers: false,
            animatedValue: new Animated.Value(0.5),
            tempUsers: this.props.users,
            selectedRole: null,
            scrollX: new Animated.Value(0),
            activeFilteredUsersSlide: 0,
            activeAddedMembersSlide: 0,
        };
    }

    setValue = (stateName, value) => {
        this.setState({[stateName]: value});
    };

    teamNameValidation = {
        teamName: {
            presence: {
                message: '^Lütfen takım adı giriniz.'
            },
        }
    };

    teamDescriptionValidation = {
        teamDescription: {
            presence: false,
        }
    };

    validateTeamName = (value) => {
        const error = validate({teamName: this.state.teamName === "" ? null : value}, this.teamNameValidation);
        if (error) {
            this.setState({teamNameError: error.teamName});
        } else {
            this.setState({teamNameError: ""});
        }

        return error;
    };

    validateTeamDescription = (value) => {
        const error = validate({teamDescription: this.state.teamDescription === "" ? null : value}, this.teamDescriptionValidation);
        if (error) {
            this.setState({teamDescriptionError: error.teamDescription});
        } else {
            this.setState({teamDescriptionError: ""});
        }

        return error;
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        const {teamName, teamDescription, addedMembers} = this.state;
        const {uid} = this.props.user;
        const teamNameError = this.validateTeamName(teamName);
        const teamDescriptionError = this.validateTeamDescription(teamDescription);

        let newAddedMembers = addedMembers.map(member => {
            return {
                id: member.id,
                role: member.role,
            };
        });

        let includeAuthUser = false;
         newAddedMembers.map(nam => {
            if (nam.id === uid){
                includeAuthUser = true;
            }
        });

        if (!includeAuthUser){
            newAddedMembers.unshift({
                id: uid,
                role: "Oluşturucu",
            });
        }

        if (teamNameError === undefined && teamDescriptionError === undefined) {
            this.props.createTeam(teamName, teamDescription, newAddedMembers, uid);
            this.props.navigation.navigate('TeamList');
        }
    };

    handleSubmitFirstStep = () => {
        this.setState({firstStep: false});
        this.runAnimated();
    };

    runAnimated = () => {
        Animated.timing(this.state.animatedValue, {
            toValue: 1,
            duration: 1000
        }).start();
    };

    runBackAnimated = () => {
        Animated.timing(this.state.animatedValue, {
            toValue: 0.5,
            duration: 1000
        }).start();
    };

    inputErrorControl = (text) => {
        if (text.length === 0) {
            return "empty";
        } else {
            this.setState({disabled: false});
            return null;
        }
    };

    addToFilteredUsers = (user) => {
        let filteredMembers = this.state.filteredMembers;
        filteredMembers.push(user);
        this.setState({filteredMembers: filteredMembers});
    };

    addToAddedMembers = (user) => {
        let addedMembers = this.state.addedMembers;
        const newUser = {
            id: user.id,
            fullName: user.fullName,
            role: roles[this.state.selectedRole].name,
            photoURL: user.photoURL,
        };

        addedMembers.push(newUser);
        this.setState({addedMembers: addedMembers});

        this.removeFromFilteredUsers(user);
    };

    removeFromAddedMembers = (user) => {
        let addedMembers = this.state.addedMembers;
        addedMembers = addedMembers.filter(adm => adm.id !== user.id);
        this.setState({addedMembers: addedMembers});

        let tempUsers = this.state.tempUsers;
        tempUsers.push(user);

        this.setState({tempUsers: tempUsers});
    };

    removeFromFilteredUsers = (user) => {
        let filteredMembers = this.state.filteredMembers;
        filteredMembers = filteredMembers.filter(fm => fm.id !== user.id);
        this.setState({filteredMembers: filteredMembers});

        let users = this.state.tempUsers;
        users = users.filter(u => u.id !== user.id);
        this.setState({tempUsers: users});
    };

    filteredUsersAction = (user) => {
        this.addToAddedMembers(user);
        this.removeFromFilteredUsers(user);
        this.setState({activeFilteredUsersSlide: 0});
    };

    addedMembersAction = (user) => {
        this.addToFilteredUsers(user);
        this.removeFromAddedMembers(user);
        this.setState({activeAddedMembersSlide: 0});
    };

    renderFilteredUsersItem = ({item, index}) => {
        return (
            <FilteredUserCard user={item}
                              action={this.filteredUsersAction}
                              setStateFunc={this.setValue}/>
        );
    };

    filteredUsersList = () => {
        return (
            <SafeAreaView style={styles.usersListContainer}>
                <Carousel
                data={this.state.filteredMembers}
                renderItem={this.renderFilteredUsersItem}
                sliderWidth={sizes.deviceWidth}
                sliderHeight={sizes.deviceHeight}
                itemWidth={sizes.deviceWidth}
                onSnapToItem={(index) => this.setState({activeFilteredUsersSlide: index})}
                />

                <Pagination
                    dotsLength={this.state.filteredMembers?.length}
                    activeDotIndex={this.state.activeFilteredUsersSlide}
                    // containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)'
                    }}
                    // inactiveDotStyle={{
                    //     // Define styles for inactive dots here
                    // }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </SafeAreaView>
        );
    };

    renderAddedUsersItem = ({item, index}) => {
        return (
            <AddedUserCard user={item}
                              action={this.addedMembersAction}/>
        );
    };

    addedMembersList = () => {
        return (
            <SafeAreaView style={styles.usersListContainer}>
                {/*<FlatList data={this.state.addedMembers} numColumns={2}*/}
                {/*          renderItem={({item}) => <AddedUserCard user={item} action={this.addedMembersAction}/>}*/}
                {/*          keyExtractor={(item, index) => index.toString()}/>*/}

                <Carousel
                    data={this.state.addedMembers}
                    renderItem={this.renderAddedUsersItem}
                    sliderWidth={sizes.deviceWidth}
                    sliderHeight={sizes.deviceHeight}
                    itemWidth={sizes.deviceWidth}
                    onSnapToItem={(index) => this.setState({activeAddedMembersSlide: index})}
                />

                <Pagination
                    dotsLength={this.state.addedMembers?.length}
                    activeDotIndex={this.state.activeAddedMembersSlide}
                    // containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)'
                    }}
                    // inactiveDotStyle={{
                    //     // Define styles for inactive dots here
                    // }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </SafeAreaView>
        );
    };

    filterUsers = (users) => {
        const filteredMembers = users.filter(user => {
            const fullName = user.fullName?.toLowerCase();
            const searchValue = this.state.searchValue.toString();
            return !!fullName.includes(searchValue);
        });

        this.setState({filteredMembers});
    };

    searchUsers = () => {
        Keyboard.dismiss();

        const users = this.props.users;
        const tempUsers = this.state.tempUsers;
        let addedMembers = this.state.addedMembers;

        if (addedMembers.length !== 0) {
            const newUsers = tempUsers.filter(user => {
                let boolValue = addedMembers.map(member => {
                    return user.id !== member.id;
                });

                const addedMembersLength = addedMembers.length;
                return boolValue[addedMembersLength - 1];
            });

            this.setState({tempUsers: newUsers});
            this.filterUsers(newUsers);
        } else {
            this.filterUsers(users);
        }
    };

    toggleShowUsers = () => {
        this.setState(state => ({showAddedMembers: !state.showAddedMembers}));
    };

    firstStepContainer = () => {
        if (this.state.firstStep) {
            return (
                <Fragment>
                    <Input iconName='type' value={this.state.teamName} placeholder="Takım Adı" name='teamName'
                           setStateFunc={this.setValue} isValid={this.validateTeamName}
                           errorMessage={this.state.teamNameError}/>
                    <Input iconName='align-left' value={this.state.teamDescription} placeholder="Takım Açıklaması"
                           name='teamDescription'
                           setStateFunc={this.setValue} isValid={this.validateTeamDescription}
                           errorMessage={this.state.teamDescriptionError}/>

                    <RoundedButton color='green' icon='arrow-right' pressFunc={() => this.handleSubmitFirstStep()}/>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <View style={styles.searchActionAreaContainer}>
                        <View style={styles.searchActionAreaLeft}>
                            <Input iconName='hash' value={this.state.searchValue} placeholder="Bir kullanıcı arayın"
                                   isValid={this.inputErrorControl} name='searchValue' setStateFunc={this.setValue}
                                   errorMessage=""/>
                        </View>

                        <View style={styles.searchActionAreaRight}>
                            <RoundedButton color='green' icon='search' pressFunc={this.searchUsers} size={52}/>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={[styles.showUsersButton, {flex: 0.5, marginRight: 10,}]}
                                          onPress={() => this.toggleShowUsers()}>
                            <Icon name='eye' size={16} style={{marginRight: 8,}}/>
                            <Text
                                style={fonts.mediumText}>{this.state.showAddedMembers ? "Arananları gör" : "Eklenenleri gör"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.showUsersButton, {flex: 0.5,}]}
                                          onPress={() => this.handleSubmit()}>
                            <Icon name='check' size={16} style={{marginRight: 8,}}/>
                            <Text style={fonts.mediumText}>Takımı oluştur</Text>
                        </TouchableOpacity>
                    </View>

                    <Divider height={20}/>

                    {this.state.showAddedMembers ? this.addedMembersList() : this.filteredUsersList()}

                    {/*{console.log(Animated.divide(this.scrollX, sizes.deviceWidth))}*/}
                </Fragment>
            );
        }
    };

    // modalCardItem = (item, index) => {
    //     return (
    //         <TouchableOpacity
    //             style={[styles.modalCard, {backgroundColor: index === this.state.selectedRole ? colors.green : 'white'}]}
    //             onPress={() => this.setState({selectedRole: index})}>
    //             <Text
    //                 style={[fonts.mediumText, {color: index === this.state.selectedRole ? 'white' : 'black'}]}>{item.name}</Text>
    //         </TouchableOpacity>
    //     );
    // };

    render() {
        return (
            <View style={styles.container}>
                <TopBar isBack={true}/>

                <View style={styles.innerContainer}>
                    <View style={styles.titleSection}>
                        <Text style={fonts.title}>Takım Oluştur</Text>
                        <View style={styles.rowContainer}>
                            {!this.state.firstStep ? (
                                <TouchableOpacity style={styles.backButton} onPress={() => {
                                    this.setState({firstStep: true});
                                    this.runBackAnimated();
                                }}>
                                    <Icon name='chevron-left' size={32} color='rgba(0, 0, 0, 0.4)'/>
                                </TouchableOpacity>
                            ) : null}

                            <Text
                                style={{color: 'rgba(0, 0, 0, 0.4)', ...fonts.title}}>{this.state.firstStep ? "1" : "2"}/2</Text>
                        </View>
                    </View>

                    <View style={styles.behindOfProgress}>
                        <Animated.View style={[styles.insideOfProgress, {flex: this.state.animatedValue,}]}/>
                    </View>

                    <Divider height={20}/>

                    {this.firstStepContainer()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 30,
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginTop: -8,
        marginRight: 4,
    },
    usersListContainer: {
        flex: 1,
        // marginHorizontal: -10,
    },
    searchActionAreaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchActionAreaLeft: {
        flex: 0.85,
        marginRight: 20,
    },
    searchActionAreaRight: {
        flex: 0.15,
    },
    showUsersButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.lightGray,
        borderRadius: 10,
    },
    behindOfProgress: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 5,
        backgroundColor: colors.lightGray,
        borderRadius: 100,
    },
    insideOfProgress: {
        height: 5,
        borderRadius: 100,
        backgroundColor: colors.green,
    },
    modalCard: {
        width: '100%',
        marginBottom: 20,
        padding: 15,
        borderRadius: 15,
    },
});

const mapStateToProps = state => {
    return {
        users: state.authReducer.users,
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createTeam: (teamName, teamDescription, members, userID) => dispatch(createTeam(teamName, teamDescription, members, userID)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);