/* eslint-disable @typescript-eslint/ban-ts-comment */
//ts-ignore
"use client";
import React, { useEffect } from "react";
import { gsap } from 'gsap';
import './Preloader.css';
const Preloader = () => {
  useEffect(() => {
    const counter3 = document.querySelector(".counter-3");

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        // @ts-ignore
        div.textContent = j;
        // @ts-ignore
        counter3.appendChild(div);
      }
    }
    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    // @ts-ignore
    counter3.appendChild(finalDiv);
// @ts-ignore
    function animate(counter, duration, delay = 0) {
      const numHeight = counter.querySelector(".num").clientHeight;
      const totalDistance =
        (counter.querySelectorAll(".num").length - 1) * numHeight;
      gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
      });
    }
      // Halved all durations and delays
      animate(counter3, 2.5); // Changed from 5 to 2.5
      animate(document.querySelector(".counter-2"), 3); // Changed from 6 to 3
      animate(document.querySelector(".counter-1"), 1, 2); // Changed from 2,4 to 1,2
  
      gsap.to(".digit", {
        top: "-150px",
        stagger: { amount: 0.25 },
        delay: 3, // Changed from 6 to 3
        duration: 0.5, // Changed from 1 to 0.5
        ease: "power4.inOut",
      });
      
      gsap.from(".loader-1", {
        width: 0,
        duration: 3, // Changed from 6 to 3
        ease: "power2.inOut",
      });
      
      gsap.from(".loader-2", {
        width: 0,
        delay: 0.95, // Changed from 1.9 to 0.95
        duration: 1, // Changed from 2 to 1
        ease: "power2.inOut",
      });
  
      gsap.to(".loader", {
        background: "none",
        delay: 3, // Changed from 6 to 3
        duration: 0.05, // Changed from 0.1 to 0.05
      });
  
      gsap.to(".loader-1", {
        rotate: 90,
        y: -50,
        duration: 0.25, // Changed from 0.5 to 0.25
        delay: 3, // Changed from 6 to 3
      });
  
      // @ts-ignore
      gsap.to(".loader-2", {
        x: -75,
        y: 75,
        duration: 0.25 // Changed from 0.5 to 0.25
      },"<");
  
      gsap.to(".loader", {
        scale: 40,
        duration: 0.5, // Changed from 1 to 0.5
        delay: 3.5, // Changed from 7 to 3.5
        ease: "power2.inOut",
      });
      
      gsap.to(".loader", {
        rotate: 45,
        y: 500,
        x: 2000,
        duration: 0.5, // Changed from 1 to 0.5
        delay: 3.5, // Changed from 7 to 3.5
        ease: "power2.inOut",
      });
  
      gsap.to(".loading-screen", {
        opacity: 0,
        duration: 0.25, // Changed from 0.5 to 0.25
        delay: 3.75, // Changed from 7.5 to 3.75
        ease: "power1.inOut",
      });
    }, []);
  return (
    <div>
      <div className="loading-screen">
        <div className="loader">
          <div className="loader-1 bar"></div>
          <div className="loader-2 bar"></div>
        </div>
      </div>
      <div className="counter">
        <div className="counter-1 digit">
          <div className="num">0</div> <div className="num num1offeset1">1</div>
        </div>
        <div className="counter-2 digit">
          <div className="num">0</div> <div className="num num1offeset2">1</div>
          <div className="num">2</div> <div className="num">3</div>
          <div className="num">4</div> <div className="num">5</div>
          <div className="num">6</div> <div className="num">7</div>
          <div className="num">8</div> <div className="num">9</div>
          <div className="num">0</div>
          
        </div>
        <div className="counter-3 digit">
          <div className="num">0</div> <div className="num">1</div>
          <div className="num">2</div> <div className="num">3</div>
          <div className="num">4</div> <div className="num">5</div>
          <div className="num">6</div> <div className="num">7</div>
          <div className="num">8</div> <div className="num">9</div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
