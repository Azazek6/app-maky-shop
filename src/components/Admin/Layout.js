import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Toaster } from "sonner";
import NProgress from "nprogress";
import SideBarContent from "./Navegation/SideBarContent";

const Layout = ({ children, title }) => {
  const router = useRouter();

  useEffect(() => {
    const tokenPanel = localStorage.getItem("tokenMakyPanel");

    if (!tokenPanel) {
      router.push("/admin");
    }
  }, []);

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
        <title>{title} Administracion</title>
      </Head>
      <Toaster theme="light" position="top-right" duration={2000} />
      <SideBarContent>{children}</SideBarContent>
    </>
  );
};

export default Layout;
