import React from "react"
import { TwitterTimelineEmbed } from "react-twitter-embed"
import { projects, technologies } from "./data"

import "./index.css"
import ProjectCard from "./ProjectCard"

const Profile = () => {
  return (
    <div className="p-4 md:p-10 bg-white">
      <div className="flex justify-center text-xl font-bold tracking-widest text-gray-500">
        <h1>Hi there. Nice to meet you</h1>
      </div>
      <div className="grid col-span-1 md:flex items-center mt-10 justify-center">
        <div className="mr-14">
          <img
            className="md:w-40"
            src="https://i.pinimg.com/736x/6e/36/f2/6e36f2c9d9cc523f5904d6e4c91921f4.jpg"
            alt="Logo"
          />
        </div>
        <div className="md:mr-4">
          <img
            className="md:w-40 rounded-full"
            src="https://pbs.twimg.com/profile_images/1164779490087600128/Ckp3CSC1_400x400.jpg"
            alt=""
          />
        </div>
        <div className="md:border-l-2 pl-4 p-2 col-span-2 text-justify md:w-1/2 mt-10 md:mt-0">
          <p>
            I'm from{" "}
            <a
              style={{ color: "#0645ad" }}
              href="https://en.wikipedia.org//wiki/Amritsar"
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
                  <div className="flex mb-4 space-x-16">
                    {techs.map(({ link }) => (
                      <div>
                        <img className="w-24" src={link} />
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
                <div className="flex mb-4 space-x-16">
                  <div>
                    <img
                      className="w-24"
                      src="data:image/png;base64,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"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="w-24"
                      style={{ filter: "contrast(0.01%) brightness(10%)" }}
                      src="https://i2.wp.com/mac-torrent-download.net/wp-content/uploads/2019/11/Navicat-Premium-15-icon.png?resize=246%2C246&ssl=1"
                    />
                  </div>
                  <div>
                    <img
                      className="w-24"
                      src="https://img.icons8.com/ios-filled/452/burp-suite.png"
                    />
                  </div>
                </div>
                <div className="flex mb-4 space-x-16">
                  <div>
                    <img
                      className="w-24"
                      src="https://i.imgur.com/VCRcgf2.png"
                    />
                  </div>
                  <div>
                    <img
                      className="w-24"
                      src="https://i.imgur.com/pXHzSuT.png"
                    />
                  </div>
                  <div>
                    <img
                      className="w-24"
                      src="https://i.imgur.com/Hen7iya.png"
                    />
                  </div>
                </div>
                <div className="flex mb-4 space-x-16">
                  <div>
                    <img
                      className="w-24"
                      src="https://img.icons8.com/ios/452/xcode.png"
                    />
                  </div>
                  <div>
                    <img
                      className="w-24"
                      style={{ filter: "contrast(0.01%) brightness(10%)" }}
                      src="https://cdn.clipart.email/f7b6e038eb20af29a2864eebc3dd7a2b_android-studio-logo-png-picture-378911-android-studio-logo-png_512-512.png"
                    />
                  </div>
                  <div>
                    <img
                      className="w-24"
                      src="https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/postman-512.png"
                    />
                  </div>
                </div>
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
                  <div className="flex mb-4 space-x-16">
                    {techs.map(({ link }) => (
                      <div>
                        <img className="w-24" src={link} />
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
                <div className="flex mb-4 space-x-16">
                  <div>
                    <img
                      className="w-24"
                      src="data:image/png;base64,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"
                    />
                  </div>
                  <div>
                    <img
                      className="w-24"
                      src="https://i.imgur.com/7AaIwV8.png"
                    />
                  </div>
                  <div>
                    <img
                      className="w-24"
                      src="data:image/png;base64,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"
                    />
                  </div>
                </div>
                <div className="flex mb-4 space-x-16">
                  <div>
                    <img
                      className="w-24"
                      src="https://img.icons8.com/ios/452/apple-app-store--v2.png"
                    />
                  </div>
                  <div>
                    <img
                      className="w-24"
                      src="https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/firebase-512.png"
                    />
                  </div>
                  <div>
                    <img
                      className="w-24"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvFuV7rL4NVvgHYU0IKbiNQx0dneHaguXh2w&usqp=CAU"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="font-bold italic mb-10">Project Highlights</h1>
          {projects.map(project => (
            <ProjectCard details={project} />
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
