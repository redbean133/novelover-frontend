export interface IValidationResult {
  isValid: boolean;
  message: string;
}

export const validateDisplayName = (displayName: string): IValidationResult => {
  if (!displayName || displayName.trim().length === 0) {
    return { isValid: false, message: "Tên hiển thị không được để trống" };
  }

  if (displayName.length < 3 || displayName.length > 32) {
    return {
      isValid: false,
      message: "Tên hiển thị phải có độ dài từ 3 đến 32 ký tự",
    };
  }

  const regex = /^[\p{L} ]+$/u;
  if (!regex.test(displayName)) {
    return {
      isValid: false,
      message: "Tên hiển thị chỉ được chứa chữ cái và dấu cách",
    };
  }

  return {
    isValid: true,
    message: "Tên hiển thị hợp lệ",
  };
};

export const validateUsername = (username: string): IValidationResult => {
  if (!username) {
    return {
      isValid: false,
      message: "Tên đăng nhập không được để trống",
    };
  }

  if (!/^[A-Za-z]/.test(username)) {
    return {
      isValid: false,
      message: "Tên đăng nhập phải bắt đầu bằng chữ cái",
    };
  }

  if (!/^[A-Za-z0-9_]+$/.test(username)) {
    return {
      isValid: false,
      message: "Tên đăng nhập chỉ được chứa chữ cái, chữ số và dấu gạch dưới",
    };
  }

  if (username.length < 3 || username.length > 20) {
    return {
      isValid: false,
      message: "Tên đăng nhập phải có độ dài từ 3 đến 20 ký tự",
    };
  }

  return {
    isValid: true,
    message: "Tên đăng nhập hợp lệ",
  };
};

export const validateEmail = (email: string): IValidationResult => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !regex.test(email))
    return { isValid: false, message: "Email không hợp lệ" };
  return { isValid: true, message: "Email hợp lệ" };
};

export const validatePassword = (password: string): IValidationResult => {
  if (!password)
    return { isValid: false, message: "Mật khẩu không được để trống" };
  if (password.length < 8)
    return { isValid: false, message: "Mật khẩu phải có ít nhất 8 ký tự" };
  return { isValid: true, message: "Mật khẩu hợp lệ" };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): IValidationResult => {
  if (!confirmPassword) {
    return {
      isValid: false,
      message: "Vui lòng xác nhận mật khẩu",
    };
  }

  if (password !== confirmPassword) {
    return {
      isValid: false,
      message: "Mật khẩu xác nhận không khớp",
    };
  }

  return { isValid: true, message: "Mật khẩu xác nhận hợp lệ" };
};

export const validateNewPassword = (
  currentPassword: string,
  newPassword: string
): IValidationResult => {
  if (!newPassword)
    return { isValid: false, message: "Mật khẩu mới không được để trống" };
  if (newPassword.length < 8)
    return { isValid: false, message: "Mật khẩu mới phải có ít nhất 8 ký tự" };
  if (newPassword === currentPassword) {
    return {
      isValid: false,
      message: "Mật khẩu mới không được trùng với mật khẩu hiện tại",
    };
  }
  return { isValid: true, message: "Mật khẩu mới hợp lệ" };
};
