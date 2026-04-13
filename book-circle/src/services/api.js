import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Placeholder for real backend
});

export const MOCK_BOOKS = [
    { 
        id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", price: 15.99, status: "Available", 
        cover: "https://images.unsplash.com/photo-1543005187-9f4c4b7a80fe?w=400&h=600&fit=crop", 
        description: "A story of wealth, love, and the American Dream in the 1920s.",
        ownerId: 101, ownerName: "John Doe", isbn: "978-0743273565", language: "English", likes: 12, dislikes: 2,
        comments: [{ id: 1, user: "Alice", text: "Truly a classic!", replies: [] }]
    },
    { 
        id: 2, title: "Brief Answers to the Big Questions", author: "Stephen Hawking", genre: "Science", price: 19.50, status: "Available", 
        cover: "https://images.unsplash.com/photo-1532012197367-2d5970d227c1?w=400&h=600&fit=crop", 
        description: "Hawking's final book, offering his views on the universe's biggest mysteries.",
        ownerId: 101, ownerName: "John Doe", isbn: "978-1473695986", language: "English", likes: 85, dislikes: 0,
        comments: []
    },
    { 
        id: 3, title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", genre: "History", price: 22.00, status: "Borrowed", 
        cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop", 
        description: "An exploration of the history of our species, from ancient humans to the modern age.",
        ownerId: 102, ownerName: "Sarah Smith", isbn: "978-0062316097", language: "English", likes: 120, dislikes: 4,
        comments: []
    },
    { 
        id: 4, title: "Steve Jobs", author: "Walter Isaacson", genre: "Biography", price: 18.99, status: "Available", 
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop", 
        description: "The definitive biography of Apple co-founder Steve Jobs.",
        ownerId: 101, ownerName: "John Doe", isbn: "978-1451648539", language: "English", likes: 64, dislikes: 1,
        comments: []
    },
    { 
        id: 5, title: "The Selfish Gene", author: "Richard Dawkins", genre: "Science", price: 14.50, status: "Available", 
        cover: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?w=400&h=600&fit=crop", 
        description: "A landmark work in evolutionary biology that introduced the gene-centered view of evolution.",
        ownerId: 102, ownerName: "Sarah Smith", isbn: "978-0198788607", language: "English", likes: 42, dislikes: 2,
        comments: []
    },
    { 
        id: 6, title: "Guns, Germs, and Steel", author: "Jared Diamond", genre: "History", price: 16.75, status: "Available", 
        cover: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400&h=600&fit=crop", 
        description: "A Pulitzer Prize-winning book on the environmental factors that shaped human history.",
        ownerId: 103, ownerName: "Mike Ross", isbn: "978-0393317558", language: "English", likes: 55, dislikes: 3,
        comments: []
    },
    { 
        id: 7, title: "Elon Musk", author: "Ashlee Vance", genre: "Biography", price: 21.00, status: "Borrowed", 
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop", 
        description: "A look inside the life of the billionaire entrepreneur behind Tesla and SpaceX.",
        ownerId: 103, ownerName: "Mike Ross", isbn: "978-0062301239", language: "English", likes: 98, dislikes: 5,
        comments: []
    },
    { 
        id: 8, title: "The Gene: An Intimate History", author: "Siddhartha Mukherjee", genre: "Science", price: 24.99, status: "Available", 
        cover: "https://images.unsplash.com/photo-1621351123020-7144907d477c?w=400&h=600&fit=crop", 
        description: "A sweeping and personal history of the gene, from Mendel to modern genetics.",
        ownerId: 102, ownerName: "Sarah Smith", isbn: "978-1476733500", language: "English", likes: 37, dislikes: 1,
        comments: []
    },
    { 
        id: 9, title: "Team of Rivals", author: "Doris Kearns Goodwin", genre: "History", price: 15.25, status: "Available", 
        cover: "https://images.unsplash.com/photo-1524578271613-d550eabcad51?w=400&h=600&fit=crop", 
        description: "The political genius of Abraham Lincoln through his cabinet of former rivals.",
        ownerId: 101, ownerName: "John Doe", isbn: "978-0684824901", language: "English", likes: 72, dislikes: 0,
        comments: []
    },
    { 
        id: 10, title: "Educated", author: "Tara Westover", genre: "Biography", price: 13.99, status: "Available", 
        cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop", 
        description: "A memoir about a young woman who leaves her survivalist family to pursue an education.",
        ownerId: 103, ownerName: "Mike Ross", isbn: "978-0399590504", language: "English", likes: 112, dislikes: 2,
        comments: []
    },
    { 
        id: 11, title: "Cosmos", author: "Carl Sagan", genre: "Science", price: 17.50, status: "Available", 
        cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop", 
        description: "Sagan's exploration of the universe and our place within it.",
        ownerId: 102, ownerName: "Sarah Smith", isbn: "978-0345331359", language: "English", likes: 230, dislikes: 3,
        comments: []
    },
    { 
        id: 12, title: "The Wright Brothers", author: "David McCullough", genre: "Biography", price: 14.99, status: "Available", 
        cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop", 
        description: "The story of the American pioneers of aviation.",
        ownerId: 101, ownerName: "John Doe", isbn: "978-1476728742", language: "English", likes: 48, dislikes: 1,
        comments: []
    }
];

export const MOCK_USERS = [
    { id: 1, name: "Admin User", email: "admin@bookcircle.com", role: "Admin", status: "Approved" },
    { id: 101, name: "John Doe", email: "owner@test.com", role: "Owner", status: "Approved" },
    { id: 102, name: "Sarah Smith", email: "owner2@test.com", role: "Owner", status: "Approved" },
    { id: 103, name: "Mike Ross", email: "owner3@test.com", role: "Owner", status: "Pending" },
    { id: 201, name: "Reader Ali", email: "reader@test.com", role: "Reader", status: "Approved" }
];

export const MOCK_BORROW_REQUESTS = [
    { id: 1, bookId: 3, readerId: 201, status: "Pending", requestDate: "2026-04-10" }
];

export default api;
