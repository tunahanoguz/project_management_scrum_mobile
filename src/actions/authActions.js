import {
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_BY_ID_START,
    GET_USER_BY_ID_SUCCESS,
    GET_USER_BY_ID_FAILURE,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    CHANGE_USER_FULLNAME_SUCCESS,
    CHANGE_USER_FULLNAME_FAILURE,
    UPDATE_PP_FAILURE
} from "./types";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const getUser = () => dispatch => {
    auth().onAuthStateChanged(function (user) {
        if (user) {
            dispatch({type: GET_USER_SUCCESS, authState: true, user: user});
        } else {
            dispatch({type: GET_USER_FAILURE, error: "Kullanıcı bilgileri getirilemedi."});
        }
    });
};

export const getUserById = (userID) => dispatch => {
    dispatch({type: GET_USER_BY_ID_START});
    firestore().collection('users').where('id', '==', userID).get()
        .then(snapshot => {
            let foundUser = {};
            snapshot.forEach(doc => foundUser = doc.data());

            dispatch({type: GET_USER_BY_ID_SUCCESS, foundUser: foundUser});
        })
        .catch(() => dispatch({type: GET_USER_BY_ID_FAILURE, error: "Kullanıcı bilgileri getirilemedi."}));
};

export const getAllUsers = () => dispatch => {
    let users = [];
    firestore().collection('users').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const userData = doc.data();
                const user = Object.assign(userData);

                users.push(user);
            });

            dispatch({type: GET_ALL_USERS_SUCCESS, users: users});
        })
        .catch(() => dispatch({type: GET_ALL_USERS_FAILURE, error: "Kullanıcılar getirilemedi."}));
};

export const login = (email, password) => dispatch => {
    auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch({type: LOGIN_SUCCESS, authState: true, user: user.user});
        })
        .catch(() => dispatch({type: LOGIN_FAILURE, error: "Kullanıcı girişi yapılamadı."}));
};

export const register = (fullName, email, password) => dispatch => {
    auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            const newUser = user.user;
            newUser.updateProfile({
                displayName: fullName
            }).then(() => {
                firestore().collection('users').add({
                    id: newUser.uid,
                    fullName: fullName,
                    email: newUser.email,
                    photoURL: "",
                    createdAt: new Date(),
                }).then(() => dispatch({type: REGISTER_SUCCESS, authState: true, user: user.user}));
            });
        })
        .catch(() => dispatch({type: REGISTER_FAILURE, error: "Kullanıcı kayıt işlemi yapılamadı."}));
};

export const logOut = () => dispatch => {
    auth().signOut()
        .then(() => dispatch({type: LOGOUT_SUCCESS, authState: false, user: {}}))
        .catch(() => dispatch({type: LOGOUT_FAILURE, error: "Çıkış yapılamadı."}));
};

export const changeUserFullName = fullName => dispatch => {
    auth().currentUser.updateProfile({
        displayName: fullName,
    })
        .then(() => dispatch({type: CHANGE_USER_FULLNAME_SUCCESS, fullName: fullName}))
        .catch(() => dispatch({type: CHANGE_USER_FULLNAME_FAILURE, error: "Adınız değiştirilemedi."}));
};

export const changeProfilePhoto = photoURL => dispatch => {
    const currentUser = auth().currentUser;
    currentUser.updateProfile({
        photoURL: photoURL,
    })
        .then(() => {
            firestore().collection('users').where('userID', '==', currentUser.uid).get()
                .then(() => dispatch(getUser()))
                .catch(() => dispatch({type: UPDATE_PP_FAILURE, error: "Profil fotoğrafınız değiştirilemedi."}));
        });
};