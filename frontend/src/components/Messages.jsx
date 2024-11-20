import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useParams } from "react-router-dom";

const Messages = () => {
  const { buyRequestId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const auth = getAuth(app);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const db = getFirestore(app);
    const q = query(
      collection(db, "messages"),
      where("buyRequestId", "==", buyRequestId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [buyRequestId, user]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const db = getFirestore(app);

    try {
      await addDoc(collection(db, "messages"), {
        buyRequestId,
        senderId: user.uid,
        message: newMessage,
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.senderId === user.uid ? "You" : "Seller"}:</strong> {msg.message}
          </li>
        ))}
      </ul>
      <textarea
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
        rows={3}
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
        onClick={handleSendMessage}
      >
        Send Message
      </button>
    </div>
  );
};

export default Messages;