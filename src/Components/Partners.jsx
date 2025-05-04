import React from "react";
import Marquee from "react-fast-marquee";

const Partners = () => {
    const links = [
        { img: "https://i.ibb.co/tTkXtQR5/1-min.png" },
        { img: "https://i.ibb.co/20Yp697X/2-min.png" },
        { img: "https://i.ibb.co/M52ycLfV/3-min.png" },
        { img: "https://i.ibb.co/HpBcLH0g/4-min.png" },
        { img: "https://i.ibb.co/h17V4n4b/5-min.png" },
        { img: "https://i.ibb.co/FL97mhtz/6-min.png" },
    ];

    return (
        <div id="ovv" className="container mx-auto py-16 overflow-hidden">
            <h2 className="text-center mb-5 text-3xl md:text-5xl font-bold text-gray-800">
            Together We Save Lives
            </h2>
            <Marquee className="flex items-center">
                {links.map((logo, index) => (
                    <div key={index} className="w-32 h-16 flex justify-center items-center mx-4">
                        <img src={logo.img} alt={`Hospital Logo ${index + 1}`} className="h-full object-contain" />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default Partners;
