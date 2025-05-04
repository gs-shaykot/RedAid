import React from 'react';
import { useLocation } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import auth from '../Provider/firebase';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get('email') || '';

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    sendPasswordResetEmail(auth, emailFromQuery || email)
      .then(() => {
        Swal.fire({
          title: "Success",
          text: `Password reset email sent to: ${email}`,
          icon: "success"
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: `Password reset failed: ${error.message}`,
          icon: "warning"
        });
      });
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-12 justify-items-end">
          {/* Image Section */}
          <div className="order-2 lg:order-first text-center lg:text-left">
            <img src="https://i.ibb.co.com/23yZhD5b/blood-donation-concept-illustration-vector-removebg-preview-min.png" alt="Blood Donation" />
          </div>

          {/* Forgot Password Form */}
          <div className="card bg-base-100 w-11/12 shadow-2xl mt-20 md:mt-0">
            <form className="card-body pb-0" onSubmit={handleForgotPassword}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={emailFromQuery}
                  placeholder="Enter your email"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6 pb-5">
                <button
                  type="submit"
                  className="btn btn-primary bg-red-600 hover:bg-[#b91c1c] text-white border-0"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
