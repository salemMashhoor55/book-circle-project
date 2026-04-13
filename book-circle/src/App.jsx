import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import BookDetails from './pages/BookDetails';
import Unauthorized from './pages/Unauthorized';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import { BookOpen } from 'lucide-react';

const App = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50/30">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<div className="text-center py-40 font-black text-5xl text-indigo-200 animate-pulse tracking-tighter">Coming Soon...</div>} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    
                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute allowedRoles={['Admin']}><AdminDashboard /></ProtectedRoute>} />
                    <Route path="/owner" element={<ProtectedRoute allowedRoles={['Owner']}><OwnerDashboard /></ProtectedRoute>} />
                    
                    {/* Catch all redirect */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <footer className="bg-white border-t border-gray-50 py-12 px-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <BookOpen className="h-6 w-6 text-indigo-600" />
                    <span className="text-xl font-black text-gray-900 tracking-tight">BookCircle</span>
                </div>
                <p className="text-gray-400 font-medium max-w-md mx-auto mb-8">A comprehensive React project built with modern practices and a professional role-based architecture.</p>
                <div className="flex justify-center gap-6 mb-10">
                    <a href="#" className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">FB</a>
                    <a href="#" className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">TW</a>
                    <a href="#" className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">IG</a>
                </div>
                <p className="text-sm font-bold text-gray-300 uppercase tracking-widest">&copy; 2026 BookCircle Team. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
