import { useContext, useEffect, useState } from "react";

import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faMailchimp, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faBagShopping, faBook } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import { Layout, Loader } from "../../components";

import { PortfolioContext } from "../../context/portfolio";

const AboutMe = () => {
  const [isLoading, setisLoading] = useState(true);
  const { Experiences, Educations } = useContext(PortfolioContext);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 500);
  }, []);

  function calculateAge(birthday: any) {
    var birthday_arr = birthday.split("/");
    var birthday_date = new Date(birthday_arr[2], birthday_arr[1] - 1, birthday_arr[0]);
    var ageDifMs = Date.now() - birthday_date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  return (
    <Layout title="Sobre Mi" pageDescription="Informacion sobre mi">
      {isLoading ? (
        <Loader />
      ) : (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className={`container mx-auto px-4 py-12 text-center lg:px-12`}
        >
          <motion.h1
            initial={{ opacity: 0, y: -1000 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1.5 } }}
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
          >
            SOBRE <span className={`text-salmon`}>MI</span>
          </motion.h1>
          <div
            className={`mt-12 flex flex-col items-center justify-evenly gap-4 lg:mt-16 lg:flex-row lg:gap-24 xl:gap-32`}
          >
            <motion.div
              initial={{ opacity: 0, x: -1000 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 1.5 } }}
              className={`borderRadiusCustom w-[250px]  p-6 md:w-[350px]`}
            >
              <div className="reflection-container">
                <a className="reflection-grid-cell reflection-grid-cell-1"></a>
                <a className="reflection-grid-cell reflection-grid-cell-2"></a>
                <a className="reflection-grid-cell reflection-grid-cell-3"></a>
                <a className="reflection-grid-cell reflection-grid-cell-4"></a>
                <a className="reflection-grid-cell reflection-grid-cell-5"></a>
                <a className="reflection-grid-cell reflection-grid-cell-6"></a>
                <a className="reflection-grid-cell reflection-grid-cell-7"></a>
                <a className="reflection-grid-cell reflection-grid-cell-8"></a>
                <a className="reflection-grid-cell reflection-grid-cell-9"></a>
                <a className="reflection-grid-cell reflection-grid-cell-10"></a>
                <a className="reflection-grid-cell reflection-grid-cell-11"></a>
                <a className="reflection-grid-cell reflection-grid-cell-12"></a>
                <a className="reflection-grid-cell reflection-grid-cell-13"></a>
                <a className="reflection-grid-cell reflection-grid-cell-14"></a>
                <a className="reflection-grid-cell reflection-grid-cell-15"></a>
                <a className="reflection-grid-cell reflection-grid-cell-16"></a>
                <a className="reflection-grid-cell reflection-grid-cell-17"></a>
                <a className="reflection-grid-cell reflection-grid-cell-18"></a>
                <a className="reflection-grid-cell reflection-grid-cell-19"></a>
                <a className="reflection-grid-cell reflection-grid-cell-20"></a>
                <a className="reflection-grid-cell reflection-grid-cell-21"></a>
                <a className="reflection-grid-cell reflection-grid-cell-22"></a>
                <a className="reflection-grid-cell reflection-grid-cell-23"></a>
                <a className="reflection-grid-cell reflection-grid-cell-24"></a>
                <a className="reflection-grid-cell reflection-grid-cell-25"></a>
                <a className="reflection-grid-cell reflection-grid-cell-26"></a>
                <a className="reflection-grid-cell reflection-grid-cell-27"></a>
                <a className="reflection-grid-cell reflection-grid-cell-28"></a>
                <a className="reflection-grid-cell reflection-grid-cell-29"></a>
                <a className="reflection-grid-cell reflection-grid-cell-30"></a>
                <a className="reflection-grid-cell reflection-grid-cell-31"></a>
                <a className="reflection-grid-cell reflection-grid-cell-32"></a>
                <a className="reflection-grid-cell reflection-grid-cell-33"></a>
                <a className="reflection-grid-cell reflection-grid-cell-34"></a>
                <a className="reflection-grid-cell reflection-grid-cell-35"></a>
                <a className="reflection-grid-cell reflection-grid-cell-36"></a>
                <a className="reflection-grid-cell reflection-grid-cell-37"></a>
                <a className="reflection-grid-cell reflection-grid-cell-38"></a>
                <a className="reflection-grid-cell reflection-grid-cell-39"></a>
                <a className="reflection-grid-cell reflection-grid-cell-40"></a>
                <a className="reflection-grid-cell reflection-grid-cell-41"></a>
                <a className="reflection-grid-cell reflection-grid-cell-42"></a>
                <a className="reflection-grid-cell reflection-grid-cell-43"></a>
                <a className="reflection-grid-cell reflection-grid-cell-44"></a>
                <a className="reflection-grid-cell reflection-grid-cell-45"></a>
                <a className="reflection-grid-cell reflection-grid-cell-46"></a>
                <a className="reflection-grid-cell reflection-grid-cell-47"></a>
                <a className="reflection-grid-cell reflection-grid-cell-48"></a>
                <a className="reflection-grid-cell reflection-grid-cell-49"></a>
                <a className="reflection-grid-cell reflection-grid-cell-50"></a>
                <a className="reflection-grid-cell reflection-grid-cell-51"></a>
                <a className="reflection-grid-cell reflection-grid-cell-52"></a>
                <a className="reflection-grid-cell reflection-grid-cell-53"></a>
                <a className="reflection-grid-cell reflection-grid-cell-54"></a>
                <a className="reflection-grid-cell reflection-grid-cell-55"></a>
                <a className="reflection-grid-cell reflection-grid-cell-56"></a>
                <a className="reflection-grid-cell reflection-grid-cell-57"></a>
                <a className="reflection-grid-cell reflection-grid-cell-58"></a>
                <a className="reflection-grid-cell reflection-grid-cell-59"></a>
                <a className="reflection-grid-cell reflection-grid-cell-60"></a>
                <a className="reflection-grid-cell reflection-grid-cell-61"></a>
                <a className="reflection-grid-cell reflection-grid-cell-62"></a>
                <a className="reflection-grid-cell reflection-grid-cell-63"></a>
                <a className="reflection-grid-cell reflection-grid-cell-64"></a>
                <a className="reflection-grid-cell reflection-grid-cell-65"></a>
                <a className="reflection-grid-cell reflection-grid-cell-66"></a>
                <a className="reflection-grid-cell reflection-grid-cell-67"></a>
                <a className="reflection-grid-cell reflection-grid-cell-68"></a>
                <a className="reflection-grid-cell reflection-grid-cell-69"></a>
                <a className="reflection-grid-cell reflection-grid-cell-70"></a>
                <a className="reflection-grid-cell reflection-grid-cell-71"></a>
                <a className="reflection-grid-cell reflection-grid-cell-72"></a>
                <a className="reflection-grid-cell reflection-grid-cell-73"></a>
                <a className="reflection-grid-cell reflection-grid-cell-74"></a>
                <a className="reflection-grid-cell reflection-grid-cell-75"></a>
                <a className="reflection-grid-cell reflection-grid-cell-76"></a>
                <a className="reflection-grid-cell reflection-grid-cell-77"></a>
                <a className="reflection-grid-cell reflection-grid-cell-78"></a>
                <a className="reflection-grid-cell reflection-grid-cell-79"></a>
                <a className="reflection-grid-cell reflection-grid-cell-80"></a>
                <a className="reflection-grid-cell reflection-grid-cell-81"></a>
                <a className="reflection-grid-cell reflection-grid-cell-82"></a>
                <a className="reflection-grid-cell reflection-grid-cell-83"></a>
                <a className="reflection-grid-cell reflection-grid-cell-84"></a>
                <a className="reflection-grid-cell reflection-grid-cell-85"></a>
                <a className="reflection-grid-cell reflection-grid-cell-86"></a>
                <a className="reflection-grid-cell reflection-grid-cell-87"></a>
                <a className="reflection-grid-cell reflection-grid-cell-88"></a>
                <a className="reflection-grid-cell reflection-grid-cell-89"></a>
                <a className="reflection-grid-cell reflection-grid-cell-90"></a>
                <a className="reflection-grid-cell reflection-grid-cell-91"></a>
                <a className="reflection-grid-cell reflection-grid-cell-92"></a>
                <a className="reflection-grid-cell reflection-grid-cell-93"></a>
                <a className="reflection-grid-cell reflection-grid-cell-94"></a>
                <a className="reflection-grid-cell reflection-grid-cell-95"></a>
                <a className="reflection-grid-cell reflection-grid-cell-96"></a>
                <a className="reflection-grid-cell reflection-grid-cell-97"></a>
                <a className="reflection-grid-cell reflection-grid-cell-98"></a>
                <a className="reflection-grid-cell reflection-grid-cell-99"></a>
                <a className="reflection-grid-cell reflection-grid-cell-100"></a>
                <div
                  style={{ borderRadius: "54% 46% 33% 67% / 58% 68% 32% 42% " }}
                  className="reflection-content"
                ></div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 1000 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 1.5 } }}
              className={`flex flex-col`}
            >
              <div
                className={`borderRadiusCustom2 flex h-auto w-auto flex-col items-center bg-white p-6 shadow-[0_5px_15px_rgba(0,0,0,0.35)]`}
              >
                <p className={`text-violet`}>
                  Soy Federico Gerardi tengo {calculateAge("25/03/1996")} años, Estudiante de Ingeniería de Sistemas, .
                  Me considero una persona responsable y capaz. Confío en mis habilidades para diseñar y/o desarrollar
                  lo que sea. Estoy en búsqueda de una compañía que me de la posibilidad de aprender y demostrar mis
                  conocimientos.
                </p>
              </div>
              <div className={`mt-16 flex w-full cursor-pointer justify-between lg:justify-end`}>
                <motion.a
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                  target="_blank"
                  className={`flex items-center justify-center`}
                  href="https://github.com/FedericoGerardi-96"
                >
                  <motion.div>
                    <FontAwesomeIcon
                      className={`dropShadowHover m-0 w-12 min-w-[3rem] text-[3rem] text-text md:my-0 md:mx-8 md:w-[4.5rem] md:min-w-[4.5rem] md:text-[4.5rem]`}
                      icon={faGithub}
                    />
                  </motion.div>
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 1.2 } }}
                  target="_blank"
                  className={`flex items-center justify-center`}
                  href="https://api.whatsapp.com/send?phone=+541134184649&text=¡Buen día! Estoy interesado en comunicarme con usted"
                >
                  <motion.div>
                    <FontAwesomeIcon
                      className={`dropShadowHover m-0 w-12 min-w-[3rem] text-[3rem] text-text md:my-0 md:mx-8 md:w-[4.5rem] md:min-w-[4.5rem] md:text-[4.5rem]`}
                      icon={faWhatsapp}
                    />
                  </motion.div>
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 1.3 } }}
                  target="_blank"
                  className={`flex items-center justify-center`}
                  href="https://www.linkedin.com/in/federico-gerardi96/"
                >
                  <motion.div>
                    <FontAwesomeIcon
                      className={`dropShadowHover m-0 w-12 min-w-[3rem] text-[3rem] text-text md:my-0 md:mx-8 md:w-[4.5rem] md:min-w-[4.5rem] md:text-[4.5rem]`}
                      icon={faLinkedin}
                    />
                  </motion.div>
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 1.4 } }}
                  target="_blank"
                  className={`flex items-center justify-center`}
                  href="mailto:gerardi9690@gmail.com"
                >
                  <motion.div>
                    <FontAwesomeIcon
                      className={`dropShadowHover m-0 w-12 min-w-[3rem] text-[3rem] text-text md:my-0 md:mx-8 md:w-[4.5rem] md:min-w-[4.5rem] md:text-[4.5rem]`}
                      icon={faEnvelope}
                    />
                  </motion.div>
                </motion.a>
              </div>
            </motion.div>
          </div>
          <div className={`mt-12`}>
            <motion.h2
              className={`relative text-[2rem] 
                        after:absolute 
                        after:left-1/4 
                        after:block 
                        after:h-1 
                        after:w-1/2 
                        after:bg-salmon 
                        sm:text-[1.5rem] 
                        md:text-[1.8rem] 
                        lg:text-[2.2rem] 
                        xl:text-[2.6rem] 
                        xxl:text-[3rem]`}
              initial={{ x: -1000 }}
              animate={{ x: 0, transition: { duration: 2 } }}
            >
              Educacion y Experiencia
            </motion.h2>
            <div className={`mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2`}>
              <div>
                <motion.h2
                  className={`
                        relative
                        py-8 
                        text-[1.2rem]
                        after:absolute 
                        after:left-1/4 
                        after:block 
                        after:h-1 
                        after:w-1/2 
                        after:bg-grey 
                        sm:text-[1.2rem] 
                        md:text-[1.3rem] 
                        lg:text-[2.5rem] 
                        xl:text-[1.6rem] 
                        xxl:text-[2rem]`}
                  initial={{ x: -1000 }}
                  animate={{ x: 0, transition: { duration: 2 } }}
                >
                  Experiencia Laboral
                </motion.h2>
                <div className={`flex w-full flex-col justify-start`}>
                  {Experiences?.map(({ id, posición, description, company, workSince, workTo }, i) => (
                    <motion.div
                      key={id}
                      className={`flex w-full flex-col border-b-[1px] border-b-grey py-2`}
                      initial={{ x: -1000 }}
                      animate={{ x: 0, transition: { duration: 2, delay: i + 0.2 } }}
                    >
                      <h3 className={`mb-3 max-w-[75%] text-left text-text`}>{company}</h3>
                      <div className={`flex justify-between gap-6`}>
                        <div className={`flex items-center gap-4`}>
                          <FontAwesomeIcon
                            className={`m-0 w-4 min-w-[1rem] text-[1rem] text-grey md:w-[1.5rem] md:text-[1.5rem]`}
                            icon={faBagShopping}
                          />
                          <p className={`text-text`}>{posición}</p>
                        </div>
                        <span className={`text-grey`}>
                          {workSince} - {workTo}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <motion.h2
                  className={`
                        relative
                        py-8 
                        text-[1.2rem]
                        after:absolute 
                        after:left-1/4 
                        after:block 
                        after:h-1 
                        after:w-1/2 
                        after:bg-grey 
                        sm:text-[1.2rem] 
                        md:text-[1.3rem] 
                        lg:text-[2.5rem] 
                        xl:text-[1.6rem] 
                        xxl:text-[2rem]`}
                  initial={{ x: 1000 }}
                  animate={{ x: 0, transition: { duration: 2 } }}
                >
                  Educacion
                </motion.h2>
                <div className={`flex w-full flex-col justify-start`}>
                  {Educations?.map(({ id, tittle, place, description, start, finish }, i) => (
                    <motion.div
                      key={id}
                      className={`flex w-full flex-col border-b-[1px] border-b-grey py-2`}
                      initial={{ x: 1000 }}
                      animate={{ x: 0, transition: { duration: 2, delay: i + 0.2 } }}
                    >
                      <h3 className={`mb-3 max-w-[75%] text-left text-text`}>{place}</h3>
                      <div className={`flex justify-between gap-6`}>
                        <div className={`flex items-center gap-4`}>
                          <FontAwesomeIcon
                            className={`m-0 w-4 min-w-[1rem] text-[1rem] text-grey md:w-[1.5rem] md:text-[1.5rem]`}
                            icon={faBook}
                          />
                          <p className={`text-text`}>{tittle}</p>
                        </div>
                        <span className={`text-grey`}>
                          {start} - {finish}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </Layout>
  );
};

export default AboutMe;
