import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import * as yup from 'yup';
import {Formik} from 'formik';
import {
    taskTitle,
    taskPriority,
    taskDescription
} from '../../validationSchema';
import {
    TopBar,
    RoundedButton,
    ExampleInput,
    SelectInput,
} from 'components';
import {Container, Divider, Title} from "../../styles";
import {createTask} from "../../actions/taskActions";
import {createNotification, sendNotifications} from "../../actions/notificationActions";

class CreateTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowDatePicker: false
        };
    }

    validationSchema = yup.object().shape({
        task: taskTitle,
        description: taskDescription,
        priority: taskPriority,
    });

    handleSubmit = (values) => {
        const {navigation, createTask, user} = this.props;
        const projectID = navigation.getParam('projectID', "");
        const {task, description, priority} = values;
        createTask(task, description, priority, user.uid, projectID);
        navigation.pop();
    };

    render(){
        return (
            <Container>
                <TopBar isBack={true} />

                <Container space>
                    <Title>İş Oluştur</Title>

                    <Divider height={10}/>

                    <Formik
                        initialValues={{task: "", description: "",  priority: 0, project: ""}}
                        validationSchema={this.validationSchema}
                        onSubmit={values => this.handleSubmit(values)}
                    >
                        {({values, handleChange, errors, setFieldValue, setFieldTouched, touched, isValid, handleSubmit}) => {
                            return (
                                <Fragment>
                                    <ExampleInput
                                        value={values.task}
                                        placeholder="İş (*)"
                                        name='task'
                                        iconName='target'
                                        handleChange={handleChange}
                                        setFieldTouched={setFieldTouched}
                                        errorMessage={touched.task && errors.task ? errors.task: ""}
                                    />

                                    <ExampleInput
                                        value={values.description}
                                        placeholder="Açıklama (*)"
                                        name='description'
                                        iconName='align-left'
                                        handleChange={handleChange}
                                        setFieldTouched={setFieldTouched}
                                        errorMessage={touched.description && errors.description ? errors.description: ""}
                                    />

                                    <SelectInput
                                        value={values.priority}
                                        name='priority'
                                        text="Öncelik seçiniz (*)"
                                        selections={[{id: 1, text: "Yüksek Öncelikli"}, {id: 0, text: "Orta Öncelikli"}, {id: 2, text: "Düşük Öncelikli"}]}
                                        setSelectedItem={setFieldValue}
                                        errorMessage={touched.priority && errors.priority ? errors.priority: ""}
                                    />

                                    {/*<SelectInput value={values.status} name='project' text="Proje seçiniz (*)" selections={this.renderProjects()} setSelectedItem={setFieldValue} errorMessage={touched.project && errors.project ? errors.project: ""} />*/}

                                    {/*<ExampleDatePicker value={values.startDate} name='startDate' handleChange={setFieldValue} text="Başlangıç Tarihi (*)" />*/}

                                    {/*<ExampleDatePicker value={values.estimatedFinishDate} name='estimatedFinishDate' handleChange={setFieldValue} text="Tahmini Bitiş Tarihi (*)" />*/}

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
                </Container>
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
        createTask: (task, description, priority, userID, projectID) => dispatch(createTask(task, description, priority, userID, projectID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
