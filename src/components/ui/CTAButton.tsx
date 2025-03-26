import Link from 'next/link';

interface CTAButtonProps {
    href: string;
    children: React.ReactNode;
}

export const CTAButton = ({ href, children }: CTAButtonProps) => {
    return (
        <Link 
            href={href} 
            className="bg-[#184193] text-white px-6 py-3 rounded-[2rem] inline-flex items-center group hover:bg-blue-700 transition-colors"
        >
            {children}
            <svg 
                className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
            </svg>
        </Link>
    );
};