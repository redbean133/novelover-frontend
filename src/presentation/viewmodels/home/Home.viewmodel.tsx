import { useNavigate } from "react-router-dom";

export const HomeViewModel = () => {
  const navigate = useNavigate();

  const onClickLoginButton = () => {
    navigate("/login");
  };

  return {
    onClickLoginButton,
  };
};
