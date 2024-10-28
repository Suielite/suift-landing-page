"use client"
import { useEffect, useState, useCallback } from 'react';
import { UserPresence } from '@/lib/presence';
import { TypingIndicator } from '@/lib/typing';
import { FileUpload } from '@/lib/fileupload';
import { IMessage } from '@/lib/db/models/message';
import { IChat } from '@/lib/db/models/chat';
import { FirebaseChat } from '@/class/firebase_chat';

export function useChat(chatId: string) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = FirebaseChat.subscribeToChat(chatId, (newMessages) => {
      setMessages(newMessages);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  return { messages, loading,setMessages };
}

export function useUserChats(userId: string) {
  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = FirebaseChat.subscribeToUserChats(userId, (newChats) => {
      setChats(newChats);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return { chats, loading };
}
export function useTyping(chatId: string, userId: string, username: string) {
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = FirebaseChat.subscribeToTyping(chatId, (typing) => {
      setTypingUsers(typing.filter(t => t.userId !== userId));
    });

    return () => unsubscribe();
  }, [chatId, userId]);

  useEffect(() => {
    if (isTyping) {
      TypingIndicator.setTyping(chatId, userId, username);
    } else {
      TypingIndicator.clearTyping(chatId, userId);
    }
  }, [isTyping, chatId, userId, username]);

  return { isTyping, setIsTyping, typingUsers };
}

export function usePresence(userIds: string[]) {
  const [presence, setPresence] = useState<Record<string, any>>({});

  useEffect(() => {
    const unsubscribe = FirebaseChat.subscribeToPresence(userIds, setPresence);
    return () => unsubscribe();
  }, [userIds.join(',')]);

  return presence;
}

export function useFileUpload(chatId: string) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = useCallback(async (file: File) => {
    try {
      setUploading(true);
      setProgress(0);
      const url = await FileUpload.uploadFile(file, chatId);
      setProgress(100);
      return url;
    } finally {
      setUploading(false);
    }
  }, [chatId]);

  return { uploadFile, uploading, progress };
}