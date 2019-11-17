const FIREBASE_COLUMNS_COLLECTION_ID = "columns"; 

class ColumnService {

  columnRef(boardRef) {
    return boardRef.collection(FIREBASE_COLUMNS_COLLECTION_ID);
  }

  async addColumn(name, order, boardRef) {
    await boardRef.collection(FIREBASE_COLUMNS_COLLECTION_ID).add({name: name, order: order});
  }

  async deleteColumn(name, boardRef) {
    const doc = boardRef.collection(FIREBASE_COLUMNS_COLLECTION_ID).where('name', '==', name).get();
    const firstDoc = doc.docs[0];
    const idToDelete = firstDoc.id;
    await boardRef.collection(FIREBASE_COLUMNS_COLLECTION_ID).doc(idToDelete).delete();
  }

  async editColumn(columnName, newColumnObject, boardRef) {
    const doc = await boardRef.collection(FIREBASE_COLUMNS_COLLECTION_ID).where('name', '==', columnName).get();
    const firstDoc = doc.docs[0];
    const idToEdit = firstDoc.id;
    await boardRef.collection(FIREBASE_COLUMNS_COLLECTION_ID).doc(idToEdit).update(newColumnObject);
  }
}

export { ColumnService }