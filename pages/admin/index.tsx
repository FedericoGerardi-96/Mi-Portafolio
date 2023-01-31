import { useContext, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

import { motion } from "framer-motion";
import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faXmark, faFile } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../context";
import { Layout } from "../../components/layout";

import { PortfolioContext } from "../../context/portfolio";
import { IEducation, IExperience, IProyects, ISkills } from "../../interfaces";
import { deleteMessage, getMessage } from "../../helpers/contactMessage";
import { Imessage } from "../../interfaces/MessageContact";

import Cry from "../../public/Cry.png";
import { finished } from "stream";

const Admin = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  if (!isLoggedIn) {
    router.push("/");
    return null;
  }

  return (
    <Layout title="Admin" pageDescription="Pagina para administrar el portafolio">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3 }}
        className={`px- container mx-auto mt-24`}
      >
        <h1
          className={`
              text-[2rem] 
              font-bold 
              sm:text-[2.5rem] 
              md:text-[3rem] 
              lg:text-[3.5rem] 
              xl:text-[4rem] 
              xxl:text-[5rem] `}
        >
          Admin Page
        </h1>
        <CurriculumUrl />
        <Skills />
        <Proyects />
        <Experience />
        <Education />
        <MessageList />
      </motion.div>
    </Layout>
  );
};

// curriculum section
export const CurriculumUrl = () => {
  type FormData = {
    UrlCurriculum: string;
  };
  const { updatePortafolioURL, cvUrl, isSaving } = useContext(PortfolioContext);
  const { UrlCurriculum } = cvUrl || { id: "", UrlCurriculum: "" };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { UrlCurriculum: UrlCurriculum } });

  const onUpdatePortafolio = async ({ UrlCurriculum }: FormData) => {
    const ok: boolean = await updatePortafolioURL(UrlCurriculum);

    if (ok) {
      Swal.fire("Success", "Actualizado correctamente", "success");
      return;
    }
    Swal.fire("Error", "Error al actualizar", "warning");
  };
  return (
    <section className={`justify-centers mt-12 flex w-full flex-col`} id="portalofio_URL">
      <h1
        className={`my-12 
              text-[2rem] 
              font-bold 
              sm:text-[2rem] 
              lg:text-[2.5rem] 
              `}
      >
        Url Curriculum
      </h1>
      <form className={`w-full`} onSubmit={handleSubmit(onUpdatePortafolio)}>
        <div className={`mx-12`}>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="UrlCurriculum"
              className={`
                  w-full
                  rounded-md 
                  border-[1px] 
                  border-inputBorder
                  bg-inputBg 
                  py-2 
                  px-2 
                  text-imputColor 
                  placeholder:text-imputColor  
                  focus:bg-inputBg 
                  focus:outline-none 
                  active:bg-inputBg 
                  active:outline-none`}
              placeholder="URL Del Curriculum"
              type="text"
              {...register("UrlCurriculum", {
                required: "Este campo es requerido",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
            />
          </div>
          <button
            disabled={isSaving}
            className={`
            mt-8
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
          >
            Actualizar Link Curriculum
          </button>
        </div>
      </form>
    </section>
  );
};

// skills section
export const Skills = () => {
  const [imageView, setimageView] = useState<any>(null);
  const [imageSelected, setimageSelected] = useState<any>(null);
  const fileInputRef: any = useRef();
  const { insertImageCloudinary, insertNewSkill, isSaving } = useContext(PortfolioContext);
  type FormData = {
    Tittle: string;
    Description: string;
    image: any;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { Tittle: "", Description: "" } });

  const onImageChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files?.length == 0 || !target.files) return null;

    setimageSelected(target.files![0]);
    setimageView(URL.createObjectURL(target.files![0]));
  };

  const onInsertSkill = async ({ Tittle, Description }: FormData) => {
    if (!imageSelected) return null;
    const image = await insertImageCloudinary(imageSelected);
    const ok = await insertNewSkill({ Tittle, Description, image });
    if (ok) {
      reset();
      setimageView("");
      Swal.fire("Succes", "Agregado correctamente", "success");
      return;
    }
    Swal.fire("Error", "Error al agregar", "warning");
  };

  return (
    <section className={`my-12 w-full`}>
      <h1
        className={`my-12 
              text-[2rem] 
              font-bold 
              sm:text-[2rem] 
              lg:text-[2.5rem] 
              `}
      >
        HABILIDADES
      </h1>
      <div className={`mb-4 flex flex-col flex-wrap items-center justify-around lg:flex-row`}>
        <div className={`flex items-center gap-8`}>
          <input ref={fileInputRef} className={`hidden`} onChange={onImageChange} type="file" />
          <button onClick={() => fileInputRef.current.click()} className={`border-none bg-transparent`}>
            <FontAwesomeIcon className={`mb-8 w-16 cursor-pointer text-[4rem] text-text`} icon={faFile} />
          </button>
          <label className={`text-text`}>
            {imageSelected ? " Seleccion una imagen diferente..." : "Seleccion una imagen..."}
          </label>
        </div>
        <img draggable={false} className={`circleClipPath w-[150px] object-cover`} id="target" src={imageView} />
        <p className={`text-error ${imageSelected ? "hidden" : "block"}`}>Debe seleccionar una imagen</p>
      </div>
      <form onSubmit={handleSubmit(onInsertSkill)}>
        <div className={`mx-12`}>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="Tittle"
              className={`
              w-full  
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Titulo"
              type="text"
              {...register("Tittle", {
                required: "Este campo es requerido",
              })}
            />
            {!!errors.Tittle && <p className={`text-error`}>{errors.Tittle.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="Description"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Descripcion"
              type="text"
              {...register("Description", {
                required: "Este campo es requerido",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
            />
            {!!errors.Description && <p className={`text-error`}>{errors.Description.message}</p>}
          </div>
          <button
            disabled={isSaving}
            type="submit"
            className={`
            mt-8
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
          >
            Agregar Nueva Skill
          </button>
        </div>
      </form>
      <SkillsTable />
    </section>
  );
};

const SkillsTable = () => {
  const { Skills, deleteSkill } = useContext(PortfolioContext);
  const [modalView, setmodalView] = useState(false);
  const [skillSelected, setskillSelected] = useState<ISkills>();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const onDeleteSkill = async (id: string) => {
    const result = await swalWithBootstrapButtons.fire({
      title: "Estas Seguro?",
      text: "Esta accion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar!",
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      const ok = await deleteSkill(id);
      if (ok) {
        swalWithBootstrapButtons.fire("Eliminado!", "La habilidad se borro correctamente", "success");
        return;
      }
      swalWithBootstrapButtons.fire("Error", "Ocurrio un error inesperado al borrar la habilidad", "error");
    }
    swalWithBootstrapButtons.fire("Cancelado", "No se elimino la habilidad", "error");
  };

  const openSkillModal = (Skills: ISkills) => {
    setskillSelected(Skills);
    setmodalView(!modalView);
  };

  return (
    <>
      <table className={`mt-16 w-full border-separate border-spacing-4`}>
        <thead className={`bg-transparent`}>
          <tr>
            <th className={`text-grey`}>Titulo</th>
            <th className={`hidden text-grey lg:table-cell`}>Descripcion</th>
            <th className={`hidden text-grey lg:table-cell`}>Imagen</th>
            <th className={`text-grey`}>
              <span>Ver</span>
            </th>
            <th className={`h-10 text-grey`}>
              <span>Eliminar</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {Skills?.map(({ id, Tittle, Description, image }, i) => {
            return (
              <tr key={i}>
                <td className={`text-ellipsis break-all text-center`}>{Tittle}</td>
                <td className={`hidden text-ellipsis break-all text-center lg:table-cell`}>{Description}</td>
                <td align="center" className={`hidden lg:table-cell`}>
                  <Image
                    width={50}
                    height={50}
                    className={`circleClipPath inline-block h-[50px] w-[50px] object-contain`}
                    src={image}
                    alt={Description!}
                  />
                </td>
                <motion.td
                  whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  className={`cursor-pointer text-center`}
                  onClick={() => openSkillModal({ id, Tittle, Description, image })}
                >
                  <FontAwesomeIcon className={`inline-block w-8 text-[2rem]`} icon={faEye} />
                </motion.td>
                <motion.td
                  onClick={() => onDeleteSkill(id!)}
                  whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  className={`cursor-pointer text-center`}
                >
                  <FontAwesomeIcon className={`inline-block w-8 text-[2rem]`} icon={faTrash} />
                </motion.td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <SkilModal Skills={skillSelected!} modalView={modalView} setmodalView={setmodalView} />
    </>
  );
};

interface skillProps {
  Skills: ISkills;
  modalView: any;
  setmodalView: any;
}

const SkilModal = ({ Skills, modalView, setmodalView }: skillProps) => {
  const [imageView, setimageView] = useState<any>(null);
  const [imageSelected, setimageSelected] = useState<any>(null);
  const fileInputRef: any = useRef();
  const { insertImageCloudinary, updateSkill, isSaving } = useContext(PortfolioContext);
  type FormData = {
    Tittle: string;
    Description: string;
    image: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: Skills });

  useEffect(() => {
    reset(Skills);
  }, [Skills]);

  useEffect(() => {
    if (modalView) {
      document.body.classList.add("no-scroll");
      document.body.classList.remove("scroll");
    } else {
      document.body.classList.add("scroll");
      document.body.classList.remove("no-scroll");
    }
  }, [modalView]);

  useEffect(() => {
    if (modalView) {
      document.body.classList.add("no-scroll");
      document.body.classList.remove("scroll");
    } else {
      document.body.classList.add("scroll");
      document.body.classList.remove("no-scroll");
    }
  }, [modalView]);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const onImageChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files?.length == 0 || !target.files) return null;

    setimageSelected(target.files![0]);
    setimageView(URL.createObjectURL(target.files![0]));
  };

  const onUpdateSkill = async ({ Tittle, Description }: FormData) => {
    const { id } = Skills;
    let ok: boolean = false;
    const result = await swalWithBootstrapButtons.fire({
      title: "Estas Seguro?",
      text: "Esta accion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Modificar",
      cancelButtonText: "No, Cancelar!",
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      if (!imageSelected) {
        ok = await updateSkill({ Tittle, Description, id });
      } else {
        const image = await insertImageCloudinary(imageSelected);
        ok = await updateSkill({ Tittle, Description, image, id });
      }
      if (ok) {
        reset();
        swalWithBootstrapButtons.fire("Modificada!", "La habilidad se modifico correctamente", "success");
        setmodalView(!modalView);
        return;
      }
      swalWithBootstrapButtons.fire("Error!", "Error al modificar la habilidad", "warning");
    }
    swalWithBootstrapButtons.fire("Cancelado", "No se modifico la habilidad", "error");
    setmodalView(!modalView);
  };

  return (
    <div
      className={`
        ${modalView ? "flex" : "hidden"}
        fixed 
        left-0 
        top-0 
        z-[1059] 
        h-screen 
        w-screen 
        items-center 
        justify-center 
        bg-[rgba(0,0,0,0.4)] 
        transition-colors 
        duration-100`}
    >
      <div
        onClick={() => setmodalView(!modalView)}
        className={`absolute z-[90] ${modalView ? "block" : "hidden"} h-screen w-screen bg-[rgba(0,0,0,0.6)]  `}
      />
      <div
        className={`relative 
                    z-[99] 
                    h-auto
                    w-[35rem] 
                    rounded-3xl 
                    bg-background 
                    p-8 
                    text-text
                    shadow-[0_7px_20px_0_var(--box-shadow)]`}
      >
        <div className={`w-full p-4 text-end`}>
          <FontAwesomeIcon
            className={`tex-text w-8 cursor-pointer text-[2rem]`}
            onClick={() => setmodalView(!modalView)}
            icon={faXmark}
          />
        </div>
        <div className={`flex flex-wrap items-center justify-around`}>
          <div className={`flex items-center gap-8`}>
            <input ref={fileInputRef} className={`hidden`} onChange={onImageChange} type="file" />
            <button onClick={() => fileInputRef.current.click()} className={`border-none bg-transparent`}>
              <FontAwesomeIcon className={`mb-8 w-16 cursor-pointer text-[4rem] text-text`} icon={faFile} />
            </button>
            <label className={`text-text`}>
              {imageSelected ? " Seleccion una imagen diferente..." : "Seleccion una imagen..."}
            </label>
          </div>
          <img
            draggable={false}
            className={`m-w-[220px] m-h-[220px] circleClipPath object-cover`}
            id="target"
            src={imageView}
          />
          <p className={`text-error ${imageSelected ? "hidden" : "block"}`}>Debe seleccionar una imagen</p>
        </div>
        <form onSubmit={handleSubmit(onUpdateSkill)}>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="Tittle"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Titulo"
              type="text"
              {...register("Tittle", {
                required: "Este campo es requerido",
              })}
            />

            {!!errors.Tittle && <p className={`text-error`}>{errors.Tittle.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="Description"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Descripcion"
              type="text"
              {...register("Description", {
                required: "Este campo es requerido",
              })}
            />

            {!!errors.Description && <p className={`text-error`}>{errors.Description.message}</p>}
          </div>
          <button
            disabled={isSaving}
            className={`
            mt-8
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
            type="submit"
          >
            Modificar Skill
          </button>
        </form>
      </div>
    </div>
  );
};

// proyects
export const Proyects = () => {
  const [imageView, setimageView] = useState<any>(null);
  const [imageSelected, setimageSelected] = useState<any>(null);
  const [technologiInputValue, settechnologiInputValue] = useState("");
  const [tecnologias, settechnologies] = useState<string[]>([]);
  const fileInputRef: any = useRef();
  const { insertImageCloudinary, insertNewProyect, isSaving } = useContext(PortfolioContext);
  type FormData = {
    Tittle: string;
    Description: string;
    gitHubLink: string;
    pageLink: string;
    image: any;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { Tittle: "", Description: "", gitHubLink: "", pageLink: "" } });

  const onImageChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files?.length == 0 || !target.files) return null;

    setimageSelected(target.files![0]);
    setimageView(URL.createObjectURL(target.files![0]));
  };

  const handleChange = (event: any) => {
    settechnologiInputValue(event.target.value);
  };

  const onAddTechnologies = () => {
    if (technologiInputValue == "") return;
    settechnologies((oldArray: any) => [...oldArray, technologiInputValue]);
    settechnologiInputValue("");
  };

  const onInsertProyect = async ({ Tittle, Description, gitHubLink, pageLink }: FormData) => {
    if (!imageSelected) return;
    const image = await insertImageCloudinary(imageSelected);
    const ok = await insertNewProyect({ Tittle, Description, gitHubLink, pageLink, image, tecnologias });
    if (ok) {
      reset();
      settechnologies([]);
      setimageView("");
      Swal.fire("Succes", "Agregado correctamente", "success");
      return;
    }
    Swal.fire("Error", "Error al agregar", "warning");
  };

  return (
    <section className={`my-12 w-full`}>
      <h1
        className={`my-12 
              text-[2rem] 
              font-bold 
              sm:text-[2rem] 
              lg:text-[2.5rem] 
              `}
      >
        PROYECTOS
      </h1>
      <div className={`mb-4 flex flex-col flex-wrap items-center justify-around lg:flex-row`}>
        <div className={`flex items-center gap-8`}>
          <input ref={fileInputRef} className={`hidden`} onChange={onImageChange} type="file" />
          <button onClick={() => fileInputRef.current.click()} className={`border-none bg-transparent`}>
            <FontAwesomeIcon className={`mb-8 w-16 cursor-pointer text-[4rem] text-text`} icon={faFile} />
          </button>
          <label className={`text-text`}>
            {imageSelected ? " Seleccion una imagen diferente..." : "Seleccion una imagen..."}
          </label>
        </div>
        <img draggable={false} className={`circleClipPath w-[150px] object-cover`} id="target" src={imageView} />
        <p className={`text-error ${imageSelected ? "hidden" : "block"}`}>Debe seleccionar una imagen</p>
      </div>
      <form onSubmit={handleSubmit(onInsertProyect)}>
        <div className={`mx-12`}>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="Tittle"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Titulo"
              type="text"
              {...register("Tittle", {
                required: "Este campo es requerido",
              })}
            />

            {!!errors.Tittle && <p className={`text-error`}>{errors.Tittle.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="Description"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Description"
              type="text"
              {...register("Description", {
                required: "Este campo es requerido",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
            />

            {!!errors.Description && <p className={`text-error`}>{errors.Description.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="gitHubLink"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="GitHub Link"
              type="text"
              {...register("gitHubLink", {
                required: "Este campo es requerido",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
            />

            {!!errors.gitHubLink && <p className={`text-error`}>{errors.gitHubLink.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="pageLink"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Link de la Pagina"
              type="text"
              {...register("pageLink", {
                required: "Este campo es requerido",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
            />

            {!!errors.pageLink && <p className={`text-error`}>{errors.pageLink.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-center justify-center`}>
            <div className={`flex w-full flex-row items-center justify-center`}>
              <input
                id="tecnologias"
                className={`
                          mt-8
                          mr-4 
                          w-full 
                          rounded-md 
                          border-[1px]
                          border-inputBorder 
                          bg-inputBg 
                          py-2 
                          px-2 
                          text-imputColor 
                    placeholder:text-imputColor  
                          focus:bg-inputBg 
                          focus:outline-none 
                          active:bg-inputBg
                          active:outline-none`}
                placeholder="Ingrese una tecnologia..."
                type="text"
                value={technologiInputValue}
                onChange={handleChange}
              />
              <button
                onClick={onAddTechnologies}
                type="button"
                className={`
                      mt-8
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
              >
                Add
              </button>
            </div>
            <div className={`mt-5 flex flex-wrap items-center justify-center gap-4`}>
              {tecnologias?.map((tech: string, i: number) => (
                <div className={`flex flex-wrap items-center justify-center gap-4 rounded-lg bg-white p-2`}>
                  <span className={`text-[1rem] text-violet`} key={i}>
                    {tech}
                  </span>
                  <FontAwesomeIcon
                    className={`w-3 cursor-pointer text-[12px] text-violet`}
                    onClick={() => settechnologies(tecnologias.filter((item) => item !== tech))}
                    icon={faXmark}
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            disabled={isSaving}
            type="submit"
            className={`
            mt-8
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
          >
            Agregar Nuevo Proyecto
          </button>
        </div>
      </form>
      <ProyectsTable />
    </section>
  );
};

const ProyectsTable = () => {
  const { Proyects, deleteProyect } = useContext(PortfolioContext);
  const [modalView, setmodalView] = useState(false);
  const [proyectSelected, setsproyectSelected] = useState<IProyects>();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const onDeleteProyect = async (id: string) => {
    const result = await swalWithBootstrapButtons.fire({
      title: "Estas Seguro?",
      text: "Esta accion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar!",
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      const ok = await deleteProyect(id);
      if (ok) {
        swalWithBootstrapButtons.fire("Eliminado!", "El Proyecto se borro correctamente", "success");
        return;
      }
      swalWithBootstrapButtons.fire("Error", "Ocurrio un error inesperado al borrar el proyecto", "error");
    }
    swalWithBootstrapButtons.fire("Cancelado", "No se elimino el Proyecto", "error");
  };

  const openProyectModal = (proyect: IProyects) => {
    setsproyectSelected(proyect);
    setmodalView(!modalView);
  };

  return (
    <>
      <table className={`mt-16 w-full border-separate border-spacing-4`}>
        <thead className={`bg-transparent`}>
          <tr className={`border-spacing-0`}>
            <th className={`text-grey`}>Titulo</th>
            <th className={`hidden text-grey lg:table-cell`}>Descripcion</th>
            <th className={`hidden text-grey lg:table-cell`}>Imagen</th>
            <th className={`text-grey`}>
              <span>Ver</span>
            </th>
            <th className={`h-10 text-grey`}>
              <span>Eliminar</span>
            </th>
          </tr>
          <tr className={`p-8`}></tr>
        </thead>
        <tbody>
          {Proyects?.map(({ id, Tittle, Description, gitHubLink, tecnologias, pageLink, image }, i) => {
            return (
              <tr key={i}>
                <td className={`text-ellipsis break-all text-center`}>{Tittle}</td>
                <td className={`hidden text-ellipsis break-all text-center lg:table-cell`}>{Description}</td>
                <td align="center" className={`hidden lg:table-cell`}>
                  <Image
                    width={0}
                    height={0}
                    className={`circleClipPath inline-block h-[50px] w-[50px] object-contain`}
                    src={image}
                    alt={Description!}
                  />
                </td>
                <motion.td
                  whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  className={`cursor-pointer text-center`}
                  onClick={() =>
                    openProyectModal({ id, Tittle, Description, image, gitHubLink, tecnologias, pageLink })
                  }
                >
                  <FontAwesomeIcon className={`inline-block w-8 text-[2rem]`} icon={faEye} />
                </motion.td>
                <motion.td
                  onClick={() => onDeleteProyect(id!)}
                  whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  className={`cursor-pointer text-center`}
                >
                  <FontAwesomeIcon className={`inline-block w-8 text-[2rem]`} icon={faTrash} />
                </motion.td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ProyectModal Proyect={proyectSelected!} modalView={modalView} setmodalView={setmodalView} />
    </>
  );
};

interface proyectProps {
  Proyect: IProyects;
  modalView: any;
  setmodalView: any;
}

const ProyectModal = ({ Proyect, modalView, setmodalView }: proyectProps) => {
  const [imageView, setimageView] = useState<any>(null);
  const [imageSelected, setimageSelected] = useState<any>(null);
  const fileInputRef: any = useRef();
  const initialTecnologias = Proyect != undefined ? Proyect.tecnologias! : [];
  const { insertImageCloudinary, updateProyect, isSaving } = useContext(PortfolioContext);
  const [technologiInputValue, settechnologiInputValue] = useState("");
  const [tecnologias, settechnologies] = useState<string[]>(initialTecnologias);
  type FormData = {
    Tittle: string;
    Description: string;
    gitHubLink: string;
    pageLink: string;
    image: any;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: Proyect });

  useEffect(() => {
    if (modalView) {
      document.body.classList.add("no-scroll");
      document.body.classList.remove("scroll");
    } else {
      document.body.classList.add("scroll");
      document.body.classList.remove("no-scroll");
    }
  }, [modalView]);

  useEffect(() => {
    reset(Proyect);
    settechnologies(initialTecnologias);
  }, [Proyect]);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const onImageChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files?.length == 0 || !target.files) return null;

    setimageSelected(target.files![0]);
    setimageView(URL.createObjectURL(target.files![0]));
  };

  const handleChange = (event: any) => {
    settechnologiInputValue(event.target.value);
  };

  const onAddTechnologies = () => {
    if (technologiInputValue == "") return;
    settechnologies((oldArray: any) => [...oldArray, technologiInputValue]);
    settechnologiInputValue("");
  };

  const onUpdateProyect = async ({ Tittle, Description, gitHubLink, pageLink }: FormData) => {
    const { id } = Proyect;
    let ok: boolean = false;
    const result = await swalWithBootstrapButtons.fire({
      title: "Estas Seguro?",
      text: "Esta accion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Modificar",
      cancelButtonText: "No, Cancelar!",
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      if (!imageSelected) {
        ok = await updateProyect({ Tittle, Description, gitHubLink, pageLink, tecnologias, id });
      } else {
        const image = await insertImageCloudinary(imageSelected);
        ok = await updateProyect({ Tittle, Description, gitHubLink, pageLink, tecnologias, image, id });
      }
      if (ok) {
        reset();
        swalWithBootstrapButtons.fire("Modificada!", "La habilidad se modifico correctamente", "success");
        setmodalView(!modalView);
        return;
      }
      swalWithBootstrapButtons.fire("Error!", "Error al modificar la habilidad", "warning");
    }
    swalWithBootstrapButtons.fire("Cancelado", "No se modifico la habilidad", "error");
    setmodalView(!modalView);
  };

  return (
    <div
      className={`
        ${modalView ? "flex" : "hidden"}
        fixed 
        left-0 
        top-0 
        z-[1059] 
        h-screen 
        w-screen 
        items-center 
        justify-center 
        bg-[rgba(0,0,0,0.4)] 
        transition-colors 
        duration-100`}
    >
      <div
        onClick={() => setmodalView(!modalView)}
        className={`absolute z-[90] ${modalView ? "block" : "hidden"} h-screen w-screen bg-[rgba(0,0,0,0.6)]  `}
      />
      <div
        className={`
                    relative 
                    z-[99] 
                    h-auto 
                    w-[35rem] 
                    rounded-3xl 
                    bg-background 
                    p-8 
                    text-text
                    shadow-[0_7px_20px_0_var(--box-shadow)]`}
      >
        <div className={`w-full p-4 text-end`}>
          <FontAwesomeIcon
            className={`tex-text w-8 cursor-pointer text-[2rem]`}
            onClick={() => setmodalView(!modalView)}
            icon={faXmark}
          />
        </div>
        <div className={`flex flex-wrap items-center justify-around`}>
          <div className={`flex items-center gap-8`}>
            <input ref={fileInputRef} className={`hidden`} onChange={onImageChange} type="file" />
            <button onClick={() => fileInputRef.current.click()} className={`border-none bg-transparent`}>
              <FontAwesomeIcon className={`mb-8 w-16 cursor-pointer text-[4rem] text-text`} icon={faFile} />
            </button>
            <label className={`text-text`}>
              {imageSelected ? " Seleccion una imagen diferente..." : "Seleccion una imagen..."}
            </label>
          </div>
          <img
            draggable={false}
            className={`m-w-[220px] m-h-[220px] circleClipPath object-cover`}
            id="target"
            src={imageView}
          />
          <p className={`text-error ${imageSelected ? "hidden" : "block"}`}>Debe seleccionar una imagen</p>
        </div>
        <form onSubmit={handleSubmit(onUpdateProyect)}>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="Tittle"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Titulo"
              type="text"
              {...register("Tittle", {
                required: "Este campo es requerido",
              })}
            />

            {!!errors.Tittle && <p className={`text-error`}>{errors.Tittle.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="Description"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Description"
              type="text"
              {...register("Description", {
                required: "Este campo es requerido",
              })}
            />

            {!!errors.Description && <p className={`text-error`}>{errors.Description.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="gitHubLink"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="GitHub Link"
              type="text"
              {...register("gitHubLink", {
                required: "Este campo es requerido",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
            />

            {!!errors.gitHubLink && <p className={`text-error`}>{errors.gitHubLink.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="pageLink"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Link de la Pagina"
              type="text"
              {...register("pageLink", {
                required: "Este campo es requerido",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
            />

            {!!errors.pageLink && <p className={`text-error`}>{errors.pageLink.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-center justify-center`}>
            <div className={`flex w-full flex-row items-center justify-center`}>
              <input
                id="tecnologias"
                className={`
                          mt-8
                          mr-4 
                          w-full 
                          rounded-md 
                          border-[1px]
                          border-inputBorder 
                          bg-inputBg 
                          py-2 
                          px-2 
                          text-imputColor 
                    placeholder:text-imputColor  
                          focus:bg-inputBg 
                          focus:outline-none 
                          active:bg-inputBg
                          active:outline-none`}
                placeholder="Ingrese una tecnologia..."
                type="text"
                value={technologiInputValue}
                onChange={handleChange}
              />
              <button
                disabled={isSaving}
                onClick={onAddTechnologies}
                type="button"
                className={`
                      mt-8
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
              >
                Add
              </button>
            </div>
            <div className={`mt-5 flex flex-wrap items-center justify-center gap-4`}>
              {tecnologias?.map((tech: string, i: number) => (
                <div key={i} className={`flex flex-wrap items-center justify-center gap-4 rounded-lg bg-white p-2`}>
                  <span className={`text-[1rem] text-violet`}>{tech}</span>
                  <FontAwesomeIcon
                    className={`w-3 cursor-pointer text-[12px] text-violet`}
                    onClick={() => settechnologies(tecnologias.filter((item) => item !== tech))}
                    icon={faXmark}
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            disabled={isSaving}
            type="submit"
            className={`
            mt-8
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
          >
            Modificar Proyecto
          </button>
        </form>
      </div>
    </div>
  );
};

export const Experience = () => {
  const { insertNewExperience, isSaving } = useContext(PortfolioContext);
  const [finish, setfinish] = useState(false);
  type FormData = {
    posición: string;
    description: string;
    unfinished: boolean;
    company: string;
    WorkSince: string;
    WorkTo: string;
  };

  const dateNow = (): string => {
    let dateNow = new Date();
    let date =
      dateNow.getFullYear() +
      "-" +
      ("0" + (dateNow.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + dateNow.getDate()).slice(-2);
    return date;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { posición: "", description: "", company: "", WorkSince: dateNow(), WorkTo: dateNow() },
  });

  const onInsertProyect = async ({ posición, description, company, WorkSince, WorkTo, unfinished }: FormData) => {
    const workToSplit = WorkTo.split("-");
    const workTo = `${workToSplit[2]}/${workToSplit[1]}/${workToSplit[0]}`;
    let workSince = "";

    if (!unfinished) workSince = "Actualidad";
    else {
      const workSinceSplit = WorkSince.split("-");
      workSince = `${workSinceSplit[2]}/${workSinceSplit[1]}/${workSinceSplit[0]}`;
    }

    const ok = await insertNewExperience({ posición, description, company, workSince, workTo });
    if (ok) {
      reset();
      Swal.fire("Succes", "Agregado correctamente", "success");
      return;
    }
    Swal.fire("Error", "Error al agregar", "warning");
  };

  return (
    <section className={`my-12 w-full`}>
      <h1
        className={`my-12 
              text-[2rem] 
              font-bold 
              sm:text-[2rem] 
              lg:text-[2.5rem] 
              `}
      >
        EXPERIENCIA LABORAL
      </h1>
      <form onSubmit={handleSubmit(onInsertProyect)}>
        <div className={`mx-12`}>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="posición"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Posicion"
              type="text"
              {...register("posición", {
                required: "Este campo es requerido",
              })}
            />

            {!!errors.posición && <p className={`text-error`}>{errors.posición.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="description"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Description"
              type="textarea"
              {...register("description", {
                required: "Este campo es requerido",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
            />

            {!!errors.description && <p className={`text-error`}>{errors.description.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="company"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Compania"
              type="text"
              {...register("company", {
                required: "Este campo es requerido",
              })}
            />

            {!!errors.company && <p className={`text-error`}>{errors.company.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="WorkSince"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Trabaje Desde"
              type="date"
              {...register("WorkSince", {
                required: "Este campo es requerido",
              })}
            />

            {!!errors.WorkSince && <p className={`text-error`}>{errors.WorkSince.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <div className={`my-4 flex flex-row items-center justify-center`}>
              <input
                className={`h-[1.5rem] w-[1.5rem]`}
                onClick={() => setfinish(!finish)}
                type="checkbox"
                {...register("unfinished")}
              />
              <label className={`mx-4`}>Finalizo el trabajo ?</label>
            </div>
            <label className={`mt-8 ${!finish ? "hidden" : "block"}`} htmlFor="Start">
              Fin del trabajo:
            </label>
            <input
              id="WorkTo"
              className={`
              ${!finish ? "hidden" : "block"}
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Finalizacion trabajo"
              type="date"
              {...register("WorkTo")}
            />
            {!!errors.WorkTo && <p className={`text-error`}>{errors.WorkTo.message}</p>}
          </div>
          <button
            disabled={isSaving}
            type="submit"
            className={`
            mt-8
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
          >
            Agregar Nueva Experiencia
          </button>
        </div>
      </form>
      <ExperienceTable />
    </section>
  );
};

const ExperienceTable = () => {
  const { deleteExperience, isSaving, Experiences } = useContext(PortfolioContext);
  const [modalView, setmodalView] = useState(false);
  const [experienceSelected, setsexperienceSelected] = useState<IExperience>();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const onDeleteExperience = async (id: string) => {
    const result = await swalWithBootstrapButtons.fire({
      title: "Estas Seguro?",
      text: "Esta accion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar!",
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      const ok = await deleteExperience(id);
      if (ok) {
        swalWithBootstrapButtons.fire("Eliminado!", "La experiencia laboral se borro correctamente", "success");
        return;
      }
      swalWithBootstrapButtons.fire("Error", "Ocurrio un error inesperado al borrar la experiencia", "error");
    }
    swalWithBootstrapButtons.fire("Cancelado", "No se elimino la experiencia", "error");
  };

  const openProyectModal = (experience: IExperience) => {
    setsexperienceSelected(experience);
    setmodalView(!modalView);
  };

  return (
    <>
      <table className={`mt-16 w-full border-separate border-spacing-4`}>
        <thead className={`bg-transparent`}>
          <tr className={`border-spacing-0`}>
            <th className={`text-grey`}>company</th>
            <th className={`hidden text-grey lg:table-cell`}>posición</th>
            <th className={`text-grey`}>
              <span>Ver</span>
            </th>
            <th className={`h-10 text-grey`}>
              <span>Eliminar</span>
            </th>
          </tr>
          <tr className={`p-8`}></tr>
        </thead>
        <tbody>
          {Experiences?.map(({ id, posición, description, company, workSince, workTo }, i) => {
            return (
              <tr key={i}>
                <td className={`text-ellipsis break-all text-center`}>{company}</td>
                <td className={`hidden text-ellipsis break-all text-center lg:table-cell`}>{posición}</td>
                <motion.td
                  whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  className={`cursor-pointer text-center`}
                  onClick={() => openProyectModal({ id, posición, description, company, workSince, workTo })}
                >
                  <FontAwesomeIcon className={`inline-block w-8 text-[2rem]`} icon={faEye} />
                </motion.td>
                <motion.td
                  onClick={() => onDeleteExperience(id!)}
                  whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  className={`cursor-pointer text-center`}
                >
                  <FontAwesomeIcon className={`inline-block w-8 text-[2rem]`} icon={faTrash} />
                </motion.td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ExperienceModal Experience={experienceSelected!} modalView={modalView} setmodalView={setmodalView} />
    </>
  );
};

interface experienceProps {
  Experience: IExperience;
  modalView: any;
  setmodalView: any;
}

const ExperienceModal = ({ Experience, modalView, setmodalView }: experienceProps) => {
  let WorkTo: string = "";
  let WorkSince: string = "";
  const { updateExperience, isSaving } = useContext(PortfolioContext);
  const [finish, setfinish] = useState(false);

  const dateNow = (): string => {
    let dateNow = new Date();
    let date =
      dateNow.getFullYear() +
      "-" +
      ("0" + (dateNow.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + dateNow.getDate()).slice(-2);
    return date;
    return date;
  };

  type FormData = {
    posición: string;
    description: string;
    unfinished: boolean;
    company: string;
    WorkSince: string;
    WorkTo: string;
  };

  if (Experience != undefined) {
    const { workSince, workTo } = Experience;
    const worktoSplit = workTo!.split("/");
    WorkTo = `${worktoSplit[2]}-${worktoSplit[1]}-${worktoSplit[0]}`;

    if (workTo != "Actualidad") {
      const worksinceSplit = workSince!.split("/");
      WorkSince = `${worksinceSplit[2]}-${worksinceSplit[1]}-${worksinceSplit[0]}`;
    } else {
      WorkSince = dateNow();
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { ...Experience, WorkTo, WorkSince } });

  useEffect(() => {
    if (modalView) {
      document.body.classList.add("no-scroll");
      document.body.classList.remove("scroll");
    } else {
      document.body.classList.add("scroll");
      document.body.classList.remove("no-scroll");
    }
  }, [modalView]);

  useEffect(() => {
    reset({ ...Experience, WorkTo, WorkSince });
    if (Experience != undefined) {
      const { workTo } = Experience;
      setfinish(workTo != "Actualidad");
    }
  }, [Experience, WorkTo, WorkSince]);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const onUpdateExperience = async ({ posición, description, company, WorkSince, WorkTo }: FormData) => {
    let ok: boolean = false;
    const { id } = Experience;
    const result = await swalWithBootstrapButtons.fire({
      title: "Estas Seguro?",
      text: "Esta accion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Modificar",
      cancelButtonText: "No, Cancelar!",
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      const workToSplit = WorkTo.split("-");
      const workSinceSplit = WorkSince.split("-");
      const workTo = `${workToSplit[2]}/${workToSplit[1]}/${workToSplit[0]}`;
      const workSince = `${workSinceSplit[2]}/${workSinceSplit[1]}/${workSinceSplit[0]}`;
      ok = await updateExperience({ posición, description, company, workSince, workTo, id });
      if (ok) {
        reset();
        swalWithBootstrapButtons.fire("Modificada!", "La experiencia se modifico correctamente", "success");
        setmodalView(!modalView);
        return;
      }
      swalWithBootstrapButtons.fire("Error!", "Error al modificar la experiencia", "warning");
    }
    swalWithBootstrapButtons.fire("Cancelado", "No se modifico la experiencia", "error");
    setmodalView(!modalView);
  };

  return (
    <div
      className={`
        ${modalView ? "flex" : "hidden"}
        fixed 
        left-0 
        top-0 
        z-[1059] 
        h-screen 
        w-screen 
        items-center 
        justify-center 
        bg-[rgba(0,0,0,0.4)] 
        transition-colors 
        duration-100`}
    >
      <div
        onClick={() => setmodalView(!modalView)}
        className={`absolute z-[90] ${modalView ? "block" : "hidden"} h-screen w-screen bg-[rgba(0,0,0,0.6)]  `}
      />
      <div
        className={`
                    relative 
                    z-[99] 
                    h-auto 
                    w-[35rem] 
                    rounded-3xl 
                    bg-background 
                    p-8 
                    text-text
                    shadow-[0_7px_20px_0_var(--box-shadow)]`}
      >
        <div className={`w-full p-4 text-end`}>
          <FontAwesomeIcon
            className={`tex-text w-8 cursor-pointer text-[2rem]`}
            onClick={() => setmodalView(!modalView)}
            icon={faXmark}
          />
        </div>
        <form onSubmit={handleSubmit(onUpdateExperience)}>
          <div className={`mx-12`}>
            <div className={`flex w-full flex-col items-start justify-center`}>
              <input
                id="posición"
                className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
                placeholder="Posicion"
                type="text"
                {...register("posición", {
                  required: "Este campo es requerido",
                })}
              />

              {!!errors.posición && <p className={`text-error`}>{errors.posición.message}</p>}
            </div>
            <div className={`flex w-full flex-col items-start justify-center`}>
              <input
                id="description"
                className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
                placeholder="Description"
                type="textarea"
                {...register("description", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
              />

              {!!errors.description && <p className={`text-error`}>{errors.description.message}</p>}
            </div>
            <div className={`flex w-full flex-col items-start justify-center`}>
              <input
                id="company"
                className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
                placeholder="Compania"
                type="text"
                {...register("company", {
                  required: "Este campo es requerido",
                })}
              />

              {!!errors.company && <p className={`text-error`}>{errors.company.message}</p>}
            </div>
            <div className={`flex w-full flex-col items-start justify-center`}>
              <input
                id="WorkSince"
                className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
                placeholder="Trabaje Desde"
                type="date"
                {...register("WorkSince", {
                  required: "Este campo es requerido",
                })}
              />

              {!!errors.WorkSince && <p className={`text-error`}>{errors.WorkSince.message}</p>}
            </div>
            <div className={`flex w-full flex-col items-start justify-center`}>
              <div className={`my-4 flex flex-row items-center justify-center`}>
                <input
                  className={`h-[1.5rem] w-[1.5rem]`}
                  onClick={() => setfinish(!finish)}
                  checked={finish}
                  type="checkbox"
                  {...register("unfinished")}
                />
                <label className={`mx-4`}>Finalizo el trabajo ?</label>
              </div>
              <label className={`mt-8 ${!finish ? "hidden" : "block"}`} htmlFor="Start">
                Fin del trabajo:
              </label>
              <input
                id="WorkTo"
                className={`
              ${!finish ? "hidden" : "block"}
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
                placeholder="Finalizacion trabajo"
                type="date"
                {...register("WorkTo")}
              />
              {!!errors.WorkTo && <p className={`text-error`}>{errors.WorkTo.message}</p>}
            </div>
            <button
              disabled={isSaving}
              type="submit"
              className={`
            mt-8
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
            >
              Agregar Nueva Experiencia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const Education = () => {
  const { insertNewEducation, isSaving } = useContext(PortfolioContext);
  const [finish, setfinish] = useState(false);
  type FormData = {
    tittle?: string;
    description?: string;
    place?: string;
    Start?: string;
    unfinished: boolean;
    Finish?: string | null;
  };

  const dateNow = (): string => {
    let dateNow = new Date();
    let date =
      dateNow.getFullYear() +
      "-" +
      ("0" + (dateNow.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + dateNow.getDate()).slice(-2);
    return date;

    return date;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { tittle: "", description: "", place: "", Start: dateNow(), Finish: dateNow(), unfinished: false },
  });

  const onInsertEducation = async ({ tittle, description, place, Start, Finish, unfinished }: FormData) => {
    const startSplit = Start!.split("-");
    let start = `${startSplit[2]}/${startSplit[1]}/${startSplit[0]}`;
    let finish = "";
    if (!unfinished) finish = "Actualidad";
    else {
      const finishSplit = Finish!.split("-");
      finish = `${finishSplit[2]}/${finishSplit[1]}/${finishSplit[0]}`;
    }
    const ok = await insertNewEducation({ tittle, description, place, start, finish });
    if (ok) {
      reset();
      Swal.fire("Succes", "Agregado correctamente", "success");
      return;
    }
    Swal.fire("Error", "Error al agregar", "warning");
  };

  return (
    <section className={`my-12 w-full`}>
      <h1
        className={`my-12 
              text-[2rem] 
              font-bold 
              sm:text-[2rem] 
              lg:text-[2.5rem] 
              `}
      >
        EDUCACION
      </h1>
      <form onSubmit={handleSubmit(onInsertEducation)}>
        <div className={`mx-12`}>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="tittle"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Titulo"
              type="text"
              {...register("tittle", {
                required: "Este campo es requerido",
              })}
            />

            {!!errors.tittle && <p className={`text-error`}>{errors.tittle.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="description"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Description"
              type="textarea"
              {...register("description", {
                required: "Este campo es requerido",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
            />

            {!!errors.description && <p className={`text-error`}>{errors.description.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <input
              id="place"
              className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Lugar de estudio"
              type="text"
              {...register("place", {
                required: "Este campo es requerido",
              })}
            />

            {!!errors.place && <p className={`text-error`}>{errors.place.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <label className={` mt-8`} htmlFor="Start">
              Inicio del estudio:
            </label>
            <input
              id="Start"
              className={`
             
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Inicio carrera"
              type="date"
              {...register("Start", {
                required: "Este campo es requerido",
              })}
            />

            {!!errors.Start && <p className={`text-error`}>{errors.Start.message}</p>}
          </div>
          <div className={`flex w-full flex-col items-start justify-center`}>
            <div className={`my-4 flex flex-row items-center justify-center`}>
              <input
                className={`h-[1.5rem] w-[1.5rem]`}
                onClick={() => setfinish(!finish)}
                type="checkbox"
                {...register("unfinished")}
              />
              <label className={`mx-4`}>Finalizo el estudio ?</label>
            </div>
            <label className={`mt-8 ${!finish ? "hidden" : "block"}`} htmlFor="Start">
              Fin del estudio:
            </label>
            <input
              id="Finish"
              className={`
              ${!finish ? "hidden" : "block"}
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
              placeholder="Finalizacion carrera"
              type="date"
              {...register("Finish")}
            />
            {!!errors.Finish && <p className={`text-error`}>{errors.Finish.message}</p>}
          </div>
          <button
            disabled={isSaving}
            type="submit"
            className={`
            mt-8
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
          >
            Agregar Nueva Experiencia
          </button>
        </div>
      </form>
      <EducationTable />
    </section>
  );
};

const EducationTable = () => {
  const { Educations, deleteEducation } = useContext(PortfolioContext);
  const [modalView, setmodalView] = useState(false);
  const [educationSelected, setseducationSelected] = useState<IExperience>();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const onDeleteExperience = async (id: string) => {
    const result = await swalWithBootstrapButtons.fire({
      title: "Estas Seguro?",
      text: "Esta accion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar!",
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      const ok = await deleteEducation(id);
      if (ok) {
        swalWithBootstrapButtons.fire("Eliminado!", "La experiencia laboral se borro correctamente", "success");
        return;
      }
      swalWithBootstrapButtons.fire("Error", "Ocurrio un error inesperado al borrar la experiencia", "error");
    }
    swalWithBootstrapButtons.fire("Cancelado", "No se elimino la experiencia", "error");
  };

  const openProyectModal = (experience: IEducation) => {
    setseducationSelected(experience);
    setmodalView(!modalView);
  };

  return (
    <>
      <table className={`mt-16 w-full border-separate border-spacing-4`}>
        <thead className={`bg-transparent`}>
          <tr className={`border-spacing-0`}>
            <th className={`text-grey`}>Titulo</th>
            <th className={`hidden text-grey lg:table-cell`}>Lugar</th>
            <th className={`text-grey`}>
              <span>Ver</span>
            </th>
            <th className={`h-10 text-grey`}>
              <span>Eliminar</span>
            </th>
          </tr>
          <tr className={`p-8`}></tr>
        </thead>
        <tbody>
          {Educations?.map(({ id, tittle, place, description, start, finish }, i) => {
            return (
              <tr key={i}>
                <td className={`text-ellipsis break-all text-center`}>{tittle}</td>
                <td className={`hidden text-ellipsis break-all text-center lg:table-cell`}>{place}</td>
                <motion.td
                  whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  className={`cursor-pointer text-center`}
                  onClick={() => openProyectModal({ id, tittle, place, description, start, finish })}
                >
                  <FontAwesomeIcon className={`inline-block w-8 text-[2rem]`} icon={faEye} />
                </motion.td>
                <motion.td
                  onClick={() => onDeleteExperience(id!)}
                  whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  className={`cursor-pointer text-center`}
                >
                  <FontAwesomeIcon className={`inline-block w-8 text-[2rem]`} icon={faTrash} />
                </motion.td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <EducationModal Education={educationSelected!} modalView={modalView} setmodalView={setmodalView} />
    </>
  );
};

interface educationProps {
  Education: IEducation;
  modalView: any;
  setmodalView: any;
}

const EducationModal = ({ Education, modalView, setmodalView }: educationProps) => {
  let Start: string = "";
  let Finish: string = "";
  let Checked: boolean = false;
  const { updateEducation, isSaving } = useContext(PortfolioContext);
  const [finish, setfinish] = useState(Checked);

  const dateNow = (): string => {
    let dateNow = new Date();
    let date =
      dateNow.getFullYear() +
      "-" +
      ("0" + (dateNow.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + dateNow.getDate()).slice(-2);
    return date;

    return date;
  };

  type FormData = {
    tittle?: string;
    description?: string;
    place?: string;
    Start?: string;
    unfinished: boolean;
    Finish?: string | null;
  };

  if (Education != undefined) {
    const { start, finish } = Education;
    const startSplit = start!.split("/");
    Start = `${startSplit[2]}-${startSplit[1]}-${startSplit[0]}`;
    if (finish != "Actualidad") {
      const finishSplit = finish!.split("/");
      Finish = `${finishSplit[2]}-${finishSplit[1]}-${finishSplit[0]}`;
    } else {
      Finish = dateNow();
    }
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { ...Education, Start, Finish } });

  useEffect(() => {
    if (modalView) {
      document.body.classList.add("no-scroll");
      document.body.classList.remove("scroll");
    } else {
      document.body.classList.add("scroll");
      document.body.classList.remove("no-scroll");
    }
  }, [modalView]);

  useEffect(() => {
    reset({ ...Education, Start, Finish });
    if (Education != undefined) {
      const { finish } = Education;
      setfinish(finish != "Actualidad");
    }
  }, [Education, Start, Finish]);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const onUpdateEducation = async ({ tittle, place, description, Start, Finish, unfinished }: FormData) => {
    let ok: boolean = false;
    const { id } = Education;
    const result = await swalWithBootstrapButtons.fire({
      title: "Estas Seguro?",
      text: "Esta accion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Modificar",
      cancelButtonText: "No, Cancelar!",
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      const startSplit = Start!.split("-");
      let start = `${startSplit[2]}/${startSplit[1]}/${startSplit[0]}`;
      let finish = "";
      if (!unfinished) finish = "Actualidad";
      else {
        const finishSplit = Finish!.split("-");
        finish = `${finishSplit[2]}/${finishSplit[1]}/${finishSplit[0]}`;
      }
      ok = await updateEducation({ tittle, place, description, start, finish, id });
      if (ok) {
        reset();
        swalWithBootstrapButtons.fire("Modificada!", "La Educacion se modifico correctamente", "success");
        setmodalView(!modalView);
        return;
      }
      swalWithBootstrapButtons.fire("Error!", "Error al modificar", "warning");
    }
    swalWithBootstrapButtons.fire("Cancelado", "No se modifico", "error");
    setmodalView(!modalView);
  };

  return (
    <div
      className={`
        ${modalView ? "flex" : "hidden"}
        fixed 
        left-0 
        top-0 
        z-[1059] 
        h-screen 
        w-screen 
        items-center 
        justify-center 
        bg-[rgba(0,0,0,0.4)] 
        transition-colors 
        duration-100`}
    >
      <div
        onClick={() => setmodalView(!modalView)}
        className={`absolute z-[90] ${modalView ? "block" : "hidden"} h-screen w-screen bg-[rgba(0,0,0,0.6)]  `}
      />
      <div
        className={`
                    relative 
                    z-[99]
                    h-auto 
                    w-[35rem] 
                    rounded-3xl 
                    bg-background 
                    p-8 
                    text-text
                    shadow-[0_7px_20px_0_var(--box-shadow)]`}
      >
        <div className={`w-full p-4 text-end`}>
          <FontAwesomeIcon
            className={`tex-text w-8 cursor-pointer text-[2rem]`}
            onClick={() => setmodalView(!modalView)}
            icon={faXmark}
          />
        </div>
        <form onSubmit={handleSubmit(onUpdateEducation)}>
          <div className={`mx-12`}>
            <div className={`flex w-full flex-col items-start justify-center`}>
              <input
                id="tittle"
                className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
              placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
                placeholder="Titulo"
                type="text"
                {...register("tittle", {
                  required: "Este campo es requerido",
                })}
              />

              {!!errors.tittle && <p className={`text-error`}>{errors.tittle.message}</p>}
            </div>
            <div className={`flex w-full flex-col items-start justify-center`}>
              <input
                id="description"
                className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
                placeholder="Description"
                type="textarea"
                {...register("description", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
              />

              {!!errors.description && <p className={`text-error`}>{errors.description.message}</p>}
            </div>
            <div className={`flex w-full flex-col items-start justify-center`}>
              <input
                id="place"
                className={`
              mt-8
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
                placeholder="Lugar de estudio"
                type="text"
                {...register("place", {
                  required: "Este campo es requerido",
                })}
              />

              {!!errors.place && <p className={`text-error`}>{errors.place.message}</p>}
            </div>
            <div className={`flex w-full flex-col items-start justify-center`}>
              <label className={` mt-8`} htmlFor="Start">
                Inicio del estudio:
              </label>
              <input
                id="Start"
                className={`
             
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
                placeholder="Inicio carrera"
                type="date"
                {...register("Start", {
                  required: "Este campo es requerido",
                })}
              />

              {!!errors.Start && <p className={`text-error`}>{errors.Start.message}</p>}
            </div>
            <div className={`flex w-full flex-col items-start justify-center`}>
              <div className={`my-4 flex flex-row items-center justify-center`}>
                <input
                  className={`h-[1.5rem] w-[1.5rem]`}
                  onClick={() => setfinish(!finish)}
                  type="checkbox"
                  checked={finish}
                  {...register("unfinished")}
                />
                <label className={`mx-4`}>Finalizo el estudio ?</label>
              </div>
              <label className={`mt-8 ${!finish ? "hidden" : "block"}`} htmlFor="Start">
                Fin del estudio:
              </label>
              <input
                id="Finish"
                className={`
              ${!finish ? "hidden" : "block"}
              w-full 
              rounded-md 
              border-[1px] 
              border-inputBorder
              bg-inputBg 
              py-2 
              px-2 
              text-imputColor 
                    placeholder:text-imputColor  
              focus:bg-inputBg 
              focus:outline-none 
              active:bg-inputBg 
              active:outline-none`}
                placeholder="Finalizacion carrera"
                type="date"
                {...register("Finish")}
              />
              {!!errors.Finish && <p className={`text-error`}>{errors.Finish.message}</p>}
            </div>
            <button
              disabled={isSaving}
              type="submit"
              className={`
            mt-8
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
            >
              Agregar Nueva Experiencia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const MessageList = () => {
  const [messages, setmessages] = useState<Imessage[] | null>();

  useEffect(() => {
    async function getMessages() {
      const resp = await getMessage();
      setmessages(resp);
    }
    getMessages();
  }, []);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const onDeleteMessage = async (id: string) => {
    const result = await swalWithBootstrapButtons.fire({
      title: "Estas Seguro?",
      text: "Esta accion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar!",
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      const ok = await deleteMessage(id);
      if (ok) {
        swalWithBootstrapButtons.fire("Eliminado!", "El Proyecto se borro correctamente", "success");
        const resp = await getMessage();
        setmessages(resp);
        return;
      }
      swalWithBootstrapButtons.fire("Error", "Ocurrio un error inesperado al borrar el proyecto", "error");
    }
    swalWithBootstrapButtons.fire("Cancelado", "No se elimino el Proyecto", "error");
  };

  return (
    <section className={`py-12`} id="message">
      <h1
        className={`my-12 
              text-[2rem] 
              font-bold 
              sm:text-[2rem] 
              lg:text-[2.5rem] 
              `}
      >
        MESSAGE
      </h1>
      {messages != undefined && messages != null && messages!.length > 0 ? (
        <div className={`flex flex-wrap gap-8`}>
          {messages?.map(({ id, email, message, name, date }) => (
            <motion.ul
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              key={id}
              className={`w-full rounded-xl bg-white p-8 text-violet shadow-[0_5px_15px_rgba(0,0,0,0.35)] md:w-1/2 lg:w-1/3`}
            >
              <li className={`flex w-full justify-end text-grey`}>
                <FontAwesomeIcon
                  className={`tex-text w-8 cursor-pointer text-[2rem]`}
                  onClick={() => onDeleteMessage(id!)}
                  icon={faXmark}
                />
              </li>
              <li>
                <span className={`text-salmon`}>Nombre: </span>
                {name}
              </li>
              <li>
                <span className={`text-salmon`}>Email: </span>
                {email}
              </li>
              <li className={`pb-4`}>
                <span className={`text-salmon`}>Mensaje: </span>
                {message}
              </li>
              <li className={`w-full border-t-[1px] border-grey py-2 text-end text-grey`}>{date}</li>
            </motion.ul>
          ))}
        </div>
      ) : (
        <div className={`flex flex-col items-center justify-center md:flex-row `}>
          <h1 className={`text-[1.2rem] text-text sm:text-[1.5rem] md:text-[2rem]`}>
            No hay mensajes actualmente ....
          </h1>
          <Image
            draggable={false}
            className={`mt-6 h-[150px] w-[150px] md:mt-0`}
            alt="cry"
            width={0}
            height={0}
            src={Cry}
          />
        </div>
      )}
    </section>
  );
};

export default Admin;
