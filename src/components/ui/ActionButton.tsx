import { Loader2, Plus } from 'lucide-react';
 
interface ActionButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'outline' | 'grey';
    onClick?: () => void;
    isLoading?: boolean;
    className?: string;
    fullWidth?: boolean;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    isCart?: boolean;
}

export const ActionButton = ({
    children,
    variant = 'primary',
    onClick,
    isLoading = false,
    className = '',
    fullWidth = false,
    type = 'button',
    disabled = false,
    isCart = false
}: ActionButtonProps) => {
 
    const baseStyles = "py-2 px-2 text-xs md:text-sm rounded-[2rem] font-medium transition-all duration-300 flex items-center justify-center relative overflow-hidden";
    const widthStyles = fullWidth ? 'w-full' : 'w-auto';

    const variants = {
        primary: "border-2  border-[#184193] bg-[#184193] text-white hover:bg-[#0F3071]",
        outline: "border-2 border-[#184193] text-[#184193] hover:bg-blue-50",
        grey: "bg-gray-200 text-gray-800 hover:bg-gray-300"
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isCart && variant === 'primary') {
             const button = document.createElement('div');
            button.className = 'fixed z-50';
            button.innerHTML = `<div class="text-white"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div>`;
            
            const rect = e.currentTarget.getBoundingClientRect();
            button.style.left = `${rect.left + rect.width / 2 - 12}px`;
            button.style.top = `${rect.top + rect.height / 2 - 12}px`;
            
            document.body.appendChild(button);
            
            button.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: 'translate(100vw, -50vh) scale(0.5)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => {
                button.remove();
            };
        }
        onClick?.();
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={isLoading || disabled}
            className={`
                ${baseStyles}
                ${widthStyles}
                ${variants[variant]}
                ${isLoading || disabled ? 'opacity-70 cursor-not-allowed' : ''}
                ${className}
            `}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                </>
            ) : (
                <>
                    {isCart && (
                        <Plus 
                            className="md:hidden w-4 h-4 mr-2 transition-transform duration-500 animate-slide-right" 
                        />
                    )}
                    {children}
                </>
            )}
        </button>
    );
};