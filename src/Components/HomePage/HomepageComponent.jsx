import React, { useEffect, useRef, useState } from "react";
import MainVideo from "../../Images/Kotilinga Temple Renders.mp4";
import { BsFire } from "react-icons/bs";
import { HiMoon } from "react-icons/hi";
import { FaFire } from "react-icons/fa";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Shiva from "../../Images/lord-shiva.jpg";
import ShivaLinga from "../../Images/shiva-linga.jpg";
import TempleSignificance from "../../Images/freepik__dolly-zoom-a-beautifully-adorned-shiva-lingam-sits__93543.mp4";
import Image1 from "../../Images/Kotilinga Temple Renders-6.jpg";
import Image2 from "../../Images/Kotilinga Temple Renders-31.jpg";
import Image3 from "../../Images/Kotilinga Temple Renders-34.jpg";
import donationImg from "../../Images/Kotilinga Temple Renders-2.jpg"; // Replace with your image path
import Footer from '../../Components/Footer/Footer'; 

// import Image4 from "../../Images/Kotilinga Temple Renders-34.jpg"

import "./HomepageComponent.css";

function HomepageComponent() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [Image1, Image2, Image3];

  return (
    <div
      className="main-container"
      style={{ backgroundImage:` url(${donationImg})` }}
    >
      <div className="homepage-container">
        <video autoPlay loop muted className="video-bg">
          <source src={MainVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="video-overlay"></div>

        <div className="video-content">
          <h1 className="video-heading">Welcome To</h1>

          <h1 className="video-title">
            Sri Shaktipeetha Koti Linga <br className="break" /> Kshethram
          </h1>

          <p className="video-subtitle">
            A Divine Abode of Lord Shiva – Experience the Eternal Blessings
          </p>
          <button className="donate-button">Donate Now</button>
        </div>
      </div>

      <div className="cards-container section">
        <div className="homepage-wrapper">
          {/* <div className="info-cards-wrapper-container"> */}
          <div className="info-cards">
            <InfoCard
              icon={
                <BsFire
                  className="text-orange-400 w-6 h-6"
                  style={{ fontSize: "50px", color: "#fb8f2c" }}
                />
              }
              title="Spiritual Landmark"
              description="Largest collections of Shiva Lingas in the world."
            />
            <InfoCard
              icon={
                <HiMoon
                  className="text-orange-400 w-6 h-6"
                  style={{ fontSize: "50px", color: "#fb8f2c" }}
                />
              }
              title="Authentic Vedic Practices"
              description="Daily rituals and ceremonies."
            />
            <InfoCard
              icon={
                <FaFire
                  className="text-orange-400 w-6 h-6"
                  style={{ fontSize: "50px", color: "#fb8f2c" }}
                />
              }
              title="Serene Environment"
              description="A perfect retreat for meditation, yoga, and spiritual growth."
            />
          </div>

          <div className="about-section">
            <img src={Shiva} alt="Shiva" className="shiva-image" />
          </div>
          {/* </div> */}

          <div className="about-section about-section-sub-container">
            <p className="highlight">About</p>
            <h2>Experience the Eternal Blessings!</h2>
            <p>
              At Sri Shaktipeetha Koti Linga Kshethram, we believe in fostering
              a deep spiritual connection with Lord Shiva through ancient
              rituals, Vedic practices, and devotional services. Our temple is
              home to a million Shiva Lingas, each installed with sacred prayers
              and divine energy. Our mission is to provide a serene space for
              devotees to meditate, seek blessings, and experience the ultimate
              connection with the divine.
            </p>
            <button>Learn More</button>
          </div>
        </div>

        <div className="contact-grid">
          <ContactInfo
            className="contact-individual-card"
            number="01"
            title="Location"
            content="2972 Westheimer Rd. Santa Ana, Illinois 85486"
          />
          <ContactInfo number="02" title="Phone" content="(303) 555-0105" />
          <ContactInfo number="03" title="Email" content="mail@example.com" />
          <ContactInfo
            number="04"
            title="Working Hours"
            content={`Mon - Sun\n12.00pm - 01.00am`}
          />
        </div>
      </div>

      <div className="temple-homepage-container">
        <video autoPlay loop muted className="video-bg">
          <source src={TempleSignificance} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="video-overlay"></div>

        <div className="temple-video-content temple-video-content-container">
          <h1 className="temple-video-title">Temple Significance</h1>

          <p className="video-subtitle">
            A Million Shiva Lingas: Witness the grandeur of Koti Lingas,
            symbolizing eternity and infinite power.
          </p>
        </div>
      </div>

      <div className="transparent-container">
        <h1>Har Har Mahadev! Let devotion lead the way. 🙏</h1>
      </div>

      <div className="carousel-main-container">
        <div className="carousel-container">
          <Slider {...settings}>
            {images.map((img, index) => (
              <div key={index} className="carousel-slide">
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="carousel-image"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <WhyUsSection />
      <Footer/>
    </div>
  );
}

const InfoCard = ({ icon, title, description }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Optional: stop observing once visible
        }
      },
      {
        threshold: 0.3, // Adjust as needed
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`info-card-container ${isVisible ? "visible" : ""}`}
    >
      {icon}
      <div className="info-card-sub-container">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

const ContactInfo = ({ number, title, content }) => (
  <div className="contact-card">
    <h6>{number}</h6>
    <h4>{title}</h4>
    <p>{content}</p>
  </div>
);

export default HomepageComponent;

const WhyUsSection = () => {
  return (
    <section className="whyus-section">
      <div className="whyus-container">
        <div className="whyus-image">
          <img src={ShivaLinga} alt="Shiva Linga Donation" />
        </div>
        <div className="whyus-content">
          <h4 className="whyus-subtitle">Why Us</h4>
          <h2 className="whyus-title">
            Offer your support to the divine. Donate now and be blessed!
          </h2>
          <p className="whyus-description">
            Your generous donation helps preserve our sacred traditions,
            maintain the temple premises, and support daily rituals and
            community services. Every contribution, big or small, makes a
            difference.
          </p>
          <ul className="whyus-list">
            <li>✔ A Divine Experience</li>
            <li>✔ Daily Pujas & Special Events</li>
            <li>✔ Community & Seva</li>
          </ul>
        </div>
      </div>
    </section>

  );
};