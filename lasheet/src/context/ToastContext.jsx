import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message, duration) => addToast(message, 'success', duration);
  const showError = (message, duration) => addToast(message, 'error', duration);
  const showInfo = (message, duration) => addToast(message, 'info', duration);
  const showWarning = (message, duration) => addToast(message, 'warning', duration);

  const value = {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showInfo,
    showWarning
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};