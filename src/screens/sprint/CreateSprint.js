import React, {Component, Fragment} from 'react';
import {Text} from 'react-native';
import {connect} from "react-redux";
import {Formik} from "formik";
import * as yup from "yup";
import {
    TopBar,
    Container,
    InnerContainer,
    ExampleInput,
    SelectInput,
    ExampleDatePicker,
    RoundedButton,
} from 'components';
import {fonts} from "../../styles";
import {createSprint} from "../../actions/sprintActions";
import {
    sprintEstimatedFinishDate,
    sprintName,
    sprintStatus,
} from "../../validationSchema";
import {createNotification, sendNotifications} from "../../actions/notificationActions";

class CreateSprint extends Component {

    validationSchema = yup.object().shape({
        name: sprintName,
        status: sprintStatus,
        estimatedFinishDate: sprintEstimatedFinishDate,
    });

    handleSubmit = (values) => {
        const {navigation, createSprint, user} = this.props;
        const projectID = navigation.getParam('projectID', "");
        const userIDs = navigation.getParam('userIDs', "");
        let {name, status, estimatedFinishDate} = values;
        const startDate = status === 0 ? null : new Date();
        estimatedFinishDate = status === 0 ? null : new Date();

        try {
            createSprint(name, status, startDate, estimatedFinishDate, user.uid, projectID);
            this.props.createNotification(userIDs, "sprint", "İçerisinde bulunduğunuz bir sprint oluşturuldu.");
            this.props.sendNotifications(userIDs, "Bir sprint oluşturuldu!", "İçerisinde bulunduğunuz bir sprint oluşturuldu.");
            navigation.navigate('SprintList');
        } catch (err) {
            alert('Error!');
        }
    };

    render(){
        return (
            <Container>
                <TopBar isBack={true} />

                <InnerContainer>
                    <Text style={fonts.title}>Sprint Oluştur</Text>
                    <Formik initialValues={{name: "", status: 0, estimatedFinishDate: new Date()}} validationSchema={this.validationSchema} onSubmit={values => this.handleSubmit(values)}>
                        {({values, handleChange, errors, setFieldValue, setFieldTouched, touched, isValid, handleSubmit}) => {
                            return (
                                <Fragment>
                                    <ExampleInput
                                        value={values.name}
                                        placeholder="Sprint adı (*)"
                                        name='name'
                                        iconName='type'
                                        handleChange={handleChange}
                                        setFieldTouched={setFieldTouched}
                                        errorMessage={touched.name && errors.name ? errors.name: ""}
                                    />

                                    <SelectInput value={values.status} name='status' text="Durum seçiniz (*)" selections={[{id: 0, text: "Hemen Başlamasın"}, {id: 1, text: "Hemen Başlasın"}]} setSelectedItem={setFieldValue} errorMessage={touched.status && errors.status ? errors.status : ""} />

                                    {values.status === 1 && <ExampleDatePicker value={values.estimatedFinishDate} name='estimatedFinishDate' handleChange={setFieldValue} text="Tahmini Bitiş Tarihi (*)" />}

                                    <RoundedButton disabled={!isValid} color='green' icon='arrow-right' pressFunc={handleSubmit} />
                                </Fragment>
                            );
                        }}
                    </Formik>
                </InnerContainer>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createSprint: (name, status, startDate, estimatedFinishDate, userID, projectID) => dispatch(createSprint(name, status, startDate, estimatedFinishDate, userID, projectID)),
        createNotification: (userIDs, type, description) => dispatch(createNotification(userIDs, type, description)),
        sendNotifications: (userIDs, title, body) => dispatch(sendNotifications(userIDs, title, body)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSprint);
