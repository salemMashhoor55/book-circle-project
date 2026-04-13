import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, BookOpen, LayoutDashboard, Settings, UserCircle, ShieldCheck } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isPathActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2">
                            <BookOpen className="h-8 w-8 text-indigo-600" />
                            <span className="text-2xl font-black text-gray-900 tracking-tight">BookCircle</span>
                        </Link>
                        
                        <div className="hidden md:flex items-center gap-1">
                            <Link 
                                to="/" 
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    isPathActive('/') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                Home
                            </Link>
                            {isAuthenticated && (
                                <>
                                    <Link 
                                        to="/dashboard" 
                                        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                                            isPathActive('/dashboard') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        Dashboard
                                    </Link>
                                    {user.role === 'Owner' && (
                                        <Link 
                                            to="/owner" 
                                            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                                                isPathActive('/owner') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                        >
                                            <Settings className="h-4 w-4" />
                                            My Books
                                        </Link>
                                    )}
                                    {user.role === 'Admin' && (
                                        <Link 
                                            to="/admin" 
                                            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                                                isPathActive('/admin') ? 'bg-red-50 text-red-700' : 'text-red-500 hover:bg-red-50'
                                            }`}
                                        >
                                            <ShieldCheck className="h-4 w-4" />
                                            Admin Panel
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4 pl-4 border-l border-gray-100">
                                <div className="hidden lg:flex flex-col items-end">
                                    <span className="text-sm font-bold text-gray-900 leading-none">{user.name}</span>
                                    <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider mt-1">{user.role}</span>
                                </div>
                                <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700">
                                    <User className="h-6 w-6" />
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900">Login</Link>
                                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
