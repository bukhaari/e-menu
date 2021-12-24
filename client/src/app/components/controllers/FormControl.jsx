import BaseField from "./BaseField";
import BaseBtn from "./BaseBtn";
import BaseSelect from "./BaseSelect";

function FormControls({ control, ...rest }) {
  switch (control) {
      case 'field':
          return <BaseField {...rest} />
      case 'button':
          return <BaseBtn {...rest} />
      case 'select':
          return <BaseSelect {...rest} />
      default:
          return null
  }
}

export default FormControls;
