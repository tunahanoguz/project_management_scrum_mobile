import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ExampleInput, RoundedButton, TopBar} from "../../components";
import {Container} from "../../styles";
import {Formik} from "formik";
import * as yup from "yup";
import {projectNote} from "../../validationSchema";
import {addProjectNote, getProjectNotes} from "../../actions/projectActions";

const AddProjectNote = ({navigation}) => {
    const projectID = navigation.getParam('projectID');
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const notes = useSelector(state => state.projectReducer.projectNotes);

    const validationSchema = yup.object().shape({
        note: projectNote,
    });

    const handleSubmit = (values) => {
        const note = {
            note: values.note,
            userID: user.uid,
            projectID,
        };
        dispatch(addProjectNote(projectID, user.uid, [...notes, note]));
        navigation.pop();
    };

    return (
        <Fragment>
            <TopBar isBack={true}/>

            <Container space>
                <Formik
                    initialValues={{note: ""}}
                    validationSchema={validationSchema}
                    onSubmit={values => handleSubmit(values)}
                >
                    {({values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit}) => {
                        return (
                            <Fragment>
                                <ExampleInput
                                    value={values.note}
                                    placeholder="Not"
                                    name='note'
                                    iconName='target'
                                    handleChange={handleChange}
                                    setFieldTouched={setFieldTouched}
                                    errorMessage={touched.note && errors.note ? errors.note: ""}
                                    isMultiline={true}
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
            </Container>
        </Fragment>
    );
};

export default AddProjectNote;
