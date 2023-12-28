import React from "react";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="w-[100%] flex items-center mt-5 justify-center rounded-xl bg-gradient-to-r from-violet-200 to-pink-200 px-10 py-16">
        <h1 className="text-4xl font-bold">SOBRE NOSOTROS</h1>
      </div>
      <div className="mt-10 flex justify-center">
        <h2 className="text-2xl text-[#4f5665] font-bold underline">
          ¿Quienes somos?
        </h2>
      </div>
      <div className="w-[60%] m-auto mt-6 flex ">
        <p className="text-lg text-[#4f5665]">
          En nuestra tienda de ropa, nos apasiona ofrecer prendas de moda de alta calidad para hombres, mujeres y niños. Nos esforzamos por brindar una experiencia de compra excepcional, donde nuestros clientes puedan encontrar prendas que reflejen su estilo personal y los hagan sentir cómodos y seguros. Nuestra misión es ayudarte a expresar tu estilo y ofrecerte una amplia selección de ropa para todas las ocasiones. ¡Gracias por elegirnos como tu destino de moda!
        </p>
      </div>
      <div className="mt-12 flex justify-center">
        <img
          className="w-[220px]"
          src="/card-item.png"
          alt="Imagen acerca de la empresa"
        />
      </div>
    </Layout>
  );
};

export default About;
