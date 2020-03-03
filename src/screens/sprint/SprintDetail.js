import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/Feather";
import moment from 'moment';
import 'moment/locale/tr';
import PropTypes from 'prop-types';
import Container from "../../components/Container";
import TopBar from "../../components/TopBar";
import InnerContainer from "../../components/InnerContainer";
import {colors, fonts, sizes} from "../../styles";
import Divider from "../../components/Divider";
import {startSprint} from "../../actions/sprintActions";
import styled from 'styled-components';
import AbsoluteButton from "../../components/buttons/AbsoluteButton";

class SprintDetail extends Component {

    goToMyTasks = (navigation, id) => {
        navigation.navigate('MyTasks', {sprintID: id});
    };

    goToCreateSprint = (navigation, id) => {
        navigation.navigate('CreateTask', {sprintID: id});
    };

    renderStatus = (status) => {
        if (status === 0){
            return "Henüz başlamadı.";
        } else {
            return "Başlamış durumda.";
        }
    };

    renderDate = (date) => {
        moment.locale('tr-TR');
        return moment(date).format('LLL');
    };

    renderDateContainer = (iconName, type, title, value, sprint) => {
        const {startSprint} = this.props;
        return (
            <View style={styles.detailCard}>
                <View style={styles.detailCardLeft}>
                    <View style={styles.detailCardIcon}>
                        <Icon name={iconName} color='white' size={20} />
                    </View>
                    <View>
                        <Text style={fonts.mediumText}>{title}</Text>
                        <Text style={fonts.normalText}>{type === 0 ? this.renderDate(value) : value}</Text>
                    </View>
                </View>
                {type === 1 && value === "Henüz başlamadı." ? (
                    <TouchableOpacity style={{flexDirection: 'row', backgroundColor: 'white', padding: 4, borderRadius: 6,}} onPress={() => startSprint(sprint.id)}>
                        <Icon name='play' color={colors.orange} size={18} />
                        <Text style={fonts.normalText}>Başlat</Text>
                    </TouchableOpacity>
                ) : null}

            </View>
        );
    };

    render(){
        const {navigation} = this.props;
        const sprint = navigation.getParam('sprint', {});
        const {id, name, status, startDate, estimatedFinishDate} = sprint;
        return (
            <Container>
                <TopBar isBack={true} />

                <InnerContainer>
                    <Text style={fonts.title}>{name}</Text>

                    {this.renderDateContainer("calendar", 1, "Durum", this.renderStatus(status), sprint)}

                    <Divider height={20} />

                    {this.renderDateContainer("calendar", 0, "Başlangıç Tarihi", startDate?.toDate(), sprint)}

                    <Divider height={20} />

                    {this.renderDateContainer("calendar", 0, "Tahmini Bitiş Tarihi", estimatedFinishDate?.toDate(), sprint)}

                    <AbsoluteButton icon='plus' backgroundColor={colors.purple}
                                    pressFunc={() => this.goToCreateSprint(navigation, id)} style={{bottom: 10, left: 10,}}/>

                    <RowContainer>
                        <Button onPress={() => this.goToMyTasks(navigation, id)} color='teal' margin={10}>
                            {/*<Icon name='check' size={20} color='white' />*/}
                            <ButtonText>💪 BENİM İŞLERİM</ButtonText>
                        </Button>

                        <Button onPress={() => alert("asdasdasd")} color='indigo'>
                            {/*<Icon name='check' size={20} color='white' />*/}
                            <ButtonText>👉 DİĞER İŞLER</ButtonText>
                        </Button>
                    </RowContainer>
                </InnerContainer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    detailCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: colors.lightGray,
        borderRadius: 15,
    },
    detailCardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailCardIcon: {
        backgroundColor: colors.purple,
        marginRight: 10,
        padding: 8,
        borderRadius: 8,
    },
});

// const mapStateToProps = state => {
//     return {};
// };

const RowContainer = styled.View`
    flex-direction: row;
`;

const Button = styled.TouchableOpacity`
    flex: 0.5;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${({color}) => color};
    margin-right: ${({margin}) => margin ? margin : 0}px;
    margin-top: 20px;
    padding-vertical: 16px;
    border-radius: 30px;
`;

const ButtonText = styled.Text`
    font-family: Poppins-Medium;
    font-size: 14px;
    color: white;
    include-font-padding: false;
    margin-left: 2px;
    text-transform: uppercase;
`;

const mapDispatchToProps = dispatch => {
    return {
        startSprint: (sprintID) => dispatch(startSprint(sprintID)),
    };
};

export default connect(null, mapDispatchToProps)(SprintDetail);