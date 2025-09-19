import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const WithPreviousParam = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentLocation = location;

    if (!currentLocation.search.includes("previous=true")) {
      const searchParams = new URLSearchParams(currentLocation.search);
      searchParams.set("previous", "true");

      navigate(
        {
          pathname: currentLocation.pathname,
          search: searchParams.toString(),
        },
        { replace: true }
      );
    }
  }, [location, navigate]);

  return <>{children}</>;
};
