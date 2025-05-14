import { useState } from 'react';

const useToast = () => {
  const [toasts, setToasts] = useState<{ id: number; message: string; type: string }[]>([]);

  const addToast = (message: string, type: string = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  return { toasts, addToast };
};

export default useToast;
