import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShieldCheck, UserCog, Mail } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div className="max-w-7xl mx-auto py-20 px-4 text-center animate-fade-in">
            <header className="mb-20">
                <div className="inline-block p-6 bg-indigo-50 rounded-[2.5rem] mb-10 shadow-xl shadow-indigo-100 animate-bounce">
                    <LayoutDashboard className="h-16 w-16 text-indigo-600" />
                </div>
                <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tighter leading-none">General Dashboard</h1>
                <p className="text-2xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed italic">Welcome to your personal space where you can track your activities and reading progress.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
                <div className="p-10 bg-white rounded-[3rem] shadow-2xl shadow-indigo-50 border border-gray-50 flex flex-col items-center group hover:-translate-y-4 transition-all duration-500">
                    <div className="h-20 w-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 mb-8 shadow-xl shadow-emerald-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                        <UserCog className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Personal Info</h3>
                    <p className="text-gray-500 font-medium mb-8">Update your profile details and change your account settings.</p>
                    <button className="mt-auto w-full py-4 bg-gray-50 text-gray-700 rounded-2xl font-black text-lg hover:bg-emerald-600 hover:text-white transition-all shadow-lg shadow-gray-100 group-hover:shadow-emerald-100">Edit Profile</button>
                </div>

                <div className="p-10 bg-indigo-600 rounded-[3rem] shadow-2xl shadow-indigo-200 flex flex-col items-center group hover:-translate-y-4 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-bl-full -mr-16 -mt-16 opacity-20"></div>
                    <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
                        <Mail className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Notifications</h3>
                    <p className="text-indigo-100 font-medium mb-8">Check your latest borrow requests and messages from the community.</p>
                    <button className="mt-auto w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/20">View Inbox</button>
                </div>

                <div className="p-10 bg-white rounded-[3rem] shadow-2xl shadow-indigo-50 border border-gray-50 flex flex-col items-center group hover:-translate-y-4 transition-all duration-500 lg:col-span-1 md:col-span-2 lg:col-auto">
                    <div className="h-20 w-20 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-600 mb-8 shadow-xl shadow-amber-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                        <ShieldCheck className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">My Borrowings</h3>
                    <p className="text-gray-500 font-medium mb-8">Manage your active book borrowings and history.</p>
                    <button className="mt-auto w-full py-4 bg-gray-50 text-gray-700 rounded-2xl font-black text-lg hover:bg-amber-500 hover:text-white transition-all shadow-lg shadow-gray-100 group-hover:shadow-amber-100">Manage Orders</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
