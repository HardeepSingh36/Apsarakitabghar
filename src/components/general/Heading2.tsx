import React from 'react';

interface Heading2Props {
  className?: string;
  children: React.ReactNode;
}

const Heading2 = ({className, children}: Heading2Props) => {
  return (
    <h2 className={`font-bold !text-base sm:!text-xl ${className}`}>{children}</h2>
  )
}

export default Heading2
