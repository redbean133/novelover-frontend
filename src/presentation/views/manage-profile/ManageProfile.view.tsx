import { DatePicker } from "@/presentation/components/date-time/DatePicker";
import { UploadImage } from "@/presentation/components/input/UploadImage";
import { H1 } from "@/presentation/components/typography/H1/H1";
import type { RootState } from "@/presentation/redux/store";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/shadcn-ui/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/presentation/shadcn-ui/components/ui/dropdown-menu";
import { Input } from "@/presentation/shadcn-ui/components/ui/input";
import { Label } from "@/presentation/shadcn-ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/presentation/shadcn-ui/components/ui/select";
import { Textarea } from "@/presentation/shadcn-ui/components/ui/textarea";
import { ManageProfileViewModel } from "@/presentation/viewmodels/manage-profile/ManageProfile.viewmodel";
import {
  defaultAvatarUrl,
  defaultCoverUrl,
  Gender,
} from "@/shared/constants/constants";
import { useSelector } from "react-redux";
import { LoadingElement } from "@/presentation/components/loading/LoadingElement";
import { Ellipsis } from "lucide-react";
import { ButtonWithLoading } from "@/presentation/components/button/ButtonWithLoading";

export const ManageProfileView = () => {
  const {
    onChangeManageProfileState,
    onDisplayNameChange,
    onEmailChange,
    sendVerifyEmail,
    updateUserInfo,
    uploadAvatar,
    uploadCover,
    onCurrentPasswordChange,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onSubmitFormChangePassword,
    setOpenChangePasswordPopup,
    onClickViewProfile,
    handleLogout,
  } = ManageProfileViewModel();
  const originProfile = useSelector((state: RootState) => state.user.current);
  const manageProfile = useSelector(
    (state: RootState) => state.user.manageProfile
  );
  const changePasswordState = manageProfile.changePassword;

  return (
    <>
      <header className="flex flex-row items-center justify-between">
        <H1>Tài khoản</H1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="size-8">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onClickViewProfile}>
                Trang cá nhân
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleLogout}>
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      {manageProfile.isLoadingProfile ? (
        <LoadingElement className="mt-4" />
      ) : (
        <main className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="displayName" className="font-semibold">
              Tên hiển thị *
            </Label>
            <Input
              id="displayName"
              type="text"
              error={
                !manageProfile.isValidDisplayName &&
                !!manageProfile.displayNameValidation
              }
              value={manageProfile.displayName}
              onChange={(e) => onDisplayNameChange(e.target.value)}
            />
            {!manageProfile.isValidDisplayName &&
              manageProfile.displayNameValidation && (
                <p className="text-red-500 text-xs">
                  {manageProfile.displayNameValidation}
                </p>
              )}
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <Label className="font-semibold">Giới tính</Label>
              <Select
                value={manageProfile.gender.toString()}
                onValueChange={(selectedGender: string) =>
                  onChangeManageProfileState({
                    gender: Number(selectedGender) as Gender,
                    updateInfoValidation: "",
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Giới tính</SelectLabel>
                    <SelectItem value={Gender.Male.toString()}>Nam</SelectItem>
                    <SelectItem value={Gender.Female.toString()}>Nữ</SelectItem>
                    <SelectItem value={Gender.Unknown.toString()}>
                      Bí mật
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <DatePicker
                title="Ngày sinh"
                date={
                  manageProfile.birthday
                    ? new Date(manageProfile.birthday)
                    : undefined
                }
                maxDate={new Date()}
                align="end"
                onSelectDate={(selectedDate: Date | undefined) =>
                  onChangeManageProfileState({
                    birthday: selectedDate ? selectedDate.toISOString() : "",
                    updateInfoValidation: "",
                  })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="about" className="font-semibold">
              Giới thiệu
            </Label>
            <Textarea
              id="about"
              value={manageProfile.about}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChangeManageProfileState({
                  about: event.target.value,
                  updateInfoValidation: "",
                })
              }
            />
          </div>

          {manageProfile.updateInfoValidation && (
            <p className="text-red-500 text-xs">
              {manageProfile.updateInfoValidation}
            </p>
          )}
          <ButtonWithLoading
            onClick={updateUserInfo}
            isLoading={manageProfile.isLoadingSaveInfo}
            disabled={
              !manageProfile.isChangedInfo || !manageProfile.isValidDisplayName
            }
          >
            Lưu thay đổi
          </ButtonWithLoading>

          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="flex flex-col gap-2">
            <Label htmlFor="avatar" className="font-semibold">
              Ảnh đại diện
            </Label>
            <UploadImage
              onUploaded={uploadAvatar}
              initialImageUrl={manageProfile.avatarUrl}
              popupTitle="Ảnh đại diện"
              popupSubTitle="Sau khi lưu ảnh, ảnh đại diện mới sẽ được cập nhật trên trang cá nhân của bạn."
            ></UploadImage>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="cover" className="font-semibold">
              Ảnh bìa
            </Label>
            <UploadImage
              onUploaded={uploadCover}
              aspectRatio={2 / 1}
              initialImageUrl={manageProfile.coverUrl}
              popupTitle="Ảnh bìa"
              popupSubTitle="Sau khi lưu ảnh, ảnh bìa mới sẽ được cập nhật trên trang cá nhân của bạn."
            ></UploadImage>
          </div>

          <div>
            <div
              className="aspect-[2/1] bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  manageProfile.coverUrl || defaultCoverUrl
                })`,
              }}
            />
            <div className="-mt-16 flex flex-col gap-2">
              <div className="flex justify-center">
                <img
                  src={manageProfile.avatarUrl || defaultAvatarUrl}
                  alt="avatar"
                  className="w-28 h-28 rounded-full border-4 border-white object-cover shadow"
                />
              </div>
            </div>
          </div>

          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="font-semibold">
              Email
            </Label>
            {originProfile.email && originProfile.emailVerified && (
              <p className="text-xs text-gray-500">
                {`Email ${originProfile.email} đã được xác thực liên kết với tài khoản.`}
              </p>
            )}
            <Input
              id="email"
              type="email"
              error={
                !manageProfile.isValidEmail && !!manageProfile.emailValidation
              }
              value={manageProfile.email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="example@gmail.com"
              autoComplete="new-password"
            />
            {!manageProfile.isValidEmail && manageProfile.emailValidation && (
              <p className="text-red-500 text-xs">
                {manageProfile.emailValidation}
              </p>
            )}
            <ButtonWithLoading
              className="w-1/3"
              size="icon"
              isLoading={manageProfile.isLoadingVerifyEmail}
              disabled={
                (originProfile.emailVerified &&
                  originProfile.email === manageProfile.email) ||
                !manageProfile.isValidEmail
              }
              onClick={sendVerifyEmail}
            >
              Xác thực
            </ButtonWithLoading>
          </div>

          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <Dialog
            open={manageProfile.isOpenChangePasswordPopup}
            onOpenChange={(nextOpen) => setOpenChangePasswordPopup(nextOpen)}
          >
            <div className="flex flex-col gap-2">
              <Label className="font-semibold">Mật khẩu</Label>
              <DialogTrigger asChild>
                <Button variant="outline">Đổi mật khẩu</Button>
              </DialogTrigger>
            </div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-left">Đổi mật khẩu</DialogTitle>
                <DialogDescription className="text-left">
                  Thay đổi mật khẩu cho tài khoản của bạn.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                  </div>
                  <Input
                    id="current-password"
                    type="password"
                    error={
                      !changePasswordState.isValidCurrentPassword &&
                      !!changePasswordState.currentPasswordValidation
                    }
                    value={changePasswordState.currentPassword}
                    onChange={(e) => onCurrentPasswordChange(e.target.value)}
                  />
                  {!changePasswordState.isValidCurrentPassword &&
                    changePasswordState.currentPasswordValidation && (
                      <p className="text-red-500 text-xs">
                        {changePasswordState.currentPasswordValidation}
                      </p>
                    )}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="new-password">Mật khẩu mới</Label>
                  </div>
                  <Input
                    id="new-password"
                    type="password"
                    error={
                      !changePasswordState.isValidNewPassword &&
                      !!changePasswordState.newPasswordValidation
                    }
                    value={changePasswordState.newPassword}
                    onChange={(e) => onNewPasswordChange(e.target.value)}
                    autoComplete="new-password"
                  />
                  {!changePasswordState.isValidNewPassword &&
                    changePasswordState.newPasswordValidation && (
                      <p className="text-red-500 text-xs">
                        {changePasswordState.newPasswordValidation}
                      </p>
                    )}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="confirm-new-password">
                      Xác nhận mật khẩu mới
                    </Label>
                  </div>
                  <Input
                    id="confirm-new-password"
                    type="password"
                    error={
                      !changePasswordState.isValidConfirmPassword &&
                      !!changePasswordState.confirmPasswordValidation
                    }
                    value={changePasswordState.confirmPassword}
                    onChange={(e) => onConfirmPasswordChange(e.target.value)}
                    autoComplete="new-password"
                  />
                  {!changePasswordState.isValidConfirmPassword &&
                    changePasswordState.confirmPasswordValidation && (
                      <p className="text-red-500 text-xs">
                        {changePasswordState.confirmPasswordValidation}
                      </p>
                    )}
                </div>
              </div>
              <DialogFooter>
                <div className="flex flex-row gap-2">
                  <DialogClose asChild className="flex-1">
                    <Button variant="outline">Hủy</Button>
                  </DialogClose>
                  <ButtonWithLoading
                    className="flex-1"
                    type="submit"
                    isLoading={changePasswordState.isLoadingSavePassword}
                    onClick={onSubmitFormChangePassword}
                  >
                    Lưu
                  </ButtonWithLoading>
                </div>
                {changePasswordState.formNotification && (
                  <p className="text-red-500 text-xs mb-2">
                    {changePasswordState.formNotification}
                  </p>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      )}
    </>
  );
};
