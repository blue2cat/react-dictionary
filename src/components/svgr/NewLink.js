import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NewLink(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 14 14"
      {...props}
    >
      <Path
        fill="none"
        stroke="#838383"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M6.09 3.545H2.456A1.455 1.455 0 001 5v6.545A1.455 1.455 0 002.455 13H9a1.455 1.455 0 001.455-1.455V7.91m-5.091.727l7.272-7.272m0 0H9m3.636 0V5"
      />
    </Svg>
  )
}

export default NewLink;
