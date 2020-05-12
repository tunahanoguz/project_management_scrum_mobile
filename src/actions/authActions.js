import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from "@react-native-firebase/messaging";
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
} from "./types/authTypes";

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

    firestore().collection('users').doc(userID).get()
        .then(doc => {
            let foundUser = {
                id: doc.id,
                ...doc.data(),
            };

            dispatch({type: GET_USER_BY_ID_SUCCESS, foundUser: foundUser});
        })
        .catch(() => dispatch({type: GET_USER_BY_ID_FAILURE, error: "Kullanıcı bilgileri getirilemedi."}));
};

export const getAllUsers = () => dispatch => {
    let users = [];
    firestore().collection('users').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const user = {
                    id: doc.id,
                    ...doc.data(),
                };

                users.push(user);
            });

            dispatch({type: GET_ALL_USERS_SUCCESS, users: users});
        })
        .catch(() => dispatch({type: GET_ALL_USERS_FAILURE, error: "Kullanıcılar getirilemedi."}));
};

export const login = (email, password) => dispatch => {
    auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            // console.log(user);
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
            })
                .then(() => {
                    getToken()
                        .then(token => {
                            firestore().collection('users').doc(newUser.uid).set({
                                fullName: fullName,
                                email: newUser.email,
                                photoURL: "",
                                createdAt: new Date(),
                                fcmToken: token,
                            })
                                .then(() => dispatch({type: REGISTER_SUCCESS, authState: true, user: newUser}))
                                .catch(() => dispatch({type: REGISTER_FAILURE, error: "Kullanıcı kayıt işlemi yapılamadı."}));
                        })
                        .catch(() => dispatch({type: REGISTER_FAILURE, error: "Kullanıcı kayıt işlemi yapılamadı."}));
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
    // console.log("changeProfilePhoto'ya girildi.");
    const currentUser = auth().currentUser;
    currentUser.updateProfile({
        photoURL: photoURL,
    })
        .then(() => {
            // console.log("updateProfile başarılı.");
            const userID = currentUser.uid;
            const userRef = firestore().collection('users');
            const userDoc = userRef.doc(userID);
            userDoc.update({
                photoURL
            })
                .then(() => {
                    // console.log("update başarılı.");
                    dispatch(getUser());
                })
                .catch(() => {
                    // console.log("update başarısız.");
                    dispatch({type: UPDATE_PP_FAILURE, error: "Profil fotoğrafınız değiştirilemedi."})
                });
        })
        .catch(() => {
            // console.log("updateProfile başarısız.");
            dispatch({type: UPDATE_PP_FAILURE, error: "Profil fotoğrafınız değiştirilemedi."})
        });
};

const getToken = async () => {
        let fcmToken = await messaging().getToken();
        return fcmToken;
};
