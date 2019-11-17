const FIREBASE_COMMENT_COLLECTION_ID = "comments";

class CommentService {

    commentRef(taskRef) {
        return taskRef.collection(FIREBASE_COMMENT_COLLECTION_ID);
    }

    async addComment(author, content, time, taskRef) {
        const commentObject = {
            author: author,
            content: content,
            time: time
        };
        await taskRef.collection(FIREBASE_COMMENT_COLLECTION_ID).add(commentObject);
    }

    async deleteComment(time, taskRef) {
        const doc = taskRef.collection(FIREBASE_COMMENT_COLLECTION_ID).where('time', '==', time).get();
        const firstDoc = doc.docs[0];
        const idToDelete = firstDoc.id;
        await taskRef.collection(FIREBASE_COMMENT_COLLECTION_ID).doc(idToDelete).delete();
    }

    async editComment(time, newCommentObject, taskRef) {
        const doc = await taskRef.collection(FIREBASE_COMMENT_COLLECTION_ID).where('time', '==', time).get();
        const firstDoc = doc.docs[0];
        const idToEdit = firstDoc.id;
        await taskRef.collection(FIREBASE_COMMENT_COLLECTION_ID).doc(idToEdit).update(newCommentObject);
    }
}

export { CommentService }