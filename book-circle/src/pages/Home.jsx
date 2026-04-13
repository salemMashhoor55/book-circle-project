import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Book, Star, DollarSign, Tag, Info, Search, ThumbsUp, ThumbsDown, MessageCircle, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { MOCK_BOOKS } from '../services/api';

const BookCard = ({ book }) => {
    const [likes, setLikes] = useState(book.likes);
    const [liked, setLiked] = useState(false);
    const [inReadingList, setInReadingList] = useState(false);

    const handleLike = (e) => {
        e.preventDefault();
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

    const toggleReadingList = (e) => {
        e.preventDefault();
        setInReadingList(!inReadingList);
        toast.success(inReadingList ? 'Removed from reading list' : 'Added to reading list');
    };

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
            <div className="relative aspect-[2/3] overflow-hidden">
                <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                            book.status === 'Available' ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                            {book.status}
                        </span>
                    </div>
                    <button 
                        onClick={toggleReadingList}
                        className={`p-2 rounded-full backdrop-blur-md shadow-lg transition-all ${
                            inReadingList ? 'bg-rose-500 text-white' : 'bg-white/80 text-gray-400 hover:text-rose-500'
                        }`}
                    >
                        <Heart className={`h-4 w-4 ${inReadingList ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-3 w-3 text-indigo-500" />
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{book.genre}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 line-clamp-1 mb-1">{book.title}</h3>
                <p className="text-sm text-gray-500 mb-4 italic">By {book.author}</p>
                
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={handleLike} className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${liked ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'}`}>
                        <ThumbsUp className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                        {likes}
                    </button>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                        <MessageCircle className="h-4 w-4" />
                        {book.comments?.length || 0}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 text-indigo-700 font-black text-2xl">
                        <DollarSign className="h-4 w-4" />
                        <span>{book.price}</span>
                    </div>
                    <Link 
                        to={`/book/${book.id}`} 
                        className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                    >
                        <Info className="h-4 w-4" />
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');

    const genres = ['All', 'Classic', 'Science', 'History', 'Biography', 'Fiction', 'Fantasy', 'Philosophy'];

    const filteredBooks = useMemo(() => {
        return MOCK_BOOKS.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 book.author.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
            return matchesSearch && matchesGenre;
        });
    }, [searchQuery, selectedGenre]);

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16 max-w-3xl mx-auto">
                <div className="inline-block p-4 bg-indigo-50 rounded-3xl mb-6">
                    <Book className="h-10 w-10 text-indigo-600" />
                </div>
                <h1 className="text-6xl font-black text-gray-900 mb-8 tracking-tighter leading-none">BookCircle Library</h1>
                
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-[2rem] shadow-2xl shadow-indigo-100 border border-indigo-50">
                    <div className="relative flex-grow group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search by title or author..." 
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                            value={searchQuery}
                            onChange={e=>setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select 
                        className="px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-gray-600 cursor-pointer"
                        value={selectedGenre}
                        onChange={e=>setSelectedGenre(e.target.value)}
                    >
                        {genres.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
            </header>

            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredBooks.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-[3rem] shadow-xl border border-gray-50">
                    <div className="text-6xl mb-6">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-900">No books found matching your criteria</h3>
                    <button onClick={()=>{setSearchQuery(''); setSelectedGenre('All')}} className="mt-6 text-indigo-600 font-black hover:underline">Clear all filters</button>
                </div>
            )}

            <section className="mt-32 p-12 bg-indigo-600 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                    <Star className="h-12 w-12 text-yellow-400 mb-6 animate-pulse" />
                    <h2 className="text-4xl font-black text-white mb-6">Join the Community</h2>
                    <p className="text-xl text-indigo-100 mb-10 max-w-xl leading-relaxed">Borrow books, share reviews, and grow your knowledge with thousands of readers.</p>
                    <Link to="/register" className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/20">Sign Up Now</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
