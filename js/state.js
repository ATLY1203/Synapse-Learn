// Manages the application's global state.
export const state = {
    currentPage: 'login', // 'login', 'home', 'textbooks', 'tutor'
    theme: localStorage.getItem('theme') || 'light',
    user: null,
    searchQuery: '',
    isRecording: false,
    studentText: '',
    selectedForm: '5',
    selectedSubject: 'Chemistry',
    currentRating: null,
    ratingHistory: [],
    isProcessing: false,
};

// Mock Data - In a real app, this would be fetched from the API/Firestore.
export const textbooks = [
    { title: 'Mathematics', form: 4, stream: 'Science', cover: 'https://placehold.co/400x600/3b82f6/white?text=Maths\\nForm+4' },
    { title: 'Physics', form: 4, stream: 'Science', cover: 'https://placehold.co/400x600/8b5cf6/white?text=Physics\\nForm+4' },
    { title: 'Chemistry', form: 4, stream: 'Science', cover: 'https://placehold.co/400x600/10b981/white?text=Chemistry\\nForm+4' },
    { title: 'Biology', form: 4, stream: 'Science', cover: 'https://placehold.co/400x600/ef4444/white?text=Biology\\nForm+4' },
    { title: 'Sejarah', form: 4, stream: 'Art', cover: 'https://placehold.co/400x600/f97316/white?text=Sejarah\\nForm+4' },
    { title: 'Additional Mathematics', form: 5, stream: 'Science', cover: 'https://placehold.co/400x600/3b82f6/white?text=Add+Maths\\nForm+5' },
    { title: 'Physics', form: 5, stream: 'Science', cover: 'https://placehold.co/400x600/8b5cf6/white?text=Physics\\nForm+5' },
    { title: 'Ekonomi', form: 5, stream: 'Art', cover: 'https://placehold.co/400x600/f59e0b/white?text=Ekonomi\\nForm+5' },
];
