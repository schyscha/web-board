const FIREBASE_BOARDS_COLLECTION_ID = "boards";

class BoardService {

  boardRef(projectRef) {
    return projectRef.collection(FIREBASE_BOARDS_COLLECTION_ID);
  }

  async addBoard(background, name, projectRef) {
    await projectRef.collection(FIREBASE_BOARDS_COLLECTION_ID).add({background: background, name: name});
  }

  async deleteBoard(name, projectRef) {
    const doc = await projectRef.collection(FIREBASE_BOARDS_COLLECTION_ID).where('name', '==', name).get();
    const firstDoc = doc.docs[0];
    const idToDelete = firstDoc.id;
    await projectRef.collection(FIREBASE_BOARDS_COLLECTION_ID).doc(idToDelete).delete();
  }

  async editBoard(boardName, newBoardName, newBoardBackground, projectRef) {
    const doc = await projectRef.collection(FIREBASE_BOARDS_COLLECTION_ID).where('name', '==', boardName).get();
    const firstDoc = doc.docs[0];
    const idToEdit = firstDoc.id;
    await projectRef.collection(FIREBASE_BOARDS_COLLECTION_ID).doc(idToEdit).update({"name": newBoardName, "background": newBoardBackground});
  }
}

export { BoardService }
