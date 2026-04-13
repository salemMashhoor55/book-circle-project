import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight } from 'lucide-react';

const Unauthorized = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-gray-50/50">
            <div className="max-w-2xl w-full text-center p-12 bg-white rounded-[3rem] shadow-2xl shadow-rose-100 border border-rose-50 animate-fade-in">
                <div className="inline-block p-6 bg-rose-50 rounded-full mb-10 shadow-xl shadow-rose-100 animate-pulse">
                    <ShieldAlert className="h-16 w-16 text-rose-600" />
                </div>
                
                <h1 className="text-8xl font-black text-rose-100 mb-4 tracking-tighter">403</h1>
                <h2 className="text-4xl font-black text-gray-900 mb-6">Unauthorized Access</h2>
                
                <p className="text-xl text-gray-500 mb-12 max-w-lg mx-auto font-medium leading-relaxed italic">
                    Sorry, you don't have the required permissions to access this page. Please contact an administrator or return to the home page.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                        to="/" 
                        className="flex items-center gap-3 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98]"
                    >
                        Back to Home
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link 
                        to="/login" 
                        className="flex items-center gap-3 bg-gray-50 text-gray-700 px-10 py-4 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all"
                    >
                        Sign Out & Switch Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
