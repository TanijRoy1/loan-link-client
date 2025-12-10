import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import MyContainer from "../../components/MyContainer";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const [messageLoading, setMessageLoading] = useState(false);

  const CONTACT = {
    address: "House 12, Road 5, Dhanmondi, Dhaka, Bangladesh",
    phone: "+8801712345678",
    email: "support@loanlink.com",
    hours: "Mon - Fri: 9:00 AM - 6:00 PM",
  };

  const handleSendMessage = (data) => {
    // console.log(data);
    setMessageLoading(true);
    axiosPublic.post("/messages", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Message sent — we'll contact you soon.",
          showConfirmButton: false,
          timer: 1500,
        });
        setMessageLoading(false);
        reset();
      }
    });
  };
  return (
    <section className="py-12 bg-base-100">
      <MyContainer>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent">Contact Us</h1>
          <p className="text-accent-content max-w-2xl mx-auto mt-2">
            Have a question about LoanLink, need support with an application, or
            want to partner with us? Fill the form below or use the contact
            details — we’ll get back to you within 1-2 business days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="p-6 bg-base-200 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-accent mb-4">
                Get in touch
              </h3>

              <div className="flex items-start gap-3 mb-4">
                <div className="text-primary mt-1">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <div className="text-sm text-muted">Address</div>
                  <div className="text-accent-content text-sm">
                    {CONTACT.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="text-primary mt-1">
                  <FaPhoneAlt />
                </div>
                <div>
                  <div className="text-sm text-muted">Phone</div>
                  <a className="text-accent-content text-sm link">
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="text-primary mt-1">
                  <FaEnvelope />
                </div>
                <div>
                  <div className="text-sm text-muted">Email</div>
                  <a className="text-accent-content text-sm link">
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-primary mt-1">
                  <FaClock />
                </div>
                <div>
                  <div className="text-sm text-muted">Hours</div>
                  <div className="text-accent-content text-sm">
                    {CONTACT.hours}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-base-200 rounded-lg shadow text-center">
              <h4 className="font-semibold text-accent mb-3">Follow us</h4>
              <div className="flex items-center justify-center gap-4 text-accent-content">
                <a href="#" className="hover:text-primary">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-primary">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-primary">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="p-6 bg-base-100 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-accent mb-4">
                Send us a message
              </h3>

              <form
                onSubmit={handleSubmit(handleSendMessage)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Name</label>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      className="input w-full"
                      placeholder="Your name"
                    />
                    {errors.name?.type === "required" && (
                      <p className="text-red-500 text-sm">Name is required</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+\.\S+$/,
                      })}
                      className="input w-full"
                      placeholder="your@email.com"
                    />
                    {errors.email?.type === "required" && (
                      <p className="text-red-500 text-sm">Email is required</p>
                    )}
                    {errors.email?.type === "pattern" && (
                      <p className="text-red-500 text-sm">
                        Enter a valid email
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="label">Subject</label>
                  <input
                    type="text"
                    {...register("subject", { required: true })}
                    className="input w-full"
                    placeholder="Short summary"
                  />
                  {errors.subject?.type === "required" && (
                    <p className="text-red-500 text-sm">Subject is required</p>
                  )}
                </div>

                <div>
                  <label className="label">Message</label>
                  <textarea
                    {...register("message", { required: true })}
                    className="textarea w-full"
                    rows={6}
                    placeholder="Write your message"
                  />
                  {errors.message?.type === "required" && (
                    <p className="text-red-500 text-sm">Message is required</p>
                  )}
                </div>

                <div>
                  <button type="submit" className="btn btn-primary">
                    {messageLoading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-accent-content">
          <p>
            Prefer phone? Call us during business hours or email{" "}
            <a className="link">{CONTACT.email}</a>.
          </p>
        </div>
      </MyContainer>
    </section>
  );
};

export default Contact;
