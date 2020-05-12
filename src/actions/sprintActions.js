import firestore from '@react-native-firebase/firestore';
import {
    GET_ALL_SPRINTS_START,
    GET_ALL_SPRINTS_SUCCESS,
    GET_ALL_SPRINTS_FAILURE,
    CREATE_SPRINT_START,
    CREATE_SPRINT_SUCCESS,
    CREATE_SPRINT_FAILURE,
    EDIT_SPRINT_START,
    EDIT_SPRINT_SUCCESS,
    EDIT_SPRINT_FAILURE,
    DELETE_SPRINT_START,
    DELETE_SPRINT_SUCCESS,
    DELETE_SPRINT_FAILURE,
    FINISH_SPRINT_START,
    FINISH_SPRINT_SUCCESS,
    FINISH_SPRINT_FAILURE,
    START_SPRINT_START,
    START_SPRINT_SUCCESS,
    START_SPRINT_FAILURE,
    GET_SPRINTS_FOR_HOME_START,
    GET_SPRINTS_FOR_HOME_SUCCESS,
    GET_SPRINTS_FOR_HOME_FAILURE,
    GET_SPRINTS_FOR_PROJECT_START,
    GET_SPRINTS_FOR_PROJECT_SUCCESS,
    GET_SPRINTS_FOR_PROJECT_FAILURE,
    GET_SINGLE_SPRINT_START,
    GET_SINGLE_SPRINT_SUCCESS,
    GET_SINGLE_SPRINT_FAILURE, GET_SPRINT_TASKS_START, GET_SPRINT_TASKS_SUCCESS, GET_SPRINT_TASKS_FAILURE,
} from "./types/sprintTypes";

export const getAllSprints = (projectID) => dispatch => {
    dispatch({type: GET_ALL_SPRINTS_START});

    const sprintRef = firestore().collection('sprint');
    const sprintQuery = sprintRef.where('projectID', '==', projectID);
    sprintQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_ALL_SPRINTS_FAILURE, error: "Hiç Sprint yok."});
            } else {
                let sprints = [];
                snapshot.forEach(doc => {
                    const sprint = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    sprints.push(sprint);
                });

                dispatch({type: GET_ALL_SPRINTS_SUCCESS, sprints});
            }
        })
        .catch(() => dispatch({type: GET_ALL_SPRINTS_FAILURE, error: "Sprint'ler getirilemedi."}));
};

export const getSprintsForProjectDetail = (projectID) => dispatch => {
    dispatch({type: GET_SPRINTS_FOR_PROJECT_START});

    const sprintRef = firestore().collection('sprint');
    const sprintQuery = sprintRef.where('projectID', '==', projectID).limit(3);
    sprintQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_SPRINTS_FOR_PROJECT_FAILURE, error: "Hiç Sprint yok."});
            } else {
                let sprints = [];
                snapshot.forEach(doc => {
                    const sprint = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    sprints.push(sprint);
                });

                dispatch({type: GET_SPRINTS_FOR_PROJECT_SUCCESS, sprints});
            }
        })
        .catch(() => dispatch({type: GET_SPRINTS_FOR_PROJECT_FAILURE, error: "Sprint'ler getirilemedi."}));
};

export const getSprintsForHomeScreen = (projectIDs) => dispatch => {
    dispatch({type: GET_SPRINTS_FOR_HOME_START});

    const limitedProjectIDs = projectIDs.slice(0, 9);
    const sprintRef = firestore().collection('sprint');
    const sprintQuery = sprintRef.where('projectID', 'in', limitedProjectIDs).limit(3);
    sprintQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_SPRINTS_FOR_HOME_FAILURE, error: "Hiç Sprint yok."});
            } else {
                let sprints = [];
                snapshot.forEach(doc => {
                    const sprint = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    sprints.push(sprint);
                });

                dispatch({type: GET_SPRINTS_FOR_HOME_SUCCESS, sprints});
            }
        })
        .catch((err) => {
            // console.log(err);
            dispatch({type: GET_SPRINTS_FOR_HOME_FAILURE, error: "Sprint'ler getirilemedi."});
        });
};

export const getSingleSprint = (sprintID) => dispatch => {
    dispatch({type: GET_SINGLE_SPRINT_START});

    const sprintRef = firestore().collection('sprint');
    const sprintQuery = sprintRef.doc(sprintID);
    sprintQuery.get()
        .then(doc => {
            const sprint = {
                id: doc.id,
                ...doc.data(),
            };

            dispatch({type: GET_SINGLE_SPRINT_SUCCESS, sprint})
        })
        .catch(() => dispatch({type: GET_SINGLE_SPRINT_FAILURE, error: "Sprint getirilemedi."}));
};

export const createSprint = (name, status, startDate, estimatedFinishDate, userID, projectID) => dispatch => {
    dispatch({type: CREATE_SPRINT_START});

    const sprintRef = firestore().collection('sprint');
    const nowDate = new Date();
    sprintRef.add({
        name,
        status,
        createdAt: nowDate,
        startDate,
        estimatedFinishDate,
        finishDate: null,
        createdBy: userID,
        projectID,
    })
        .then(() => {
            dispatch({type: CREATE_SPRINT_SUCCESS});
            dispatch(getAllSprints(projectID));
        })
        .catch(() => dispatch({type: CREATE_SPRINT_FAILURE, error: "Sprint'ler getirilemedi."}));
};

export const startSprint = (sprintID, estimatedFinishDate) => dispatch => {
    dispatch({type: START_SPRINT_START});
    const sprintRef = firestore().collection('sprint');
    const nowDate = new Date();
    const sprintDoc = sprintRef.doc(sprintID);
    sprintDoc.update({
        status: 1,
        startDate: nowDate,
        estimatedFinishDate,
    })
        .then(() => {
            dispatch(getSingleSprint(sprintID));
            dispatch({type: START_SPRINT_SUCCESS});
        })
        .catch(() => dispatch({type: START_SPRINT_FAILURE, error: "Sprint başlatılamadı."}));
};

export const finishSprint = (sprintID) => dispatch => {
    dispatch({type: FINISH_SPRINT_START});

    const sprintRef = firestore().collection('sprint');
    const nowDate = new Date();
    const sprintDoc = sprintRef.doc(sprintID);
    sprintDoc.update({
        finishDate: nowDate,
        status: 2,
    })
        .then(() => {
            dispatch(getSingleSprint(sprintID));
            dispatch({type: FINISH_SPRINT_SUCCESS});
        })
        .catch(() => dispatch({type: FINISH_SPRINT_FAILURE, error: "Sprint bitirilemedi."}));
};

export const editSprint = (projectID, sprintID, name, estimatedFinishDate) => dispatch => {
    dispatch({type: EDIT_SPRINT_START});

    const sprintRef = firestore().collection('sprint');
    const sprintDoc = sprintRef.doc(sprintID);
    sprintDoc.update({
        name,
        estimatedFinishDate,
    })
        .then(() => {
            dispatch(getAllSprints(projectID));
            dispatch({type: EDIT_SPRINT_SUCCESS});
        })
        .catch(() => dispatch({type: EDIT_SPRINT_FAILURE, error: "Sprint güncellenemedi."}));
};

export const deleteSprint = (projectID, sprintID) => dispatch => {
    dispatch({type: DELETE_SPRINT_START});

    const sprintRef = firestore().collection('sprint');
    const sprintDoc = sprintRef.doc(sprintID);
    sprintDoc.delete()
        .then(() => {
            dispatch(getAllSprints(projectID));
            dispatch({type: DELETE_SPRINT_SUCCESS});
        })
        .catch(() => dispatch({type: DELETE_SPRINT_FAILURE, error: "Sprint güncellenemedi."}));
};

export const getSprintTasks = (sprintID) => dispatch => {
    dispatch({type: GET_SPRINT_TASKS_START});

    const taskRef = firestore().collection('task');
    const taskQuery = taskRef.where('sprintID', '==', sprintID);
    taskQuery.get()
        .then(snapshot => {
            if (snapshot.isEmpty){
                dispatch({type: GET_SPRINT_TASKS_FAILURE, error: "Bu sprinte ait iş yok."});
            } else {
                const tasks = [];
                snapshot.forEach(doc => {
                    const task = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    tasks.push(task);
                });

                dispatch({type: GET_SPRINT_TASKS_SUCCESS, tasks});
            }
        })
        .catch(() => dispatch({type: GET_SPRINT_TASKS_FAILURE, error: "Bu sprinte ait işler getirilemedi."}));
};
