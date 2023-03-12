import { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: any;
  className?: string;
  children: ReactNode; // button
}

const LinkButton = ({ href, className = "", children, ...rest }: Props) => {
  return (
    <div className={className}>
      <Link to={href} {...rest}>
        {children}
      </Link>
    </div>
  );
};

export default LinkButton;
