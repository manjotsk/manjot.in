import React from "react"
import { TwitterTimelineEmbed } from "react-twitter-embed"
import { projects, technologies } from "./data"

import "./index.css"
import ProjectCard from "./ProjectCard"

const Profile = () => {
  return (
    <div className="p-4 md:p-10 bg-white ">
      <div className="flex justify-center text-xl font-bold tracking-widest text-gray-500">
        <h1>Hi there. Nice to meet you</h1>
      </div>
      <div className="grid col-span-1 md:flex items-center mt-10 justify-center">
        <div className="md:mr-4">
          <img
            className="md:w-40 rounded-full"
            src="https://pbs.twimg.com/profile_images/1164779490087600128/Ckp3CSC1_400x400.jpg"
            alt="Manjot"
          />
        </div>
        <div className="md:border-l-2 pl-4 p-2 col-span-2 text-justify md:w-1/2 mt-10 md:mt-0">
          <p>
            I'm from{" "}
            <a
              style={{ color: "#0645ad" }}
              href="https://en.wikipedia.org/wiki/Amritsar"
              title="Amritsar"
            >
              Amritsar
            </a>
            . I am a Professional Software Developer, always looking to learn
            new things, discover problems and develop solutions.
          </p>
          <p className="mt-4">
            I believe in developing optimal and feasible solutions, with minimal
            costs and higher outputs. I love to talk about Technology and
            Engineering over a Coffee :)
          </p>
        </div>
      </div>
      <div className="grid col-span-1 md:flex items-center justify-center mt-20">
        <div>
          <div className="md:flex items-center mb-4">
            <div className="flex items-center md:mr-8 mb-4 md:mb-0">
              <i className="fas fa-envelope-open-text fa-2x mr-2" />
              <p>manjot.kalsi@simbaquartz.com</p>
            </div>
            <div className="flex items-center">
              <i className="fab fa-github fa-2x mr-2" />
              <a
                style={{ color: "#0645ad" }}
                href="https://github.com/manjotsk"
              >
                <strong>github.com/</strong>manjotsk
              </a>
            </div>
          </div>
          <div className="md:flex items-center">
            <div className="flex items-center md:mr-7">
              <i className="fas fa-phone-alt fa-2x mr-2 mb-4 md:mb-0" />
              <p>+91 85569-36450 </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center md:ml-12 pt-10 md:pt-0">
          <div className="md:flex">
            <div className="flex items-center mb-4 md:mb-0 roduned-full">
              <a
                style={{ color: "#0645ad" }}
                href="https://wikipedia.org/wiki/Punjabi_language"
                className="flex justify-center font-bold mr-2 p-2 border w-10 rounded-full"
              >
                <span>ਪ</span>
              </a>
              <p>Native</p>
            </div>
            <div className="flex items-center mb-4 md:mb-0 roduned-full">
              <a
                style={{ color: "#0645ad" }}
                href="https://wikipedia.org/wiki/English_language"
                className="font-bold flex justify-center mr-2 p-2 border w-10 rounded-full"
              >
                <span>EN</span>
              </a>
              <p>Fluent</p>
            </div>

            <div className="flex items-center md:ml-10">
              <a
                style={{ color: "#0645ad" }}
                href="https://en.wikipedia.org/wiki/Hindi"
                className="font-bold flex justify-center mr-2 p-2 border w-10 rounded-full"
              >
                <span>ह</span>
              </a>
              <p>Fluent</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex mt-20 text-center ml-10 mr-10 md:ml-36 md:mr-36">
        <div className="md:mr-20 md:w-1/3">
          <h1 className="font-bold italic ">TECHNOLOGIES THAT I USE</h1>
          <h1 className="font-bold italic mb-10">Everyday</h1>
          <div className="relative mt-5 text-left">
            <div className="flex items-center relative pb-5 justify-start">
              <div className="border-r-2 border-black absolute h-full top-2 z-10 ">
                <i className="fas fa-circle -top-1 -ml-2 absolute" />
                <div className="absolute seccion -ml-8 font-bold italic text-gray-400 ">
                  BACKEND
                </div>
              </div>
              <div className="ml-6 pt-5">
                {technologies.backend.map(techs => (
                  <div
                    key={JSON.stringify(techs)}
                    className="flex mb-4 space-x-16"
                  >
                    {techs.map(({ name, link, img }) => (
                      <div>
                        <img
                          key={name}
                          className="w-24"
                          src={img ? "/icons/" + img + ".png" : link}
                          alt={img}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center relative pb-5 pt-5 justify-start">
              <div className="border-r-2 border-black absolute h-full top-2 z-10 ">
                <i className="fas fa-circle -top-1 -ml-2 absolute" />
                <div className="absolute seccion -ml-8 font-bold italic text-gray-400">
                  SOFTWARE
                </div>
              </div>
              <div className="ml-6 pt-5">
                {technologies.software.map(techs => (
                  <div
                    key={JSON.stringify(techs)}
                    className="flex mb-4 space-x-16"
                  >
                    {techs.map(({ name, link, img }) => (
                      <div>
                        <img
                          key={name}
                          className="w-24"
                          src={img ? "/icons/" + img + ".png" : link}
                          alt={img}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center relative pb-5 pt-5 justify-start">
              <div className="border-r-2 border-black absolute h-full top-2 z-10 ">
                <i className="fas fa-circle -top-1 -ml-2 absolute" />
                <div className="absolute seccion -ml-8 font-bold italic text-gray-400 top-32">
                  FRONTEND
                </div>
              </div>
              <div className="ml-6 pt-5">
                {technologies.frontend.map(techs => (
                  <div
                    key={JSON.stringify(techs)}
                    className="flex mb-4 space-x-16"
                  >
                    {techs.map(({ name, link, img }) => (
                      <div>
                        <img
                          key={name}
                          className="w-24"
                          src={img ? "/icons/" + img + ".png" : link}
                          alt={img}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center relative pb-5 pt-5 justify-start">
              <div className="border-r-2 border-black absolute h-full top-2 z-10">
                <i className="fas fa-circle -top-1 -ml-2 absolute" />
                <div
                  style={{ top: "80%" }}
                  className="absolute seccion -ml-8 font-bold italic text-gray-400"
                >
                  Mobile/Other
                </div>
                <i className="fas fa-circle -bottom-3 -ml-2 absolute" />
              </div>
              <div className="ml-6 pt-5">
                {technologies.platforms.map(techs => (
                  <div
                    key={JSON.stringify(techs)}
                    className="flex mb-4 space-x-16"
                  >
                    {techs.map(({ name, link, img }) => (
                      <div>
                        <img
                          key={name}
                          className="w-24"
                          src={img ? "/icons/" + img + ".png" : link}
                          alt={img}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="font-bold italic mb-10">Project Highlights</h1>
          {projects.map(project => (
            <ProjectCard key={project.name} details={project} />
          ))}
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="kalsimsk"
            options={{ height: 800 }}
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
