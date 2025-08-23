import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "firebase/auth";
import { 
    getFirestore, 
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot
} from "firebase/firestore";


// --- Firebase Configuration ---
// IMPORTANT: In a real-world application, these values should not be stored here.
// They would be kept in secure environment variables on a backend server.
const firebaseConfig = {
  apiKey: "AIzaSyBDlJw_vduk8859AlbROe2ZC3QHiJ_Effc",
  authDomain: "synapse-learn.firebaseapp.com",
  projectId: "synapse-learn",
  storageBucket: "synapse-learn.appspot.com",
  messagingSenderId: "959946255674",
  appId: "1:959946255674:web:81a9fd7b0272abd8a2b403",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// --- Helper for class names ---
const cn = (...classes) => classes.filter(Boolean).join(' ');

// --- Speech Recognition Setup ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'ms-MY';
}

// --- SVG Icon Components ---
const BrainCircuitIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85v2.72c0 .27.16.59.67.5A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
    <path d="M12 20.5c.03-.17.06-.33.09-.5" /><path d="M12 20.5c-.03-.17-.06-.33-.09-.5" /><path d="M12 3.5c.03.17.06.33.09-.5" /><path d="M12 3.5c-.03-.17-.06-.33-.09-.5" /><path d="m4.91 19.48.35-1.03" /><path d="m19.09 19.48-.35-1.03" /><path d="m4.91 4.52.35 1.03" /><path d="m19.09 4.52-.35 1.03" /><path d="M2 12h1.5" /><path d="M20.5 12H22" /><path d="M12 2v1.5" /><path d="M12 20.5V22" />
  </svg>
);
const StarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const BookOpenIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const MicIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
    </svg>
);
const SearchIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);
const XIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);
const SunIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);
const MoonIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);
const LogOutIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);


// --- Shared Components ---
const Header = ({ currentPage, setCurrentPage, theme, toggleTheme, user, handleLogout }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => user ? setCurrentPage('home') : null}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md">
              <BrainCircuitIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Synapse Learn</h1>
          </div>
          {user && (
            <nav className="hidden md:flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
              <a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('home')}} className={cn("px-4 py-1 rounded-full font-semibold transition-colors", currentPage === 'home' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white')}>Home</a>
              <a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('textbooks')}} className={cn("px-4 py-1 rounded-full font-semibold transition-colors", currentPage === 'textbooks' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white')}>Textbooks</a>
              <a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('tutor')}} className={cn("px-4 py-1 rounded-full font-semibold transition-colors", currentPage === 'tutor' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white')}>AI Tutor</a>
            </nav>
          )}
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            </button>
            {user ? (
                 <button onClick={handleLogout} className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
                    <LogOutIcon className="h-5 w-5" />
                    Logout
                </button>
            ) : (
                !user && currentPage !== 'login' &&
                <button className="hidden md:inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-200 hover:scale-105 shadow-lg" onClick={() => setCurrentPage('login')}>
                    Login
                </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} Synapse Learn. All Rights Reserved.</p>
        <p className="text-sm text-gray-400 mt-2">Your Personal AI Study Partner for SPM</p>
      </div>
    </footer>
  );
};

// --- Login Page Component ---
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const handleAuthAction = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
            await setPersistence(auth, persistence);
            
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        }
    };

    return (
        <div className="min-h-[calc(100vh-128px)] flex bg-transparent">
            <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-tr from-blue-800 to-purple-700 text-white p-12">
                <div className="max-w-md">
                    <h2 className="text-4xl font-bold mb-4">Welcome to Synapse Learn</h2>
                    <p className="text-lg opacity-80">Your personal AI-powered study partner, designed to help you master the KSSM syllabus and ace your SPM exams.</p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
                 <div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/80 p-10 rounded-xl shadow-2xl backdrop-blur-md">
                    <div className="text-center">
                        <BrainCircuitIcon className="mx-auto h-12 w-auto text-blue-600" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                            {isSignUp ? 'Create your account' : 'Welcome back'}
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                            {isSignUp ? 'And start your AI-powered learning journey' : 'Sign in to continue your progress'}
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleAuthAction}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                    <div className="text-sm text-center">
                        <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(!isSignUp); setError(''); }} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Home Page Components ---
const HeroSection = ({ setCurrentPage }) => (
    <section className="bg-transparent py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Unlock Your SPM Potential with AI
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          An interactive tool for Form 4 & 5 students. Teach our AI your KSSM textbook content and get instant feedback to supercharge your SPM preparation.
        </p>
        <div className="mt-8 flex justify-center">
          <button onClick={() => setCurrentPage('tutor')} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-200 hover:scale-105 shadow-lg">
            Start Learning
          </button>
        </div>
      </div>
    </section>
);

const FeaturesSection = () => {
  const features = [
    { icon: <BrainCircuitIcon className="h-6 w-6" />, title: 'AI-Powered Analysis', description: 'Our advanced AI reads and understands your textbook content, just like a real tutor.' },
    { icon: <StarIcon className="h-6 w-6" />, title: 'Instant Feedback & Rating', description: 'Receive an immediate rating on the AI\'s comprehension, helping you identify key areas.' },
    { icon: <BookOpenIcon className="h-6 w-6" />, title: 'SPM Focused', description: 'Specifically designed for the KSSM syllabus to help you excel in your SPM examinations.' },
  ];
  const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600">{icon}</div>
      <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
  return (
    <section className="py-20 sm:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center"><h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose Synapse Learn?</h2><p className="mt-4 text-lg text-gray-600 dark:text-gray-400">A smarter way to revise and prepare.</p></div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">{features.map((feature, index) => <FeatureCard key={index} {...feature} />)}</div>
      </div>
    </section>
  );
};

const HomePage = ({ setCurrentPage }) => (
    <>
        <HeroSection setCurrentPage={setCurrentPage} />
        <FeaturesSection />
    </>
);

// --- Textbook Page Components ---
const textbooks = [
  // Core Subjects
  { title: 'Bahasa Melayu', form: 'Tingkatan 5', color: 'bg-red-500', searchKeywords: 'malay language' },
  { title: 'Bahasa Melayu', form: 'Tingkatan 4', color: 'bg-red-400', searchKeywords: 'malay language' },
  { title: 'English', form: 'Tingkatan 5', color: 'bg-sky-500', searchKeywords: 'english' },
  { title: 'English', form: 'Tingkatan 4', color: 'bg-sky-400', searchKeywords: 'english' },
  { title: 'Mathematics', form: 'Tingkatan 5', color: 'bg-blue-500', searchKeywords: 'matematik math' },
  { title: 'Mathematics', form: 'Tingkatan 4', color: 'bg-blue-400', searchKeywords: 'matematik math' },
  { title: 'Sejarah', form: 'Tingkatan 5', color: 'bg-purple-500', searchKeywords: 'history' },
  { title: 'Sejarah', form: 'Tingkatan 4', color: 'bg-purple-400', searchKeywords: 'history' },
  { title: 'Pendidikan Islam', form: 'Tingkatan 5', color: 'bg-teal-500', searchKeywords: 'islamic education' },
  { title: 'Pendidikan Moral', form: 'Tingkatan 5', color: 'bg-orange-500', searchKeywords: 'moral education' },

  // Science Stream
  { title: 'Physics', form: 'Tingkatan 5', color: 'bg-indigo-500', searchKeywords: 'fizik' },
  { title: 'Physics', form: 'Tingkatan 4', color: 'bg-indigo-400', searchKeywords: 'fizik' },
  { title: 'Chemistry', form: 'Tingkatan 5', color: 'bg-yellow-500', searchKeywords: 'kimia' },
  { title: 'Chemistry', form: 'Tingkatan 4', color: 'bg-yellow-400', searchKeywords: 'kimia' },
  { title: 'Biology', form: 'Tingkatan 5', color: 'bg-green-500', searchKeywords: 'biologi' },
  { title: 'Biology', form: 'Tingkatan 4', color: 'bg-green-400', searchKeywords: 'biologi' },
  { title: 'Additional Mathematics', form: 'Tingkatan 5', color: 'bg-pink-500', searchKeywords: 'matematik tambahan add maths' },
  { title: 'Additional Mathematics', form: 'Tingkatan 4', color: 'bg-pink-400', searchKeywords: 'matematik tambahan add maths' },

  // Art Stream
  { title: 'Prinsip Perakaunan', form: 'Tingkatan 5', color: 'bg-gray-500', searchKeywords: 'principles of accounting' },
  { title: 'Ekonomi', form: 'Tingkatan 5', color: 'bg-lime-500', searchKeywords: 'economics' },
  { title: 'Perniagaan', form: 'Tingkatan 5', color: 'bg-amber-500', searchKeywords: 'business studies' },
  { title: 'Computer Science', form: 'Tingkatan 4', color: 'bg-cyan-500', searchKeywords: 'sains komputer' },
];

const TextbookCard = ({ title, form, color }) => (
  <div className={`p-4 rounded-lg text-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer ${color}`}>
    <BookOpenIcon className="h-12 w-12 mx-auto mb-2" />
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="text-sm">{form}</p>
  </div>
);

const SearchBar = ({ onSearch }) => (
  <div className="relative mb-8">
    <input type="text" placeholder="Search for a textbook (e.g., 'Chemistry' or 'Kimia')..." className="w-full p-4 pl-12 rounded-full bg-white dark:bg-gray-700 dark:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => onSearch(e.target.value)} />
    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
  </div>
);

const TextbookPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const lowerCaseQuery = searchQuery.toLowerCase();
  const filteredTextbooks = textbooks.filter(book => 
    book.title.toLowerCase().includes(lowerCaseQuery) || 
    book.form.toLowerCase().includes(lowerCaseQuery) ||
    book.searchKeywords.toLowerCase().includes(lowerCaseQuery)
  );
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Textbook Library</h2>
      <SearchBar onSearch={setSearchQuery} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredTextbooks.map((book, index) => <TextbookCard key={index} {...book} />)}
      </div>
    </div>
  );
};

// --- AI Tutor Page Component ---
const subjectsByForm = {
    '4': ['Bahasa Melayu', 'English', 'Mathematics', 'History', 'Physics', 'Chemistry', 'Biology', 'Additional Mathematics', 'Computer Science'],
    '5': ['Bahasa Melayu', 'English', 'Mathematics', 'History', 'Pendidikan Islam', 'Pendidikan Moral', 'Physics', 'Chemistry', 'Biology', 'Additional Mathematics', 'Prinsip Perakaunan', 'Ekonomi', 'Perniagaan']
};

const AiTutorPage = ({ user }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [studentText, setStudentText] = useState('');
  const baseTextRef = useRef('');
  const [selectedForm, setSelectedForm] = useState('5');
  const [selectedSubject, setSelectedSubject] = useState('Chemistry');
  const [currentRating, setCurrentRating] = useState(0);
  const [ratingHistory, setRatingHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!user) return;
    const ratingsCol = collection(db, 'users', user.uid, 'ratings');
    const q = query(ratingsCol, orderBy('timestamp', 'desc'), limit(5));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const history = [];
        querySnapshot.forEach((doc) => {
            history.push({ id: doc.id, ...doc.data(), timestamp: doc.data().timestamp.toDate() });
        });
        setRatingHistory(history);
    });

    return () => unsubscribe();
  }, [user]);


  useEffect(() => {
    if (!recognition) return;

    const handleResult = (event) => {
      const sessionTranscript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');
      setStudentText(baseTextRef.current + sessionTranscript);
    };
    const handleEnd = () => setIsRecording(false);
    const handleError = (event) => { console.error("Speech recognition error:", event.error); setIsRecording(false); };

    recognition.addEventListener('result', handleResult);
    recognition.addEventListener('end', handleEnd);
    recognition.addEventListener('error', handleError);

    return () => {
      recognition.removeEventListener('result', handleResult);
      recognition.removeEventListener('end', handleEnd);
      recognition.removeEventListener('error', handleError);
      if (recognition.readyState === 'listening') { recognition.stop(); }
    };
  }, []);
  
  const handleFormChange = (e) => {
      setSelectedForm(e.target.value);
      setSelectedSubject(subjectsByForm[e.target.value][0]);
  }

  const handleMicClick = () => {
    if (!recognition) { alert("Speech recognition is not supported in this browser."); return; }
    if (isRecording) {
      recognition.stop();
    } else {
      baseTextRef.current = studentText ? studentText + ' ' : '';
      recognition.start();
      setIsRecording(true);
    }
  };
  
  const handleTextChange = (e) => {
      setStudentText(e.target.value);
      if (!isRecording) { baseTextRef.current = e.target.value; }
  }
  
  const handleSubmitToAI = async (e) => {
      e.preventDefault();
      if (!studentText.trim() || isProcessing || !user) return;
      setIsProcessing(true);
      
      setTimeout(async () => {
        const newRating = (Math.random() * 4 + 1).toFixed(1);

        const newHistoryEntry = {
            subject: selectedSubject,
            form: `Form ${selectedForm}`,
            rating: newRating,
            timestamp: new Date()
        };
        
        try {
          await addDoc(collection(db, 'users', user.uid, 'ratings'), newHistoryEntry);
          setCurrentRating(newRating);
          setStudentText('');
          baseTextRef.current = '';
        } catch (error) {
            console.error("Error adding document: ", error);
        } finally {
          setIsProcessing(false);
        }
      }, 1500);
  }

  const clearText = () => {
      setStudentText('');
      baseTextRef.current = '';
  }

  return (
    <section className="py-12 sm:py-16 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmitToAI} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">AI Understanding Test</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="form-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Form</label>
                    <select id="form-select" value={selectedForm} onChange={handleFormChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        <option value="4">Form 4</option>
                        <option value="5">Form 5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                    <select id="subject-select" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        {subjectsByForm[selectedForm].map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                        ))}
                    </select>
                </div>
            </div>

            <p className="mb-4 text-gray-600 dark:text-gray-400">Explain the topic in your own words. The AI will compare your explanation to the textbook to rate your understanding.</p>
            <div className="relative">
                <textarea className="w-full h-64 p-4 border rounded-lg bg-gray-50/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500" value={studentText} onChange={handleTextChange} placeholder={isRecording ? "Listening..." : "Start typing or click the mic to explain..."} />
                {studentText && !isRecording && (
                    <button type="button" onClick={clearText} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" title="Clear text">
                        <XIcon className="h-5 w-5" />
                    </button>
                )}
            </div>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button type="submit" disabled={isProcessing} className="flex-grow bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed">
                        {isProcessing ? 'Rating...' : 'Rate My Understanding'}
                    </button>
                    <button type="button" onClick={handleMicClick} className={cn("p-2 rounded-full transition-colors duration-200", isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500')} title={isRecording ? "Stop Recording" : "Start Recording"}>
                        <MicIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="w-full sm:w-auto p-4 bg-gradient-to-r from-green-100 to-teal-100/80 dark:from-green-900/50 dark:to-teal-900/50 rounded-lg text-center">
                    <h4 className="text-lg font-bold text-green-800 dark:text-green-200">Your Understanding Score</h4>
                    <p className="text-3xl text-green-600 dark:text-green-300 font-bold">{currentRating > 0 ? `${currentRating} / 5.0` : '0.0 / 5.0'}</p>
                </div>
            </div>
          </form>
          
          {ratingHistory.length > 0 && (
            <div className="mt-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Rating History</h3>
                <ul>
                    {ratingHistory.map((item, index) => (
                        <li key={index} className="flex justify-between items-center p-3 mb-2 bg-gray-50/80 dark:bg-gray-700/80 rounded-lg">
                            <div>
                                <p className="font-semibold dark:text-white">{item.subject} ({item.form})</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.timestamp.toLocaleString()}</p>
                            </div>
                            <p className="text-xl font-bold text-green-600 dark:text-green-300">{item.rating} / 5.0</p>
                        </li>
                    ))}
                </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


// --- Main App Component ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [user, setUser] = useState(null);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          if (currentUser) {
              setCurrentPage('home');
          } else {
              setCurrentPage('login');
          }
      });
      return () => unsubscribe();
  }, []);

  useEffect(() => {
      if (theme === 'dark') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
      } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
      }
  }, [theme]);

  const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = async () => {
      try {
          await signOut(auth);
      } catch (error) {
          console.error("Error signing out: ", error);
      }
  };

  const renderPage = () => {
    if (!user) {
        return <LoginPage />;
    }
    switch (currentPage) {
      case 'textbooks':
        return <TextbookPage />;
      case 'tutor':
        return <AiTutorPage user={user} />;
      case 'home':
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div 
        className={cn(
            "font-sans antialiased flex flex-col min-h-screen transition-colors duration-300",
            theme === 'light' ? 'bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100' : 'bg-gradient-to-br from-slate-900 via-gray-900 to-black'
        )}
    >
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} theme={theme} toggleTheme={toggleTheme} user={user} handleLogout={handleLogout} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
