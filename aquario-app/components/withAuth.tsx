"use client";
import { useRouter } from "next/navigation";
import { JSX, useEffect } from "react";
import { ComponentType } from "react";

const withAuth = (WrappedComponent: ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
