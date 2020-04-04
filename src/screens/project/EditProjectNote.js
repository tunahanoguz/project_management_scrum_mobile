import React, {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ExampleInput, RoundedButton, TopBar} from "../../components";
import {Container} from "../../styles";
import {Formik} from "formik";
import * as yup from "yup";
import {projectNote} from "../../validationSchema";
import {editProjectNote} from "../../actions/projectActions";

const EditProjectNote = ({navigation}) => {
    const projectID = navigation.getParam('projectID', '');
    const dispatch = useDispatch();
    const user = useSelector(reducer => reducer.authReducer.user);
    const projectNotes = useSelector(reducer => reducer.projectReducer.projectNotes);
    const note = navigation.getParam('note', '');
    const noteIndex = navigation.getParam('noteIndex', 0);

    const validationSchema = yup.object().shape({
        note: projectNote,
    });

    const handleSubmit = (values) => {
        const note = {
            note: values.note,
            userID: user.uid,
            projectID,
        };

        projectNotes[noteIndex] = note;

        dispatch(editProjectNote(projectID, projectNotes));
        navigation.pop();
    };

    return (
        <Fragment>
            <TopBar isBack={true}/>

            <Container space>
                <Formik
                    initialValues={{note}}
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

export default EditProjectNote;
