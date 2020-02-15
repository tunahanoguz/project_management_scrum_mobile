import firestore from '@react-native-firebase/firestore';
import {
    GET_ALL_PROJECTS_SUCCESS,
    GET_ALL_PROJECTS_FAILURE,
    GET_ALL_PROJECTS_START,
    GET_SINGLE_PROJECT_START,
    GET_SINGLE_PROJECT_SUCCESS,
    GET_SINGLE_PROJECT_FAILURE,
    CREATE_PROJECT_FAILURE,
    UPLOAD_PROJECT_FILE_START,
    UPLOAD_PROJECT_FILE_SUCCESS,
    UPLOAD_PROJECT_FILE_FAILURE,
    GET_ALL_PROJECT_FILES_START,
    GET_ALL_PROJECT_FILES_SUCCESS,
    GET_ALL_PROJECT_FILES_FAILURE,
    CREATE_PROJECT_FILE_SUCCESS,
} from './types';
// import {blob} from "../fileBlob";
import storage from "@react-native-firebase/storage";
import uuid from "uuid";

export const getAllProjects = (teamIDs) => dispatch => {
    dispatch({type: GET_ALL_PROJECTS_START});
    let projects = [];
    firestore().collection('projects').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const id = doc.id;
                const projectData = doc.data();
                const project = {
                    id,
                    ...projectData,
                };

                teamIDs.map(id => {
                    if (project.teamID === id) {
                        projects.push(project);
                    }
                });
            });

            if (projects === []) {
                dispatch({type: GET_ALL_PROJECTS_FAILURE, error: "İçerisinde bulunduğunuz hiçbir proje yok."});
            }
        })
        .then(() => dispatch({type: GET_ALL_PROJECTS_SUCCESS, projects}))
        .catch(() => dispatch({type: GET_ALL_PROJECTS_FAILURE, error: "Projeler getirilemedi."}));
};

export const getSingleProject = (projectID) => dispatch => {
    dispatch({type: GET_SINGLE_PROJECT_START});
    firestore().collection('projects').where('id', '==', projectID).get()
        .then(snapshot => {
            const project = {
                id: doc.id,
                ...doc.data(),
            };
            snapshot.forEach(doc => dispatch({type: GET_SINGLE_PROJECT_SUCCESS, project}));
        })
        .catch(() => dispatch({type: GET_SINGLE_PROJECT_FAILURE, error: "Proje getirilemedi."}));
};

export const createProject = (name, description, notes, createdAt, startDate, finishDate, teamID, teamIDs, userID) => dispatch => {
    firestore().collection('projects').add({
        name,
        description,
        notes,
        createdAt,
        startDate,
        finishDate,
        teamID,
        createdBy: userID,
    })
        // .then(() => dispatch(getAllProjects(teamIDs)))
        .catch(() => dispatch({type: CREATE_PROJECT_FAILURE, error: "Proje oluşturulamadı."}));
};

// export const uploadProjectFile = (fileURL) => dispatch => {
//     dispatch({type: UPLOAD_PROJECT_FILE_START});
//     const blob = new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.onload = function () {
//             resolve(xhr.response);
//         };
//         xhr.onerror = function (e) {
//             reject(new TypeError('Network request failed'));
//         };
//         xhr.responseType = 'blob';
//         xhr.open('GET', fileURL, true);
//         xhr.send(null);
//     });
//     // blob.close();
//
//     const ref = storage()
//         .ref('projectFiles')
//         .child(uuid.v4());
//     ref.put(blob)
//         .then(() => dispatch({type: UPLOAD_PROJECT_FILE_SUCCESS, file: {name: 'asdasdasd'}}))
//         .catch(() => dispatch({type: UPLOAD_PROJECT_FILE_FAILURE, error: "Proje oluşturulamadı."}));
// };

export const createProjectFile = (state, projectID, file) => dispatch => {
    const {fileName, downloadURL, size, contentType, projectID} = file;
    if (state === true) {
        firestore().collection('projectFiles').add({
            fileName,
            downloadURL,
            size,
            contentType,
            projectID,
        })
            .then(() => dispatch({type: CREATE_PROJECT_FILE_SUCCESS}))
            .catch(() => dispatch({type: CREATE_PROJECT_FAILURE, error: "Dosya yüklenirken bir hata oluştu."}));
    } else {
        dispatch({type: CREATE_PROJECT_FAILURE, error: "Dosya yüklenirken bir hata oluştu."});
    }

};

export const getAllProjectFiles = (projectID) => dispatch => {
    dispatch({type: GET_ALL_PROJECT_FILES_START});

    const projectFileRef = firestore().collection('projectFiles');
    projectFileRef.where('projectID', '==', projectID).get()
        .then(snapshot => {
            let files = [];
            snapshot.forEach(doc => {
                const file = {
                    id: doc.id,
                    ...doc.data()
                };

                files.push(file);
                dispatch({type: GET_ALL_PROJECT_FILES_SUCCESS, files})
            });
        })
        .catch(() => dispatch({type: GET_ALL_PROJECT_FILES_FAILURE, error: "Projeye ait dosyalar getirilemedi."}));
};