'use client';

import { useState, useEffect } from 'react';
import './styles/customToast.css';

interface Toast {
  id: string;
  message: React.ReactNode;
  type: 'success' | 'error' | 'info';
}

const toastStore: {
  toasts: Toast[];
  subscribers: Map<string, (toasts: Toast[]) => void>;
  subscribe: (callback: (toasts: Toast[]) => void) => string;
  unsubscribe: (id: string) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
} = {
  toasts: [],
  subscribers: new Map(),
  subscribe(callback) {
    const id = Math.random().toString(36);
    this.subscribers.set(id, callback);
    return id;
  },
  unsubscribe(id) {
    this.subscribers.delete(id);
  },
  addToast(toast) {
    const id = Math.random().toString(36);
    const newToast = { ...toast, id };
    this.toasts.push(newToast);
    this.subscribers.forEach((callback) => callback(this.toasts));
    setTimeout(() => {
      this.removeToast(id);
    }, 3000);
  },
  removeToast(id) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.subscribers.forEach((callback) => callback(this.toasts));
  },
};

export function showToast(
  message: React.ReactNode,
  type: 'success' | 'error' | 'info' = 'success'
) {
  toastStore.addToast({ message, type });
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const id = toastStore.subscribe(setToasts);
    return () => toastStore.unsubscribe(id);
  }, []);

  return (
    <div className="custom-toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`custom-toast custom-toast-${toast.type}`}>
          <span className="toast-content">{toast.message}</span>
          <span className="toast-close" onClick={() => toastStore.removeToast(toast.id)}>
            ×
          </span>
        </div>
      ))}
    </div>
  );
}
