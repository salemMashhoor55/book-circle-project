import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulated Auth Logic
        setTimeout(() => {
            let role = 'Reader';
            let name = 'Reader User';
            let id = 201;
            
            if (email.includes('admin')) { 
                role = 'Admin'; 
                name = 'Admin User';
                id = 1;
            } else if (email.includes('owner')) { 
                role = 'Owner'; 
                name = 'John Doe';
                id = 101;
            }

            if (password === '123456') {
                const mockUser = { id, email, name, role };
                const mockToken = "mock_jwt_token_" + Date.now();
                login(mockUser, mockToken);
                
                toast.success(`Welcome back, ${name}!`);
                
                // Role-based redirect
                if (role === 'Admin') navigate('/admin');
                else if (role === 'Owner') navigate('/owner');
                else navigate('/dashboard');
            } else {
                setError('Invalid password. Try using 123456');
                toast.error('Authentication failed');
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 animate-fade-in">
            <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl shadow-indigo-100 border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-125"></div>
                
                <div className="relative z-10 text-center mb-10">
                    <div className="inline-block p-4 bg-indigo-600 rounded-2xl mb-6 shadow-xl shadow-indigo-200">
                        <LogIn className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
                    <p className="text-gray-500 mt-3 font-medium text-lg italic">Please sign in to continue</p>
                </div>

                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                                <Mail className="h-5 w-5" />
                            </div>
                            <input
                                type="email"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300 font-medium"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                                <Lock className="h-5 w-5" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300 font-medium"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-4 bg-rose-50 text-rose-600 rounded-2xl text-sm font-bold animate-pulse">
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="flex items-center justify-between text-sm px-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all" />
                            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                        </label>
                        <Link to="#" className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors">Forgot Password?</Link>
                    </div>

                    <button
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {isLoading ? (
                            <>
                                <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                Authenticating...
                            </>
                        ) : (
                            <>
                                <LogIn className="h-6 w-6" />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-gray-50 text-center relative z-10">
                    <p className="text-gray-500 font-medium">Don't have an account? <Link to="/register" className="text-indigo-600 font-black hover:text-indigo-800 transition-colors">Create Account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
