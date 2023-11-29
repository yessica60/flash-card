import { useEffect, useState, useContext } from "react";

// FIREBASE
import { FLASHCARDS as DB_FLASHCARDS, CARDS as DB_CARDS } from "../api/db";
// CONTEXT
import { AuthContext } from "../context/auth";

export const useFlashcards = () => {
  const { user } = useContext(AuthContext);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    if (!user) return () => {};

    const query = DB_FLASHCARDS.where("userId", "==", user.uid);
    const unsub = query.onSnapshot((qs) => {
      const results = qs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFlashcards(results);
    });

    return unsub;
  }, [user]);

  return flashcards;
};

export const useCards = (flashcardId) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const query = DB_CARDS.where("flashcardId", "==", flashcardId);
    query.onSnapshot((qs) => {
      const results = qs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCards(results);
    });
  }, [flashcardId]);

  return cards;
};