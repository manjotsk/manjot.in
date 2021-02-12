import React from "react"
export const projects = [
  {
    name: "MMO- Manage My Org",
    year: { from: "2020", to: "now" },
    link: "https://managemyorg.com",
    role: "Assistant Software Architect/Lead Developer",
    description: (
      <>
        A cloud-based organization management tool to help business achieve
        their daily goals.{" "}
        <a href="mailto:manjot.kalsi@simbaquartz.com?subject=Looking for a demo and Beta release participation in Manage my org.&body=Hi Manjot,">
          <strong>Participate in Beta Release</strong>
        </a>
        .
      </>
    ),
  },
  {
    name: "Zeus Product (SaaS)",
    year: { from: 2019 },
    link: "https://zeus.fidelissd.com",
    role: "Frontend Architect/Software Developer(Full Stack)",
    description: (
      <>
        A cloud-based quote management tool to achieve operational excellence.
        Role included setting up architecture, making decisions and executing
        them, developing it, leading the team of developers, with high-quality
        coding guidelines, executing the sprints to achieve the product launch
        within <strong>7 months</strong>.
      </>
    ),
  },
  {
    name: "Fidelis ZEUS Mobile App",
    link: "https://apps.apple.com/bm/app/fidelis-zeus/id1450805696",
    year: { from: 2018 },
    role: "Frontend Developer",
    description: (
      <>
        This is a Cross-Platform Mobile Application, delivering FIDELIS Inc. to
        manage their quotations. This app manages the tasks, events, and
        consumes REST APIs, which are developed under the OfBiz Framework
      </>
    ),
  },
  {
    name: "Smiles.Care Administrator",
    link: "https://smiles.care",
    volunteered: true,
    year: { from: "2018", to: 19 },
    role: "Lead Developer | Volunteered*",
    description: (
      <>
        Built end-to-end Project for an NGO focused to achieve `No Barefoot
        Children` status in India. This project allows the NGO to manage
        donations, manage campaigns, manage surveys
      </>
    ),
  },
  {
    name: "Mobile Precision Irrigation System",
    link: "https://www.youtube.com/watch?v=Is0MofUVjY0&t=35s",
    volunteered: true,
    year: { from: "2018", to: 19 },
    role: "Lead Developer",
    description: (
      <>
        This project focuses on collecting the essential soil data, using
        AI-based Robotic Buggy. The data will then be used by the Analysts to
        generate a modal, which will help to calculate the precise amount of
        water required by the crop and different points, within a certain radius
      </>
    ),
  },
  {
    name: "EveryStream Mobile App",
    link: "https://www.youtube.com/watch?v=Is0MofUVjY0&t=35s",
    volunteered: true,
    year: { from: "2018", to: 19 },
    role: "Jr. Full-Stack Developer",
    description: (
      <>
        iOS/Android Mobile App that allows users to multicast/simulcast live
        videos to different video streaming platforms like YouTube, Facebook,
        and Twitch
      </>
    ),
  },
]

export const technologies = {
  frontend: [
    [
      {
        name: "HTML",
        link: "https://www.flaticon.com/svg/static/icons/svg/1216/1216909.svg",
      },
      {
        name: "css",
        link:
          "data:image/png;base64,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",
      },
      {
        name: "react",
        link:
          "https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-black-and-white.png",
      },
    ],
    [
      {
        name: "bootstrap",
        link:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFpfYz4DA8fBtTByR0UPNsMX5I2FbWUrYOjw&usqp=CAU",
      },
      {
        name: "tailwind",
        link:
          "data:image/png;base64,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",
      },
      {
        name: "Sass",
        link:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk5CrEfm5Q_4rOst-cvdiTGBeX8XQjuc2Juw&usqp=CAU",
      },
    ],
    [
      {
        name: "vue",
        link:
          "data:image/png;base64,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",
      },
      {
        name: "reactnative",
        link:
          "https://jobs.daxx.com/wp-content/uploads/2019/02/react-native-black.svg",
      },
      {
        name: "js",
        link:
          "data:image/png;base64,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",
      },
    ],
  ],
  backend: [
    [
      {
        name: "node",
        link:
          "https://img.favpng.com/6/12/0/node-js-javascript-express-js-angularjs-png-favpng-540VXsFikKDnZ35pxtPHRgWVZ.jpg",
      },
      {
        name: "java",
        link: "https://image.flaticon.com/icons/png/512/121/121152.png",
      },
      {
        name: "AWS",
        link: "https://icon-library.com/images/552529b69c.svg.svg",
      },
    ],
    [
      {
        name: "Jenkins",
        link:
          "https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/jenkins-512.png",
      },
      {
        name: "Azure",
        link:
          "https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/microsoftazure-512.png",
      },
      {
        name: "GCP",
        link:
          "https://cdn.iconscout.com/icon/free/png-256/google-cloud-platform-4-896333.png",
      },
    ],
    [
      {
        name: "ffmpeg",
        link: "https://cdn.iconscout.com/icon/free/png-512/ffmpeg-569477.png",
      },
      {
        name: "PHP",
        link:
          "data:image/png;base64,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",
      },
      {
        name: "psql",
        link:
          "https://cdn.iconscout.com/icon/free/png-256/postgresql-7-896463.png",
      },
    ],
  ],
}
