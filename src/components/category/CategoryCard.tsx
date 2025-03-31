import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
    name: string;
    image: string;
    slug: string;
    className?: string;
    id: string; // Add id to props
}

export const CategoryCard = ({ name, image, slug, className = '', id }: CategoryCardProps) => {
    // Generate deterministic image number based on category id
    console.log(image)
    const imageNumber = parseInt(id.replace(/\D/g, '')) % 10 + 1;
    const imagePath = `/product${imageNumber}.png`;

    return (
        <Link href={'/products/category/' + slug} className={`flex flex-col items-center justify-center relative ${className}`}>
            <div className="relative w-[145px] h-[145px] rounded-full overflow-hidden mb-3">
                <Image
                    src={imagePath}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <h3 className="text-sm font-medium ">{name}</h3>
        </Link>
    );
};