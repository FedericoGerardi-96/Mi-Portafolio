import { useContext, useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { ThemeContext } from "../../context/theme";
import LogoDark from "../../public/Logo-Dark.png";

import { AuthContext } from "../../context/auth";
import { getScrollSize } from "../../hooks";

const sideBarOpenAnimation = {
  hidden: {
    x: -1000,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const liNabAnimation = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  visible: ({ delay }: any) => ({
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
    },
  }),
};

const liSideNabAnimation = {
  hidden: {
    opacity: 0,
    x: -300,
    transition: {
      duration: 0.5,
    },
  },
  visible: ({ delay }: any) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration: 0.3,
    },
  }),
};

let sideNabLinks = [
  { title: "HOME", href: "/" },
  { title: "SOBRE MI", href: "/aboutMe" },
  { title: "TRABAJOS", href: "/trabajos" },
  { title: "SKILLS", href: "/skills" },
  { title: "CONTACTO", href: "/contact" },
];

export const SideBar = () => {
  const router = useRouter();
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const { toggleTheme, ThemeActive } = useContext(ThemeContext);
  const [toggleNav, settoggleNav] = useState(false);

  const toogleTheme = () => {
    toggleTheme();
  };

  useEffect(() => {
    if (toggleNav) {
      document.body.classList.add("no-scroll");
      document.body.classList.remove("scroll");
    } else {
      document.body.classList.add("scroll");
      document.body.classList.remove("no-scroll");
    }
  }, [toggleNav]);

  const onLogOutUser = async () => {
    const isValidLogOut = await logOutUser();
    if (!isValidLogOut) {
      return;
    }
    settoggleNav(!toggleNav);
    router.replace("/");
  };

  const toggleSideBar = () => {
    settoggleNav(!toggleNav);
  };

  return (
    <>
      <motion.nav
        className={`
        static
        left-0 top-0 
        z-[99] h-[7.5rem] 
        w-full  
        bg-backgroundSecondary 
        backdrop-blur-sm`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.2 } }}
      >
        <div className={`container mx-auto flex h-[7.5rem] items-center justify-between px-8`}>
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0, transition: { duration: 1.2 } }}
            className={"flex items-center"}
          >
            <FontAwesomeIcon
              className={`mr-8 block h-[3rem] w-[3rem] cursor-pointer text-white lg:hidden`}
              icon={faBars}
              onClick={toggleSideBar}
            />
          </motion.div>
          <Image
            className={`h-auto w-[100px]`}
            alt="Logo Federico Gerardi"
            draggable={false}
            width={0}
            src={LogoDark}
          />
          <ul className={"hidden grow justify-evenly lg:flex"}>
            {sideNabLinks.map(({ title, href }, key) => {
              return (
                <motion.li
                  animate="visible"
                  custom={{ delay: (key + 1) * 0.4 }}
                  initial="hidden"
                  key={key}
                  variants={liNabAnimation}
                >
                  <motion.div
                    className={`sm:link-sm lg:link-md xl:link-xl active:color-primaryColor relative text-[1rem]`}
                    whileTap={{ scale: 1.1 }}
                    whileHover={"hover"}
                  >
                    <Link
                      className={`
                      hover:after:border-secondary
                      text-white 
                       underline-offset-8 
                       hover:text-secondaryColor hover:underline
                      hover:decoration-green 
                      hover:decoration-wavy
                      hover:underline-offset-8
                      hover:transition-colors
                      hover:duration-300
                      ${
                        router.pathname == href
                          ? `pointer-events-none 
                          text-secondaryColor 
                          underline 
                          decoration-green 
                          decoration-wavy`
                          : ""
                      }
                      `}
                      href={href}
                    >
                      {title}
                    </Link>
                  </motion.div>
                </motion.li>
              );
            })}
            <li className={`hidden items-center justify-center lg:flex`}>
              {isLoggedIn && (
                <motion.div
                  animate={{ opacity: 1, transition: { duration: 0.5, delay: 2.4 } }}
                  className={`mr-8 flex cursor-pointer items-center text-[1.1rem] text-white hover:text-secondaryColor`}
                  initial={{ opacity: 0 }}
                  onClick={onLogOutUser}
                  whileTap={{ scale: 1 }}
                >
                  <span>LogOut</span>
                  <FontAwesomeIcon className={`text-8 w-8 pl-4`} icon={faUser} />
                </motion.div>
              )}
              {isLoggedIn && (
                <motion.div
                  animate={{ opacity: 1, transition: { duration: 0.5, delay: 2.8 } }}
                  initial={{ opacity: 0 }}
                  className={`flex cursor-pointer items-center text-[1.1rem] text-white hover:text-secondaryColor`}
                >
                  <Link onClick={toggleSideBar} href="/admin">
                    Admin
                  </Link>
                  <FontAwesomeIcon className={`text-8 w-8 pl-4`} icon={faUser} />
                </motion.div>
              )}
            </li>
          </ul>
          <motion.div
            initial={{
              transform: "rotate(90deg)",
            }}
            animate={{
              transform: "rotate(0deg)",
              transition: {
                duration: 1.5,
              },
            }}
          >
            <FontAwesomeIcon
              className={`
              block 
              ${ThemeActive == "theme-dark" ? "text-white" : "text-white"} 
              h-[3rem] 
              w-[3rem] 
              cursor-pointer`}
              icon={ThemeActive == "theme-dark" ? faMoon : faSun}
              onClick={toogleTheme}
            />
          </motion.div>
        </div>
      </motion.nav>
      <motion.div
        className={`
        fixed
        top-0 
        left-0 
        z-[999] 
        block 
        h-full 
        w-[35%] ${ThemeActive == "theme-dark" ? "bg-background" : "bg-white"} lg:hidden `}
        initial={"hidden"}
        variants={sideBarOpenAnimation}
        animate={toggleNav ? "visible" : "hidden"}
      >
        <div
          onClick={toggleSideBar}
          className={`absolute z-[90] ${toggleNav ? "block" : "hidden"} h-screen w-screen bg-[rgba(0,0,0,0.6)]  `}
        />
        <div className={`relative z-[99] flex h-full flex-col justify-evenly`}>
          <div className={"flex justify-end"}>
            <FontAwesomeIcon
              className={`text-link m-4 block h-[3rem] w-[3rem] cursor-pointer text-[3rem] lg:hidden`}
              icon={faXmark}
              onClick={toggleSideBar}
            />
          </div>
          <motion.ul className={"flex w-full grow flex-col items-center justify-center"}>
            {sideNabLinks.map(({ title, href }, key) => {
              return (
                <motion.li
                  className={`
                  p-4xl relative flex w-full justify-center overflow-hidden 
                  border-t-[1px] border-b-[1px] border-[var(--box-shadow)] py-[2rem]
                  `}
                  custom={{ delay: (key + 1) * 0.4 }}
                  initial="hidden"
                  animate={toggleNav ? "visible" : "hidden"}
                  variants={liSideNabAnimation}
                  layoutId={key.toString()}
                  key={key}
                >
                  <motion.div className={`hover:text-primaryColor`} whileTap={{ scale: 1 }} whileHover={"hover"}>
                    <Link
                      className={`
                      text-text
                       underline-offset-8 
                       hover:text-secondaryColor 
                       hover:underline
                      hover:decoration-green 
                      hover:decoration-wavy
                      hover:transition-colors
                      hover:duration-300
                      ${
                        router.pathname == href
                          ? `pointer-events-none 
                          text-secondaryColor 
                          underline 
                          decoration-green 
                          decoration-wavy`
                          : ""
                      }
                      `}
                      href={href}
                      onClick={toggleSideBar}
                    >
                      {title}
                    </Link>
                  </motion.div>
                </motion.li>
              );
            })}
            {isLoggedIn && (
              <li className={`flex flex-col items-center justify-center`}>
                <motion.div
                  animate={
                    toggleNav
                      ? { x: 0, opacity: 1, transition: { duration: 0.5, delay: 2.4 } }
                      : { x: -1000, opacity: 0 }
                  }
                  className={`text-link my-4 flex cursor-pointer items-center text-[1.1rem] hover:text-secondaryColor`}
                  initial={{ x: -300 }}
                  onClick={onLogOutUser}
                  whileTap={{ scale: 1 }}
                >
                  <span>LogOut</span>
                  <FontAwesomeIcon className={`text-8 w-8 pl-4`} icon={faUser} />
                </motion.div>

                <motion.div
                  animate={
                    toggleNav
                      ? { x: 0, opacity: 1, transition: { duration: 0.5, delay: 2.8 } }
                      : { x: -1000, opacity: 0 }
                  }
                  className={`text-link my-4 flex cursor-pointer items-center text-[1.1rem] hover:text-secondaryColor`}
                  custom={{ delay: (6 + 1) * 0.4 }}
                  initial={{ x: -300 }}
                  whileTap={{ scale: 1 }}
                >
                  <Link onClick={toggleSideBar} href="/admin">
                    Admin
                  </Link>
                  <FontAwesomeIcon className={`text-8 w-8 pl-4`} icon={faUser} />
                </motion.div>
              </li>
            )}
          </motion.ul>
        </div>
      </motion.div>
    </>
  );
};
