import { useColor } from "../ColorContext";

export default function Demo() {
  const { color } = useColor();
  const style = {
    background: color,
  };

  return (
    <div>
      <p style={style} className="border text-blue-500">
        Rohan Shrestha
      </p>
    </div>
  );
}
