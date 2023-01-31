import { useContext, useEffect, useState } from "react";

import Image from "next/image";
import Head from "next/head";

import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faFacebook, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

import { Slice } from "../Slice";
import AnimateText from "../AnimateText";
import { PortfolioContext } from "../../context/portfolio";

import Yukino from "../../public/Yukino.png";
import YukinoMobile from "../../public/YukinoMobile.png";
import MakiseKurisu from "../../public/MakiseKurisu.jpg";
import MakiseKurisuMobile from "../../public/MakiseKurisuMobile.jpg";
import Emilia from "../../public/Emilia.png";
import EmiliaMobile from "../../public/EmiliaMobile.png";

// Drawer Principal div animation variant
const variants = {
  show: { opacity: [0, 0.5, 1], scale: 1, transition: { ease: "easeInOut", duration: 0.5 } },
  hide: {
    opacity: 0,
    x: 1000,
    borderRadius: 30,
    transition: { ease: "easeInOut", duration: 1 },
    transitionEnd: {
      display: "none",
    },
  },
};

const iconVariants = {
  hover: {
    rotateY: [0, 360],
    transition: { ease: "easeInOut", duration: 1.5, repeat: Infinity },
  },
};

interface Props {
  drawerState: boolean;
  toggleDrawerState: () => void;
}

export const Drawer = ({ drawerState, toggleDrawerState }: Props) => {
  const [draweSecondState, setdraweSecondState] = useState(true);

  const { cvUrl } = useContext(PortfolioContext);
  const { UrlCurriculum } = cvUrl || { UrlCurriculum: "" };

  useEffect(() => {
    let randomNumber = Math.floor(Math.random() * 3);
    var yukino: any = document.getElementById("yukino");
    var YukinoMobile: any = document.getElementById("YukinoMobile");
    var MakiseKurisu: any = document.getElementById("MakiseKurisu");
    var MakiseKurisuMobile: any = document.getElementById("MakiseKurisuMobile");
    var Emilia: any = document.getElementById("Emilia");
    var EmiliaMobile: any = document.getElementById("EmiliaMobile");
    switch (randomNumber) {
      case 0:
        yukino.classList.add("md:block");
        yukino.classList.remove("md:hidden");
        YukinoMobile.classList.add("block");
        YukinoMobile.classList.remove("hidden");

        MakiseKurisu.classList.add("md:hidden");
        MakiseKurisu.classList.remove("md:block");
        MakiseKurisuMobile.classList.add("hidden");
        MakiseKurisuMobile.classList.remove("block");

        Emilia.classList.add("md:hidden");
        Emilia.classList.remove("md:block");
        EmiliaMobile.classList.add("hidden");
        EmiliaMobile.classList.remove("block");
        break;
      case 1:
        MakiseKurisu.classList.add("md:block");
        MakiseKurisu.classList.remove("md:hidden");
        MakiseKurisuMobile.classList.add("block");
        MakiseKurisuMobile.classList.remove("hidden");

        yukino.classList.add("md:hidden");
        yukino.classList.remove("md:block");
        YukinoMobile.classList.add("hidden");
        YukinoMobile.classList.remove("block");

        Emilia.classList.add("md:hidden");
        Emilia.classList.remove("md:block");
        EmiliaMobile.classList.add("hidden");
        EmiliaMobile.classList.remove("block");
        break;
      case 2:
        Emilia.classList.add("md:block");
        Emilia.classList.remove("md:hidden");
        EmiliaMobile.classList.add("block");
        EmiliaMobile.classList.remove("hidden");

        MakiseKurisu.classList.add("md:hidden");
        MakiseKurisu.classList.remove("md:block");
        MakiseKurisuMobile.classList.add("hidden");
        MakiseKurisuMobile.classList.remove("block");

        yukino.classList.add("md:hidden");
        yukino.classList.remove("md:block");
        YukinoMobile.classList.add("hidden");
        YukinoMobile.classList.remove("block");
        break;
      default:
        break;
    }
  }, []);

  const toggleDrawerAnimation = () => {
    setdraweSecondState(!draweSecondState);
    setTimeout(() => {
      toggleDrawerState();
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Drawer</title>
        <meta name="description" content="Drawer Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        variants={variants}
        animate={draweSecondState ? "show" : "hide"}
        className={`
           h-screen
           w-screen 
           scale-100 
           overflow-hidden
           p-[1rem] transition-all duration-1000 
           after:absolute
           after:top-0
           after:right-0
           after:z-[99]
           after:h-full
           after:w-full
           after:bg-[rgba(0,0,0,0.6)]
           `}
      >
        <Image
          className={`absolute top-0 left-0 z-[99] hidden h-full w-full object-cover`}
          id="yukino"
          src={Yukino}
          width={0}
          height={0}
          alt="Yuikino"
        />
        <Image
          className={`absolute top-0 left-0 z-[99] hidden h-full w-full object-cover`}
          id="MakiseKurisu"
          src={MakiseKurisu}
          width={0}
          height={0}
          alt="MakiseKurisu"
        />

        <Image
          className={`absolute top-0 left-0 z-[99] h-full w-full object-cover md:hidden`}
          id="YukinoMobile"
          src={YukinoMobile}
          width={0}
          height={0}
          alt="YukinoMobile"
        />
        <Image
          className={`absolute top-0 left-0 z-[99] h-full w-full object-cover md:hidden`}
          id="MakiseKurisuMobile"
          src={MakiseKurisuMobile}
          width={0}
          height={0}
          alt="MakiseKurisuMobile"
        />

        <Image
          className={`absolute top-0 left-0 z-[99] h-full w-full object-cover md:hidden`}
          id="Emilia"
          src={Emilia}
          width={0}
          height={0}
          alt="Emilia"
        />
        <Image
          className={`absolute top-0 left-0 z-[99] h-full w-full object-cover md:hidden`}
          id="EmiliaMobile"
          src={EmiliaMobile}
          width={0}
          height={0}
          alt="EmiliaMobile"
        />
        {/* <video
          className={`absolute top-0 left-0 z-[99] hidden h-full w-full object-cover sm:block`}
          autoPlay
          loop
          muted
        >
          <source src={`./videos/yukinoshita.mp4`} type="video/mp4" />
        </video>
        <video
          className={`absolute top-0 left-0 z-[99] block h-full w-full object-cover sm:hidden`}
          autoPlay
          loop
          muted
        >
          <source src={`./videos/yukinoshitaMovile.mp4`} type="video/mp4" />
        </video> */}
        <div className={`container relative z-[999] mx-auto flex h-full w-full flex-col justify-between`}>
          {/* close-drawer and dowload CV buttons */}
          <nav>
            <div className={`flex flex-col items-center justify-center md:flex-row md:justify-between`}>
              <motion.button
                onClick={toggleDrawerAnimation}
                className={`
                hidden 
                h-[5.9375rem] 
                w-[17.5rem]
                cursor-pointer 
                items-center
                justify-between 
                rounded-[3rem] 
                border-4 
                border-white 
                bg-[transparent]
                py-[1rem]
                px-[1.8rem] 
                text-white
                md:flex
                `}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { duration: 1 } }}
                whileHover={{
                  scale: 1.1,
                  textShadow: "0px 0px 8px rgb(255,255,255)",
                  boxShadow: "0px 0px 8px rgb(255,255,255)",
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <FontAwesomeIcon className={`w-[3rem] text-[3rem] text-white`} icon={faArrowRight} />
                <motion.h2 className={`ml-4 mb-0 text-[1.5rem] text-white`}>Click to Unlock</motion.h2>
              </motion.button>
              {/* close drawerMobile button */}
              <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { duration: 1 } }}
                className={`flex w-full items-center justify-between rounded-[2.5rem] border-2 border-white p-4 md:hidden`}
              >
                <motion.div
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { duration: 1 } }}
                  className={`h-20 w-20`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{
                    scale: 0.95,
                  }}
                >
                  <Slice drawerState toggleDrawerState={toggleDrawerState} />
                </motion.div>
                <motion.h2 className={`mb-0 text-center text-[2rem] text-[#fefefe] sm:text-[3rem]`}>
                  Slide to Unlock
                </motion.h2>
              </motion.div>
              <a target="_blank" href={UrlCurriculum}>
                <motion.button
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { duration: 1 } }}
                  className={`
                      mt-8 
                      h-[5.9375rem] 
                      w-[17.5rem] 
                      cursor-pointer 
                      rounded-[3rem] 
                      border-4 
                      border-white 
                      bg-[transparent] 
                      py-4
                      px-8
                      text-[1.8rem]
                      font-bold
                      text-white
                      md:mt-0`}
                  whileHover={{
                    scale: 1.1,
                    textShadow: "0px 0px 8px rgb(255,255,255)",
                    boxShadow: "0px 0px 8px rgb(255,255,255)",
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                >
                  Descargar CV
                </motion.button>
              </a>
            </div>
          </nav>

          {/* title animated*/}

          <main>
            <div className={`flex flex-col overflow-hidden text-[1rem]`}>
              <div className={`hidden sm:block`}>
                <div
                  className={`text-[3.5rem] font-[600] text-white sm:text-h1_sm md:text-h1_md lg:text-h1_lg xl:text-h1_xl xxl:text-h1_xxl`}
                >
                  <AnimateText text="Federico Gerardi" />
                </div>
                <div
                  className={`text-[2.5rem] text-white sm:text-h2_sm md:text-h2_md lg:text-h2_lg xl:text-h2_xl xxl:text-h2_xxl`}
                >
                  <AnimateText text="Full-Stack Developer" />
                </div>
              </div>
              <div className={`block sm:hidden`}>
                <div
                  className={`text-[3.5rem] font-[600] text-white sm:text-h1_sm md:text-h1_md lg:text-h1_lg xl:text-h1_xl xxl:text-h1_xxl`}
                >
                  <AnimateText text="Federico" />
                  <AnimateText text="Gerardi" />
                </div>
                <div
                  className={`text-[2.5rem] text-white sm:text-h2_sm md:text-h2_md lg:text-h2_lg xl:text-h2_xl xxl:text-h2_xxl`}
                >
                  <AnimateText text="Full-Stack" />
                  <AnimateText text="Developer" />
                </div>
              </div>
            </div>
          </main>

          {/* social icons */}
          <footer>
            <div className={`flex cursor-pointer justify-between md:justify-end`}>
              <motion.a
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                target="_blank"
                href="https://github.com/FedericoGerardi-96"
              >
                <motion.div variants={iconVariants} whileHover={"hover"}>
                  <FontAwesomeIcon
                    className={`dropShadowHover m-0 w-12 text-[3rem] text-white md:my-0 md:mx-8 md:w-[4.5rem] md:text-[4.5rem]`}
                    icon={faGithub}
                  />
                </motion.div>
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1.2 } }}
                target="_blank"
                href="https://www.facebook.com/federico.gerardi.9"
              >
                <motion.div variants={iconVariants} whileHover={"hover"}>
                  <FontAwesomeIcon
                    className={`dropShadowHover m-0 w-12 text-[3rem] text-white md:my-0 md:mx-8 md:w-[4.5rem] md:text-[4.5rem]`}
                    icon={faFacebook}
                  />
                </motion.div>
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1.3 } }}
                target="_blank"
                href="https://www.linkedin.com/in/federico-gerardi96/"
              >
                <motion.div variants={iconVariants} whileHover={"hover"}>
                  <FontAwesomeIcon
                    className={`dropShadowHover m-0 w-12 text-[3rem] text-white md:my-0 md:mx-8 md:w-[4.5rem] md:text-[4.5rem]`}
                    icon={faLinkedin}
                  />
                </motion.div>
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1.4 } }}
                target="_blank"
                href="https://www.instagram.com/gerardi_federico/"
              >
                <motion.div variants={iconVariants} whileHover={"hover"}>
                  <FontAwesomeIcon
                    className={`dropShadowHover m-0 w-12 text-[3rem] text-white md:my-0 md:mx-8 md:w-[4.5rem] md:text-[4.5rem]`}
                    icon={faInstagram}
                  />
                </motion.div>
              </motion.a>
            </div>
          </footer>
        </div>
      </motion.div>
    </>
  );
};
