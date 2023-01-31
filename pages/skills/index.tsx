import { useContext, useEffect, useState } from "react";

import { motion } from "framer-motion";

import { CardSkills, Layout, Loader } from "../../components";
import { PortfolioContext } from "../../context/portfolio";

const Skills = () => {
  const [isLoading, setisLoading] = useState(true);
  const { Skills } = useContext(PortfolioContext);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 500);
  }, []);

  return (
    <Layout title="Sobre Mi" pageDescription="Informacion sobre mi">
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
            animate={{ x: 0, transition: { duration: 1 } }}
          >
            MIS <span className={`text-salmon`}>SKILLS</span>
          </motion.h1>
          <div className={`mt-11 flex flex-wrap items-center justify-evenly gap-6`}>
            {Skills?.map((skill, i) => (
              <motion.div
                key={skill.id}
                className={`flex flex-col gap-4`}
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { duration: 1, delay: i + 0.2 } }}
              >
                <CardSkills skills={skill} />
                <h1 className={`mt-6 text-[2rem] text-text`}>{skill.Tittle}</h1>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </Layout>
  );
};

export default Skills;
