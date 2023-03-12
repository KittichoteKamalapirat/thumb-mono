interface Props {
  label: string;
  ariaLabel?: string;
  fontSize?: string;
  fontStyle?: string;
  fontColor?: string;
  extraClass?: string;
  fontWeight?: string;
  displayOptionalLabel?: boolean;
  optionalLabelStyle?: string;
  htmlFor?: string;
  required?: boolean;
}

const FormFieldLabel = ({
  label = "",
  fontWeight = "",
  fontSize = "text-md",
  ariaLabel,
  fontColor = "text-opacity-black-92",
  extraClass = "mb-2",
  displayOptionalLabel = false,
  optionalLabelStyle = "",
  htmlFor = "",
  required = false,
}: Props) => {
  if (label) {
    return (
      <label
        aria-label={ariaLabel || label}
        htmlFor={htmlFor || label}
        className={`inline-block ${fontWeight} ${fontSize} ${fontColor} ${extraClass} `}
      >
        {label}
        {required && <span className="align-super text-md text-error"> *</span>}
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

export default FormFieldLabel;
