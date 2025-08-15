// Obfuscated configuration
const _0x5f2d=['\x61\x70\x70\x6C\x79','\x41\x49\x7A\x61\x53\x79\x42\x44\x6C\x4A\x77\x5F\x76\x64\x75\x6B\x38\x38\x35\x39\x41\x6C\x62\x52\x4F\x65\x32\x5A\x43\x33\x51\x48\x69\x4A\x5F\x45\x66\x66\x63','\x73\x79\x6E\x61\x70\x73\x65\x2D\x6C\x65\x61\x72\x6E\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x61\x70\x70\x2E\x63\x6F\x6D','\x73\x79\x6E\x61\x70\x73\x65\x2D\x6C\x65\x61\x72\x6E','\x73\x79\x6E\x61\x70\x73\x65\x2D\x6C\x65\x61\x72\x6E\x2E\x61\x70\x70\x73\x70\x6F\x74\x2E\x63\x6F\x6D','\x39\x35\x39\x39\x34\x36\x32\x35\x35\x36\x37\x34','\x31\x3A\x39\x35\x39\x39\x34\x36\x32\x35\x35\x36\x37\x34\x3A\x77\x65\x62\x3A\x38\x31\x61\x39\x66\x64\x37\x62\x30\x32\x37\x32\x61\x62\x64\x38\x61\x32\x62\x34\x30\x33','\x47\x2D\x34\x54\x54\x33\x51\x59\x34\x48\x4C\x32'];

// Security measures
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'u' || e.key === 's')) {
        e.preventDefault();
        return false;
    }
});

// Initialize Firebase with decoded config
const firebaseConfig = {
    apiKey: atob(_0x5f2d[1]),
    authDomain: atob(_0x5f2d[2]),
    projectId: atob(_0x5f2d[3]),
    storageBucket: atob(_0x5f2d[4]),
    messagingSenderId: atob(_0x5f2d[5]),
    appId: atob(_0x5f2d[6]),
    measurementId: atob(_0x5f2d[7])
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

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
