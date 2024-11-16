"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return function AuthComponent(
    props: React.ComponentProps<typeof WrappedComponent>
  ) {
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
