import Image from 'next/image';
import React from 'react';

const notFound = () => {
    return (
           <div className="w-[90%] mx-auto">
      <Image
        src="https://getpublii.com/docs/media/posts/30/404-error-page.png"
        width={500}
        height={500}
        alt="not found page"
        className="w-full"
      />
    </div>
    );
};

export default notFound;