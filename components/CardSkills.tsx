import Image from "next/image";

import { ISkills } from "../interfaces";

interface props {
  skills: ISkills | null;
}

export const CardSkills = ({ skills }: props) => {
  const { id, Tittle, Description, image } = skills as ISkills;

  return (
    <>
      <div className={`perspective group h-[150px] w-[150px] bg-transparent`}>
        <div
          className={`
                            transform_style
                            relative 
                            h-full 
                            w-full 
                            text-center
                            transition-transform 
                            duration-500
                            group-hover:rotate-y-180`}
        >
          <div
            className={`backface_visibility 
                        absolute
                        flex 
                        h-full 
                        w-full 
                        flex-col 
                        items-center 
                        justify-center 
                        rounded-2xl
                        bg-transparent 
                        `}
          >
            {/* <p className="m-0 text-center text-[1.5rem] font-black">{Tittle}</p> */}
            <Image className={`mt-4`} alt={Tittle!} width={150} height={150} src={image}></Image>
          </div>
          <div
            className={`backface_visibility                                
                        absolute
                        flex
                        h-full 
                        w-full 
                        flex-col 
                        justify-center 
                        rounded-2xl 
                        bg-salmon 
                        p-4
                        rotate-y-180`}
          >
            <p className="m-0 text-center text-[1.2rem] font-black text-white">{Tittle}</p>
            <p className="m-0 text-center text-[1rem] text-white">{Description}</p>
          </div>
        </div>       
      </div>
    </>
  );
};
