import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Search(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      {...props}
    >
      <Path
        fill="none"
        stroke="#A445ED"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12.663 12.663l3.887 3.887M1 7.664a6.665 6.665 0 1013.33 0 6.665 6.665 0 00-13.33 0z"
      />
    </Svg>
  )
}

export default Search;
