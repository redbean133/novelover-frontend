export interface IValidationResult {
  isValid: boolean;
  message: string;
}

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
  if (!email) return { isValid: false, message: "Email không được để trống" };
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email))
    return { isValid: false, message: "Email không hợp lệ" };
  return { isValid: true, message: "Email hợp lệ" };
};

export const validatePassword = (password: string): IValidationResult => {
  if (!password)
    return { isValid: false, message: "Password không được để trống" };
  if (password.length < 8)
    return { isValid: false, message: "Password phải có ít nhất 8 ký tự" };
  return { isValid: true, message: "Password hợp lệ" };
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

  return { isValid: true, message: "Confirm password hợp lệ" };
};
