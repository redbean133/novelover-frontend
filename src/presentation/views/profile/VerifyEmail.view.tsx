import { H1 } from "@/presentation/components/typography/H1/H1";
import { VerifyEmailViewModel } from "@/presentation/viewmodels/manage-profile/VerifyEmail.viewmodel";

export const VerifyEmailView = () => {
  VerifyEmailViewModel();

  return (
    <div>
      <H1>Liên kết email</H1>
      <p>Đang xác thực địa chỉ email, vui lòng chờ trong giây lát...</p>
    </div>
  );
};
