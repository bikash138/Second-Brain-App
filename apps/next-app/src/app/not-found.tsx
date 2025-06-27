import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
      <div className="bg-gray-900/80 rounded-2xl shadow-xl p-10 flex flex-col items-center">
        <h1 className="text-6xl font-extrabold text-purple-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="mb-6 text-gray-300">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-purple-600 hover:bg-pink-600 text-white font-semibold rounded-full shadow transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}