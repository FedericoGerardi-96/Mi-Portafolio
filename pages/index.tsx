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
          <section className={`container mx-auto py-8`} id="hellow">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className={`flex flex-col items-center justify-center md:flex-row md:justify-between`}
            >
              <div>
                <motion.h1
                  className={`
                  text-[2.5rem] 
                  text-text 
                  sm:text-[3rem] 
                  md:text-[3.5rem] 
                  lg:text-[4rem] 
                  xl:text-[5rem] 
                  xxl:text-[6rem]`}
                  initial={{ x: -1000 }}
                  animate={{ x: 0, transition: { duration: 1 } }}
                >
                  Hola! Soy
                </motion.h1>
                <motion.h1
                  className={`
                  text-[2.5rem] 
                  font-bold
                  text-salmon
                  transition-colors 
                  duration-500 
                  sm:text-[3rem] 
                  md:text-[3.5rem]
                  lg:text-[4rem]
                  xl:text-[5rem] 
                  xxl:text-[6rem]`}
                  initial={{ x: -1000 }}
                  animate={{ x: 0, transition: { duration: 1 } }}
                >
                  Federico Gerardi
                </motion.h1>
                <motion.h3
                  className={`
                  mb-8
                  text-[.8rem] 
                  font-bold
                  text-text
                  sm:text-[1rem] 
                  md:text-[1.5rem]
                  lg:text-[2rem]
                  xl:text-[2.5rem] 
                  xxl:text-[3rem]`}
                  initial={{ x: -1000 }}
                  animate={{ x: 0, transition: { duration: 1 } }}
                >
                  FullStack Developer
                </motion.h3>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 1 } }}>
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
                  className={`w-[20rem] object-contain md:w-[20rem] lg:w-[25rem]`}
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
