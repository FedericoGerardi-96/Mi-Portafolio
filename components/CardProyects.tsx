import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";

import { IProyects } from "../interfaces";

interface props {
  proyect: IProyects;
}

export const CardProyects = ({ proyect }: props) => {
  const { Tittle, Description, gitHubLink, pageLink, image, tecnologias } = proyect;
  return (
    <>
      <div className="group relative h-auto w-[450px] rounded-2xl p-2 transition-opacity duration-500">
        <div
          className="relative 
                    after:absolute 
                    after:top-0 
                    after:left-0 
                    after:h-full 
                    after:w-full 
                    after:rounded-2xl 
                  after:bg-[rgba(0,0,0,0.2)] 
                  group-hover:after:bg-[rgba(0,0,0,0.4)]"
        >
          <img
            className={`block h-[230px] w-[450px] rounded-2xl object-cover`}
            width={0}
            height={0}
            src={image}
            alt={Tittle!}
          />
          <div
            className=" 
                      ease 
                      absolute
                      left-0 
                      right-0
                      bottom-0
                      top-0
                      z-10 
                      flex 
                      cursor-default 
                      flex-col 
                      flex-nowrap 
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[rgba(277,232,234,0.75)]
                      opacity-0
                      shadow-[0_0_32px_-8px_#464646]
                      backdrop-filter
                      transition-all
                      duration-500
                      group-hover:opacity-100"
          />
          <div
            className={`absolute 
                        left-0
                       right-0
                        bottom-0 
                        top-0
                        z-20
                        flex 
                        flex-col
                        items-center
                        justify-center
                        p-16
                        opacity-0
                        transition-all
                        duration-500
                        group-hover:opacity-100`}
          >
            <h1 className={`text-[2rem] font-bold text-grey500 group-hover:animate-galleryText`}>{Tittle}</h1>
            <p className={`text-grey500  group-hover:animate-animation`}>{Description}</p>
            {tecnologias?.map((tecnologia, i) => (
              <span className={`mt-4 text-grey500 group-hover:animate-animation`} key={i}>
                {tecnologia} -
              </span>
            ))}
            <div className={`mt-4 flex items-center justify-evenly gap-5`}>
              <a
                className={`
                ease
                proyectoButtons
                group/item
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
                group-hover:animate-animation`}
                target="_blank"
                href={pageLink}
              >
                <FontAwesomeIcon
                  className={`
                    relative 
                    z-[999] 
                    w-[1.5rem]  
                    max-w-[1.5rem] 
                    text-[1.5rem] 
                    text-grey500 
                    transition-colors 
                    duration-500 
                    group-hover/item:text-white`}
                  icon={faEye}
                />
                Preview
              </a>
              <a
                className={`
                            group/item2
                            proyectoButtons
                            ease
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
                            duration-500
                            group-hover:animate-animation`}
                target="_blank"
                href={gitHubLink}
              >
                <FontAwesomeIcon
                  className={`
                    relative 
                    z-[999] 
                    w-[1.5rem] max-w-[1.5rem]
                    text-[1.5rem] 
                    text-grey500 
                    transition-colors 
                    duration-500 
                    group-hover/item2:text-white`}
                  icon={faGithub}
                />
                GitHub
              </a>
            </div>
          </div>
        </div>
        <h2 className={`text-[2rem] text-text lg:text-[3rem]`}>{Tittle}</h2>
      </div>
    </>
  );
};
