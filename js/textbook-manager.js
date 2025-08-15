import { db, storage } from './firebase-config.js';

class TextbookManager {
    constructor() {
        this.setupEventListeners();
        this.currentScale = 1.0;
        this.annotations = new Map();
        this.bookmarks = new Set();
        this.readingStats = {
            startTime: null,
            totalTime: 0,
            lastPage: 1
        };
    }

    setupEventListeners() {
        // Setup Form 4 and Form 5 button handlers
        document.querySelector('[onclick="showEbook(\'form4\')"]')
            .addEventListener('click', () => this.showEbooks('form4'));
        document.querySelector('[onclick="showEbook(\'form5\')"]')
            .addEventListener('click', () => this.showEbooks('form5'));
    }

    async showEbooks(form) {
        try {
            // Get textbooks from Firestore
            const textbooksSnapshot = await db.collection('textbooks')
                .where('form', '==', form)
                .get();

            const textbooks = [];
            textbooksSnapshot.forEach(doc => {
                textbooks.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            // Update the e-book grid
            this.updateEbookGrid(textbooks);
            
            // Show the modal
            document.getElementById('ebookModal').classList.remove('hidden');
        } catch (error) {
            console.error('Error loading textbooks:', error);
            alert('Error loading textbooks. Please try again.');
        }
    }

    updateEbookGrid(textbooks) {
        const grid = document.getElementById('ebookGrid');
        grid.innerHTML = textbooks.map(book => `
            <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img src="${book.coverUrl}" alt="${book.title}" class="w-full h-48 object-cover rounded mb-4">
                <h3 class="text-lg font-semibold mb-2">${book.title}</h3>
                <p class="text-gray-600 mb-4">${book.description}</p>
                <button onclick="viewEbook('${book.id}')" 
                        class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    View Book
                </button>
            </div>
        `).join('');
    }

    async viewEbook(bookId) {
        try {
            // Get book data from Firestore
            const bookDoc = await db.collection('textbooks').doc(bookId).get();
            const bookData = bookDoc.data();

            // Get PDF URL from Storage
            const pdfUrl = await storage.ref(bookData.pdfPath).getDownloadURL();

            // Update modal title
            document.getElementById('pdfTitle').textContent = bookData.title;

            // Load PDF using PDF.js
            const loadingTask = pdfjsLib.getDocument(pdfUrl);
            const pdf = await loadingTask.promise;

            // Store PDF data for navigation
            this.currentPdf = pdf;
            this.currentPage = 1;
            this.totalPages = pdf.numPages;

            // Update page info
            document.getElementById('pageNum').textContent = this.currentPage;
            document.getElementById('pageCount').textContent = this.totalPages;

            // Render first page
            await this.renderPage(this.currentPage);

            // Show PDF viewer modal
            document.getElementById('ebookModal').classList.add('hidden');
            document.getElementById('pdfModal').classList.remove('hidden');

            // Setup navigation buttons
            this.setupPdfNavigation();
        } catch (error) {
            console.error('Error viewing e-book:', error);
            alert('Error loading e-book. Please try again.');
        }
    }

    async renderPage(pageNumber) {
        try {
            const page = await this.currentPdf.getPage(pageNumber);
            const canvas = document.getElementById('pdfViewer');
            const context = canvas.getContext('2d');

            const viewport = page.getViewport({ scale: 1.5 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
        } catch (error) {
            console.error('Error rendering page:', error);
        }
    }

    setupPdfNavigation() {
        document.getElementById('prevPage').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderPage(this.currentPage);
                document.getElementById('pageNum').textContent = this.currentPage;
            }
        });

        document.getElementById('nextPage').addEventListener('click', () => {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.renderPage(this.currentPage);
                document.getElementById('pageNum').textContent = this.currentPage;
            }
        });
    }
}

// Initialize textbook manager
const textbookManager = new TextbookManager();

// Export for use in other modules
export { textbookManager };
