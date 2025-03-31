import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
    name: string;
    image: string;
    slug: string;
    className?: string;
}

export const CategoryCard = ({ name, image, slug, className = '' }: CategoryCardProps) => {
    return (
        <Link href={'/products/category/' + slug} className={`flex flex-col items-center justify-center relative ${className}`}>
            <div className="relative w-[145px] h-[145px] rounded-full overflow-hidden mb-3">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <h3 className="text-sm font-medium ">{name}</h3>
        </Link>
    );
};