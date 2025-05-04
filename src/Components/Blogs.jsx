import React from 'react';

const BlogsCard = () => {
    const cardData = [
        {
            image: 'https://i.ibb.co.com/XWbDrX9/image.jpg', // Replace with your actual image path
            title: 'Start Your RapidPass',
            description:
                'Donating blood today? Complete your pre-reading and health history questions online using any device, before visiting your blood drive location.',
            buttonText: 'START NOW',
        },
        {
            image: 'https://i.ibb.co.com/1sKy0jh/image.jpg', // Replace with your actual image path
            title: 'Am I Eligible to Donate Blood?',
            description:
                'Are you eligible for blood donation? Find out about the eligibility requirements to donate blood today. Learn about general health, travel, medications, tattoos, and more.',
            buttonText: 'LEARN MORE ABOUT ELIGIBILITY',
        },
        {
            image: 'https://i.ibb.co.com/djz7r7j/sc-hp-image-v2-copy-jpg-img.jpg', // Replace with your actual image path
            title: 'Help Sickle Cell Patients',
            description:
                'Blood donors who are Black play a critical role in helping sickle cell disease patients receive the most compatible blood match. Donors needed to meet this urgent need.',
            buttonText: 'LEARN MORE ABOUT SICKLE CELL',
        },
    ];

    return (
        <div className='container mx-auto'>
            <h2 className=" text-center pt-0 py-5 mb-5 text-3xl md:text-5xl font-bold text-gray-800">
                Recent Blogs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className="border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <img
                            src={card.image}
                            alt={card.title}
                            className="w-full object-fill rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                            <p className="text-gray-600 mb-4">{card.description}</p>
                            <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                                {card.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogsCard;
