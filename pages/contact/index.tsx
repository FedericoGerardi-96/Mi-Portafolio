import { useContext, useEffect, useState } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Layout, Loader } from "../../components";

import LogoWhattsApp from "../../public/LogoWhattsApp.png";
import LogoEmail from "../../public/Logo.png";
import { useForm } from "react-hook-form";
import { insertMessage } from "../../helpers/contactMessage";
import { validations } from "../../utilities";
import { PortfolioContext } from "../../context/portfolio";
import { AuthContext, ThemeContext } from "../../context";

const Contact = () => {
  const [isLoading, setisLoading] = useState(true);
  const [isSaving, setisSaving] = useState(false);
  const { getLocalStorageActiveTheme } = useContext(ThemeContext);
  const { setLogUser } = useContext(AuthContext);


  type FormData = {
    name: string;
    email: string;
    message: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { name: "", email: "", message: "" } });

  useEffect(() => {
    setTimeout(() => {
      getLocalStorageActiveTheme();
      setLogUser();
      setisLoading(false);
    }, 500);
  }, []);

  const onSendMessage = async ({ name, email, message }: FormData) => {
    setisSaving(true);
    let dateNow = new Date();
    let day = dateNow.getDate();
    let month = dateNow.getMonth() + 1;
    let year = dateNow.getFullYear();
    let hours = dateNow.getHours();
    let minutes = dateNow.getMinutes();
    let date = `${day + "/" + month + "/" + year + " " + hours + ":" + minutes}`;
    const ok = await insertMessage({ name, email, message, date });
    if (ok) {
      reset();
      Swal.fire("Succes", "Mensaje enviado correctamente", "success");
      setisSaving(false);
      return;
    }
    setisSaving(false);
    Swal.fire("Error", "Error al enviar el mensaje", "warning");
  };

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
          className={`container mx-auto px-8 pb-14 text-center`}
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
            initial={{ y: -1000 }}
            animate={{ y: 0, transition: { duration: 2 } }}
          >
            MI <span className={`text-salmon`}>CONTACTO</span>
          </motion.h1>
          <div className={`flex w-full items-center justify-center border-b-[1px] border-white pb-8`}>
            <div
              className={`mt-24 
                          flex 
                          flex-col 
                          items-center
                          justify-center 
                          gap-8 
                          p-4                          
                          md:flex-row 
                          `}
            >
              <motion.a
                href="mailto:gerardi9690@gmail.com"
                className={`dropShadowHover    
                            borderRadiusCustom2           
                            flex 
                            w-[13rem]
                            cursor-pointer  
                            flex-row 
                            items-center 
                            justify-center 
                            rounded-2xl 
                            bg-white 
                            p-4 
                            shadow-[0_5px_15px_rgba(0,0,0,0.35)]`}
                initial={{ x: -1000 }}
                animate={{ x: 0, transition: { duration: 2 } }}
              >
                <Image
                  alt="logo email"
                  src={LogoEmail}
                  width={0}
                  height={0}
                  className={`m-0 h-[50px] w-[50px] object-contain`}
                />
                <h3 className={`ml-4 text-[#000]`}>E-Mail</h3>
              </motion.a>
              <motion.a
                target="_blank"
                href="https://api.whatsapp.com/send?phone=+541134184649&text=¡Buen día! Estoy interesado en comunicarme con usted"
                className={`dropShadowHover 
                          borderRadiusCustom2               
                          flex
                          w-[13rem]
                          cursor-pointer  
                          flex-row 
                          items-center 
                          justify-center 
                          rounded-2xl 
                          bg-white 
                          p-4 
                          shadow-[0_5px_15px_rgba(0,0,0,0.35)]`}
                initial={{ x: 1000 }}
                animate={{ x: 0, transition: { duration: 2 } }}
              >
                <Image
                  alt="logo Whats App"
                  src={LogoWhattsApp}
                  width={0}
                  height={0}
                  className={`m-0 h-[50px] w-[50px] object-contain`}
                />
                <h3 className={`ml-4 text-[#000]`}>WhattsApp</h3>
              </motion.a>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSendMessage)}
            className={`mt-12 rounded-3xl p-6 shadow-[0_5px_15px_rgba(0,0,0,0.35)]`}
          >
            <motion.h2
              className={`
                        relative
                        py-8 
                        text-[2rem] 
                        after:absolute 
                        after:left-1/4 
                        after:block 
                        after:h-1 
                        after:w-1/2 
                        after:bg-grey 
                        sm:text-[1.4rem] 
                        md:text-[1.8rem] 
                        lg:text-[2.4rem] 
                        xl:text-[3rem] 
                        xxl:text-[3.2rem]`}
              initial={{ x: 1000 }}
              animate={{ x: 0, transition: { duration: 2 } }}
            >
              Dejar un mensaje
            </motion.h2>
            <div className={`flex w-full flex-col items-start justify-center`}>
              <motion.input
                id="name"
                className={`
                    w-full  
                    rounded-md 
                    border-[1px] 
                    border-inputBorder
                    bg-inputBg
                    py-2 
                    px-2 
                    text-[1.1rem] 
                    text-imputColor 
                    placeholder:text-imputColor  
                    focus:bg-inputBg
                    focus:outline-none 
                    active:bg-inputBg 
                    active:outline-none`}
                initial={{ x: 2000 }}
                animate={{ x: 0, transition: { duration: 1.3, delay: 1 } }}
                placeholder="Nombre"
                type="text"
                {...register("name", {
                  required: "Este campo es requerido",
                })}
              />
              {!!errors.name && <p className={`text-error`}>{errors.name.message}</p>}
            </div>
            <div className={`mt-6 flex w-full flex-col items-start justify-center`}>
              <motion.input
                id="email"
                className={`
                    w-full  
                    rounded-md
                    border-[1px] 
                    border-inputBorder
                    bg-inputBg
                    py-2 
                    px-2 
                    text-[1.1rem] 
                    text-imputColor 
                    placeholder:text-imputColor  
                    focus:bg-inputBg 
                    focus:outline-none 
                    active:bg-inputBg 
                    active:outline-none`}
                initial={{ x: 2000 }}
                animate={{ x: 0, transition: { duration: 1.3, delay: 1.5 } }}
                placeholder="E-mail"
                type="text"
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
              />
              {!!errors.email && <p className={`text-error`}>{errors.email.message}</p>}
            </div>
            <div className={`mt-6 flex w-full flex-col items-start justify-center`}>
              <motion.input
                id="message"
                className={`
                    w-full  
                    rounded-md 
                    border-[1px] 
                    border-inputBorder
                    bg-inputBg
                    py-2 
                    px-2 
                    text-[1.1rem] 
                    text-imputColor 
                    placeholder:text-imputColor  
                    focus:bg-inputBg 
                    focus:outline-none 
                    active:bg-inputBg 
                    active:outline-none`}
                initial={{ x: 2000 }}
                animate={{ x: 0, transition: { duration: 1.3, delay: 2 } }}
                placeholder="Mensaje"
                type="text"
                {...register("message", {
                  required: "Este campo es requerido",
                })}
              />
              {!!errors.message && <p className={`text-error`}>{errors.message.message}</p>}
            </div>
            <motion.button
              disabled={isSaving}
              type="submit"
              className={`
                          mt-8
                          mb-3
                          rounded-[10px] 
                          border-0 
                          bg-[rgb(255,56,86)]
                          py-[17px]
                          px-[40px]
                          text-[15px]
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
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { duration: 1.3, delay: 2.2 } }}
            >
              Enviar
            </motion.button>
          </form>
        </motion.section>
      )}
    </Layout>
  );
};

export default Contact;
