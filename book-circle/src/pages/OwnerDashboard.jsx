import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_BOOKS } from '../services/api';
import { Plus, Edit, Trash2, CheckCircle, Clock, BookOpen, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

const OwnerDashboard = () => {
    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', price: '', description: '', cover: '' });

    useEffect(() => {
        // Filter books owned by this user
        const ownerBooks = MOCK_BOOKS.filter(b => b.ownerId === user.id);
        setBooks(ownerBooks);
    }, [user.id]);

    const handleAddBook = (e) => {
        e.preventDefault();
        const bookToAdd = { ...newBook, id: Date.now(), ownerId: user.id, ownerName: user.name, status: 'Available', likes: 0, dislikes: 0, comments: [] };
        setBooks([...books, bookToAdd]);
        toast.success('Book added successfully!');
        setShowAddModal(false);
        setNewBook({ title: '', author: '', genre: '', price: '', description: '', cover: '' });
    };

    const handleDelete = (id) => {
        const book = books.find(b => b.id === id);
        if (book.status === 'Borrowed') {
            toast.error('Cannot delete a borrowed book!');
            return;
        }
        setBooks(books.filter(b => b.id !== id));
        toast.success('Book deleted successfully');
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">My Bookshelf</h1>
                    <p className="text-gray-500 font-medium italic">Manage and track your shared book collection.</p>
                </div>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-[2rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 active:scale-[0.98]"
                >
                    <Plus className="h-6 w-6" />
                    Post New Book
                </button>
            </div>

            {books.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {books.map(book => (
                        <div key={book.id} className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-indigo-50 border border-gray-50 flex flex-col group relative overflow-hidden">
                            <div className="flex gap-8 mb-8">
                                <div className="relative flex-shrink-0">
                                    <img src={book.cover} className="w-28 h-40 object-cover rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-500" alt={book.title} />
                                </div>
                                <div className="flex-grow flex flex-col justify-center">
                                    <h3 className="text-2xl font-black text-gray-900 mb-1 leading-tight line-clamp-2">{book.title}</h3>
                                    <p className="text-sm text-gray-400 font-bold mb-4 italic">by {book.author}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            book.status === 'Available' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                            {book.status === 'Available' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                            {book.status}
                                        </span>
                                        <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {book.genre}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-50">
                                <div className="flex items-center gap-1 text-indigo-700 font-black text-2xl">
                                    <DollarSign className="h-5 w-5" />
                                    <span>{book.price}</span>
                                </div>
                                <div className="flex gap-3">
                                    <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm">
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(book.id)}
                                        disabled={book.status === 'Borrowed'}
                                        className={`p-4 rounded-2xl transition-all shadow-sm ${
                                            book.status === 'Borrowed' 
                                            ? 'bg-gray-50 text-gray-200 cursor-not-allowed' 
                                            : 'bg-rose-50 text-rose-400 hover:bg-rose-100 hover:text-rose-600'
                                        }`}
                                        title={book.status === 'Borrowed' ? "Cannot delete borrowed books" : "Delete book"}
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-32 bg-white rounded-[4rem] shadow-2xl border border-gray-50">
                    <div className="inline-block p-8 bg-indigo-50 rounded-[3rem] mb-8">
                        <BookOpen className="h-16 w-16 text-indigo-200" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-4">Your bookshelf is empty</h3>
                    <p className="text-gray-400 font-medium mb-10">Start sharing your knowledge by posting your first book!</p>
                    <button onClick={() => setShowAddModal(true)} className="text-indigo-600 font-black text-xl hover:underline underline-offset-8">Add a book now →</button>
                </div>
            )}

            {/* Add Book Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-indigo-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white w-full max-w-2xl p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full -mr-20 -mt-20 opacity-50"></div>
                        
                        <h2 className="text-4xl font-black mb-10 text-gray-900 tracking-tighter">Share a New Book</h2>
                        <form onSubmit={handleAddBook} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input required placeholder="Book Title" className="w-full p-5 bg-gray-50 border-none rounded-3xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition-all" value={newBook.title} onChange={e=>setNewBook({...newBook, title:e.target.value})} />
                                <input required placeholder="Author Name" className="w-full p-5 bg-gray-50 border-none rounded-3xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition-all" value={newBook.author} onChange={e=>setNewBook({...newBook, author:e.target.value})} />
                                <input required placeholder="Genre (e.g. Science, Fiction)" className="w-full p-5 bg-gray-50 border-none rounded-3xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition-all" value={newBook.genre} onChange={e=>setNewBook({...newBook, genre:e.target.value})} />
                                <input required type="number" step="0.01" placeholder="Borrow Fee ($)" className="w-full p-5 bg-gray-50 border-none rounded-3xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition-all" value={newBook.price} onChange={e=>setNewBook({...newBook, price:e.target.value})} />
                            </div>
                            <input required placeholder="Cover Image URL" className="w-full p-5 bg-gray-50 border-none rounded-3xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition-all" value={newBook.cover} onChange={e=>setNewBook({...newBook, cover:e.target.value})} />
                            <textarea required placeholder="Brief Book Description" className="w-full p-5 bg-gray-50 border-none rounded-3xl outline-none focus:ring-2 focus:ring-indigo-500 h-32 font-medium transition-all resize-none" value={newBook.description} onChange={e=>setNewBook({...newBook, description:e.target.value})}></textarea>
                            
                            <div className="flex gap-6 pt-6">
                                <button type="button" onClick={()=>setShowAddModal(false)} className="flex-grow py-5 bg-gray-100 text-gray-500 rounded-[2rem] font-black text-lg hover:bg-gray-200 transition-all">Cancel</button>
                                <button type="submit" className="flex-[2] py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all active:scale-[0.98]">Publish to Library</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OwnerDashboard;
