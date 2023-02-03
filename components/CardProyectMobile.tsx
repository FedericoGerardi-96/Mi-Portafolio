import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { IProyects } from "../interfaces";

interface props {
  proyect: IProyects;
}

export const CardProyectMobile = ({ proyect }: props) => {
  const { Tittle, Description, gitHubLink, pageLink, image, tecnologias } = proyect;
  return (
    <>
      <div className="relative h-auto w-[400px] rounded-2xl p-2">
        <div className={`shadow-[0_19px_24px_0_rgba(0,0,0,0.75)]`}>
          <img
            alt={Tittle!}
            width={0}
            height={0}
            src={image}
            className={`h-[300px]  w-full rounded-t-2xl object-cover`}
          />
        </div>
        <div
          className={`relative flex flex-col items-center justify-center rounded-b-2xl bg-white p-8 text-center shadow-[0_19px_24px_0_rgba(0,0,0,0.75)]`}
        >
          <h2
            className={`relative p-4 text-[2rem] text-grey500 after:absolute after:left-1/4 
                          after:top-[85%] 
                          after:block
                          after:h-[0.1rem] 
                          after:w-1/2
                          after:bg-grey500 
                          lg:text-[3rem]`}
          >
            {Tittle}
          </h2>
          <p className={`text-grey500  group-hover:animate-animation`}>{Description}</p>
          <p className={`mt-4 text-grey500 group-hover:animate-animation`}>Tecnologias: </p>
          <div className={`flex flex-row`}>
            {tecnologias?.map((tecnologia, i) => (
              <span className={`text-grey500 group-hover:animate-animation`} key={i}>
                {tecnologia} -
              </span>
            ))}
          </div>
          <div className={`mt-4 flex flex-row flex-wrap items-center justify-evenly gap-5`}>
            <a
              className={`
                proyectoButtons
                ease
                group
                flex 
                h-[2rem]
                w-[8rem]
                items-center 
                justify-center 
                gap-3 
                rounded-xl
                border-2
                border-grey500
                bg-transparent
                py-[10px]
                px-[20px]
                text-[14px]
                font-semibold 
                text-grey500 
                transition-all
                duration-700
                hover:text-white`}
              target="_blank"
              href={pageLink}
            >
              <FontAwesomeIcon
                className={`
                    relative 
                    w-[1.5rem]  
                    max-w-[1.5rem] 
                    text-[1.5rem] 
                    text-grey500 
                    transition-colors 
                    duration-500 
                    group-hover:text-white
                   `}
                icon={faEye}
              />
              Preview
            </a>
            <a
              className={`
                    proyectoButtons
                    ease
                    group
                    flex 
                    h-[2rem]
                    w-[8rem]
                    items-center 
                    justify-center 
                    gap-3 
                    rounded-xl
                    border-2
                    border-grey500
                    bg-transparent
                    py-[10px]
                    px-[20px]
                    text-[14px]
                    font-semibold 
                    text-grey500 
                    transition-all
                    duration-700
                    hover:bg-secondaryColor
                    hover:text-white`}
              target="_blank"
              href={gitHubLink}
            >
              <FontAwesomeIcon
                className={`
                    relative 
                    w-[1.5rem]  
                    max-w-[1.5rem] 
                    text-[1.5rem] 
                    text-grey500 
                    transition-colors 
                    duration-500 
                    group-hover:text-white 
                    `}
                icon={faGithub}
              />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
