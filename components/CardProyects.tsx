import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { IProyects } from "../interfaces";

interface props {
  proyect: IProyects;
}

export const CardProyects = ({ proyect }: props) => {
  const { Tittle, Description, gitHubLink, pageLink, image, tecnologias } = proyect;
  return (
    <>
      <div className={`relative my-20`}>
        <div className="group relative cursor-pointer">
          <div
            className={`
              relative 
              z-[1]
              flex
              h-[250px] 
              w-[350px] 
              translate-y-[125px] 
              items-center 
              justify-center 
              bg-lightBlack
              duration-700
              group-hover:translate-y-0
              `}
          >
            <div className="relative z-10 flex h-full w-full flex-col justify-center duration-500  ">
              <img
                alt={Tittle!}
                src={image}
                className={`absolute h-full w-full object-cover grayscale  group-hover:grayscale-0`}
              />
              <h3 className={`relative z-20 mt-[10px] p-0 text-center text-[2rem] text-white`}>{Tittle}</h3>
            </div>
          </div>
          <div
            className={`relative 
                      box-border 
                      flex 
                      h-[250px] 
                      w-[350px] 
                      translate-y-[-125px] 
                      items-center 
                      justify-center 
                      bg-white 
                      p-5 
                      shadow-[0_20px_50px_rgba(0,0,0,0.8)] 
                      duration-700
                      group-hover:translate-y-0 `}
          >
            <div className="">
              <p className={`m-0 p-0 text-violet`}>{Description}</p>
              {tecnologias?.map((tecnologia, i) => (
                <span className={`mt-4 text-salmon`} key={i}>
                  {tecnologia} -
                </span>
              ))}
              <div className={`mt-4 flex items-center justify-evenly`}>
                <a
                  className={`flex h-[2rem] w-[8rem] items-center justify-center rounded-xl bg-green text-white  hover:bg-secondaryColor`}
                  target="_blank"
                  href={pageLink}
                >
                  <FontAwesomeIcon className={`relative z-[999] w-10 pr-4 text-[2rem] text-white`} icon={faEye} />
                  Preview
                </a>
                <a
                  className={`flex h-[2rem] w-[8rem] items-center justify-center rounded-xl bg-green text-white  hover:bg-secondaryColor`}
                  target="_blank"
                  href={gitHubLink}
                >
                  <FontAwesomeIcon className={`relative z-[999] w-10 pr-4 text-[2rem] text-white`} icon={faGithub} />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
