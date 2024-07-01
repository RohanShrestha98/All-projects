/* eslint-disable react/prop-types */
export default function Button({ title }) {
  const color = localStorage.getItem("textColor");
  const background = localStorage.getItem("backgroundColor");

  const style = {
    color: background ? background : "#000000",
    background: color ? color : "#ffffff",
    border: `1px solid ${background}`,
  };
  return (
    <button style={style} className="w-full rounded py-1">
      {title}
    </button>
  );
}
