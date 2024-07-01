import React, { useState } from "react";
import Tex2SVG from "react-hook-mathjax";
import "./style.css";

function MathJax() {
  const [inputValue, setInputValue] = useState(
    "G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\kappa T_{\\mu\\nu}",
  );
  return (
    <div className="mathjsx">
      <header>
        <div className="tex-container">
          <Tex2SVG class="tex" tabindex={-1} latex={inputValue} />
        </div>
        <textarea
          className="mathJsxInput"
          defaultValue={inputValue}
          placeholder="Question title"
          onChange={e => setInputValue(e.target.value.trimStart())}
        />
      </header>
    </div>
  );
}

export default MathJax;
