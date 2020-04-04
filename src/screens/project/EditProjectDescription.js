import React, {Fragment} from "react";
import {useDispatch} from "react-redux";
import {Formik} from "formik";
import {
    ExampleInput,
    RoundedButton,
    TopBar
} from "../../components";
import * as yup from "yup";
import {projectDescription} from "../../validationSchema";
import {editProjectDescription} from "../../actions/projectActions";
import {Container} from "../../styles";

const EditProjectDescription = ({navigation}) => {

    const dispatch = useDispatch();
    const description = navigation.getParam('description', "");

    const validationSchema = yup.object().shape({
        description: projectDescription,
    });

    const handleSubmit = (values) => {
        const projectID = navigation.getParam('projectID', "");
        dispatch(editProjectDescription(projectID, values.description));
        navigation.pop();
    };

    return (
        <Fragment>
            <TopBar isBack={true}/>

            <Container space>
                <Formik
                    initialValues={{description}}
                    validationSchema={validationSchema}
                    onSubmit={values => handleSubmit(values)}
                >
                    {({values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit}) => {
                        return (
                            <Fragment>
                                <ExampleInput
                                    value={values.description}
                                    placeholder="Açıklama (*)"
                                    name='description'
                                    iconName='target'
                                    handleChange={handleChange}
                                    setFieldTouched={setFieldTouched}
                                    errorMessage={touched.description && errors.description ? errors.description: ""}
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

export default EditProjectDescription;
