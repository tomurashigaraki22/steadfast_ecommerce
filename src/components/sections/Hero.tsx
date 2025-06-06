import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const Hero = () => {
    const router = useRouter();
    return (
        <section className="relative py-[2.5rem] md:py-[7rem]">
            <div className="absolute inset-0">
                <Image
                    src="/hero.png"
                    alt="Hero background"
                    fill
                    className="object-cover brightness-50"
                    priority
                />
            </div>

            <div className="relative h-full flex items-center">
                <div className="container mx-auto flex items-center justify-center text-center px-[1.5rem] md:px-4">
                    <div className="max-w-2xl " >
                        <h1 className="text-2xl md:text-5xl font-bold text-white mb-4 ">
                            Transform Your Space with the Perfect Glow
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 ">
                            Explore premium chandeliers, modern lightning and outdoor brilliance.
                            Elevate your home with quality lighting solutions.
                        </p>
                        <div className="flex justify-center items-center">
                            <button onClick={() => router.replace('/products')} className="bg-[#184193] text-white px-6 md:px-[2rem] text-base py-3 md:py-4 rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-colors ">
                                <span className='md:hidden'>Shop Now</span>
                                <span className='hidden md:flex'>Explore Categories</span>
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <button className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <ChevronLeft size={50} />
            </button>
            <button className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <ChevronRight size={50} />
            </button>
        </section>
    );
};