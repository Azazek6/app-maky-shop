import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "animate.css";
import { HiOutlineXMark } from "react-icons/hi2";
import { useGlobal } from "@/context/GlobalProvider";
import NavegationTop from "./Navegation/NavegationTop";
import SignIn from "./UserAccess/SignIn";
import Footer from "./Footer";

const Layout = ({ title, children }) => {
  const { showCredentials, handleClickShowCredential } = useGlobal();

  const router = useRouter();

  //Barra de carga
  useEffect(() => {
    const handleRouteChange = (url) => {
      NProgress.start();
    };
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", () => NProgress.done());

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <title>MAKYS {title}</title>
      </Head>
      <NavegationTop />
      <main className="w-[100%] px-6 py-2 mt-14">{children}</main>
      <Footer />
      {/* CREDENCIALES */}
      <aside
        className={`animate__animated ${
          showCredentials
            ? "animate__zoomIn fixed top-0 left-0 w-full h-screen z-50 bg-[#cccbff]"
            : "animate__zoomOut transition-all duration-500 ease-in-out"
        } `}
      >
        <div className="w-[100%] flex items-center justify-end px-44 py-24">
          <HiOutlineXMark
            className="cursor-pointer text-4xl font-bold text-[#493ca6] bg-white rounded-full p-1 hover:opacity-70"
            onClick={handleClickShowCredential}
          />
        </div>

        <SignIn />
      </aside>

      {/* FIN CREDENCIALES */}
    </>
  );
};

export default Layout;
