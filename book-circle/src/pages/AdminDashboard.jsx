import { useState, useEffect } from 'react';
import { MOCK_USERS, MOCK_BOOKS } from '../services/api';
import { UserCheck, BookOpen, ShieldCheck, XCircle, CheckCircle, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [owners, setOwners] = useState([]);
    const [pendingBooks, setPendingBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            // Filter owners and some mock pending books
            setOwners(MOCK_USERS.filter(u => u.role === 'Owner'));
            setPendingBooks(MOCK_BOOKS.slice(0, 3)); 
        } catch (error) {
            console.error("Error loading admin data:", error);
            toast.error("Failed to load dashboard data");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleApproveOwner = (id) => {
        setOwners(owners.map(o => o.id === id ? { ...o, status: 'Approved' } : o));
        toast.success('Owner account approved successfully!');
    };

    const handleRejectOwner = (id) => {
        setOwners(owners.filter(o => o.id !== id));
        toast.error('Owner account rejected');
    };

    const handleApproveBook = (id) => {
        setPendingBooks(pendingBooks.filter(b => b.id !== id));
        toast.success('Book post approved and published!');
    };

    const handleRejectBook = (id) => {
        setPendingBooks(pendingBooks.filter(b => b.id !== id));
        toast.error('Book post rejected');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 animate-fade-in">
            <div className="mb-16">
                <h1 className="text-6xl font-black text-gray-900 tracking-tighter mb-4">Central Admin Control</h1>
                <p className="text-xl text-gray-500 font-medium italic uppercase tracking-widest">
                    Welcome back, {user?.name || 'Admin'}
                </p>
                <p className="text-gray-400 mt-2">Oversee platform safety, validate owners, and curate high-quality content.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Owners Approval Section */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-4 bg-indigo-50 rounded-[1.5rem] shadow-sm">
                            <UserCheck className="h-8 w-8 text-indigo-600" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 tracking-tight">Owner Applications</h2>
                    </div>
                    
                    <div className="space-y-6">
                        {owners?.map(owner => (
                            <div key={owner.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex items-center justify-between group hover:border-indigo-100 transition-all">
                                <div>
                                    <h4 className="text-xl font-black text-gray-900 mb-1">{owner.name}</h4>
                                    <p className="text-sm text-gray-400 font-bold">{owner.email}</p>
                                    <span className={`text-[10px] font-black uppercase tracking-widest mt-4 inline-block px-3 py-1 rounded-full ${
                                        owner.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                        {owner.status}
                                    </span>
                                </div>
                                {owner.status === 'Pending' && (
                                    <div className="flex gap-3">
                                        <button onClick={()=>handleRejectOwner(owner.id)} className="p-4 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition-all shadow-sm" title="Reject Application">
                                            <XCircle className="h-6 w-6" />
                                        </button>
                                        <button onClick={()=>handleApproveOwner(owner.id)} className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-all shadow-sm" title="Approve Application">
                                            <CheckCircle className="h-6 w-6" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Content Approval Section */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-4 bg-amber-50 rounded-[1.5rem] shadow-sm">
                            <BookOpen className="h-8 w-8 text-amber-600" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 tracking-tight">Pending Book Posts</h2>
                    </div>

                    <div className="space-y-6">
                        {pendingBooks?.length > 0 ? pendingBooks.map(book => (
                            <div key={book.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex gap-8 group relative hover:border-amber-100 transition-all">
                                <img src={book.cover} className="w-20 h-32 object-cover rounded-xl shadow-lg" alt="" />
                                <div className="flex-grow flex flex-col justify-center">
                                    <h4 className="text-xl font-black text-gray-900 line-clamp-1 mb-1 leading-tight">{book.title}</h4>
                                    <p className="text-xs text-gray-400 font-bold mb-6 italic uppercase tracking-wider">Submitted by: {book.ownerName || 'Unknown'}</p>
                                    <div className="flex gap-3">
                                        <button onClick={()=>handleApproveBook(book.id)} className="flex-grow text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 py-3 rounded-xl hover:bg-emerald-100 transition-all shadow-sm">Approve Post</button>
                                        <button onClick={()=>handleRejectBook(book.id)} className="text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-6 py-3 rounded-xl hover:bg-rose-100 transition-all shadow-sm">Reject</button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="bg-gray-50 border-2 border-dashed border-gray-200 p-12 rounded-[3rem] text-center">
                                <p className="text-gray-400 font-bold italic text-lg">No pending books to review.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
