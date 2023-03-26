import { quizApi } from "../../../Api/QuizApi";

export const serviceAuthLogin = async (email, password) => {
  try {
    const { data } = await quizApi.post("/auth/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    const { data, status } = error.response || "sas";
    if (status === 500) {
      return { status: false, error: data };
    }
    if (status === 400) {
      return { status: false, error: data?.err?.errors || data };
    }
    return {
      status: false,
      error: "No se pudo establecer una conexion con el servidor",
    };
  }
};



export const serviceRegister = async (dataRegister) => {
  
  try {
    const { data } = await quizApi.post(
      "adviser-team/add-adviser-and-team",
      {
        ...dataRegister
      }
    );    
    return data;
  } catch (error) {
    return {
        status: false,
        error: error.response.data.err?.errors || error.response.data
    }
  }
};

