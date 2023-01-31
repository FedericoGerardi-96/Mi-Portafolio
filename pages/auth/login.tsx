import { useContext, useEffect } from "react";

import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../context/auth";
import { validations } from "../../utilities";
import style from "../../styles/login.module.css";

const bottonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255, 255,255)",
    boxShadow: "0px 0px 8px rgb(255, 255,255)",
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
};

type FormData = {
  email: string;
  password: string;
};

const login = () => {
  const { loginUser, errorMessage, isLoggedIn } = useContext(AuthContext);

  const router = useRouter();

  const error = Object.keys(errorMessage || "").length === 0 ? "" : errorMessage;

  useEffect(() => {
    if (isLoggedIn) router.replace("/");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    const isValidLogin = await loginUser(email, password);
    if (!isValidLogin) {
      return;
    }
    router.replace("/");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        className={`${style.background}`}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <motion.form
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 1.5 } }}
          onSubmit={handleSubmit(onLoginUser)}
          noValidate
          className={`${style.form}`}
        >
          <h3>Login</h3>

          <label className={`${style.label}`}>Username</label>
          <input
            className={`${style.input} ${!!errors.email ? style.inputError : style.inputCorrect}`}
            type="text"
            placeholder="Email"
            id="username"
            {...register("email", {
              required: "Este campo es requerido",
              validate: validations.isEmail,
            })}
          />
          {!!errors.email && <p className={`${style.textError}`}>{errors.email.message}</p>}
          <label className={`${style.label}`}>Password</label>
          <input
            className={`${style.input} ${!!errors.password ? style.inputError : style.inputCorrect}`}
            type="password"
            placeholder="Password"
            id="password"
            {...register("password", {
              required: "Este campo es requerido",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
          />
          {!!errors.password && <p className={`${style.textError}`}>{errors.password.message}</p>}

          {!!error && (
            <div style={{ display: !!error ? "" : "none" }}>
              <div className={`${style.errorFirestoreMessage}`}>
                <p>{error}</p>
                <FontAwesomeIcon icon={faCircleExclamation} />
              </div>
            </div>
          )}
          <motion.button
            variants={bottonVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95, x: "-5px", y: "5px" }}
            className={`${style.button}`}
          >
            Log In
          </motion.button>
        </motion.form>
      </motion.div>
    </>
  );
};

export default login;
