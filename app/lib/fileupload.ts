
import { storage,storageRef, uploadBytes, getDownloadURL } from "./db/firebase";

export class FileUpload {
  static async uploadFile(file: File, chatId: string): Promise<string> {
    const fileRef = storageRef(storage, `chats/${chatId}/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }
}
