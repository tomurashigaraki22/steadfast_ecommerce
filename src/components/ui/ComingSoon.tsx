import Link from "next/link";
import { Button } from "./Button";

interface ComingSoonProps {
  buttonText: string;
  buttonLink: string;
}

export const ComingSoon = ({ buttonText, buttonLink }: ComingSoonProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          We're working hard to bring you something amazing. Stay tuned!
        </p>
        <div className="pt-4">
          <Link href={buttonLink}>
            <Button variant="primary">{buttonText}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};