import { UserRepositoryImpl } from "@/data/repositories-implementation/user.repositoryImpl";
import { UserUseCase } from "@/domain/usecases/user.usecase";
import { AxiosError } from "axios";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

export const VerifyEmailViewModel = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userUseCase = useMemo(() => UserUseCase(new UserRepositoryImpl()), []);
  const token = searchParams.get("token");

  const verifyEmail = async () => {
    if (!token) {
      toast.error("Không tìm thấy verify email token");
      return navigate("/");
    }

    try {
      const { success, message } = await userUseCase.verifyEmail(token);
      if (success) toast.success(message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : "Lỗi hệ thống"
      );
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [searchParams]);
};
