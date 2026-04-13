import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Clock, Globe, BookOpen, Tag, ThumbsUp, MessageCircle, Send, User } from 'lucide-react';
import { MOCK_BOOKS } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [book, setBook] = useState(null);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState('');
    const [isBorrowing, setIsBorrowing] = useState(false);

    useEffect(() => {
        const foundBook = MOCK_BOOKS.find(b => b.id === parseInt(id));
        if (foundBook) {
            setBook(foundBook);
            setLikes(foundBook.likes);
        }
    }, [id]);

    if (!book) return <div className="text-center py-40 font-black text-3xl text-gray-200 tracking-tighter animate-pulse">Loading book details...</div>;

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
            toast.success('Like removed');
        } else {
            setLikes(likes + 1);
            setLiked(true);
            toast.success('Added to liked books');
        }
    };

    const handleBorrow = () => {
        if (!isAuthenticated) {
            toast.error('Please login to borrow books');
            navigate('/login');
            return;
        }
        setIsBorrowing(true);
        setTimeout(() => {
            toast.success('Borrow request sent to owner!');
            setIsBorrowing(false);
        }, 1500);
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        const newComment = { id: Date.now(), user: user?.name || 'Guest', text: comment, replies: [] };
        setBook({ ...book, comments: [...book.comments, newComment] });
        setComment('');
        toast.success('Comment added successfully!');
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <button 
                onClick={() => navigate(-1)} 
                className="mb-12 flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors group"
            >
                <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                </div>
                <span>Back to Collection</span>
            </button>

            <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-50 border border-gray-50 overflow-hidden flex flex-col lg:flex-row min-h-[600px] relative mb-20">
                {/* Book Cover Section */}
                <div className="lg:w-2/5 relative group">
                    <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img 
                        src={book.cover} 
                        alt={book.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5 p-10 md:p-16 flex flex-col justify-center relative">
                    <div className="mb-10">
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none">{book.title}</h1>
                        <p className="text-2xl text-indigo-600 font-medium italic tracking-tight">by {book.author}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 border-y border-gray-50 py-10">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                                <Clock className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Status</span>
                            </div>
                            <span className={`text-lg font-black ${book.status === 'Available' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {book.status}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                                <Tag className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Genre</span>
                            </div>
                            <span className="text-lg font-black text-gray-900">{book.genre}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Likes</span>
                            </div>
                            <span className="text-lg font-black text-gray-900">{likes}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                                <BookOpen className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Language</span>
                            </div>
                            <span className="text-lg font-black text-gray-900">{book.language}</span>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                            Synopsis
                        </h3>
                        <p className="text-xl text-gray-500 leading-relaxed font-medium">{book.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto">
                        <div className="flex flex-col sm:items-start items-center">
                            <span className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-1">Borrow Fee</span>
                            <span className="text-5xl font-black text-indigo-700">${book.price}</span>
                        </div>
                        <div className="flex gap-4 w-full sm:w-auto flex-grow">
                            <button 
                                onClick={handleBorrow}
                                disabled={book.status !== 'Available' || isBorrowing}
                                className="flex-grow bg-indigo-600 text-white px-8 py-5 rounded-[2rem] font-black text-xl hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50"
                            >
                                {isBorrowing ? 'Requesting...' : book.status === 'Available' ? 'Borrow Now' : 'Currently Unavailable'}
                            </button>
                            <button 
                                onClick={handleLike}
                                className={`p-5 rounded-[2rem] shadow-xl transition-all active:scale-[0.95] ${
                                    liked ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-400 hover:text-indigo-600'
                                }`}
                            >
                                <ThumbsUp className={`h-8 w-8 ${liked ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="max-w-4xl">
                <h3 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
                    <MessageCircle className="h-8 w-8 text-indigo-600" />
                    Reviews & Discussions ({book.comments?.length || 0})
                </h3>

                <form onSubmit={handleAddComment} className="mb-16 relative">
                    <input 
                        type="text" 
                        placeholder="Share your thoughts about this book..." 
                        className="w-full p-6 pr-20 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-indigo-50 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                        value={comment}
                        onChange={e=>setComment(e.target.value)}
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg">
                        <Send className="h-5 w-5" />
                    </button>
                </form>

                <div className="space-y-8">
                    {book.comments?.map(c => (
                        <div key={c.id} className="flex gap-6 items-start group">
                            <div className="h-14 w-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                                <User className="h-7 w-7" />
                            </div>
                            <div className="flex-grow bg-white p-8 rounded-[2rem] shadow-lg border border-gray-50 relative">
                                <h4 className="font-black text-gray-900 mb-2">{c.user}</h4>
                                <p className="text-gray-600 leading-relaxed font-medium">{c.text}</p>
                                <button className="mt-4 text-sm font-black text-indigo-600 hover:underline">Reply to review</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
