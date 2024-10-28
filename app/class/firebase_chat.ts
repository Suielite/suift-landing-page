import { IMessage } from '@/lib/db/models/message';
import{ database, ref, set, onValue, push, remove, update }  from '@/lib/db/firebase';
import { IChat } from '@/lib/db/models/chat';



export class FirebaseChat {
  static async syncMessage(message: IMessage) {
    const chatRef = ref(database, `chats/${message.chat._id}/messages/${message._id}`);
    await set(chatRef, {
      ...message,
      timestamp: message.timestamp.getTime(), // Convert Date to timestamp for Firebase
    });
  }

  static async syncChat(chat: IChat) {
    const chatRef = ref(database, `chats/${chat._id}/info`);
    await set(chatRef, {
      ...chat,
      createdAt: chat.createdAt.getTime(),
      updatedAt: chat.updatedAt.getTime(),
      lastMessage: chat.lastMessage ? {
        ...chat.lastMessage,
        timestamp: chat.lastMessage.timestamp.getTime()
      } : null
    });
  }

  static subscribeToChat(chatId: string, callback: (messages: IMessage[]) => void) {
    const chatRef = ref(database, `chats/${chatId}/messages`);
    return onValue(chatRef, (snapshot) => {
      const messages: IMessage[] = [];
      snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        messages.push({
          ...message,
          timestamp: new Date(message.timestamp),
        });
      });
      callback(messages.sort((a, b) => 
        b.timestamp.getTime() - a.timestamp.getTime()
      ));
    });
  }

  static subscribeToUserChats(userId: string, callback: (chats: IChat[]) => void) {
    const userChatsRef = ref(database, 'chats');
    return onValue(userChatsRef, (snapshot) => {
      const chats: IChat[] = [];
      snapshot.forEach((childSnapshot) => {
        const chat = childSnapshot.child('info').val();
        if (chat.participants.some((p: any) => p.userId === userId)) {
          chats.push({
            ...chat,
            createdAt: new Date(chat.createdAt),
            updatedAt: new Date(chat.updatedAt),
            lastMessage: chat.lastMessage ? {
              ...chat.lastMessage,
              timestamp: new Date(chat.lastMessage.timestamp)
            } : undefined
          });
        }
      });
      callback(chats.sort((a, b) => 
        b.updatedAt.getTime() - a.updatedAt.getTime()
      ));
    });
  }
  static async deleteMessage(chatId: string, messageId: string) {
    const messageRef = ref(database, `chats/${chatId}/messages/${messageId}`);
    await remove(messageRef);
  }

  static async editMessage(chatId: string, messageId: string, newContent: string) {
    const messageRef = ref(database, `chats/${chatId}/messages/${messageId}`);
    await update(messageRef, {
      content: newContent,
      edited: true,
      editedAt: new Date().getTime()
    });
  }

  static subscribeToTyping(chatId: string, callback: (typing: any[]) => void) {
    const typingRef = ref(database, `typing/${chatId}`);
    return onValue(typingRef, (snapshot) => {
      const typing: any[] = [];
      snapshot.forEach((childSnapshot) => {
        typing.push({
          userId: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      callback(typing);
    });
  }

  static subscribeToPresence(userIds: string[], callback: (presence: Record<string, any>) => void) {
    const presenceRef = ref(database, 'presence');
    return onValue(presenceRef, (snapshot) => {
      const presence: Record<string, any> = {};
      userIds.forEach(userId => {
        const userPresence = snapshot.child(userId).val();
        presence[userId] = userPresence || { status: 'offline' };
      });
      callback(presence);
    });
  }
}
