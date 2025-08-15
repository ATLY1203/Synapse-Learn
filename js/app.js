// E-Book data
const ebooks = {
    form4: {
        science: [
            { title: 'Mathematics', url: 'math4.pdf', cover: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"%3E%3C/path%3E%3C/svg%3E' },
            { title: 'Additional Mathematics', url: 'addmath4.pdf', cover: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"%3E%3C/path%3E%3C/svg%3E' },
            { title: 'Physics', url: 'physics4.pdf', cover: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"%3E%3C/path%3E%3C/svg%3E' }
        ],
        arts: [
            { title: 'Economics', url: 'economics4.pdf', cover: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"%3E%3C/path%3E%3C/svg%3E' }
        ]
    },
    form5: {
        science: [
            { title: 'Mathematics', url: 'math5.pdf', cover: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"%3E%3C/path%3E%3C/svg%3E' },
            { title: 'Additional Mathematics', url: 'addmath5.pdf', cover: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"%3E%3C/path%3E%3C/svg%3E' },
            { title: 'Physics', url: 'physics5.pdf', cover: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"%3E%3C/path%3E%3C/svg%3E' }
        ],
        arts: [
            { title: 'Economics', url: 'economics5.pdf', cover: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"%3E%3C/path%3E%3C/svg%3E' }
        ]
    }
};

// Function to show e-book modal
function showEbook(formLevel) {
    const modal = document.getElementById('ebookModal');
    const grid = document.getElementById('ebookGrid');
    const title = document.getElementById('ebookTitle');
    
    title.textContent = `Form ${formLevel.slice(-1)} E-Books`;
    grid.innerHTML = '';

    // Combine science and arts books
    const books = [...ebooks[formLevel].science, ...ebooks[formLevel].arts];
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'bg-gray-50 p-4 rounded-lg shadow-sm text-center';
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" class="w-16 h-16 mx-auto mb-2 text-blue-500">
            <h4 class="font-semibold mb-2">${book.title}</h4>
            <button onclick="viewEbook('${book.url}')" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
                View E-Book
            </button>
        `;
        grid.appendChild(bookCard);
    });

    modal.classList.remove('hidden');
}

// Function to close e-book modal
function closeEbook() {
    document.getElementById('ebookModal').classList.add('hidden');
}

// PDF viewer variables
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.5;

// Function to view specific e-book
async function viewEbook(url) {
    try {
        // Show the PDF modal
        document.getElementById('pdfModal').classList.remove('hidden');
        document.getElementById('pdfTitle').textContent = url.split('/').pop();

        // Load the PDF
        const loadingTask = pdfjsLib.getDocument(url);
        pdfDoc = await loadingTask.promise;
        
        // Set initial page
        document.getElementById('pageCount').textContent = pdfDoc.numPages;
        pageNum = 1;
        renderPage(pageNum);

        // Set up button events
        document.getElementById('prevPage').onclick = onPrevPage;
        document.getElementById('nextPage').onclick = onNextPage;
    } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Error loading PDF. Please try again later.');
    }
}

// Function to render a page
function renderPage(num) {
    pageRendering = true;
    
    // Get the canvas
    const canvas = document.getElementById('pdfViewer');
    const ctx = canvas.getContext('2d');

    pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        const renderTask = page.render(renderContext);

        renderTask.promise.then(function() {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });

    document.getElementById('pageNum').textContent = num;
}

// Function to queue a new page render
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

// Functions for page navigation
function onPrevPage() {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
}

function onNextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
}

// Function to close PDF viewer
function closePdf() {
    document.getElementById('pdfModal').classList.add('hidden');
    pdfDoc = null;
    pageNum = 1;
}

// Function to start a lesson
function startLesson(subject) {
    // Removed authentication check for demo
    showEbook(subject.toLowerCase().includes('5') ? 'form5' : 'form4');
}

// Function to start the demo
function startDemo() {
    alert('Starting interactive demo...');
    // Add your demo starting logic here
}

// Function to update progress bars
function updateProgress(subject, progress) {
    const progressBars = {
        'Mathematics': 75,
        'Physics': 60,
        'Chemistry': 45
    };
    
    if (subject in progressBars) {
        progressBars[subject] = progress;
        const progressBar = document.querySelector(`[data-subject="${subject}"] .progress-bar`);
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }
}

// Function to handle schedule updates
function updateSchedule(scheduleData) {
    const scheduleContainer = document.querySelector('.schedule-container');
    if (scheduleContainer && scheduleData) {
        // Add your schedule updating logic here
    }
}

// Initialize tooltips and other UI elements
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('[data-interactive]');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            const action = this.dataset.action;
            if (action === 'demo') {
                startDemo();
            }
        });
    });

    // Initialize progress tracking
    updateProgress('Mathematics', 75);
    updateProgress('Physics', 60);
    updateProgress('Chemistry', 45);
});
