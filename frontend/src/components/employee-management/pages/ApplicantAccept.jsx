// import emailjs from '@emailjs/browser';
import React, { useRef } from "react";

const ApplicantAccept = () => {
  // service_epnyrmu
  // template_5terzkg
  // VcIPCgm20crdairl7

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // emailjs
    //   .sendForm("service_epnyrmu", "template_5terzkg", form.current, {
    //     publicKey: "VcIPCgm20crdairl7",
    //   })
    //   .then(
    //     () => {
    //       console.log("SUCCESS!");
    //       alert("Email sent successfully!");
    //     },
    //     (error) => {
    //       console.log("FAILED...", error.text);
    //       alert("Email failed to send!");
    //     }
    //   );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Applicant Status</h1>

      <form className="space-y-4" ref={form} onSubmit={sendEmail}>
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            required
            type="text"
            name="user_name"
            placeholder="Enter your name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            required
            type="text"
            name="user_email"
            placeholder="Enter your email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Message Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <input
            required
            type="text"
            name="message"
            placeholder="Enter your message"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicantAccept;
