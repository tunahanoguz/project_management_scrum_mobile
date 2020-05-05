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
    DELETE_PROJECT_FILE_START,
    DELETE_PROJECT_FILE_FAILURE,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_FAILURE,
    SEND_PARENT_MESSAGE_FAILURE,
    GET_ALL_PROJECT_COMMENTS_REQUEST,
    GET_ALL_PROJECT_COMMENTS_SUCCESS,
    GET_ALL_PROJECT_COMMENTS_ERROR,
    GET_ALL_PROJECTS_FOR_HOME_START,
    GET_ALL_PROJECTS_FOR_HOME_SUCCESS,
    GET_ALL_PROJECTS_FOR_HOME_FAILURE,
    GET_PROJECT_PARENT_COMMENTS_FOR_DETAIL_START,
    GET_PROJECT_PARENT_COMMENTS_FOR_DETAIL_SUCCESS,
    GET_PROJECT_PARENT_COMMENTS_FOR_DETAIL_ERROR,
    GET_PROJECTS_FOR_TEAM_START,
    GET_PROJECTS_FOR_TEAM_SUCCESS,
    GET_PROJECTS_FOR_TEAM_FAILURE,
    GET_PROJECT_REPLY_COMMENTS_START,
    GET_PROJECT_REPLY_COMMENTS_SUCCESS,
    GET_PROJECT_REPLY_COMMENTS_FAILURE,
    GET_PROJECTS_FOR_USER_START,
    GET_PROJECTS_FOR_USER_SUCCESS,
    GET_PROJECTS_FOR_USER_FAILURE,
    EDIT_PROJECT_DESCRIPTION_REQUEST,
    EDIT_PROJECT_DESCRIPTION_SUCCESS,
    EDIT_PROJECT_DESCRIPTION_FAILURE,
    ADD_PROJECT_NOTE_REQUEST,
    ADD_PROJECT_NOTE_SUCCESS,
    ADD_PROJECT_NOTE_FAILURE,
    GET_PROJECT_NOTES_REQUEST,
    GET_PROJECT_NOTES_SUCCESS,
    GET_PROJECT_NOTES_FAILURE,
    EDIT_PROJECT_NOTE_REQUEST,
    EDIT_PROJECT_NOTE_SUCCESS,
    EDIT_PROJECT_NOTE_FAILURE,
    GET_PROJECT_DESCRIPTION_REQUEST,
    GET_PROJECT_DESCRIPTION_SUCCESS, GET_PROJECT_DESCRIPTION_FAILURE,
} from './types/projectTypes';

export const getAllProjects = (teamIDs) => dispatch => {
    dispatch({type: GET_ALL_PROJECTS_START});

    // let limitedTeamIDs = [];
    // if (teamIDs.length > 10){
    //     limitedTeamIDs.push(teamIDs.slice(index, index + 9));
    // } else {
    //     limitedTeamIDs = teamIDs;
    // }

    firestore().collection('projects').where('teamID', 'in', teamIDs).orderBy('createdAt', 'desc').get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_ALL_PROJECTS_FAILURE, error: "İçerisinde bulunduğunuz hiç proje yok."})
            }

            let projects = [];
            let projectIDs = [];
            snapshot.forEach(doc => {
                const id = doc.id;
                const projectData = doc.data();
                const project = {
                    id,
                    ...projectData,
                };

                projects.push(project);
                projectIDs.push(project.id);
            });

            dispatch({type: GET_ALL_PROJECTS_SUCCESS, projects, projectIDs});
        })
        .catch(() => dispatch({type: GET_ALL_PROJECTS_FAILURE, error: "Projeler getirilemedi."}));
};

export const getProjectsForHomeScreen = (teamIDs) => dispatch => {
    dispatch({type: GET_ALL_PROJECTS_FOR_HOME_START});

    const limitedTeamIDs = teamIDs.slice(0, 9);
    const projectRef = firestore().collection('projects');
    const query = projectRef.where('teamID', 'in', limitedTeamIDs).orderBy('createdAt', 'desc').limit(3);
    query.get()
        .then(snapshot => {
            if (snapshot.empty)
                console.log('Success!');

            let projects = [];
            snapshot.forEach(doc => {
                const project = {id: doc.id, ...doc.data()};
                projects.push(project);
            });

            dispatch({type: GET_ALL_PROJECTS_FOR_HOME_SUCCESS, projects});
        })
        .catch(() => dispatch({type: GET_ALL_PROJECTS_FOR_HOME_FAILURE, error: "Projeler getirilemedi."}));
};

export const getProjectsForTeam = (teamID) => dispatch => {
    dispatch({type: GET_PROJECTS_FOR_TEAM_START});

    const projectRef = firestore().collection('projects');
    const query = projectRef.where('teamID', '==', teamID).orderBy('createdAt', 'desc');
    query.get()
        .then(snapshot => {
            if (snapshot.isEmpty){
                dispatch({type: GET_PROJECTS_FOR_TEAM_FAILURE, error: "Bu takıma ait hiç proje yok."});
            }

            let projects = [];
            snapshot.forEach(doc => {
                const project = {id: doc.id, ...doc.data()};
                projects.push(project);
            });

            dispatch({type: GET_PROJECTS_FOR_TEAM_SUCCESS, projects});
        })
        .catch(() => dispatch({type: GET_PROJECTS_FOR_TEAM_FAILURE, error: "Projeler getirilemedi."}));
};

export const getProjectsForUser = (userID) => dispatch => {
    dispatch({type: GET_PROJECTS_FOR_USER_START});

    const taskRef = firestore().collection('projects');
    const taskQuery = taskRef.where('userID', '==', userID);
    taskQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_PROJECTS_FOR_USER_FAILURE, error: "Hiç iş yok."});
            } else {
                const projects = [];
                snapshot.forEach(doc => {
                    const project = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    projects.push(project);
                });

                dispatch({type: GET_PROJECTS_FOR_USER_SUCCESS, userProjects: projects});
            }
        })
        .catch(() => dispatch({type: GET_PROJECTS_FOR_USER_FAILURE, error: "İşler getirilemedi."}));
};

export const getSingleProject = (projectID) => dispatch => {
    dispatch({type: GET_SINGLE_PROJECT_START});
    firestore().collection('projects').doc(projectID).get()
        .then(doc => {
            const project = {
                id: doc.id,
                ...doc.data(),
            };
            // console.log(project);
            dispatch({type: GET_SINGLE_PROJECT_SUCCESS, project})
        })
        .catch(() => dispatch({type: GET_SINGLE_PROJECT_FAILURE, error: "Proje getirilemedi."}));
};

export const getProjectDescription = (projectID) => dispatch => {
    dispatch({type: GET_PROJECT_DESCRIPTION_REQUEST});

    const projectRef = firestore().collection('projects');
    projectRef.doc(projectID).get()
        .then(doc => {
            const data = doc.data();
            const projectDescription = data.description;
            dispatch({type: GET_PROJECT_DESCRIPTION_SUCCESS, projectDescription});
        })
        .catch(() => dispatch({type: GET_PROJECT_DESCRIPTION_FAILURE, error: 'Proje notları getirilemedi.'}));
};

export const getProjectNotes = (projectID) => dispatch => {
    dispatch({type: GET_PROJECT_NOTES_REQUEST});

    console.log("id" + projectID);
    const projectRef = firestore().collection('projects');
    projectRef.doc(projectID).get()
        .then(doc => {
            const data = doc.data();
            console.log(doc);
            const projectNotes = data.notes;
            dispatch({type: GET_PROJECT_NOTES_SUCCESS, projectNotes});
        })
        .catch(() => dispatch({type: GET_PROJECT_NOTES_FAILURE, error: 'Proje notları getirilemedi.'}));
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

    const projectRef = firestore().collection('projects');
    projectRef.doc(projectID).delete()
        .then(() => dispatch(getAllProjects(teamIDs)))
        .catch(() => dispatch({type: DELETE_PROJECT_FAILURE}));
};

export const editProjectDescription = (projectID, description) => dispatch => {
    dispatch({type: EDIT_PROJECT_DESCRIPTION_REQUEST});

    const projectRef = firestore().collection('projects');
    projectRef.doc(projectID).update({
        description,
    })
        .then(() => {
            dispatch({type: EDIT_PROJECT_DESCRIPTION_SUCCESS});
            dispatch(getSingleProject(projectID));
            dispatch(getProjectDescription(projectID));
        })
        .catch(() => dispatch({type: EDIT_PROJECT_DESCRIPTION_FAILURE}));
};

export const addProjectNote = (projectID, userID, notes) => dispatch => {
    dispatch({type: ADD_PROJECT_NOTE_REQUEST});

    const projectRef = firestore().collection('projects');
    projectRef.doc(projectID).update({
        notes,
    })
        .then(() => {
            dispatch({type: ADD_PROJECT_NOTE_SUCCESS});
            dispatch(getProjectNotes(projectID));
            dispatch(getSingleProject(projectID));
        })
        .catch(() => dispatch({type: ADD_PROJECT_NOTE_FAILURE}));
};

export const editProjectNote = (projectID, notes) => dispatch => {
    dispatch({type: EDIT_PROJECT_NOTE_REQUEST});

    const projectRef = firestore().collection('projects');
    projectRef.doc(projectID).update({
        notes,
    })
        .then(() => {
            dispatch({type: EDIT_PROJECT_NOTE_SUCCESS});
            dispatch(getProjectNotes(projectID));
            dispatch(getSingleProject(projectID));
        })
        .catch(() => dispatch({type: EDIT_PROJECT_NOTE_FAILURE}));
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
            name: fileName,
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

export const createProjectComment = (comment, parentCommentID, projectID, userID) => dispatch => {
    const projectCommentRef = firestore().collection('projectComments');
    const nowDate = new Date();
    projectCommentRef.add({
        comment,
        createdAt: nowDate,
        parentCommentID,
        projectID,
        userID
    })
        .then(() => {
            dispatch(getAllProjectComments(projectID));

            if (parentCommentID){
                dispatch(getProjectReplyComments(parentCommentID));
            }
        })
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

export const getProjectReplyComments = (parentCommentID) => dispatch => {
    dispatch({type: GET_PROJECT_REPLY_COMMENTS_START});

    const taskCommentRef = firestore().collection('projectComments');
    const queryTaskComment = taskCommentRef.where('parentCommentID', '==', parentCommentID).orderBy('createdAt', 'asc');
    queryTaskComment.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_PROJECT_REPLY_COMMENTS_FAILURE, error: "Bu yoruma hiç cevap verilmemiş."});
            } else {
                let replyComments = [];
                snapshot.forEach(doc => {
                    const replyComment = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    replyComments.push(replyComment);
                });

                dispatch({type: GET_PROJECT_REPLY_COMMENTS_SUCCESS, replyComments});
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({type: GET_PROJECT_REPLY_COMMENTS_FAILURE, error: "Bu yoruma ya hiç cevap gelmedi ya da cevaplar getirilemedi."})
        });
};

export const getProjectParentCommentsForDetail = (projectID) => dispatch => {
    dispatch({type: GET_PROJECT_PARENT_COMMENTS_FOR_DETAIL_START});

    const projectCommentRef = firestore().collection('projectComments');
    projectCommentRef.where('projectID', '==', projectID).orderBy('createdAt', 'desc').limit(4).get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_PROJECT_PARENT_COMMENTS_FOR_DETAIL_ERROR, error: "Henüz hiç yorum yok."})
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

            dispatch({type: GET_PROJECT_PARENT_COMMENTS_FOR_DETAIL_SUCCESS, comments});
        })
        .catch(() => dispatch({type: GET_PROJECT_PARENT_COMMENTS_FOR_DETAIL_ERROR, error: "Yorumlar getirilemedi."}));
};
