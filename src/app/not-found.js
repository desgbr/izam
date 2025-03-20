import Link from 'next/link';
import React from 'react'

export default function NotFound() {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center dark:bg-gray-900">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl dark:text-gray-700">
          404
        </h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500 dark:text-gray-400">
          We can&aspo;t find that page.
        </p>

        <Link
          href="/"
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-green-600 rounded-sm hover:bg-grreen-700 focus:ring-3 focus:outline-hidden"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};