import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const auth = getAuth(app);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const db = getFirestore(app);
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notificationsData = [];
      querySnapshot.forEach((doc) => {
        notificationsData.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(notificationsData);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.message} -{" "}
            {notification.timestamp.toDate().toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
