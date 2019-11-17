import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAWtYzaFJ2CsG9fcxy_iNiTmcYC4G8EErI",
  authDomain: "web-board-9de8d.firebaseapp.com",
  databaseURL: "https://web-board-9de8d.firebaseio.com",
  projectId: "web-board-9de8d",
  storageBucket: "web-board-9de8d.appspot.com",
  messagingSenderId: "1048267532140",
  appId: "1:1048267532140:web:e5c55b20cf6ab3a83df549"
};

const FIREBASE_PROJECTS_COLLECTION_ID = "projects";

firebase.initializeApp(config);

class ProjectService {
  projectsRef() {
    return firebase.firestore().collection(FIREBASE_PROJECTS_COLLECTION_ID);
  }

  async findProjectIdByName(name) {
    const doc = await firebase.firestore().collection(FIREBASE_PROJECTS_COLLECTION_ID).where('name', '==', name).get();
    const firstDoc = doc.docs[0];
    const id = firstDoc.id;
    return id;
  }

  async addProject(name) {
    await firebase.firestore().collection(FIREBASE_PROJECTS_COLLECTION_ID).add({ "name": name });
  }

  async deleteProject(name) {
    const doc = await firebase.firestore().collection(FIREBASE_PROJECTS_COLLECTION_ID).where('name', '==', name).get();
    const firstDoc = doc.docs[0];
    const idToDelete = firstDoc.id;
    await firebase.firestore().collection(FIREBASE_PROJECTS_COLLECTION_ID).doc(idToDelete).delete();
  }

  async editProject(projectName, newProjectName) {
    const doc = await firebase.firestore().collection(FIREBASE_PROJECTS_COLLECTION_ID).where('name', '==', projectName).get();
    const firstDoc = doc.docs[0];
    const idToEdit = firstDoc.id;
    await firebase.firestore().collection(FIREBASE_PROJECTS_COLLECTION_ID).doc(idToEdit).update({ "name": newProjectName });
  }
}

export { ProjectService }