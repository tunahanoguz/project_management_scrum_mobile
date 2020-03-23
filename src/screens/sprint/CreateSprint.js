import React, {Component, Fragment} from 'react';
import {Text, StyleSheet} from 'react-native';
import Container from "../../components/Container";
import TopBar from "../../components/TopBar";
import InnerContainer from "../../components/InnerContainer";
import ExampleInput from "../../components/ExampleInput";
import SelectInput from "../../components/form/SelectInput";
import ExampleDatePicker from "../../components/form/ExampleDatePicker";
import RoundedButton from "../../components/buttons/RoundedButton";
import {Formik} from "formik";
import {createSprint} from "../../actions/sprintActions";
import {fonts} from "../../styles";
import {connect} from "react-redux";
import * as yup from "yup";
import {
    sprintEstimatedFinishDate,
    sprintName,
    sprintStatus,
} from "../../validationSchema";

class CreateSprint extends Component {

    validationSchema = yup.object().shape({
        name: sprintName,
        status: sprintStatus,
        estimatedFinishDate: sprintEstimatedFinishDate,
    });

    handleSubmit = (values) => {
        const {navigation, createSprint, user} = this.props;
        const projectID = navigation.getParam('projectID', "");
        let {name, status, estimatedFinishDate} = values;
        const startDate = status === 0 ? null : new Date();
        estimatedFinishDate = status === 0 ? null : new Date();

        try {
            createSprint(name, status, startDate, estimatedFinishDate, user.uid, projectID);
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSprint);
