import { useEffect } from 'react';

export default function Toast({ message, type = 'error', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    error: 'bg-red-50 border-red-500 text-red-800',
    success: 'bg-green-50 border-green-500 text-green-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800',
  };

  const icons = {
    error: '❌',
    success: '✅',
    info: 'ℹ️',
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border-l-4 shadow-lg max-w-sm ${styles[type]} animate-slideDown`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{icons[type]}</span>
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}