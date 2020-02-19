import firestore from '@react-native-firebase/firestore';
import {
    GET_ALL_PROJECTS_SUCCESS,
    GET_ALL_PROJECTS_FAILURE,
    GET_ALL_PROJECTS_START,
    GET_SINGLE_PROJECT_START,
    GET_SINGLE_PROJECT_SUCCESS,
    GET_SINGLE_PROJECT_FAILURE,
    CREATE_PROJECT_FAILURE,
    GET_ALL_PROJECT_FILES_START,
    GET_ALL_PROJECT_FILES_SUCCESS,
    GET_ALL_PROJECT_FILES_FAILURE,
    CREATE_PROJECT_FILE_SUCCESS,
    DELETE_PROJECT_FILE_START,
    DELETE_PROJECT_FILE_SUCCESS,
    DELETE_PROJECT_FILE_FAILURE,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
    SEND_PARENT_MESSAGE_SUCCESS,
    SEND_PARENT_MESSAGE_FAILURE,
    SEND_CHILD_MESSAGE_SUCCESS,
    SEND_CHILD_MESSAGE_FAILURE,
    GET_ALL_PROJECT_COMMENTS_REQUEST,
    GET_ALL_PROJECT_COMMENTS_SUCCESS,
    GET_ALL_PROJECT_COMMENTS_ERROR,
    GET_ALL_PROJECT_CHILD_COMMENTS_REQUEST,
    GET_ALL_PROJECT_CHILD_COMMENTS_SUCCESS,
    GET_ALL_PROJECT_CHILD_COMMENTS_ERROR,
} from './types';

export const getAllProjects = (teamIDs) => dispatch => {
    dispatch({type: GET_ALL_PROJECTS_START});

    firestore().collection('projects').where('teamID', 'in', teamIDs).orderBy('createdAt', 'desc').get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_ALL_PROJECTS_FAILURE, error: "İçerisinde bulunduğunuz hiç proje yok."})
            }

            let projects = [];
            snapshot.forEach(doc => {
                const id = doc.id;
                const projectData = doc.data();
                const project = {
                    id,
                    ...projectData,
                };

                projects.push(project);
            });

            dispatch({type: GET_ALL_PROJECTS_SUCCESS, projects});
        })
        .catch((err) => {
            console.log(err);
            dispatch({type: GET_ALL_PROJECTS_FAILURE, error: "Projeler getirilemedi."});
        });
};

export const getProjectsForHomeScreen = (teamIDs) => dispatch => {
    const projectRef = firestore().collection('projects');
    const query = projectRef.where('teamID', 'in', teamIDs).orderBy('createdAt', 'desc').limit(5);
    query.get()
        .then(snapshot => {
            if (snapshot.empty)
                console.log('Success!');

            let projects = [];
            snapshot.forEach(doc => {
                const project = {id: doc.id, ...doc.data()};
                projects.push(project);
            });

            console.log('Success!');
        })
        .catch(() => console.log('Failure!'));
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
        .then(() => dispatch(getAllProjects(teamIDs)))
        .catch(() => dispatch({type: CREATE_PROJECT_FAILURE, error: "Proje oluşturulamadı."}));
};

export const deleteProject = (teamIDs, projectID) => dispatch => {
    dispatch({type: DELETE_PROJECT_REQUEST});

    console.log("Deleted project id: " + projectID);

    const projectRef = firestore().collection('projects');
    projectRef.doc(projectID).delete()
        .then(() => dispatch(getAllProjects(teamIDs)))
        .catch(() => dispatch({type: DELETE_PROJECT_FAILURE}));
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
            .then(() => dispatch(getAllProjectFiles(projectID)))
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
            if (snapshot.empty){
                dispatch({type: GET_ALL_PROJECT_FILES_FAILURE, error: "Henüz hiç dosya yok."});
            }

            let files = [];
            snapshot.forEach(doc => {
                const file = {
                    id: doc.id,
                    ...doc.data()
                };

                files.push(file);
                dispatch({type: GET_ALL_PROJECT_FILES_SUCCESS, files});
                console.log(file);
            });
        })
        .catch(() => dispatch({type: GET_ALL_PROJECT_FILES_FAILURE, error: "Projeye ait dosyalar getirilemedi."}));
};

export const deleteProjectFile = (projectID, projectFileID) => dispatch => {
    dispatch({type: DELETE_PROJECT_FILE_START});

    const projectFileRef = firestore().collection('projectFiles');
    projectFileRef.doc(projectFileID).delete()
        .then(() => dispatch(getAllProjectFiles(projectID)))
        .catch(() => dispatch({type: DELETE_PROJECT_FILE_FAILURE}));
};

export const sendProjectParentComment = (projectID, userID, comment, parentCommentID) => dispatch => {
    const projectCommentRef = firestore().collection('projectComments');
    projectCommentRef.add({
        projectID,
        userID,
        comment,
        parentCommentID,
        createdAt: new Date(),
    })
        .then(() => dispatch(getAllProjectComments(projectID)))
        .catch(() => dispatch({type: SEND_PARENT_MESSAGE_FAILURE}));
};

export const getAllProjectComments = (projectID) => dispatch => {
    dispatch({type: GET_ALL_PROJECT_COMMENTS_REQUEST});
    const projectCommentRef = firestore().collection('projectComments');
    projectCommentRef.where('projectID', '==', projectID).orderBy('createdAt', 'desc').get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_ALL_PROJECT_COMMENTS_ERROR, error: "Henüz hiç yorum yok."})
            }

            let comments = [];

            snapshot.forEach(doc => {
                const comment = {
                    id: doc.id,
                    ...doc.data(),
                };

                comments.push(comment);
            });

            dispatch({type: GET_ALL_PROJECT_COMMENTS_SUCCESS, comments});
        })
        .catch(() => dispatch({type: GET_ALL_PROJECT_COMMENTS_ERROR, error: "Yorumlar getirilemedi."}));
};

export const getAllProjectParentComments = (projectID) => dispatch => {
    dispatch({type: GET_ALL_PROJECT_COMMENTS_REQUEST});

    const projectCommentRef = firestore().collection('projectComments');
    projectCommentRef.where('projectID', '==', projectID).orderBy('createdAt', 'desc').get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_ALL_PROJECT_COMMENTS_ERROR, error: "Henüz hiç yorum yok."})
            }

            let comments = [];

            snapshot.forEach(doc => {
                const comment = {
                    id: doc.id,
                    ...doc.data(),
                };

                if (comment.parentCommentID === null){
                    comments.push(comment);
                }
            });

            dispatch({type: GET_ALL_PROJECT_COMMENTS_SUCCESS, comments});
        })
        .catch(() => dispatch({type: GET_ALL_PROJECT_COMMENTS_ERROR, error: "Yorumlar getirilemedi."}));
};

export const getAllChildComments = (parentCommentID) => dispatch => {
    dispatch({type: GET_ALL_PROJECT_CHILD_COMMENTS_REQUEST});

    const projectCommentRef = firestore().collection('projectComments');
    projectCommentRef.where('parentCommentID', '==', parentCommentID).get()
        .then(snapshot => {
            let childComments = [];

            snapshot.forEach(doc => {
                const comment = {
                    id: doc.id,
                    ...doc.data(),
                };

                childComments.push(comment);
            });

            dispatch({type: GET_ALL_PROJECT_CHILD_COMMENTS_SUCCESS, childComments});
        })
        .catch(() => dispatch({type: GET_ALL_PROJECT_CHILD_COMMENTS_ERROR, error: "Yorumlar getirilemedi."}));
};