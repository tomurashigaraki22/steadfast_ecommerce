import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
    items: {
        label: string;
        href?: string;
    }[];
    className?: string;
}

export const Breadcrumb = ({ items, className = 'pb-5  md:py-8' }: BreadcrumbProps) => {
    return (
        <div className={`flex ${className}`}>
            <nav className="inline-flex items-center flex-wrap gap-2 py-2 text-sm md:px-4 md:bg-[#EDF0F8] rounded-lg">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center">
                        {index > 0 && (
                            <ChevronRight className="w-4 h-4 mx-2 text-gray-400 shrink-0" />
                        )}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-[#151515] hover:text-gray-900 break-words"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-[#184193] font-medium break-words">
                                {item.label}
                            </span>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};