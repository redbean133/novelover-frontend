import { RegisterForm } from "./RegisterForm";
import { Link } from "react-router-dom";

export const RegisterView = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-1 pt-40 justify-center">
        <div className="w-full max-w-xs">
          <RegisterForm />
          <div className="text-center text-sm mt-6">
            Đã có tài khoản?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
