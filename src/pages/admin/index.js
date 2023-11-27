import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "sonner";
import Head from "next/head";
import { toastMessage } from "@/helpers/general";
import { useGlobal } from "@/context/GlobalProvider";

const SignIn = () => {
  const { signInPanel } = useGlobal();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState({
    username: "",
    password: "",
    id_rol: "2",
  });

  const handleChange = ({ target: { name, value } }) => {
    setAuth({ ...auth, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (auth.username == "" || auth.password == "") {
      setLoading(false);
      toastMessage("Todos los datos son obligatorios", 2);
      return;
    }
    try {
      const { status, data } = await signInPanel(auth);

      if (status == 201) {
        setLoading(false);
        localStorage.setItem("tokenMakyPanel", data.token);
        toastMessage(data.message, 1);
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      toastMessage(error.response.data.message, 3);
    }
  };

  useEffect(() => {
    const tokenPanel = localStorage.getItem("tokenMakyPanel");

    if (tokenPanel) {
      router.push("/admin/dashboard");
    }
  }, []);

  return (
    <>
      <Toaster theme="light" position="top-right" duration={2000} />
      <Head>
        <title>Iniciar Sesion | Administracion</title>
      </Head>
      <div className="bg-[#cccbff] fixed top-0 left-0 w-full h-screen z-50">
        <div
          className={`mt-44 w-[90%] md:w-[50%] lg:w-[30%] m-auto flex bg-[#e2e8f0] rounded-lg`}
        >
          <div className="w-[100%] p-5">
            <h2 className="text-center text-base sm:text-xl text-[#475569] font-bold">
              Sistema Administrativo
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="m-auto w-[90%] flex-row items-center mt-10">
                <label
                  htmlFor="username"
                  className="text-[#475569] text-xs font-semibold"
                >
                  USUARIO
                </label>
                <input
                  type="text"
                  placeholder="Usuario"
                  name="username"
                  value={auth.username}
                  onChange={handleChange}
                  className="w-[100%] mt-[3px] outline-none border border-[#cfcecf] p-2 placeholder:text-[#cbd5e1] placeholder:text-xs rounded-md shadow focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
                />
              </div>
              <div className="m-auto w-[90%] flex-row items-center mt-5">
                <label
                  htmlFor="password"
                  className="text-[#475569] text-xs font-semibold"
                >
                  CONTRASE&Ntilde;A
                </label>
                <input
                  type="password"
                  name="password"
                  value={auth.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  className="w-[100%] mt-[3px] outline-none border border-[#cfcecf] p-2 placeholder:text-[#cbd5e1] placeholder:text-xs rounded-md shadow focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
                />
              </div>

              <div className="w-[90%] m-auto flex mt-5">
                <button
                  disabled={loading}
                  className="w-[100%] text-sm sm:text-lg mt-[16px] border bg-[#1e293b] p-2 text-white font-semibold rounded-md hover:opacity-80 transition-all duration-300 ease-in-out"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
