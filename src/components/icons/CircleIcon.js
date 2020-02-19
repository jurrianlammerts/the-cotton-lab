import React from "react"

const Circle = ({ text }) => {
  if (text <= 9) {
    return (
      <svg width="20px" height="20px" viewBox="0 0 20 20">
        {console.log(text)}
        <g
          id="Symbols"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Artboard" transform="translate(-153.000000, -175.000000)">
            <g id="Group" transform="translate(153.000000, 175.000000)">
              <circle id="Oval" fill="#00BAA6" cx="10" cy="10" r="10"></circle>
              <text
                id="1"
                fontFamily="Sans serif"
                fontSize={"14"}
                fill="#FFFFFF"
              >
                <tspan x="6.10693359" y="15">
                  {text}
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </svg>
    )
  } else {
    return (
      <svg width="20px" height="20px" viewBox="0 0 20 20">
        <g
          id="Symbols"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g id="Artboard" transform="translate(-153.000000, -175.000000)">
            <g id="Group" transform="translate(153.000000, 175.000000)">
              <circle id="Oval" fill="#00BAA6" cx="10" cy="10" r="10"></circle>
              <text
                id="25"
                fontFamily="Sans serif"
                fontSize="12"
                fill="#FFFFFF"
              >
                <tspan x="3.32617188" y="14">
                  {text}
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

export default Circle
