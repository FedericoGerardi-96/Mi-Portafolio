import { FC, PropsWithChildren, useReducer } from "react";

import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

import { PortfolioContext, PortfolioReducer } from "./";
import { ICvLink, ISkills, IProyects, IExperience, IEducation } from "../../interfaces";
import { fileUpload } from "../../helpers/fileUpload";

export interface PortfolioState {
  isSaving: boolean;
  cvUrl: ICvLink | null;
  Skills: ISkills[] | null;
  Proyects: IProyects[] | null;
  Experiences: IExperience[] | null;
  Educations: IEducation[] | null;
}

const THEME_INITIAL_STATE: PortfolioState = {
  isSaving: false,
  cvUrl: null,
  Skills: null,
  Proyects: null,
  Experiences: null,
  Educations: null,
};

export const PortfolioProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(PortfolioReducer, THEME_INITIAL_STATE);

  // Update portfolio url

  const updatePortafolioURL = async (Url: string): Promise<boolean> => {
    dispatch({ type: "[Loading] - startIsLoading" });
    const id = state.cvUrl?.id;
    const urlChanged = {
      UrlCurriculum: Url,
    };
    try {
      if (!id) return false;
      const docRef = doc(FirebaseDB, `Portafolio/Cv/Link/${id}`);
      await setDoc(docRef, urlChanged, { merge: true });
      dispatch({ type: "[Portfolio] - updatePortafolioURL", payload: { ...urlChanged, id } });
      dispatch({ type: "[Loading] - finishIsLoading" });
      return true;
    } catch (error: any) {
      console.log(error.message);
      dispatch({ type: "[Loading] - finishIsLoading" });
      return false;
    }
  };

  const getPortafolioURL = async (): Promise<void> => {
    try {
      const collectionRef = collection(FirebaseDB, `Portafolio/Cv/Link`);
      const docs = await getDocs(collectionRef);
      const notes: any = [];
      docs.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
      });
      notes.forEach(({ id, UrlCurriculum }: ICvLink) => {
        dispatch({ type: "[Portfolio] - getPortafolioURL", payload: { id, UrlCurriculum } });
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // abm skill section

  const getSkills = async (): Promise<void> => {
    try {
      const collectionRef = collection(FirebaseDB, `Portafolio/Cv/skills`);
      const docs = await getDocs(collectionRef);
      const dataResponse: any = [];
      const skillsList: ISkills[] = [];
      docs.forEach((doc) => {
        dataResponse.push({ id: doc.id, ...doc.data() });
      });
      dataResponse.forEach(({ id, Tittle, Description, image }: any) => {
        skillsList.push({ id, Tittle, Description, image });
      });
      dispatch({ type: "[Skills] - getSkills", payload: skillsList });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const insertNewSkill = async (skill: ISkills): Promise<boolean> => {
    try {
      dispatch({ type: "[Loading] - startIsLoading" });
      const newDoc = doc(collection(FirebaseDB, `Portafolio/Cv/skills`));
      await setDoc(newDoc, skill);
      skill.id = newDoc.id;
      dispatch({ type: "[Skills] - insertSkills", payload: skill });
      dispatch({ type: "[Loading] - finishIsLoading" });
      return true;
    } catch (error: any) {
      console.log(error.message);
      dispatch({ type: "[Loading] - finishIsLoading" });
      return false;
    }
  };

  const updateSkill = async (skill: ISkills): Promise<boolean> => {
    const { image, id } = skill;
    try {
      dispatch({ type: "[Loading] - startIsLoading" });
      delete skill.id;
      if (!image) delete skill.image;
      const docRef = doc(FirebaseDB, `Portafolio/Cv/skills/${id}`);
      await setDoc(docRef, skill, { merge: true });
      dispatch({ type: "[Skills] - updateSkills", payload: { ...skill, id } });
      dispatch({ type: "[Loading] - finishIsLoading" });
      return true;
    } catch (error: any) {
      console.log(error.message);
      dispatch({ type: "[Loading] - finishIsLoading" });
      return false;
    }
  };

  const deleteSkill = async (id: string): Promise<boolean> => {
    try {
      const docRef = doc(FirebaseDB, `Portafolio/Cv/skills/${id}`);
      await deleteDoc(docRef);
      dispatch({ type: "[Skills] - deleteSkills", payload: { id } });
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };

  // abm proyects section

  const getProyects = async (): Promise<void> => {
    try {
      const collectionRef = collection(FirebaseDB, `Portafolio/Cv/proyects`);
      const docs = await getDocs(collectionRef);
      const dataResponse: any = [];
      const proyectsList: IProyects[] = [];
      docs.forEach((doc) => {
        dataResponse.push({ id: doc.id, ...doc.data() });
      });
      dataResponse.forEach(({ id, Tittle, Description, gitHubLink, pageLink, tecnologias, image }: IProyects) => {
        proyectsList.push({ id, Tittle, Description, gitHubLink, pageLink, image, tecnologias });
      });
      dispatch({ type: "[Proyects] - getProyects", payload: proyectsList });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const insertNewProyect = async (proyect: IProyects): Promise<boolean> => {
    try {
      dispatch({ type: "[Loading] - startIsLoading" });
      const newDoc = doc(collection(FirebaseDB, `Portafolio/Cv/proyects`));
      await setDoc(newDoc, proyect);
      proyect.id = newDoc.id;
      dispatch({ type: "[Proyects] - insertProyects", payload: proyect });
      dispatch({ type: "[Loading] - finishIsLoading" });
      return true;
    } catch (error: any) {
      console.log(error.message);
      dispatch({ type: "[Loading] - finishIsLoading" });
      return false;
    }
  };

  const updateProyect = async (proyect: IProyects): Promise<boolean> => {
    const { id, image } = proyect;
    try {
      dispatch({ type: "[Loading] - startIsLoading" });
      delete proyect.id;
      if (!image) {
        delete proyect.image;
      }
      const docRef = doc(FirebaseDB, `Portafolio/Cv/proyects/${id}`);
      await setDoc(docRef, proyect, { merge: true });
      dispatch({ type: "[Proyects] - updateProyects", payload: { ...proyect, id } });
      dispatch({ type: "[Loading] - finishIsLoading" });
      return true;
    } catch (error: any) {
      console.log(error.message);
      dispatch({ type: "[Loading] - finishIsLoading" });
      return false;
    }
  };

  const deleteProyect = async (id: string): Promise<boolean> => {
    try {
      const docRef = doc(FirebaseDB, `Portafolio/Cv/proyects/${id}`);
      await deleteDoc(docRef);
      dispatch({ type: "[Proyects] - deleteProyects", payload: { id } });
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };

  // abm experience section

  const getExperience = async (): Promise<void> => {
    try {
      const collectionRef = collection(FirebaseDB, `Portafolio/Cv/experience`);
      const docs = await getDocs(collectionRef);
      const dataResponse: any = [];
      const experienceList: IExperience[] = [];
      docs.forEach((doc) => {
        dataResponse.push({ id: doc.id, ...doc.data() });
      });
      dataResponse.forEach(({ id, posición, description, company, workSince, workTo }: IExperience) => {
        experienceList.push({ id, posición, description, company, workSince, workTo });
      });
      dispatch({ type: "[Experience] - getExperience", payload: experienceList });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const insertNewExperience = async (experience: IExperience): Promise<boolean> => {
    try {
      dispatch({ type: "[Loading] - startIsLoading" });
      const newDoc = doc(collection(FirebaseDB, `Portafolio/Cv/experience`));
      await setDoc(newDoc, experience);
      experience.id = newDoc.id;
      dispatch({ type: "[Experience] - insertExperience", payload: experience });
      dispatch({ type: "[Loading] - finishIsLoading" });
      return true;
    } catch (error: any) {
      console.log(error.message);
      dispatch({ type: "[Loading] - finishIsLoading" });
      return false;
    }
  };

  const updateExperience = async (experience: IExperience): Promise<boolean> => {
    const { id } = experience;
    try {
      dispatch({ type: "[Loading] - startIsLoading" });
      delete experience.id;
      const docRef = doc(FirebaseDB, `Portafolio/Cv/experience/${id}`);
      await setDoc(docRef, experience, { merge: true });
      dispatch({ type: "[Experience] - updateExperience", payload: { ...experience, id } });
      dispatch({ type: "[Loading] - finishIsLoading" });
      return true;
    } catch (error: any) {
      console.log(error.message);
      dispatch({ type: "[Loading] - finishIsLoading" });
      return false;
    }
  };

  const deleteExperience = async (id: string): Promise<boolean> => {
    try {
      const docRef = doc(FirebaseDB, `Portafolio/Cv/experience/${id}`);
      await deleteDoc(docRef);
      dispatch({ type: "[Experience] - deleteExperience", payload: { id } });
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };

  // abm experience section

  const getEducation = async (): Promise<void> => {
    try {
      const collectionRef = collection(FirebaseDB, `Portafolio/Cv/education`);
      const docs = await getDocs(collectionRef);
      const dataResponse: any = [];
      const experienceList: IEducation[] = [];
      docs.forEach((doc) => {
        dataResponse.push({ id: doc.id, ...doc.data() });
      });
      dataResponse.forEach(({ id, tittle, place, description, start, finish }: IEducation) => {
        experienceList.push({ id, tittle, place, description, start, finish });
      });
      dispatch({ type: "[Education] - getEducation", payload: experienceList });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const insertNewEducation = async (education: IEducation): Promise<boolean> => {
    try {
      dispatch({ type: "[Loading] - startIsLoading" });
      const newDoc = doc(collection(FirebaseDB, `Portafolio/Cv/education`));
      await setDoc(newDoc, education);
      education.id = newDoc.id;
      dispatch({ type: "[Education] - insertEducation", payload: education });
      dispatch({ type: "[Loading] - finishIsLoading" });
      return true;
    } catch (error: any) {
      console.log(error.message);
      dispatch({ type: "[Loading] - finishIsLoading" });
      return false;
    }
  };

  const updateEducation = async (edication: IEducation): Promise<boolean> => {
    const { id } = edication;
    try {
      dispatch({ type: "[Loading] - startIsLoading" });
      delete edication.id;
      const docRef = doc(FirebaseDB, `Portafolio/Cv/education/${id}`);
      await setDoc(docRef, edication, { merge: true });
      dispatch({ type: "[Education] - updateEducation", payload: { ...edication, id } });
      dispatch({ type: "[Loading] - finishIsLoading" });
      return true;
    } catch (error: any) {
      console.log(error.message);
      dispatch({ type: "[Loading] - finishIsLoading" });
      return false;
    }
  };

  const deleteEducation = async (id: string): Promise<boolean> => {
    try {
      const docRef = doc(FirebaseDB, `Portafolio/Cv/education/${id}`);
      await deleteDoc(docRef);
      dispatch({ type: "[Education] - deleteEducation", payload: { id } });
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };

  // send image to cloudinary
  const insertImageCloudinary = async (image: any): Promise<string> => {
    const photoUrl = await fileUpload(image);
    return photoUrl;
  };

  return (
    <PortfolioContext.Provider
      value={{
        ...state,
        // portfolio Url
        updatePortafolioURL,
        getPortafolioURL,
        // Skills
        insertNewSkill,
        getSkills,
        deleteSkill,
        updateSkill,
        // Proyects
        getProyects,
        insertNewProyect,
        updateProyect,
        deleteProyect,
        // Experience
        getExperience,
        insertNewExperience,
        updateExperience,
        deleteExperience,
        // Education
        getEducation,
        insertNewEducation,
        updateEducation,
        deleteEducation,
        // Up image cloudinary
        insertImageCloudinary,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
