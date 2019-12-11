import * as firebase from 'firebase';

const FIREBASE_CHAT_DOCUMENT = 'ZWtAwPoilesQZrBkMYet';
const FIREBASE_CHAT_COLLECTION = 'chat';

class ChatService {

    messagesRef() {
        return firebase.firestore().collection(FIREBASE_CHAT_COLLECTION).doc(FIREBASE_CHAT_DOCUMENT);
    }

    async getMessages() {
        const chatRef = firebase.firestore().collection(FIREBASE_CHAT_COLLECTION).doc(FIREBASE_CHAT_DOCUMENT);
        const chatChunk = await chatRef.get();
        const chatData = chatChunk.data();
        return chatChunk.data();
    }

    async addMessage(message, author) {
        const chatRef = firebase.firestore().collection(FIREBASE_CHAT_COLLECTION).doc(FIREBASE_CHAT_DOCUMENT);
        const chatChunk = await chatRef.get();
        const messages = chatChunk.data();
        const messageToAdd = {message, author};
        messages.messages.push(messageToAdd);
        await chatRef.update(messages);
    }
}

export {ChatService}