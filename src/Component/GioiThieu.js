// src/components/Book.js
import React from 'react';

const Book = ({ title, author, description }) => (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md md:max-w-2xl">
        <div className="md:flex">
            <div className="md:flex-shrink-0">
                <img
                    className="h-48 w-full object-cover md:h-full md:w-48"
                    src="https://via.placeholder.com/150"
                    alt="Book Cover"
                />
            </div>
            <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {author}
                </div>
                <p className="block mt-1 text-lg leading-tight font-medium text-black">
                    {title}
                </p>
                <p className="mt-2 text-gray-500">{description}</p>
            </div>
        </div>
    </div>
);

export default Book;
