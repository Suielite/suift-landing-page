import { database, ref, onValue, set, serverTimestamp }from "./db/firebase";

export class UserPresence {
  private static createPresenceRef(userId: string) {
    return ref(database, `presence/${userId}`);
  }

  static async updatePresence(userId: string, status: 'online' | 'offline') {
    const presenceRef = this.createPresenceRef(userId);
    await set(presenceRef, {
      status,
      lastSeen: serverTimestamp(),
    });
  }

  static setupPresence(userId: string) {
    // Update presence on connection state changes
    const connectedRef = ref(database, '.info/connected');
    const presenceRef = this.createPresenceRef(userId);

    onValue(connectedRef, async (snap) => {
      if (snap.val() === true) {
        // User is connected
        await set(presenceRef, {
          status: 'online',
          lastSeen: serverTimestamp(),
        });

        // Clear presence on disconnect
        await set(presenceRef, {
          status: 'offline',
          lastSeen: serverTimestamp(),
        });
      }
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      this.updatePresence(userId, 'offline');
    });
  }
}
