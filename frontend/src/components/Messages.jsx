import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const auth = getAuth(app);
  const user = auth.currentUser;

  // Fetch user's conversations
  useEffect(() => {
    if (!user) return;

    const db = getFirestore(app);
    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", user.uid),
      orderBy("lastMessageAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const conversationsData = [];
      querySnapshot.forEach((doc) => {
        conversationsData.push({ id: doc.id, ...doc.data() });
      });
      setConversations(conversationsData);
    });

    return () => unsubscribe();
  }, [user]);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) return;

    const db = getFirestore(app);
    const q = query(
      collection(db, "messages"),
      where("conversationId", "==", selectedConversation.id),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [selectedConversation]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const db = getFirestore(app);

    try {
      // Add message
      await addDoc(collection(db, "messages"), {
        conversationId: selectedConversation.id,
        senderId: user.uid,
        text: newMessage,
        timestamp: serverTimestamp(),
      });

      // Update conversation's last message
      const conversationRef = doc(db, "conversations", selectedConversation.id);
      await updateDoc(conversationRef, {
        lastMessageAt: serverTimestamp(),
        lastMessage: newMessage,
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Conversations List */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Messages</h2>
        </div>
        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedConversation?.id === conversation.id ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <p className="font-medium">
                    {conversation.participantNames[
                      conversation.participants.findIndex(
                        (id) => id !== user.uid
                      )
                    ]}
                  </p>
                  <p className="text-sm text-gray-500">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">
                {selectedConversation && user && (() => {
                  const otherParticipantIndex = selectedConversation.participants.findIndex(
                    (id) => id !== user.uid
                  );
                  const otherParticipantName =
                    selectedConversation.participantNames[otherParticipantIndex];
                  return otherParticipantName;
                })()}
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === user.uid
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.senderId === user.uid
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {message.timestamp?.toDate().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
