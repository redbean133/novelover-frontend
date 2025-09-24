import { Helmet } from "react-helmet";
import { RegisterForm } from "./RegisterForm";
import { Link } from "react-router-dom";

export const RegisterView = () => {
  return (
    <>
      <Helmet>
        <title>Đăng ký tài khoản - Novelover</title>
      </Helmet>
      <div className="pt-24">
        <RegisterForm />
        <div className="text-center text-sm mt-6">
          Đã có tài khoản?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Đăng nhập
          </Link>
        </div>
      </div>
    </>
  );
};
