// src/components/Messages/Messages.jsx
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
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";

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
      await addDoc(collection(db, "conversations", selectedConversation.id), {
        lastMessageAt: serverTimestamp(),
        lastMessage: newMessage,
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 h-screen max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-2rem)] flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 bg-gray-50">
          <div className="p-4 border-b bg-white">
            <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            {conversations.length === 0 ? (
              <div className="p-4 text-gray-500 text-center">No conversations yet</div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer transition-all duration-200 hover:bg-gray-100 ${
                    selectedConversation?.id === conversation.id
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
                      <span className="text-xl">
                        {conversation.participantNames[
                          conversation.participants.findIndex(
                            (id) => id !== user.uid
                          )
                        ]?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">
                        {conversation.participantNames[
                          conversation.participants.findIndex(
                            (id) => id !== user.uid
                          )
                        ]}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b bg-white shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedConversation.participantNames[
                    selectedConversation.participants.findIndex(
                      (id) => id !== user.uid
                    )
                  ]}
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === user.uid ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-md p-4 rounded-2xl shadow-sm ${
                        message.senderId === user.uid
                          ? "bg-blue-500 text-white ml-12"
                          : "bg-white mr-12"
                      }`}
                    >
                      <p className="text-[15px] leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === user.uid
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}>
                        {message.timestamp?.toDate().toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-white border-t">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col space-y-4 text-gray-500">
              <svg className="w-16 h-16 text-gray-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <p className="text-lg">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;