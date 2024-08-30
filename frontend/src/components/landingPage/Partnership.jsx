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

const Partnership= () => {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            {/* Left Div */}
            <div className="flex-1 bg-white p-6 flex flex-col pt-24 items-center text-3xl font-bold text-black rounded-lg h-[300px] text-center">
                <p><span className='text-color_extra'>Tea</span> Partners</p>
            </div>

            {/* Right Div */}
            <div className="flex-1 bg-white p-6 flex flex-col justify-center items-center text-xl font-bold text-black rounded-lg h-[300px]">
                <div className="flex flex-wrap justify-center  mt-0">
                    {images.map(({ src, alt }, index) => (
                        <div
                            key={index}
                            className="p-2 text-center rounded-lg transform transition-transform duration-2000 hover:scale-110 "
                        >
                            <img
                                src={src}
                                alt={alt}
                                className="w-full max-w-[100px] sm:max-w-[90px] md:max-w-[90px] lg:max-w-[90px] xl:max-w-[90px] h-auto mx-auto rounded-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partnership;