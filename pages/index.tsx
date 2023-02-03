import { useContext, useEffect, useState } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import { Layout } from "../components/layout";
import { Loader } from "../components/Loader";
import { PortfolioContext } from "../context/portfolio";

import Kurisu from "../public/Kurisu.png";

export default function Home() {
  const [isLoading, setisLoading] = useState(true);

  const { cvUrl } = useContext(PortfolioContext);
  const { UrlCurriculum } = cvUrl || { UrlCurriculum: "" };

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout title="Home" pageDescription="HomePage">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className={`flex h-[80vh] w-full items-center justify-center overflow-hidden md:h-full`} id="hellow">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className={`grid grid-cols-herMobile items-center justify-items-center md:grid-cols-hero md:gap-8`}
            >
              <div>
                <motion.h1
                  className={`
                  text-center
                  text-[2.5rem] 
                  text-text 
                  md:text-left 
                  md:text-[3rem]
                  lg:text-[4rem] 
                  xl:text-[4.5rem] 
                  xxl:text-[5rem]`}
                  initial={{ x: -1000 }}
                  animate={{ x: 0, transition: { duration: 1 } }}
                >
                  Hola! Soy
                </motion.h1>
                <motion.h1
                  className={`
                  text-center 
                  text-[2.5rem]
                  font-bold 
                  text-salmon 
                  text-text
                  transition-colors 
                  duration-500 
                  md:text-left 
                  md:text-[2.7rem]
                  lg:text-[4rem] 
                  xl:text-[4.5rem] 
                  xxl:text-[5rem]`}
                  initial={{ x: -1000 }}
                  animate={{ x: 0, transition: { duration: 1 } }}
                >
                  Federico Gerardi
                </motion.h1>
                <motion.h3
                  className={`
                  mb-8
                  text-center 
                  text-[2rem]
                  font-bold
                  text-text
                  sm:text-[2.2rem]
                  md:text-left 
                  md:text-[2.5rem]
                  lg:text-[2.7rem]
                  xl:text-[3.5rem] 
                  xxl:text-[4rem]`}
                  initial={{ x: -1000 }}
                  animate={{ x: 0, transition: { duration: 1 } }}
                >
                  FullStack Developer
                </motion.h3>
                <motion.div
                  className={`flex items-center justify-center md:justify-start`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { duration: 1 } }}
                >
                  <motion.a
                    target="_blank"
                    href={UrlCurriculum}
                    className={`                        
                        rounded-[10px] 
                        border-0 
                        bg-[rgb(255,56,86)]
                        py-[17px]
                        px-[40px]
                        text-[20px]
                        tracking-[1.5px] 
                        text-[hsl(0,0%,100%)] 
                        shadow-[0_10px_0_0_rgb(201,46,70)]
                        transition-all
                        duration-300
                        active:translate-y-[5px]
                        active:bg-[rgb(255,56,86)]
                        active:shadow-[0_0_0_0_rgb(201,46,70)]
                        active:duration-200
                    `}
                  >
                    Descargar CV
                  </motion.a>
                </motion.div>
              </div>
              <motion.div
                className={`mt-8 lg:mt-0`}
                initial={{ scale: 0, rotate: "90deg" }}
                animate={{ scale: 1, rotate: "0deg", transition: { duration: 1 } }}
              >
                <Image
                  draggable={false}
                  className={` hidden h-auto w-[25rem] object-contain md:block`}
                  alt="Makise Kurisu"
                  src={Kurisu}
                ></Image>
              </motion.div>
            </motion.div>
          </section>
        </>
      )}
    </Layout>
  );
}
