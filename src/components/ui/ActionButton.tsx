import { Loader2 } from 'lucide-react';

interface ActionButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'outline' | 'grey';
    onClick?: () => void;
    isLoading?: boolean;
    className?: string;
    fullWidth?: boolean;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export const ActionButton = ({
    children,
    variant = 'primary',
    onClick,
    isLoading = false,
    className = '',
    fullWidth = false,
    type = 'button',
    disabled = false
}: ActionButtonProps) => {
    const baseStyles = "py-4 px-4 rounded-[2rem] font-medium transition-colors flex items-center justify-center";
    const widthStyles = fullWidth ? 'w-full' : 'w-auto';

    const variants = {
        primary: "bg-[#184193] text-white hover:bg-blue-700",
        outline: "border-2 border-[#184193] text-[#184193] hover:bg-blue-50",
        grey: "bg-gray-200 text-gray-800 hover:bg-gray-300"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading || disabled}
            className={`
                ${baseStyles}
                ${widthStyles}
                ${variants[variant]}
                ${isLoading || disabled ? 'opacity-70  cursor-not-allowed' : ''}
                ${className}
            `}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                </>
            ) : children}
        </button>
    );
};