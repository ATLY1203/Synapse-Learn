import { auth, db, firebase } from './firebase.js';
import { state } from './state.js';

export async function checkAndCreateUserProfile(user) {
    const userDocRef = db.collection('users').doc(user.uid);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
        // User exists, load their data and update last login
        state.ratingHistory = userDoc.data().ratingHistory || [];
        await userDocRef.set({
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } else {
        // New user, create their document in Firestore
        const newUserProfile = {
            email: user.email,
            role: 'student',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            ratingHistory: []
        };
        await userDocRef.set(newUserProfile);
        state.ratingHistory = [];
    }
}

export async function saveRatingHistory() {
    if (state.user) {
        try {
            await db.collection('users').doc(state.user.uid).set({
                ratingHistory: state.ratingHistory
            }, { merge: true });
        } catch (error) {
            console.error("Error saving rating history: ", error);
        }
    }
}
