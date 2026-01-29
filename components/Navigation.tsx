
import React from 'react';
import { AppView } from '../types';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { view: AppView.DASHBOARD, icon: 'fa-house', label: 'Explore' },
    { view: AppView.IMAGE_STUDIO, icon: 'fa-image', label: 'Image' },
    { view: AppView.VIDEO_STUDIO, icon: 'fa-video', label: 'Video' },
    { view: AppView.UPLOAD_CENTER, icon: 'fa-upload', label: 'Upload' },
    { view: AppView.PROFILE, icon: 'fa-user', label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg glass border border-white/10 rounded-[2rem] px-6 py-4 z-50 shadow-2xl shadow-black/50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              currentView === item.view ? 'text-[#d4ff3f]' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg`}></i>
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
