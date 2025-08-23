import { auth } from './firebase.js';
import { state } from './state.js';
import { render } from './ui.js';
import { checkAndCreateUserProfile } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    // This is the main entry point of the application.
    // It listens for authentication changes and triggers the initial render.
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            state.user = { uid: user.uid, email: user.email };
            await checkAndCreateUserProfile(user);
            state.currentPage = 'home';
        } else {
            state.user = null;
            state.currentPage = 'login';
        }
        render();
    });
});
