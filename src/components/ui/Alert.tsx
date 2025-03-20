'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type AlertType = 'success' | 'danger' | 'info';

interface AlertProps {
    message: string;
    isVisible: boolean;
    type: AlertType;
    onClose?: () => void;
}

export const Alert = ({ message, isVisible, type = 'success', onClose }: AlertProps) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            onClose?.();
        }, 300);
    };

    const icons = {
        success: <CheckCircle className="w-5 h-5 mr-2" />,
        danger: <AlertCircle className="w-5 h-5 mr-2" />,
        info: <Info className="w-5 h-5 mr-2" />
    };

    const bgColors = {
        success: 'bg-green-500',
        danger: 'bg-red-500',
        info: 'bg-blue-500'
    };

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className={`${bgColors[type]} text-white px-4 py-3 flex items-center justify-center relative`}>
                {icons[type]}
                <span>{message}</span>
                {onClose && (
                    <button
                        onClick={handleClose}
                        className="absolute right-2 hover:opacity-75"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};