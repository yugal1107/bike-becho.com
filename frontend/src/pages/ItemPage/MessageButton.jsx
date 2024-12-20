import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { app } from "../../firebase";

const createConversationKey = (userId1, userId2) => {
  return [userId1, userId2].sort().join("_");
};

const MessageButton = ({ sellerId }) => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const user = auth.currentUser;

  const handleMessage = async () => {
    if (!user) {
      alert("You must be logged in to send messages.");
      return;
    }

    const db = getFirestore(app);

    // Fetch seller's name from the users collection
    const sellerDoc = await getDoc(doc(db, "users", sellerId));
    const sellerName = sellerDoc.exists()
      ? sellerDoc.data().displayName || "Seller"
      : "Seller";

    const conversationKey = createConversationKey(user.uid, sellerId);

    // Check if conversation exists
    const q = query(
      collection(db, "conversations"),
      where("key", "==", conversationKey)
    );

    const querySnapshot = await getDocs(q);
    let conversationId;

    if (querySnapshot.empty) {
      // Create new conversation
      const conversationRef = await addDoc(collection(db, "conversations"), {
        key: conversationKey,
        participants: [user.uid, sellerId],
        participantNames: [user.displayName || "User", sellerName],
        createdAt: serverTimestamp(),
        lastMessageAt: serverTimestamp(),
      });
      conversationId = conversationRef.id;
    } else {
      conversationId = querySnapshot.docs[0].id;
    }

    // Navigate to messages
    navigate(`/messages`);
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
      onClick={handleMessage}
    >
      Message Seller
    </button>
  );
};

export default MessageButton;
