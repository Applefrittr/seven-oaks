type FormElementProps = {
  children: React.ReactNode;
};

export default function FormElement({ children }: FormElementProps) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
