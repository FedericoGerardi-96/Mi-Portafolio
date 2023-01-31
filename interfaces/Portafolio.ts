export interface ICvLink {
  id: string;
  UrlCurriculum: string;
}

export interface ISkills {
  id?: string;
  Tittle?: string;
  Description?: string;
  image?: any;
}

export interface IProyects {
  id?: string;
  Tittle?: string;
  Description?: string;
  gitHubLink?: string;
  pageLink?: string;
  image?: any;
  tecnologias?: string[];
}

export interface IExperience {
  id?: string;
  posición?: string;
  description?: string;
  company?: string;
  workSince?: string;
  workTo?: string;
}

export interface IEducation {
  id?: string;
  tittle?: string;
  description?: string;
  place?: string;
  start?: string;
  finish?: string;
}
