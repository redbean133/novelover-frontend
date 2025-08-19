import type { RootState } from "@/presentation/redux/store";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import { Input } from "@/presentation/shadcn-ui/components/ui/input";
import { Label } from "@/presentation/shadcn-ui/components/ui/label";
import { cn } from "@/presentation/shadcn-ui/lib/utils";
import { LoginViewModel } from "@/presentation/viewmodels/login/Login.viewmodel";
import { useSelector } from "react-redux";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    username,
    password,
    isValidUsername,
    isValidPassword,
    usernameValidation,
    passwordValidation,
    loginValidation,
  } = useSelector((state: RootState) => state.user.login);
  const { onUsernameChange, onPasswordChange, onSubmitForm } = LoginViewModel();

  return (
    <form
      onSubmit={onSubmitForm}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Đăng nhập tài khoản</h1>
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
          />
          {!isValidUsername && usernameValidation && (
            <p className="text-red-500 text-xs">{usernameValidation}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Mật khẩu</Label>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Quên mật khẩu?
            </a> */}
          </div>
          <Input
            id="password"
            type="password"
            error={!isValidPassword && !!passwordValidation}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
          {!isValidPassword && passwordValidation && (
            <p className="text-red-500 text-xs">{passwordValidation}</p>
          )}
        </div>
        <div>
          {loginValidation && (
            <p className="text-red-500 text-xs mb-2">{loginValidation}</p>
          )}
          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
        </div>
      </div>
    </form>
  );
}
