import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const THead = ({ children, ...props }: Props) => {
  return (
    <thead {...props} className="text-md text-grey-700 uppercase bg-grey-50 ">
      {children}
    </thead>
  );
};
export default THead;
