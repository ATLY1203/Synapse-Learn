// IMPORTANT: In a real-world application, these values should not be stored here.
// They would be kept in secure environment variables on a backend server.
function getFirebaseConfig() {
    return {
        apiKey: "YOUR_NEW_RESTRICTED_API_KEY", // <-- PASTE YOUR NEW KEY HERE
        authDomain: "synapse-learn.firebaseapp.com",
        projectId: "synapse-learn",
        storageBucket: "synapse-learn.firebasestorage.app",
        messagingSenderId: "959946255674",
        appId: "1:959946255674:web:81a9fd7b0272abd8a2b403",
        measurementId: "G-4TT3QY4HL2"
    };
}

const firebaseConfig = getFirebaseConfig();

if (firebaseConfig.apiKey.startsWith("YOUR_")) {
    document.body.innerHTML = `<div style="font-family: sans-serif; padding: 2rem; text-align: center; background-color: #fff3f3; border: 1px solid #ffcccc; color: #d8000c; border-radius: 8px; margin: 2rem;"><h1>Firebase Configuration Missing</h1><p>Please open <code>js/firebase.js</code> and replace the placeholder API key.</p></div>`;
    throw new Error("Firebase configuration is not set. Please update js/firebase.js.");
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export instances
export const auth = firebase.auth();
export const db = firebase.firestore();
export { firebase }; // Export the whole firebase object for things like FieldValue
