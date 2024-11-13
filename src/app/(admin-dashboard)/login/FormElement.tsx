type FormElementProps = {
  children: React.ReactElement[];
};

export default function FormElement({ children }: FormElementProps) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
