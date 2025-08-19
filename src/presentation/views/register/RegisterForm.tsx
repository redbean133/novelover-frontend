import type { RootState } from "@/presentation/redux/store";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import { Input } from "@/presentation/shadcn-ui/components/ui/input";
import { Label } from "@/presentation/shadcn-ui/components/ui/label";
import { cn } from "@/presentation/shadcn-ui/lib/utils";
import { RegisterViewModel } from "@/presentation/viewmodels/register/Register.viewmodel";
import { useSelector } from "react-redux";

export const RegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const {
    username,
    password,
    confirmPassword,
    isValidUsername,
    isValidPassword,
    isValidConfirmPassword,
    usernameValidation,
    passwordValidation,
    confirmPasswordValidation,
    registerValidation,
  } = useSelector((state: RootState) => state.user.register);
  const {
    onUsernameChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onSubmitForm,
  } = RegisterViewModel();

  return (
    <form
      onSubmit={onSubmitForm}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng ký tài khoản</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Tên đăng nhập</Label>
          <Input
            id="username"
            type="text"
            error={!isValidUsername && !!usernameValidation}
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            autoComplete="new-password"
          />
          {!isValidUsername && usernameValidation && (
            <p className="text-red-500 text-xs">{usernameValidation}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Mật khẩu</Label>
          </div>
          <Input
            id="password"
            type="password"
            error={!isValidPassword && !!passwordValidation}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            autoComplete="new-password"
          />
          {!isValidPassword && passwordValidation && (
            <p className="text-red-500 text-xs">{passwordValidation}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
          </div>
          <Input
            id="confirm-password"
            type="password"
            error={!isValidConfirmPassword && !!confirmPasswordValidation}
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
          />
          {!isValidConfirmPassword && confirmPasswordValidation && (
            <p className="text-red-500 text-xs">{confirmPasswordValidation}</p>
          )}
        </div>
        <div>
          {registerValidation && (
            <p className="text-red-500 text-xs mb-2">{registerValidation}</p>
          )}
          <Button type="submit" className="w-full">
            Đăng ký
          </Button>
        </div>
      </div>
    </form>
  );
};
