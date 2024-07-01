interface LoginProps {
  label: string;
  icon: string;
}

export default function InputField(props: LoginProps) {
  const { label, icon } = props;
  return (
    <div className="border border-deamColor flex flex-row items-center h-12 mb-4 px-4 rounded-3xl">
      <img src={icon} alt="" className="w-4 h-5" />
      <input
        type="text"
        placeholder={label}
        className="ps-2 border-none outline-none"
      />
    </div>
  );
}
