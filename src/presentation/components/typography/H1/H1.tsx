export const H1 = ({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"h1">) => {
  return (
    <h1
      className={`font-mono text-2xl font-medium tracking-wide ${
        className ?? ""
      }`}
      {...rest}
    >
      {children}
    </h1>
  );
};
