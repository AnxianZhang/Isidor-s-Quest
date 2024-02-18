import { createElement } from "react";
import { useState } from "react";
import useScreenWidthDimention from "../hook/useScreenWidthDimention";
const MyWebDatePicker = (props) => {
  const windowWidthByHook = useScreenWidthDimention()
  const textInputWidthStyle = windowWidthByHook > 500 ? 350 : "80%"
  return createElement('input', {
    type: 'date',
    value: props.date.toISOString().split("T")[0],
    onChange: (event) => {
      props.setDate(new Date(event.target.value))
    },
    style: {
      backgroundColor: "white",
      width: textInputWidthStyle,
      height: 20,
      borderRadius: 20,
      padding: 20,
      fontSize: 20,
      color: "#000000",
      borderColor: props.errorDate.length > 0 && "#E55839",
      borderWidth: props.errorDate.length > 0 && 1
    },
  })
}
export default MyWebDatePicker;