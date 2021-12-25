import BaseField from "./BaseField";
import BaseBtn from "./BaseBtn";
import BaseSelect from "./BaseSelect";
import BaseFile from './BaseFile';

function FormControls({ control, ...rest }) {
  switch (control) {
      case 'field':
          return <BaseField {...rest} />
      case 'button':
          return <BaseBtn {...rest} />
      case 'select':
          return <BaseSelect {...rest} />
      case 'file':
          return <BaseFile {...rest} />
      default:
          return null
  }
}

export default FormControls;
