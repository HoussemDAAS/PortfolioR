"use client";
/* eslint-disable @next/next/no-img-element */
import { FC, useEffect } from "react";
import "./Projects.css";
import { servicesCopy } from "../constants/services";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from 'split-type'
import Lenis from '@studio-freight/lenis'

const Projects: FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const stickySection = document.querySelector(".sticky");
    const stickyHeight = window.innerHeight * 8;
    const services = document.querySelectorAll(".service");
    const indicator = document.querySelector(".indicator");
    const currentCount = document.querySelector("#current-count");
    const serviceImg = document.querySelector(".service-img");
    const serviceCopy = document.querySelector(".service-copy p");
    const serviceHeight = 38;
    const imgHeight = 250;
    if (serviceCopy) {
      serviceCopy.textContent = servicesCopy[0][0];
    }
    let currentSplitText = new SplitType(serviceCopy, { types: "lines" });

    const measureContainer = document.createElement("div");
    measureContainer.style.cssText = `
      position: absolute;
      visibility: hidden;
      height: auto;
      width: auto;
      white-space: nowrap;
      font-family: "PP NeueBit";
      font-size: 60px;
      font-weight: 600;
      text-transform: uppercase;
    `;
    document.body.appendChild(measureContainer);

    const serviceWidths = Array.from(services).map((service) => {
      measureContainer.textContent = service.querySelector("p").textContent;
      return measureContainer.offsetWidth + 8;
    });

    document.body.removeChild(measureContainer);

    gsap.set(indicator, {
      width: serviceWidths[0],
      xPercent: -50,
      left: "50%",
    });

    const scrollPerService = window.innerHeight;
    let currentIndex = 0;

    const animateTextChange = (index: number) => {
      return new Promise((resolve) => {
        gsap.to(currentSplitText.lines, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          stagger: 0.03,
          ease: "power3.inOut",
          onComplete: () => {
            currentSplitText.revert();

            const newText = servicesCopy[index][0];
            serviceCopy.textContent = newText;

            currentSplitText = new SplitType(serviceCopy, { types: "lines" });

            gsap.set(currentSplitText.lines, {
              opacity: 0,
              y: 20,
            });
            gsap.to(currentSplitText.lines, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.03,
              ease: "power3.out",
              onComplete: resolve,
            });
          },
        });
      });
    };

    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `${stickyHeight}px`,
      pin: true,
      onUpdate: async (self) => {
        const progress = self.progress;
        gsap.set(".progress", { scaleY: progress });

        const scrollPosition = Math.max(0, self.scroll() - window.innerHeight);
        const activeIndex = Math.floor(scrollPosition / scrollPerService);

        if (
          activeIndex >= 0 &&
          activeIndex < services.length &&
          currentIndex !== activeIndex
        ) {
          currentIndex = activeIndex;

          services.forEach((service) => service.classList.remove("active"));
          services[activeIndex].classList.add("active");

          await Promise.all([
            gsap.to(indicator, {
              y: activeIndex * serviceHeight,
              width: serviceWidths[activeIndex],
              duration: 0.5,
              ease: "power3.inOut",
              overwrite: true,
            }),
            gsap.to(serviceImg, {
              y: -activeIndex * imgHeight,
              duration: 0.5,
              ease: "power3.inOut",
              overwrite: true,
            }),
            gsap.to(currentCount, {
              innerText: activeIndex + 1,
              snap: { innerText: 1 },
              duration: 0.3,
              ease: "power3.out",
            }),
            animateTextChange(activeIndex),
          ]);
        }
      },
    });
  }, []);

  return (
    <div className="cont">
      {/* <section className="hero">
        <p>Scroll Down</p>
      </section> */}
      <section className="sticky">
        <div className="col">
          <div className="services">
            <div className="indicator"></div>
            <div className="service active">
              <p>Project houssem</p>
            </div>
            <div className="service">
              <p>Project rayen</p>
            </div>
            <div className="service">
              <p>Project ahmed</p>
            </div>
            <div className="service">
              <p>Project salah</p>
            </div>
            <div className="service">
              <p>Project ali</p>
            </div>
            <div className="service">
              <p>Project mohsen</p>
            </div>
            <div className="service">
              <p>Project ssss</p>
            </div>
            <div className="service">
              <p>Project aaa</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="service-img-wrapper">
            <div className="service-img">
              <div className="img">
                <img
                  src={
                    "https://images.pexels.com/photos/821749/pexels-photo-821749.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt={"Image 1"}
                />
              </div>
              <div className="img">
                <img
                  src={
                    "https://images.pexels.com/photos/821749/pexels-photo-821749.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt={"image2"}
                />
              </div>
              <div className="img">
                <img
                  src={
                    "https://images.pexels.com/photos/821749/pexels-photo-821749.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt={" image3"}
                />
              </div>
              <div className="img">
                <img
                  src={
                    "https://images.pexels.com/photos/1595244/pexels-photo-1595244.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt={" image4"}
                />
              </div>
              <div className="img">
                <img
                  src={
                    "https://images.pexels.com/photos/1447264/pexels-photo-1447264.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt={" image5"}
                />
              </div>
              <div className="img">
                <img
                  src={
                    "https://images.pexels.com/photos/233314/pexels-photo-233314.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt={"image6"}
                />
              </div>
              <div className="img">
                <img
                  src={
                    "https://images.pexels.com/photos/233314/pexels-photo-233314.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt={"image7"}
                />
              </div>
              <div className="img">
                <img
                  src={
                    "https://images.pexels.com/photos/233314/pexels-photo-233314.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt={"image8"}
                />
              </div>
            </div>
          </div>
          <div className="service-copy">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloribus quas laborum, quaerat molestiae voluptate consectetur
              excepturi commodi iusto assumenda, alias ex, aperiam possimus
              ipsum!
            </p>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
        <div className="index">
          <span id="current-count">1</span>
          <span className="separator"></span>
          <span className="total-count">8</span>
        </div>
      </section>
      {/* <section     className="outro">
        <p>your next section</p>
      </section> */}
    </div>
  );
};

export default Projects;
