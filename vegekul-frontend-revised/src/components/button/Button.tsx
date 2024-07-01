interface ButtonProps {
  label: string;
  color: string;
  textColor: string;
}

export default function Button(props: ButtonProps) {
  const { label, color, textColor } = props;
  return (
    <div>
      <button
        className={`${color} ${textColor} w-full border border-customGreen hover:bg-white hover:text-customGreen text-center p-2 my-5 rounded-3xl font-semibold transition-all duration-300`}
      >
        {label}
      </button>
    </div>
  );
}
