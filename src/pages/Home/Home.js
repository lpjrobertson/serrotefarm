import React, { useEffect, useState } from 'react';
import maraImage from '../../assets/mara.png';
import im1 from '../../assets/im1.jpeg';
import im2 from '../../assets/im2.jpeg';
import im3 from '../../assets/im3.jpeg';
import im6 from '../../assets/Logo2.png';
import im5 from '../../assets/im5.jpeg';
import './home.css';

function Home() {
  const [useScrollAnimation, setUseScrollAnimation] = useState(true); // Toggle for animation behavior

  useEffect(() => {
    if (useScrollAnimation) {
      const handleScroll = () => {
        document.querySelectorAll('.fade-in-section').forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            section.classList.add('visible');
          }
        });
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      document.querySelectorAll('.fade-in-section').forEach((section) => {
        section.classList.add('visible');
      });
    }
  }, [useScrollAnimation]);

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">
          <a href="/">
            <img className="logo1" src={im6} alt="Logo" />
          </a>
        </div>
        <nav>
          <a href="/#about">About Us</a>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </nav>
      </header>

      <section className="hero-section fade-in-section">
        <div className="hero-text">
          <h1>Serrote Farm</h1>
          <h2>Natural & Fresh</h2>
          <p>
            Who we are and what we do? We are specialists in growing fruits,
            especially Passionfruit, as well as seeds, trees, honey, and fish.
          </p>
          <div className="hero-buttons">
            <a href="/login">
              <button className="login">Log In</button>
            </a>
            <a href="/register">
              <button className="login">Register</button>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src={maraImage} alt="Agriculture" />
        </div>
      </section>

      <section className="agriculture-info fade-in-section">
        <h2>The Importance of Agriculture</h2>
        <p>
          Agriculture is essential for sustainable development, as it provides
          the foundation for food security and economic stability worldwide.
        </p>
        <section className="gallery fade-in-section">
          <img src={im1} alt="Gallery Image 1" />
          <img src={im2} alt="Gallery Image 2" />
          <img src={im3} alt="Gallery Image 3" />
        </section>
        <h2>Healthy Eating and Sustainability</h2>
        <p>
          A diet based on fresh and natural foods helps maintain a healthy
          lifestyle while supporting local farmers and reducing environmental
          impact.
        </p>
      </section>

      <section id="about" className="about-section fade-in-section">
        <h2>About Us</h2>
        <img src={im5} alt="About Us" />
        <p>
          Agriculture uses approximately 70% of the world’s freshwater supply,
          and water managers are under mounting pressure to produce more food
          and fiber for a growing population while also reducing water waste
          and pollution and responding to a changing climate. In light of these
          challenges, more farmers are adopting innovative water management
          strategies, such as innovative irrigation systems and scheduling and
          methods to improve soil health. The Pacific Institute conducts
          research and works with innovative agricultural partners to identify
          and scale strategies to improve water management and ensure a vibrant
          agricultural system and global food security.
        </p>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section contact-info">
            <img src={im6} alt="Company Logo" className="footer-logo" />
            <p>
              12 Molloy Ave
              <br />
              South Coogee
              <br />
              Sydney, NSW 2036
            </p>
            <a href="mailto:support@vida.com">fazendaserrote@gmail.com</a>
            <p>(+61) 0484 701 519</p>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="/contactus">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Media</h4>
            <ul>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Tik Tok</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Login</h4>
            <ul>
              <li>
                <a href="#">Login</a>
              </li>
              <li>
                <a href="#">Register</a>
              </li>
              <li>
                <a href="#">Reset Password</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin-in"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
