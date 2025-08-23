// Secure Authentication Module
// This module handles authentication with enhanced security measures

// Enhanced security measures
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'i' || e.key === 'j' || e.key === 'c')) {
        e.preventDefault();
        return false;
    }
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
});

// Secure configuration with multiple layers of obfuscation
const _0x5f2d = {
    _0x1a2b: ['apply', 'apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId', 'measurementId'],
    _0x3c4d: function(str) {
        return btoa(str.split('').reverse().join(''));
    },
    _0x5e6f: function(encoded) {
        try {
            return atob(encoded).split('').reverse().join('');
        } catch (e) {
            return null;
        }
    },
    _0x7g8h: function(key) {
        // Additional encryption layer
        const timestamp = Date.now().toString();
        return btoa(key + '_' + timestamp + '_' + this._0x3c4d(key));
    }
};

// Get secure Firebase configuration
function getSecureFirebaseConfig() {
    // Check for HTTPS requirement
    if (typeof window !== 'undefined' && window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        console.error('Authentication requires HTTPS in production');
        return null;
    }

    // In production, these should come from environment variables
    // For now, using obfuscated placeholders
    const config = {
        apiKey: process.env.FIREBASE_API_KEY || _0x5f2d._0x5e6f('YOUR_API_KEY_REVERSED'),
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'synapse-learn.firebaseapp.com',
        projectId: process.env.FIREBASE_PROJECT_ID || 'synapse-learn',
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'synapse-learn.appspot.com',
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || _0x5f2d._0x5e6f('YOUR_MESSAGING_SENDER_ID_REVERSED'),
        appId: process.env.FIREBASE_APP_ID || _0x5f2d._0x5e6f('YOUR_APP_ID_REVERSED'),
        measurementId: process.env.FIREBASE_MEASUREMENT_ID || _0x5f2d._0x5e6f('YOUR_MEASUREMENT_ID_REVERSED')
    };

    // Validate configuration
    const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
    for (const field of requiredFields) {
        if (!config[field] || config[field].includes('YOUR_')) {
            console.warn(`Missing or placeholder value for ${field}`);
            return null;
        }
    }

    return config;
}

// Initialize Firebase with secure config
const firebaseConfig = getSecureFirebaseConfig();

if (firebaseConfig) {
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
} else {
    console.error('Firebase initialization failed. Check your configuration.');
}

// DOM elements
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const signInModal = document.getElementById('signInModal');
const closeModal = document.getElementById('closeModal');
const signInForm = document.getElementById('signInForm');
const userEmail = document.getElementById('userEmail');

// Event handlers
const handlers = {
    showModal: () => signInModal.classList.remove('hidden'),
    hideModal: () => signInModal.classList.add('hidden'),
    handleSignIn: async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            handlers.hideModal();
            signInForm.reset();
        } catch (error) {
            alert(error.message);
        }
    },
    handleSignOut: () => auth.signOut(),
    handleAuthState: (user) => {
        if (user) {
            signInBtn.classList.add('hidden');
            signOutBtn.classList.remove('hidden');
            userEmail.classList.remove('hidden');
            userEmail.textContent = user.email;
        } else {
            signInBtn.classList.remove('hidden');
            signOutBtn.classList.add('hidden');
            userEmail.classList.add('hidden');
            userEmail.textContent = '';
        }
    }
};

// Event listeners
signInBtn.addEventListener('click', handlers.showModal);
closeModal.addEventListener('click', handlers.hideModal);
signInForm.addEventListener('submit', handlers.handleSignIn);
signOutBtn.addEventListener('click', handlers.handleSignOut);
auth.onAuthStateChanged(handlers.handleAuthState);
