import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Button } from "@/presentation/shadcn-ui/components/ui/button";
import React from "react";

type ButtonProps = React.ComponentProps<typeof Button>;
interface ButtonWithLoadingProps extends ButtonProps {
  isLoading?: boolean;
}

export const ButtonWithLoading = React.forwardRef<
  HTMLButtonElement,
  ButtonWithLoadingProps
>(({ isLoading = false, children, disabled, ...props }, ref) => {
  return (
    <Button ref={ref} disabled={isLoading || disabled} {...props}>
      {isLoading && <Spinner variant="circle-filled" />}
      {children}
    </Button>
  );
});
