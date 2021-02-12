import React from "react"
import SEO from "./SEO"

const Layout = ({ children }) => {
  return (
    <>
      {/* <SEO /> */}
      <div className="flex flex-col min-h-screen bg-gray-200">
        {children}
        <footer className="py-2 text-center text-gray-600 text-xs">
          &copy; Manjot Singh 2021
        </footer>
      </div>
    </>
  )
}

export default Layout
