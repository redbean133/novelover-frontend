import { Spinner } from "@/components/ui/shadcn-io/spinner";

export const LoadingElement = () => {
  return (
    <div className="flex justify-center">
      <Spinner variant="ring" />
    </div>
  );
};
