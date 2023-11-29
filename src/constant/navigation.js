export const ROUTES = {
    login: 'Login',
    signup: 'Signup',
    flashcards: 'Flashcards',
    cards: {
      name: 'Cards',
      params: (flashcardId) => ({ flashcardId }),
    },
  }