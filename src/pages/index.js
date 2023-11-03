import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

const Home = () => {
  return (
    <Layout>
      {/* BANNER */}
      <div className="w-[100%] flex items-center rounded-xl bg-gradient-to-r from-violet-200 to-pink-200 px-10 py-5">
        <div className="w-[100%] ml-10">
          <p className="text-xs pb-2">Limited Time Only For Winter</p>
          <h1 className="text-7xl pb-2">fashion</h1>
          <h2 className="text-lg pb-2">LOOK YOUR BEST ON YOUR BEST DAY</h2>
          <div className="mt-10">
            <button className="text-xs text-white font-bold px-10 py-3 rounded-xl bg-gradient-to-r from-rose-400 to-red-500 cursor-pointer">Explore Now!</button>
          </div>
        </div>
        <div className="w-[40%]">
          <img className="w-[500px]" src="/logo.jpg" alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
