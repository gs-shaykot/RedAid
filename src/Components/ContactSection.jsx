import React from "react";

const ContactSection = () => {
  return (
    <div className="bg-red-50">
        <section className="container mx-auto  flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12 ">
          {/* Contact Form */}
          <div className="lg:w-1/2 w-full p-6 lg:p-12 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Contact Us</h2>
            <form>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  placeholder="Enter your message"
                  className="textarea textarea-bordered w-full h-32"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn bg-red-600 hover:bg-red-700 text-white w-full"
              >
                Submit
              </button>
            </form>
          </div>
          {/* Illustration */}
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0 flex justify-center">
            <img
              src="https://i.ibb.co/0CSbNyb/Pngtree-doctor-and-donation-of-the-6288026.png"
              alt="Doctor and Blood Donation Illustration"
              className="w-10/12"
            />
          </div>
        </section>
    </div>
  );
};

export default ContactSection;
