import React, {Component, Fragment} from 'react';
import {Text, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Formik} from "formik";
import {connect} from "react-redux";
import * as yup from "yup";
import {
    TopBar,
    Container,
    InnerContainer,
    ExampleInput,
    ExampleDatePicker,
    RoundedButton,
} from 'components';
import {fonts} from "../../styles";
import {editSprint} from "../../actions/sprintActions";
import {
    sprintEstimatedFinishDate,
    sprintName,
} from "../../validationSchema";

class EditSprint extends Component {

    validationSchema = yup.object().shape({
        name: sprintName,
        estimatedFinishDate: sprintEstimatedFinishDate,
    });

    handleSubmit = (values) => {
        const {navigation, editSprint} = this.props;

        const projectID = navigation.getParam('projectID', "");
        const sprint = navigation.getParam('sprint', "");
        const {id} = sprint;

        const {name, estimatedFinishDate} = values;

        try {
            editSprint(projectID, id, name, estimatedFinishDate);
            navigation.navigate('SprintList', {projectID});
        } catch (err) {
            alert('Error!');
        }
    };

    render(){
        const {getParam} = this.props.navigation;
        const sprint = getParam('sprint', "");
        return (
            <Container>
                <TopBar isBack={true} />

                <InnerContainer>
                    <Text style={fonts.title}>Sprint Düzenle</Text>
                    <Formik
                        initialValues={{name: sprint.name, estimatedFinishDate: sprint.estimatedFinishDate.toDate()}}
                        validationSchema={this.validationSchema}
                        onSubmit={values => this.handleSubmit(values)}
                    >
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

                                    {/*<SelectInput value={values.status} name='status' text="Durum seçiniz (*)" selections={[{id: 0, text: "Hemen Başlamasın"}, {id: 1, text: "Hemen Başlasın"}]} setSelectedItem={setFieldValue} errorMessage={touched.status && errors.status ? errors.status : ""} />*/}

                                    <ExampleDatePicker
                                        value={values.estimatedFinishDate}
                                        name='estimatedFinishDate'
                                        handleChange={setFieldValue}
                                        text="Tahmini Bitiş Tarihi (*)"
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
                </InnerContainer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editSprint: (projectID, sprintID, name, estimatedFinishDate) => dispatch(editSprint(projectID, sprintID, name, estimatedFinishDate)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(EditSprint));
