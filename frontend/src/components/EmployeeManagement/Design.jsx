import React from 'react';
import Tea1 from '@assets/Partnership/Lipton.png';
import Tea2 from '@assets/Partnership/TeaHouse.png';
import Tea3 from '@assets/Partnership/TeaLeaf.png';
import Tea4 from '@assets/Partnership/TeaLeafN.png';

const images = [
    { src: Tea1, alt: 'Tea1' },
    { src: Tea2, alt: 'Tea2' },
    { src: Tea3, alt: 'Tea3' },
    { src: Tea4, alt: 'Tea4' },
];

const Design = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            {/* Left Div */}
            <div className="flex-1 bg-white p-6 flex flex-col justify-center items-center text-2xl font-bold text-black rounded-lg h-[300px] text-center">
                <p>Partnership</p>
            </div>

            {/* Right Div */}
            <div className="flex-1 bg-white p-6 flex flex-col justify-center items-center text-xl font-bold text-black rounded-lg h-[300px]">
                <div className="flex flex-wrap justify-center  mt-0">
                    {images.map(({ src, alt }, index) => (
                        <div
                            key={index}
                            className="p-2 text-center rounded-lg transform transition-transform duration-2000 hover:scale-105 "
                        >
                            <img
                                src={src}
                                alt={alt}
                                className="w-full max-w-[100px] sm:max-w-[60px] md:max-w-[60px] lg:max-w-[60px] xl:max-w-[60px] h-auto mx-auto rounded-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Design;


















