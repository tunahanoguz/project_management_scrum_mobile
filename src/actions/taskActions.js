import firestore from '@react-native-firebase/firestore';
import {
    GET_ALL_TASKS_START,
    GET_ALL_TASKS_SUCCESS,
    GET_ALL_TASKS_FAILURE,
    CREATE_TASK_START,
    CREATE_TASK_FAILURE,
    EDIT_TASK_START,
    EDIT_TASK_FAILURE,
    DELETE_TASK_START,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE,
    GET_TASKS_FOR_HOME_START,
    GET_TASKS_FOR_HOME_SUCCESS,
    GET_TASKS_FOR_HOME_FAILURE,
    CREATE_TASK_COMMENT_START,
    CREATE_TASK_COMMENT_SUCCESS,
    CREATE_TASK_COMMENT_FAILURE,
    GET_ALL_TASK_COMMENTS_START,
    GET_ALL_TASK_COMMENTS_SUCCESS,
    GET_ALL_TASK_COMMENTS_FAILURE,
    GET_ALL_TASK_FILES_START,
    GET_ALL_TASK_FILES_FAILURE,
    GET_ALL_TASK_FILES_SUCCESS,
    DELETE_TASK_FILE_START,
    DELETE_TASK_FILE_SUCCESS,
    DELETE_TASK_FILE_FAILURE,
    GET_MY_TASKS_START,
    GET_MY_TASKS_SUCCESS,
    GET_MY_TASKS_FAILURE,
    GET_ALL_PROJECT_TASKS_START,
    GET_ALL_PROJECT_TASKS_SUCCESS,
    GET_ALL_PROJECT_TASKS_FAILURE,
    START_TASK_START,
    START_TASK_SUCCESS,
    START_TASK_FAILURE,
    GET_TASK_REPLY_COMMENTS_START,
    GET_TASK_REPLY_COMMENTS_SUCCESS,
    GET_TASK_REPLY_COMMENTS_FAILURE,
    CREATE_TASK_FILE_START,
    CREATE_TASK_FILE_SUCCESS,
    CREATE_TASK_FILE_FAILURE,
    GET_TASKS_FOR_USER_START,
    GET_TASKS_FOR_USER_SUCCESS,
    GET_TASKS_FOR_USER_FAILURE, GET_SINGLE_TASK_START, GET_SINGLE_TASK_SUCCESS, GET_SINGLE_TASK_FAILURE
} from './types/taskTypes';
import {createNotification, sendNotifications} from "./notificationActions";
import {getUserById} from "./authActions";

export const getAllTasks = (projectIDs) => dispatch => {
    dispatch({type: GET_ALL_TASKS_START});

    const taskRef = firestore().collection('task');
    const taskQuery = taskRef.where('projectID', 'in', projectIDs);
    taskQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_ALL_TASKS_FAILURE, error: "Hiç task yok."});
            }

            const tasks = [];
            snapshot.forEach(doc => {
                const task = {
                    id: doc.id,
                    ...doc.data(),
                };

                tasks.push(task);
            });

            dispatch({type: GET_ALL_TASKS_SUCCESS, tasks});
        })
        .catch(() => dispatch({type: GET_ALL_TASKS_FAILURE, error: "Taskler getirilemedi."}));
};

export const getSingleTask = (taskID) => dispatch => {
    dispatch({type: GET_SINGLE_TASK_START});
    console.log("Task ID: " + taskID);

    const taskRef = firestore().collection('task');
    const taskDoc = taskRef.doc(taskID);
    taskDoc.get()
        .then(doc => {
            const task = {
                id: doc.id,
                ...doc.data(),
            };

            console.log(task);

            dispatch({type: GET_SINGLE_TASK_SUCCESS, task});
        })
        .catch(() => dispatch({type: GET_SINGLE_TASK_FAILURE, error: "Sprint bulunamadı."}));
};

export const getAllProjectTasks = (projectID) => dispatch => {
    dispatch({type: GET_ALL_PROJECT_TASKS_START});

    const taskRef = firestore().collection('task');
    const taskQuery = taskRef.where('projectID', '==', projectID);
    taskQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_ALL_PROJECT_TASKS_FAILURE, error: "Hiç iş yok."});
            }

            const tasks = [];
            snapshot.forEach(doc => {
                const task = {
                    id: doc.id,
                    ...doc.data(),
                };

                tasks.push(task);
            });

            dispatch({type: GET_ALL_PROJECT_TASKS_SUCCESS, tasks});
        })
        .catch(() => dispatch({type: GET_ALL_PROJECT_TASKS_FAILURE, error: "İşler getirilemedi."}));
};

export const getMyTasks = (sprintID, userID) => dispatch => {
    dispatch({type: GET_MY_TASKS_START});

    const taskRef = firestore().collection('task');
    const taskQuery = taskRef.where('sprintID', '==', sprintID).where('userID', '==', userID);
    taskQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_MY_TASKS_FAILURE, error: "Size ait hiç görev yok yok."});
            } else {
                const tasks = [];
                snapshot.forEach(doc => {
                    const task = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    tasks.push(task);
                });

                dispatch({type: GET_MY_TASKS_SUCCESS, tasks});
            }
        })
        .catch(() => dispatch({type: GET_MY_TASKS_FAILURE, error: "Görevler getirilemedi."}));
};

export const getTasksForHome = (projectIDs) => dispatch => {
    dispatch({type: GET_TASKS_FOR_HOME_START});

    const taskRef = firestore().collection('task');
    const taskQuery = taskRef.where('projectID', 'in', projectIDs).limit(3);
    taskQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_TASKS_FOR_HOME_FAILURE, error: "Hiç task yok."});
            } else {
                const tasks = [];
                snapshot.forEach(doc => {
                    const task = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    tasks.push(task);
                });

                dispatch({type: GET_TASKS_FOR_HOME_SUCCESS, tasks});
            }
        })
        .catch(() => dispatch({type: GET_TASKS_FOR_HOME_FAILURE, error: "Taskler getirilemedi."}));
};

export const getTasksForUser = (userID) => dispatch => {
    dispatch({type: GET_TASKS_FOR_USER_START});

    const taskRef = firestore().collection('task');
    const taskQuery = taskRef.where('userID', '==', userID);
    taskQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_TASKS_FOR_USER_FAILURE, error: "Hiç iş yok."});
            } else {
                const tasks = [];
                snapshot.forEach(doc => {
                    const task = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    tasks.push(task);
                });

                dispatch({type: GET_TASKS_FOR_USER_SUCCESS, userTasks: tasks});
            }
        })
        .catch(() => dispatch({type: GET_TASKS_FOR_USER_FAILURE, error: "İşler getirilemedi."}));
};

export const createTask = (task, description, priority, userID, projectID) => dispatch => {
    dispatch({type: CREATE_TASK_START});

    const taskRef = firestore().collection('task');
    const nowDate = new Date();
    taskRef.add({
        task,
        description,
        priority,
        status: null,
        createdAt: nowDate,
        updatedAt: nowDate,
        startDate: null,
        estimatedFinishDate: null,
        finishDate: null,
        createdBy: userID,
        projectID,
        sprintID: null,
    })
        .then(() => dispatch(getAllProjectTasks(projectID)))
        .catch(() => dispatch({type: CREATE_TASK_FAILURE, error: "Task oluşturulamadı."}));
};

export const editTask = (taskID, task, priority, status, startDate, estimatedFinishDate, finishDate, userID, projectID, sprintID) => dispatch => {
    dispatch({type: EDIT_TASK_START});

    const taskRef = firestore().collection('task');
    const taskDoc = taskRef.doc(taskID);
    const nowDate = new Date();
    taskDoc.update({
        task,
        priority,
        status,
        updatedAt: nowDate,
        startDate,
        estimatedFinishDate,
        finishDate,
        userID,
        projectID,
        sprintID,
    })
        .then(() => dispatch(getAllTasks()))
        .catch(() => dispatch({type: EDIT_TASK_FAILURE, error: "Task oluşturulamadı."}));
};

export const startTask = (taskID, sprintID, userID, estimatedFinishDate) => dispatch => {
    dispatch({type: START_TASK_START});

    const taskRef = firestore().collection('task');
    const taskDoc = taskRef.doc(taskID);
    const nowDate = new Date();
    taskDoc.update({
        sprintID,
        userID,
        updatedAt: nowDate,
        startDate: nowDate,
        estimatedFinishDate,
        status: 1,
    })
        .then(() => {
            dispatch(getSingleTask(taskID));
            dispatch(getUserById(userID));
            dispatch(sendNotifications([userID], "Bir iş oluşturuldu!", "Size ait bir iş oluşturuldu"));
            dispatch(createNotification([userID], "task", "Size ait bir iş oluşturuldu"));
            dispatch({type: START_TASK_SUCCESS});
        })
        .catch(() => dispatch({type: START_TASK_FAILURE, error: "Task oluşturulamadı."}));
};

export const deleteTask = (taskID) => dispatch => {
    dispatch({type: DELETE_TASK_START});

    const taskRef = firestore().collection('task');
    const taskDoc = taskRef.doc(taskID);
    taskDoc.delete()
        .then(() => {
            dispatch(getAllTasks());
            dispatch({type: DELETE_TASK_SUCCESS});
        })
        .catch(() => dispatch({type: DELETE_TASK_FAILURE, error: "Task silinemedi."}));
};

export const getAllTaskComments = (taskID) => dispatch => {
    dispatch({type: GET_ALL_TASK_COMMENTS_START});

    const taskCommentRef = firestore().collection('taskComment');
    const queryTaskComment = taskCommentRef.where('taskID', '==', taskID).orderBy('createdAt', 'desc');
    queryTaskComment.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_ALL_TASK_COMMENTS_FAILURE, error: "Bu task için hiç yorum bulunamadı."});
            } else {
                let comments = [];
                snapshot.forEach(doc => {
                    const taskComment = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    comments.push(taskComment);
                });

                dispatch({type: GET_ALL_TASK_COMMENTS_SUCCESS, comments});
            }
        })
        .catch(() => dispatch({type: GET_ALL_TASK_COMMENTS_FAILURE, error: "Yorumlar getirilemedi."}));
};

export const getTaskReplyComments = (parentCommentID) => dispatch => {
    dispatch({type: GET_TASK_REPLY_COMMENTS_START});

    const taskCommentRef = firestore().collection('taskComment');
    const queryTaskComment = taskCommentRef.where('parentCommentID', '==', parentCommentID).orderBy('createdAt', 'asc');
    queryTaskComment.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_TASK_REPLY_COMMENTS_FAILURE, error: "Bu yoruma hiç cevap verilmemiş."});
            } else {
                let replyComments = [];
                snapshot.forEach(doc => {
                    const replyComment = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    replyComments.push(replyComment);
                });

                dispatch({type: GET_TASK_REPLY_COMMENTS_SUCCESS, replyComments});
            }
        })
        .catch((err) => dispatch({type: GET_TASK_REPLY_COMMENTS_FAILURE, error: "Bu yoruma ya hiç cevap gelmedi ya da cevaplar getirilemedi."}));
};

export const createTaskComment = (comment, parentCommentID, taskID, userID) => dispatch => {
    dispatch({type: CREATE_TASK_COMMENT_START});

    const taskCommentRef = firestore().collection('taskComment');
    const nowDate = new Date();
    taskCommentRef.add({
        comment,
        createdAt: nowDate,
        parentCommentID,
        taskID,
        userID
    })
        .then(() => {
            dispatch(getAllTaskComments(taskID));
            dispatch({type: CREATE_TASK_COMMENT_SUCCESS});
        })
        .catch(() => dispatch({type: CREATE_TASK_COMMENT_FAILURE, error: "Task yorumu oluşturulamadı."}));
};

export const createTaskFile = (state, file) => dispatch => {
    dispatch({type: CREATE_TASK_FILE_START});

    const {fileName, fileDescription, downloadURL, size, contentType, taskID} = file;
    const nowDate = new Date();
    if (state === true) {
        firestore().collection('taskFile').add({
            name: fileName,
            description: fileDescription,
            downloadURL,
            size,
            contentType,
            taskID,
            createdAt: nowDate,
        })
            .then(() => {
                dispatch({type: CREATE_TASK_FILE_SUCCESS});
                dispatch(getAllTaskFiles(taskID));
            })
            .catch(() => dispatch({type: CREATE_TASK_FILE_FAILURE, error: "Dosya yüklenirken bir hata oluştu."}));
    } else {
        dispatch({type: CREATE_TASK_FILE_FAILURE, error: "Dosya yüklenirken bir hata oluştu."});
    }
};

export const getAllTaskFiles = (taskID) => dispatch => {
    dispatch({type: GET_ALL_TASK_FILES_START});

    const taskFileRef = firestore().collection('taskFile');
    const taskFileQuery = taskFileRef.where('taskID', '==', taskID).orderBy('createdAt', 'desc');
    taskFileQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_ALL_TASK_FILES_FAILURE, error: "Hiç dosya yok."});
            } else {
                let taskFiles = [];
                snapshot.forEach(doc => {
                    const taskFile = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    taskFiles.push(taskFile);
                });

                dispatch({type: GET_ALL_TASK_FILES_SUCCESS, taskFiles});
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({type: GET_ALL_TASK_FILES_FAILURE, error: "Dosyalar getirilemedi."})
        });
};

export const deleteTaskFile = (projectID, taskFileID) => dispatch => {
    dispatch({type: DELETE_TASK_FILE_START});

    const taskFileRef = firestore().collection('taskFile');
    const taskFileDoc = taskFileRef.doc(taskFileID);
    taskFileDoc.get()
        .then(() => {
            dispatch(getAllTaskFiles(projectID));
            dispatch({type: DELETE_TASK_FILE_SUCCESS});
        })
        .catch(() => dispatch({type: DELETE_TASK_FILE_FAILURE, error: "Dosya silinemedi."}));
};
