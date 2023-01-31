import { createContext } from "react";
import { ICvLink, IEducation, IExperience, IProyects, ISkills } from "../../interfaces";

interface ContextProps {
  isSaving: boolean;
  cvUrl: ICvLink | null;
  Skills: ISkills[] | null;
  Proyects: IProyects[] | null;
  Experiences: IExperience[] | null;
  Educations: IEducation[] | null;
  updatePortafolioURL: (Url: string) => Promise<boolean>;
  getPortafolioURL: () => Promise<void>;
  insertImageCloudinary: (Image: any) => Promise<string>;
  insertNewSkill: (skill: ISkills) => Promise<boolean>;
  getSkills: () => Promise<void>;
  deleteSkill: (id: string) => Promise<boolean>;
  updateSkill: (skill: ISkills) => Promise<boolean>;
  getProyects: () => Promise<void>;
  insertNewProyect: (proyect: IProyects) => Promise<boolean>;
  updateProyect: (proyect: IProyects) => Promise<boolean>;
  deleteProyect: (id: string) => Promise<boolean>;
  getExperience: () => Promise<void>;
  insertNewExperience: (experience: IExperience) => Promise<boolean>;
  updateExperience: (experience: IExperience) => Promise<boolean>;
  deleteExperience: (id: string) => Promise<boolean>;
  getEducation: () => Promise<void>;
  insertNewEducation: (edication: IEducation) => Promise<boolean>;
  updateEducation: (edication: IEducation) => Promise<boolean>;
  deleteEducation: (id: string) => Promise<boolean>;
}

export const PortfolioContext = createContext({} as ContextProps);
