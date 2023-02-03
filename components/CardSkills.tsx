import Image from "next/image";

import { ISkills } from "../interfaces";

interface props {
  skills: ISkills | null;
}

export const CardSkills = ({ skills }: props) => {
  const { id, Tittle, Description, image } = skills as ISkills;

  return (
    <>
      <div
        className={`
                    ease
                    m-2
                    flex 
                    h-auto 
                    w-[20rem] 
                    cursor-default  
                    items-center
                    rounded-[28px] 
                    border-[1px] 
                    border-[#dbdbdb]
                    bg-[rgb(232,235,236,70%)]
                    p-3
                    shadow-[0_5px_15px_rgba(0,0,0,0.35)]
                    md:shadow-none
                    hover:shadow-[0_5px_15px_rgba(0,0,0,0.35)]
                    transition-all
                    duration-300
       `}
      >
        <div className={`mr-4 flex items-center justify-center rounded-3xl`}>
          <img className={`h-[70px] w-[70px] object-contain`} src={image} alt={Tittle} />
        </div>
        <div className={`w-full text-left`}>
          <h6 className={`mb-1 text-[16px] font-medium text-black`}>{Tittle}</h6>
          <p className={`text-[14px] font-normal leading-5 text-[#4A4A4A]`}>{Description}</p>
        </div>
      </div>
    </>
  );
};
