interface Props {
  label: string;
  ariaLabel?: string;
  fontSize: string;
  fontStyle: string;
  fontColor: string;
  extraClass: string;
  displayOptionalLabel: boolean;
  optionalLabelStyle?: string;
  htmlFor?: string;
  required?: boolean;
}

const FormFieldLabel = ({
  label,
  fontSize,
  ariaLabel,
  fontStyle,
  fontColor,
  extraClass,
  displayOptionalLabel,
  optionalLabelStyle = "",
  htmlFor = "",
  required = false,
}: Props) => {
  if (label) {
    return (
      <label
        aria-label={ariaLabel || label}
        htmlFor={htmlFor || label}
        className={`inline-block ${fontSize} ${fontStyle} ${fontColor} ${extraClass} `}
      >
        {label}
        {required && <span className="align-sub text-xl text-red-500"> *</span>}
        {displayOptionalLabel && (
          <span
            className={`ml-2 italic font-thin text-xxs ${optionalLabelStyle}`}
          >
            optional
          </span>
        )}
      </label>
    );
  } else {
    return null;
  }
};

FormFieldLabel.defaultProps = {
  label: "",
  fontSize: "text-11px",
  fontStyle: "font-nunito",
  fontColor: "text-grey-420",
  extraClass: "mb-2",
  displayOptionalLabel: false,
};

export default FormFieldLabel;
