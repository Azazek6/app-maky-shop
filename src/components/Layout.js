import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useGlobal } from "@/context/GlobalProvider";
import NavegationTop from "./Navegation/NavegationTop";
import SignIn from "./UserAccess/SignIn";
import Footer from "./Footer";

const Layout = ({ title, children }) => {
  const { actionBar, showCredentials } = useGlobal();

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
      <main
        className={`w-[100%] px-6 py-2 ${
          !actionBar ? "mt-24" : "mt-[300px]"
        } transition-all duration-300 ease-in-out`}
      >
        {children}
      </main>

      <Footer />

      {/* CREDENCIALES */}
      <SignIn />

      {/* FIN CREDENCIALES */}
    </>
  );
};

export default Layout;
