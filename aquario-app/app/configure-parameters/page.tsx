"use client";
import withAuth from "@/components/withAuth";
import { Navbar } from "@/components/navbar";
import { ConfigureParametersComponent } from "@/components/configure-parameters";

const ConfigureParameters = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <ConfigureParametersComponent />
      </div>
    </div>
  );
};

export default withAuth(ConfigureParameters);