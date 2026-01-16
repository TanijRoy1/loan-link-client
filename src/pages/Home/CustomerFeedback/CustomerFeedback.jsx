import { FaQuoteLeft } from "react-icons/fa";
import MyContainer from "../../../components/MyContainer";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "motion/react";

const CustomerFeedback = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahim Uddin",
      comment:
        "The loan approval process was very smooth and fast. I loved how easily I could apply and track everything!",
    },
    {
      id: 2,
      name: "Sadia Khatun",
      comment:
        "Customer support was super helpful. Everything was transparent and straightforward.",
    },
    {
      id: 3,
      name: "Jahidul Islam",
      comment:
        "Excellent service! The EMI options made repayment much easier for me.",
    },
    {
      id: 4,
      name: "Mina Rani",
      comment:
        "LoanLink helped me start my small tailoring business. The process was simple and stress-free.",
    },
    {
      id: 5,
      name: "Shafikul Alam",
      comment:
        "Their agricultural microloan gave me the support I needed before harvest season. Truly life-changing!",
    },
    {
      id: 6,
      name: "Nusrat Jahan",
      comment:
        "I loved how clearly they explained interest rates and repayment plans. No hidden charges.",
    },
    {
      id: 7,
      name: "Tanvir Hasan",
      comment:
        "Great platform! Applying for an education loan was quick and the approval came faster than expected.",
    },
    {
      id: 8,
      name: "Kamrun Nahar",
      comment:
        "I was able to track my application status in real-time. Very user-friendly interface.",
    },
    {
      id: 9,
      name: "Abdul Malek",
      comment:
        "Their customer service team guided me through every step. Really trustworthy organization.",
    },
    {
      id: 10,
      name: "Shahida Akter",
      comment:
        "LoanLink made it possible for me to expand my small grocery shop. Highly recommended!",
    },
    {
      id: 11,
      name: "Rafiqul Islam",
      comment:
        "Very flexible repayment options. I never felt burdened during the loan period.",
    },
    {
      id: 12,
      name: "Sumi Akter",
      comment:
        "Fast service, honest support, and a smooth digital experience. I will definitely use LoanLink again.",
    },
  ];

  motion;

  return (
    <section className="py-16 bg-base-100">
      <MyContainer>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="sm:text-3xl text-2xl font-bold text-accent">Customer Feedback</h2>
          <p className="text-accent-content mt-2">
            Here's what our customers say about our service.
          </p>
        </motion.div>

        <div className="md:block hidden">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 30,
              stretch: "50%",
              depth: 200,
              modifier: 1,
              scale: 0.75,
              slideShadows: true,
            }}
            autoplay={{
              delay: 1100,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="mySwiper"
          >
            {testimonials.map((feedback) => (
              <SwiperSlide key={feedback.id}>
                <div
                  key={feedback.id}
                  className="p-6 bg-base-200 shadow rounded-xl border border-base-300 hover:shadow-lg transition duration-300 relative"
                >
                  <FaQuoteLeft className="text-3xl text-primary transform -translate-y-6.5" />

                  <p className="text-sm text-accent-content mb-4 mt-4">
                    {feedback.comment}
                  </p>

                  <h3 className="font-semibold text-accent text-right">
                    {feedback.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="md:hidden">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            coverflowEffect={{
              rotate: 30,
              stretch: "50%",
              depth: 200,
              modifier: 1,
              scale: 0.75,
              slideShadows: true,
            }}
            autoplay={{
              delay: 1100,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="mySwiper"
          >
            {testimonials.map((feedback) => (
              <SwiperSlide key={feedback.id}>
                <div
                  key={feedback.id}
                  className="p-6 bg-base-200 shadow rounded-xl border border-base-300 hover:shadow-lg transition duration-300 relative"
                >
                  <FaQuoteLeft className="text-3xl text-primary transform -translate-y-6.5" />

                  <p className="text-sm text-accent-content mb-4 mt-4">
                    {feedback.comment}
                  </p>

                  <h3 className="font-semibold text-accent text-right">
                    {feedback.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </MyContainer>
    </section>
  );
};

export default CustomerFeedback;
