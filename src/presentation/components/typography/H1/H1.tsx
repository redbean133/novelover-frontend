export const H1 = ({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"h1">) => {
  return (
    <h1
      className={`font-mono text-center text-2xl font-medium tracking-wide text-balance ${
        className ?? ""
      }`}
      {...rest}
    >
      {children}
    </h1>
  );
};
