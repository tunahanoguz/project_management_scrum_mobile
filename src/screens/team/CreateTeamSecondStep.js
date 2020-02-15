import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {container, fonts} from "../../styles";
import TopBar from "../../components/TopBar";
import Input from "../../components/form/Input";
import RoundedButton from "../../components/buttons/RoundedButton";

class CreateTeamSecondStep extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: "",
            members: [],
            disabled: true
        };
    }

    setValue = (stateName, value) => {
        this.setState({[stateName]: value});
    };

    inputErrorControl = (text) => {
        if (text.length === 0) {
            return "empty";
        } else {
            this.setState({disabled: false});
            return null;
        }
    };

    goToCreateTeamSecondStep = () => {
        this.props.navigation.navigate('Home');
    };

    render() {
        return (
            <View style={container.classicContainer}>
                <TopBar isBack={true}/>

                <View style={styles.innerContainer}>
                    <Text style={fonts.title}>Create Team</Text>

                    <Input iconName='hash' value={this.state.teamName} placeholder="Takım adı"
                           isValid={this.inputErrorControl} name='teamName' setStateFunc={this.setValue}/>
                    <Input iconName='align-left' value={this.state.teamDescription} placeholder="Takım açıklaması"
                           isValid={() => console.log("asdasdasd")} name='teamDescription'
                           setStateFunc={this.setValue}/>

                    <RoundedButton color='green' icon='arrow-right' pressFunc={this.goToCreateTeamSecondStep} disabled={this.state.disabled}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        padding: 30,
    },
});

export default CreateTeamSecondStep;