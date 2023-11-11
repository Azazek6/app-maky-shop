import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import SideBarContent from "./Navegation/SideBarContent";

const Layout = ({ children, title }) => {
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
        <title>{title} Administracion</title>
      </Head>
      <SideBarContent>{children}</SideBarContent>
    </>
  );
};

export default Layout;
