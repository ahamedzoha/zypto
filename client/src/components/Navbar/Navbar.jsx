import { useState } from "react"
import { HiMenuAlt4 } from "react-icons/hi"
import { AiOutlineClose } from "react-icons/ai"
import logo from "../../images/logo-dark.svg"

const NavbarItem = ({ title, classProps }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
}

const LINKS = [
  {
    title: "Market",
    classProps: "text-blue-500",
    route: "/market",
  },
  {
    title: "Exchange",
    classProps: "text-blue-500",
    route: "/exchange",
  },
  {
    title: "Tutorials",
    classProps: "text-blue-500",
    route: "/tutorials",
  },
  {
    title: "Wallets",
    classProps: "text-blue-500",
    route: "/wallets",
  },
]

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="Zypto Logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {LINKS.map((item, index) => (
          <NavbarItem
            key={item.title + index}
            title={item.title}
            // classProps={index === 0 ? "text-blue-500" : "text-gray-500"}
          />
        ))}

        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>

      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2 ">
              <AiOutlineClose
                fontSize={28}
                className="text-white md:hidden cursor-pointer"
                onClick={() => setToggleMenu(!toggleMenu)}
              />
            </li>
            {LINKS.map((item, index) => (
              <NavbarItem
                key={item.title + index}
                title={item.title}
                classProps={` my-2 text-lg`}
              />
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
