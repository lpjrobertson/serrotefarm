import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './dashboard.module.css'; // Import CSS Module
import sol from '../../assets/sol.webp';
import chuva from '../../assets/chuva.webp';
import nublado from '../../assets/nublado.webp';
import poucasnuvens from '../../assets/poucasnuvens.jpeg';
import harvest from '../../assets/colheita.webp'
import { signOut } from 'firebase/auth';

function Dashboard() {
  
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_KEY = 'aedd55aaeb36b3c685cf55780b35311c';
  const city = 'Caucaia,BR';

  const goToAddProduction = () => {
    navigate('/add-production');
  };

  const getWeatherImage = (condition) => {
    if (condition.includes("clear")) return sol;
    if (condition.includes("clouds")) return nublado;
    if (condition.includes("rain")) return chuva;
    if (condition.includes("snow")) return chuva;
    return poucasnuvens;
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
          setUserEmail(userDoc.data().email);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    const fetchWeatherData = async () => {
      try {
        
        const currentWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`
        );
        setWeather(currentWeatherResponse.data);

        
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=en`
        );

       
        const dailyForecast = {};
        forecastResponse.data.list.forEach((entry) => {
          const date = new Date(entry.dt_txt).toLocaleDateString('pt-BR');
          if (!dailyForecast[date]) {
            dailyForecast[date] = {
              temp: [],
              weather: entry.weather[0].description,
              icon: entry.weather[0].icon,
            };
          }
          dailyForecast[date].temp.push(entry.main.temp);
        });

        
        const processedForecast = Object.keys(dailyForecast).map((date) => {
          const temps = dailyForecast[date].temp;
          const avgTemp =
            temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
          return {
            date,
            temp: avgTemp.toFixed(1),
            weather: dailyForecast[date].weather,
            icon: dailyForecast[date].icon,
          };
        });

        setForecast(processedForecast);
      } catch (err) {
        setError('Error fetching weather data. Please try again.');
        console.error(err);
      }
    };

    fetchUserData();
    fetchWeatherData();
  }, [navigate]);

  return (
    <div>
      <div className={styles.pageContainer}>
        <header className={styles.dashboardHeader}>
          <h1>Welcome, {userName ? userName : 'Loading...'}!</h1>
        </header>
       

        <section className={styles.dashboardInfo}>
          
          <div className={styles.userInfo}>
            <div className={styles.userDetails}>
              <p><strong>Name:</strong> {userName ? userName : 'Loading...'}</p>
              <p><strong>Email:</strong> {userEmail ? userEmail : 'Loading...'}</p>
               <button className={styles.logoutButton} onClick={handleLogout}>
            Log Out
          </button>
            </div>
          </div>
        </section>

        <section className={styles.weatherSection}>
          <div className={styles.container}>
          
          {weather ? (
            <div className={styles.weatherInfo}>
              <h2>Current Weather in Caucaia</h2>
              <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
              <p><strong>Condition:</strong> {weather.weather[0].description}</p>
              <img
                src={getWeatherImage(weather.weather[0].description)}
                alt={weather.weather[0].description}
                className={styles.weatherImage}
              />
              <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            </div>
            
            
          ) : (
            <p>Loading weather data...</p>
          )}
          <div onClick={goToAddProduction} className={styles.production}>
            
            <h2>Daily Production</h2>
            <p>Manage your harvest</p>
            <p>Serrote Farm</p>
            <img className={styles.harvest} src={harvest} alt="Agriculture" />
             

          </div>
          </div>

          <h2>5-Day Forecast</h2>
          {forecast ? (
            <ul className={styles.forecastList}>
              {forecast.map((day, index) => (
                <li key={index} className={styles.forecastItem}>
                  <strong>{day.date}: </strong> {day.temp}°C
                  <p>{day.weather}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.weather}
                    className={styles.forecastImage}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading forecast...</p>
          )}
        </section>

       
      </div>

      
    </div>
  );
}

export default Dashboard;
