import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
    title: string;
    image: string;
    href: string;
    className?: string;
}

export const CategoryCard = ({ title, image, href, className = '' }: CategoryCardProps) => {
    return (
        <Link href={href} className={`flex flex-col items-center justify-center relative ${className}`}>
            <div className="relative w-[145px] h-[145px] rounded-full overflow-hidden mb-3">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <h3 className="text-sm font-medium ">{title}</h3>
        </Link>
    );
};