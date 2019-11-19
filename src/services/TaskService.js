const FIREBASE_TASKS_COLLECTION_ID = "tasks";

class TaskService {

  tasksRef(columnRef) {
    return columnRef.collection(FIREBASE_TASKS_COLLECTION_ID);
  }

  async addTask(estimatedTime, loggedTime, name, order, columnRef) {
    const taskObject = {
      estimatedTime: estimatedTime,
      loggedTime: loggedTime,
      name: name,
      order: order
    }
    await columnRef.collection(FIREBASE_TASKS_COLLECTION_ID).add(taskObject);
  }

  async deleteTask(name, columnRef) {
    const doc = columnRef.collection(FIREBASE_TASKS_COLLECTION_ID).where('name', '==', name).get();
    const firstDoc = doc.docs[0];
    const idToDelete = firstDoc.id;
    await columnRef.collection(FIREBASE_TASKS_COLLECTION_ID).doc(idToDelete).delete();
  }

  async editTask(taskName, newName, estimatedTime, order, columnRef) {
    const doc = await columnRef.collection(FIREBASE_TASKS_COLLECTION_ID).where('name', '==', taskName).get();
    const firstDoc = doc.docs[0];
    const idToEdit = firstDoc.id;
    await columnRef.collection(FIREBASE_TASKS_COLLECTION_ID).doc(idToEdit).update({"name": newName, "estimatedTime": estimatedTime, "order": order});
  }
}

export { TaskService }
