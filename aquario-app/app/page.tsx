import { Navbar } from "@/components/navbar";
import { LoginFormComponent } from "@/components/login-form";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <LoginFormComponent />
      </div>
    </div>
  );
};

export default Login;
