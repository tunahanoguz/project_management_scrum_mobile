import React, {Component, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import TopBar from "../../components/TopBar";
import {profiles} from "../../constants";
import BlockButton from "../../components/buttons/BlockButton";
import Icon from "react-native-vector-icons/Feather";
import {fonts} from "../../styles";
import Divider from "../../components/Divider";
import {getAllProjectComments, getAllProjectFiles} from "../../actions/projectActions";
import {connect} from "react-redux";

class ProjectDetail extends Component {
    componentDidMount() {
        const {id} = this.props.navigation.getParam('project', {});
        this.props.getAllProjectComments(id);
        this.props.getAllProjectFiles(id);
    }

    projectNotes = (note) => {
        const projectNoteLength = note.length;

        if (projectNoteLength > 30){
            return note.substring(0, 30) + "...";
        } else {
            return note;
        }
    };

    goToProjectDescription = (description) => {
        this.props.navigation.navigate("ProjectDescription", {description: description})
    };

    profilePhotosContainer = () => (
        profiles.map((profile, index) => {
            return <Image key={index} source={{uri: profile.profilePhoto}} style={styles.profilePhoto}/>;
        })
    );

    notesContainer = (notes) => (
        notes.map((note, index) => {
            if (index < 3){
                return (
                    <View key={index} style={styles.note}>
                        <View style={styles.notesDot}/>
                        <Text style={styles.notesText}>{this.projectNotes(note.note)}</Text>
                    </View>
                );
            }
        })
    );

    goToProjectCommentList = (projectID) => {
        this.props.navigation.navigate("ProjectCommentList", {projectID})
    };

    goToProjectFileList = (projectID) => {
        this.props.navigation.navigate("ProjectFileList", {projectID})
    };

    goToProjectNotes = (notes) => {
        this.props.navigation.navigate("ProjectNotes", {notes})
    };

    goToMyTasks = () => {
        this.props.navigation.navigate("ProjectMyTasks", {projectId: 1})
    };

    goToOtherTasks = () => {
        this.props.navigation.navigate("ProjectOtherTasks", {projectId: 1})
    };

    render() {
        const {id, name, description, notes} = this.props.navigation.getParam('project', {});
        return (
            <View style={styles.container}>
                <TopBar isBack={true}/>
                <View style={styles.secondContainer}>
                    <View style={styles.projectDescriptionContainer}>
                        <Text style={styles.title}>{name}</Text>

                        <TouchableOpacity
                            onPress={() => this.goToProjectDescription(description)}>
                            <Text style={styles.projectDescriptionText}>{description}</Text>
                        </TouchableOpacity>

                        <View style={styles.singleDotContainer}>
                            <View style={styles.singleDot} />
                        </View>
                    </View>

                    <View style={styles.projectDetailContainer}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                            {/*<View style={{marginRight: 30,}}>*/}
                            {/*    <Text style={styles.projectDetailTitle}>Proje Takımı</Text>*/}
                            {/*    <View style={styles.profilePhotosContainer}>*/}
                            {/*        <TouchableOpacity style={{flexDirection: 'row'}}>*/}
                            {/*            {this.profilePhotosContainer()}*/}
                            {/*        </TouchableOpacity>*/}
                            {/*    </View>*/}
                            {/*</View>*/}

                            {/*<View>*/}
                            {/*    <Text style={styles.projectDetailTitle}>Sayılar</Text>*/}
                            {/*    <View style={{flexDirection: 'row',}}>*/}
                            {/*        <TouchableOpacity onPress={() => this.goToProjectCommentList(id)} style={styles.commentButton}>*/}
                            {/*            <Icon name='message-circle' size={20} color='#FD8344' style={{marginRight: 10,}} />*/}
                            {/*            <Text style={[fonts.mediumText, {fontSize: 18, color: '#FD8344',}]}>{this.props.comments?.length}</Text>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*        <TouchableOpacity onPress={() => this.goToProjectFileList(id)} style={styles.fileButton}>*/}
                            {/*            <Icon name='file' size={20} color='#FD8344' style={{marginRight: 10,}} />*/}
                            {/*            <Text style={[fonts.mediumText, {fontSize: 18, color: '#FD8344',}]}>{this.props.files?.length}</Text>*/}
                            {/*        </TouchableOpacity>*/}
                            {/*    </View>*/}
                            {/*</View>*/}

                            <TouchableOpacity>
                                <Text style={[fonts.mediumText, {color: 'rgba(0, 0, 0, 0.4)'}]}>Takım</Text>
                                <Text style={fonts.mediumText}>En iyi takım</Text>
                            </TouchableOpacity>
                            <View style={{width: 2, height: '100%', marginHorizontal: 10, backgroundColor: 'rgba(0, 0, 0, 0.04)'}}/>
                            <TouchableOpacity onPress={() => this.goToProjectCommentList(id)}>
                                <Text style={[fonts.mediumText, {color: 'rgba(0, 0, 0, 0.4)'}]}>Yorumlar</Text>
                                <Text style={fonts.mediumText}>{this.props.comments?.length}</Text>
                            </TouchableOpacity>
                            <View style={{width: 2, height: '100%', marginHorizontal: 10, backgroundColor: 'rgba(0, 0, 0, 0.04)'}}/>
                            <TouchableOpacity onPress={() => this.goToProjectFileList(id)}>
                                <Text style={[fonts.mediumText, {color: 'rgba(0, 0, 0, 0.4)'}]}>Dosyalar</Text>
                                <Text style={fonts.mediumText}>{this.props.files?.length}</Text>
                            </TouchableOpacity>
                        </View>

                        {/*<Divider height={20} />*/}
                        {/*<View style={{height: 2, backgroundColor: 'rgba(0, 0, 0, 0.02)'}} />*/}
                        <Divider height={20} />

                        <Text style={styles.projectDetailTitle}>Notlar</Text>
                        <TouchableOpacity style={styles.notesContainer} onPress={() => this.goToProjectNotes(notes)}>
                            {this.notesContainer(notes)}
                        </TouchableOpacity>

                        <Divider height={20} />

                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                            <BlockButton color="green" icon="arrow-right" text="İşlerim" side="left" pressFunc={this.goToMyTasks} />
                            <BlockButton color="purple" icon="arrow-up-right" text="Diğer İşler" side="right" pressFunc={this.goToOtherTasks} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    secondContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#3f38dd',
    },
    projectDescriptionContainer: {
        paddingVertical: 30,
        paddingHorizontal: 30
    },
    title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 24,
        color: 'white',
        marginBottom: 10,
        includeFontPadding: false,
    },
    projectDescriptionText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: 'white',
        lineHeight: 24,
    },
    singleDotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 14,
        marginVertical: 4,
    },
    singleDot: {
        width: 48,
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 100,
        marginHorizontal: 'auto'
    },
    downIcon: {
        marginTop: 4,
        textAlign: 'center',
    },
    projectDetailContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingTop: 20,
        paddingHorizontal: 30,
        borderTopStartRadius: 35,
        borderTopEndRadius: 35,
    },
    projectDetailTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        marginBottom: 10,
    },
    notesContainer: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 18,
        borderRadius: 15,
    },
    note: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notesDot: {
        width: 6,
        height: 6,
        backgroundColor: 'black',
        marginRight: 6,
        borderRadius: 100,
    },
    notesText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        paddingTop: 3,
    },
    profilePhotosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingLeft: 20,
    },
    profilePhoto: {
        width: 36,
        height: 36,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        marginLeft: -20,
        borderRadius: 100,
    },
    commentButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#482CA5',
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    fileButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#482CA5',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
});

const mapStateToProps = state => {
    return {
        comments: state.projectReducer.comments,
        files: state.projectReducer.files,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllProjectComments: (projectID) => dispatch(getAllProjectComments(projectID)),
        getAllProjectFiles: (projectID) => dispatch(getAllProjectFiles(projectID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);