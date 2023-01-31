import { ICvLink, ISkills, IProyects, IExperience, IEducation } from "../../interfaces";
import { PortfolioState } from "./";

type PortfolioActionType =
  | { type: "[Loading] - finishIsLoading" }
  | { type: "[Loading] - startIsLoading" }
  | { type: "[Portfolio] - getPortafolioURL"; payload: ICvLink }
  | { type: "[Portfolio] - updatePortafolioURL"; payload: ICvLink }
  | { type: "[Skills] - getSkills"; payload: ISkills[] }
  | { type: "[Skills] - insertSkills"; payload: ISkills }
  | { type: "[Skills] - updateSkills"; payload: ISkills }
  | { type: "[Skills] - deleteSkills"; payload: ISkills }
  | { type: "[Proyects] - getProyects"; payload: IProyects[] }
  | { type: "[Proyects] - insertProyects"; payload: IProyects }
  | { type: "[Proyects] - updateProyects"; payload: IProyects }
  | { type: "[Proyects] - deleteProyects"; payload: IProyects }
  | { type: "[Experience] - getExperience"; payload: IExperience[] }
  | { type: "[Experience] - insertExperience"; payload: IExperience }
  | { type: "[Experience] - updateExperience"; payload: IExperience }
  | { type: "[Experience] - deleteExperience"; payload: IExperience }
  | { type: "[Education] - getEducation"; payload: IEducation[] }
  | { type: "[Education] - insertEducation"; payload: IEducation }
  | { type: "[Education] - updateEducation"; payload: IEducation }
  | { type: "[Education] - deleteEducation"; payload: IEducation };

export const PortfolioReducer = (state: PortfolioState, action: PortfolioActionType): PortfolioState => {
  switch (action.type) {
    case "[Loading] - startIsLoading":
      return {
        ...state,
        isSaving: true,
      };
    case "[Loading] - finishIsLoading":
      return {
        ...state,
        isSaving: false,
      };
    case "[Portfolio] - getPortafolioURL":
      return {
        ...state,
        cvUrl: action.payload,
      };
    case "[Portfolio] - updatePortafolioURL":
      return {
        ...state,
        cvUrl: action.payload,
      };
    case "[Skills] - getSkills":
      return {
        ...state,
        Skills: [...action.payload],
      };
    case "[Skills] - insertSkills":
      return {
        ...state,
        Skills: [...state.Skills!, action.payload],
      };
    case "[Skills] - updateSkills":
      return {
        ...state,
        Skills: state.Skills!.map((skill) => {
          return skill.id === action.payload.id ? { ...skill, ...action.payload } : skill;
        }),
      };
    case "[Skills] - deleteSkills":
      return {
        ...state,
        Skills: state.Skills!.filter((skill) => !(skill.id === action.payload.id)),
      };
    case "[Proyects] - getProyects":
      return {
        ...state,
        Proyects: [...action.payload],
      };
    case "[Proyects] - insertProyects":
      return {
        ...state,
        Proyects: [...state.Proyects!, action.payload],
      };
    case "[Proyects] - updateProyects":
      return {
        ...state,
        Proyects: state.Proyects!.map((proyect) => {
          return proyect.id === action.payload.id ? { ...proyect, ...action.payload } : proyect;
        }),
      };
    case "[Proyects] - deleteProyects":
      return {
        ...state,
        Proyects: state.Proyects!.filter((proyect) => !(proyect.id === action.payload.id)),
      };
    case "[Experience] - getExperience":
      return {
        ...state,
        Experiences: [...action.payload],
      };
    case "[Experience] - insertExperience":
      return {
        ...state,
        Experiences: [...state.Experiences!, action.payload],
      };
    case "[Experience] - updateExperience":
      return {
        ...state,
        Experiences: state.Experiences!.map((experience) => {
          return experience.id === action.payload.id ? { ...experience, ...action.payload } : experience;
        }),
      };
    case "[Experience] - deleteExperience":
      return {
        ...state,
        Experiences: state.Experiences!.filter((experience) => !(experience.id === action.payload.id)),
      };

    case "[Education] - getEducation":
      return {
        ...state,
        Educations: [...action.payload],
      };
    case "[Education] - insertEducation":      
      return {
        ...state,
        Educations: [...state.Educations!, action.payload],
      };
    case "[Education] - updateEducation":
      return {
        ...state,
        Educations: state.Educations!.map((Education) => {
          return Education.id === action.payload.id ? { ...Education, ...action.payload } : Education;
        }),
      };
    case "[Education] - deleteEducation":
      return {
        ...state,
        Educations: state.Educations!.filter((Education) => !(Education.id === action.payload.id)),
      };
    default:
      return state;
  }
};
