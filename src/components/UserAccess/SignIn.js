import { useState } from "react";
import Link from "next/link";
import "animate.css";
import { HiOutlineXMark, HiEye, HiEyeSlash } from "react-icons/hi2";
import { useGlobal } from "@/context/GlobalProvider";

const SignIn = () => {
  const { showCredentials, handleClickShowCredential } = useGlobal();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <aside
      className={`${
        showCredentials
          ? "fixed top-0 left-0 w-full h-screen z-50 bg-[#cccbff] animate__animated animate__zoomIn animate__faster"
          : "animate__animated animate__fadeOut"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="w-[100%] flex items-center justify-end px-28 py-16">
        <HiOutlineXMark
          className="cursor-pointer text-4xl font-bold text-[#493ca6] bg-white rounded-full p-1 hover:opacity-70"
          onClick={handleClickShowCredential}
        />
      </div>

      <div className="m-auto w-[70%] flex bg-white ">
        <div className="w-[100%] bg-[#e6e4ff] p-1">
          <img className="object-cover h-full w-full" src="/login.svg" alt="" />
        </div>
        <div className="w-[100%] p-10">
          <p className="text-right text-sm">
            No eres miembro?{" "}
            <span className="text-[#6560a3] cursor-pointer hover:opacity-70">
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
      </div>
    </aside>
  );
};

export default SignIn;
