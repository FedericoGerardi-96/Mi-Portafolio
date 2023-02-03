import React, { useContext, useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Layout } from "../../components/layout";
import { Loader } from "../../components/Loader";
import { PortfolioContext } from "../../context/portfolio";

import { CardProyects } from "../../components";
import { CardProyectMobile } from "../../components/CardProyectMobile";

const Trabajos = () => {
  const [isLoading, setisLoading] = useState(true);
  const { Proyects } = useContext(PortfolioContext);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <Layout title="Trabajos" pageDescription="Trabajos realizados por mi">
        {isLoading ? (
          <Loader />
        ) : (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            className={`container mx-auto p-8 text-center`}
          >
            <motion.h1
              className={`relative text-[2rem] 
                          after:absolute 
                          after:left-1/4 
                          after:block 
                          after:h-1 
                          after:w-1/2 
                          after:bg-salmon 
                          sm:text-[2.5rem] 
                          md:text-[3rem] 
                          lg:text-[3.5rem] 
                          xl:text-[4rem] 
                          xxl:text-[5rem]`}
              initial={{ x: -1000 }}
              animate={{ x: 0, transition: { duration: 2 } }}
            >
              MIS <span className={`text-salmon`}>PROYECTOS</span>
            </motion.h1>
            <div className={`mt-12 hidden max-w-full flex-wrap justify-center gap-8 md:flex`}>
              {Proyects?.map((proyect, i) => (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { duration: 0.5, delay: i * 0.5 } }}
                  key={proyect.id!}
                >
                  <CardProyects proyect={proyect} />
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { duration: 2 } }}
              className={`mt-12 flex max-w-full flex-wrap justify-center gap-8 md:hidden`}
            >
              {Proyects?.map((proyect) => (
                <CardProyectMobile key={proyect.id!} proyect={proyect} />
              ))}
            </motion.div>
          </motion.section>
        )}
      </Layout>
    </>
  );
};

export default Trabajos;
