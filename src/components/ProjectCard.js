import React from "react"

const ProjectCard = ({
  details: {
    name,
    year: { from, to },
    role,
    description,
    link,
  },
}) => {
  return (
    <div className="relative mt-5 text-left">
      <div className="flex items-center relative">
        <div className="hidden md:block  pl-3">
          <div className="font-bold italic">{from}</div>
          {to && "-"}
          {to && <div className="font-bold italic">{to}</div>}
          {/* <div className="md:flex space-x-1 text-xs">//</div> */}
        </div>
        <div className="border-r-2 border-black absolute h-full left-1 md:left-20 top-2 z-10">
          <i className="fas fa-circle -top-1 -ml-2 absolute" />
        </div>
        <div className="ml-10">
          <a target="_blank" href={link} rel="noreferrer">
            <div className="font-bold transition duration-500 ease-in-out transform  hover:text-blue-500">
              {name}
              <span className="">↗</span>
            </div>
          </a>
          <div className="italic md:mb-4">{role}</div>
          <div className="mb-4 mt-2 md:hidden">
            <div className="font-bold">{from}</div>
            {/* <div className="text-xs">//</div> */}
          </div>
          <div className="mb-10">{description}</div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
