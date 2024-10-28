import { database, ref, set, remove, serverTimestamp }  from "./db/firebase";

export class TypingIndicator {
  private static getTypingRef(chatId: string, userId: string) {
    console.log({ chatId, userId },"chatId, userId");
    return ref(database, `typing/${chatId}/${userId}`);
    // return ref(database, `typing/${chatId}/${userId}`);
  }

  static async setTyping(chatId: string, userId: string, username: string) {
    const typingRef = this.getTypingRef(chatId, userId);
    console.log({ typingRef },"typin");
    await set(typingRef, {
      username,
      timestamp: serverTimestamp(),
    });
  }

  static async clearTyping(chatId: string, userId: string) {
    const typingRef = this.getTypingRef(chatId, userId);
    await remove(typingRef);
  }
}
