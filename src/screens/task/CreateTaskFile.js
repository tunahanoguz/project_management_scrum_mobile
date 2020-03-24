import React, {Fragment, useState} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity} from "react-native";
import {useDispatch} from "react-redux";
import {Formik} from "formik";
import DocumentPicker from "react-native-document-picker";
import storage from "@react-native-firebase/storage";
import uuid from "uuid";
import * as yup from "yup";
import {
    TopBar,
    ExampleInput,
    RoundedButton,
} from 'components';
import {colors, Container, Divider, Text, Title} from "../../styles";
import {taskFileDescription, taskFileName} from "../../validationSchema";
import {createTaskFile} from "../../actions/taskActions";


const CreateTaskFile = ({navigation}) => {
    const [file, setFile] = useState("");
    const [fileUri, setFileUri] = useState("");
    const taskID = navigation.getParam('taskID', "");

    const dispatch = useDispatch();

    const validationSchema = yup.object().shape({
        name: taskFileName,
        description: taskFileDescription,
    });

    const openFilePicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles,],
            });

            const {uri, name} = res;
            setFileUri(uri);
            setFile(name);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    };

    const uploadFile = async (fileName, fileDescription, fileURL, taskID) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', fileURL, true);
            xhr.send(null);
        });

        const ref = storage()
            .ref('taskFiles')
            .child(uuid.v4());
        let putFile = ref.put(blob);

        putFile.then(function (snapshot) {
            const {size, contentType} = snapshot.metadata;
            ref.getDownloadURL().then(downloadURL => {
                const file = {
                    fileName,
                    fileDescription,
                    contentType,
                    size,
                    downloadURL,
                    taskID,
                };

                dispatch(createTaskFile(true, file));
            });
        })
            .catch(() => dispatch(createTaskFile(false, null)));

        blob.close();
    };

    const handleSubmit = (values) => {
        Keyboard.dismiss();

        if (fileUri !== ""){
            uploadFile(values.name, values.description, fileUri, taskID)
                .then(() => navigation.navigate('TaskFileList', {taskID}));
        }
    };

    const buttonStyle = [styles.buttonContainer, fileUri !== "" ? {backgroundColor: colors.darkGreen, color: 'white'} : null];

    return (
        <Container>
            <TopBar isBack={true} />

            <Container space>
                <Title>Dosya Yükle</Title>

                <Divider height={10}/>

                <Formik
                    initialValues={{name: "", description: ""}}
                    validationSchema={validationSchema}
                    onSubmit={values => handleSubmit(values)}
                >
                    {({values, handleChange, errors, setFieldValue, setFieldTouched, touched, isValid, handleSubmit}) => {
                        return (
                            <Fragment>
                                <ExampleInput
                                    value={values.name}
                                    placeholder="Dosya adı (*)"
                                    name='name'
                                    iconName='target'
                                    handleChange={handleChange}
                                    setFieldTouched={setFieldTouched}
                                    errorMessage={touched.name && errors.name ? errors.name: ""}
                                />

                                <ExampleInput
                                    value={values.description}
                                    placeholder="Dosya açıklaması"
                                    name='description'
                                    iconName='align-left'
                                    handleChange={handleChange}
                                    setFieldTouched={setFieldTouched}
                                    errorMessage={touched.description && errors.description ? errors.description: ""}
                                />

                                <TouchableOpacity
                                    onPress={() => openFilePicker()}
                                    style={buttonStyle}
                                >
                                    <Text color={fileUri !== "" && 'white'}>Bir dosya seçin</Text>
                                </TouchableOpacity>

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
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
    },
});

export default CreateTaskFile;
