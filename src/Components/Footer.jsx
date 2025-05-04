import React from "react";

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-2">Address: 123 Park Road, Cumilla, Bangladesh</p>
          <p className="mb-2">Phone: +8801515267655</p>
          <p>Email: contact@blooddonation.org</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <a href="#home" className="hover:underline">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="#about" className="hover:underline">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#donate" className="hover:underline">
                Donate Blood
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Subscribe to our Newsletter</h3>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full mb-4 text-gray-900"
            />
            <button
              type="submit"
              className="btn bg-white text-red-600 hover:bg-gray-200 w-full"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-red-400 pt-6 text-center">
        <p className="text-sm">© 2025 Blood Donation Organization. All Rights Reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              className="w-6 h-6"
            />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
              alt="Twitter"
              className="w-6 h-6"
            />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
              alt="Instagram"
              className="w-6 h-6"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
