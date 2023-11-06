import { useState } from "react";
import Link from "next/link";
import "animate.css";
import { HiOutlineXMark, HiEye, HiEyeSlash } from "react-icons/hi2";
import { useGlobal } from "@/context/GlobalProvider";

const SignIn = () => {
  const { showCredentials, handleClickShowCredential } = useGlobal();
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <aside
      className={`${
        showCredentials
          ? `fixed top-0 left-0 w-full h-screen z-50 ${
              !showRegister ? "bg-[#cccbff]" : "bg-[#ffcce2]"
            } animate__animated animate__zoomIn animate__faster`
          : "animate__animated animate__fadeOut"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="w-[100%] flex items-center justify-end px-28 py-16">
        <HiOutlineXMark
          className={`cursor-pointer text-4xl font-bold  ${
            !showRegister ? "text-[#493ca6]" : "text-[#ba3a77]"
          } bg-white rounded-full p-1 hover:opacity-70`}
          onClick={handleClickShowCredential}
        />
      </div>

      <div className="m-auto w-[70%] flex bg-white ">
        {/* SECCION 1 */}
        {!showRegister ? (
          <div
            className={`w-[100%] bg-[#e6e4ff] p-1 animate__animated ${
              showRegister ? " animate__fadeOutUp" : "animate__fadeInDown"
            }`}
          >
            <img
              className="object-cover h-full w-full"
              src="/login.svg"
              alt=""
            />
          </div>
        ) : (
          <div
            className={`w-[100%] p-10 animate__animated ${
              showRegister ? "animate_fadeInUp" : "animate_fadeOutUp"
            }`}
          >
            <p className="text-right text-sm">
              Eres miembro?{" "}
              <span
                className="text-[#b68091] font-bold cursor-pointer hover:opacity-70"
                onClick={() => {
                  setShowRegister(!showRegister);
                }}
              >
                Ingrese ahora!
              </span>
            </p>

            <div className="mt-[60px] text-center">
              <h2 className="text-2xl font-bold">BIENVENIDO A MAKYS!</h2>
              <p className="mt-[10px] text-sm font-semibold">Es bueno verte!</p>
            </div>

            <div className="m-auto w-[64%] flex-row items-center mb-5">
              <input
                type="text"
                placeholder="Correo electronico"
                className="w-[100%] mt-[24px] mb-[20px] outline-none border border-[#cfcecf] p-2 placeholder:text-[#606670]"
              />
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="w-full outline-none border mb-[20px] border-[#cfcecf] p-2 placeholder:text-[#606670]"
                />
                {!showPassword ? (
                  <HiEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-xl text-[#acaaac]"
                  />
                ) : (
                  <HiEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-xl text-[#acaaac]"
                  />
                )}
              </div>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmar la contraseña"
                  className="w-full outline-none border border-[#cfcecf] p-2 placeholder:text-[#606670]"
                />
                {!showPassword ? (
                  <HiEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-xl text-[#acaaac]"
                  />
                ) : (
                  <HiEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-xl text-[#acaaac]"
                  />
                )}
              </div>

              <button className="w-[100%] mt-[24px] border bg-[#f80063] p-3 text-white font-semibold rounded-md hover:opacity-80">
                Registrarse
              </button>
            </div>
          </div>
        )}

        {/* SECCION 2 */}

        {!showRegister ? (
          <div className="w-[100%] p-10">
            <p className="text-right text-sm">
              No eres miembro?{" "}
              <span
                className="text-[#6560a3] cursor-pointer hover:opacity-70"
                onClick={() => {
                  setShowRegister(!showRegister);
                }}
              >
                Registrate ahora!
              </span>
            </p>

            <div className="mt-[60px] text-center">
              <h2 className="text-2xl font-bold">BIENVENIDO!</h2>
              <p className="mt-[10px] text-sm font-semibold">
                Hola de nuevo, te echamos de menos
              </p>
            </div>

            <div className="m-auto w-[64%] flex-row items-center mb-5">
              <input
                type="text"
                placeholder="Usuario"
                className="w-[100%] mt-[24px] mb-[20px] outline-none border border-[#cfcecf] p-2 placeholder:text-[#606670]"
              />
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="w-full outline-none border border-[#cfcecf] p-2 placeholder:text-[#606670]"
                />
                {!showPassword ? (
                  <HiEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-xl text-[#acaaac]"
                  />
                ) : (
                  <HiEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-xl text-[#acaaac]"
                  />
                )}
              </div>
              <div className="w-[100%] flex justify-end mt-5">
                <Link href="/" className="text-black text-xs hover:underline">
                  Olvidaste tu contraseña?
                </Link>
              </div>

              <button className="w-[100%] mt-[24px] border bg-[#1b19f8] p-3 text-white font-semibold rounded-md hover:opacity-80">
                Login
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`w-[100%] bg-[#e6e4ff] animate__animated ${
              showRegister ? "animate__fadeInUp" : "animate__fadeInDown"
            }`}
          >
            <img
              className="object-cover h-full w-full"
              src="/signup.svg"
              alt=""
            />
          </div>
        )}
      </div>
    </aside>
  );
};

export default SignIn;
