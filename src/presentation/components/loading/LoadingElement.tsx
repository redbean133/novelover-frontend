import { Spinner } from "@/components/ui/shadcn-io/spinner";

interface ILoadingElementProps {
  className?: string;
}

export const LoadingElement = ({ className }: ILoadingElementProps) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <Spinner variant="ring" />
    </div>
  );
};
