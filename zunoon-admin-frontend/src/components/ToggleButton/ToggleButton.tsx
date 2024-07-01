import "./ToggleButton.scss";

interface IToggleButton {
  onLabel?: any;
  offLabel?: any;
  value?: boolean;
  handleChange?: Function | any;
}

function ToggleButton({ onLabel, offLabel, value, handleChange }: IToggleButton) {
  return (
    <label>
      <input className="checkbox_Input" type="checkbox" checked={value} onChange={handleChange} />
      <span className="slider"></span>
      <span className="labels" data-on={onLabel} data-off={offLabel}></span>
    </label>
  );
}

export default ToggleButton;
