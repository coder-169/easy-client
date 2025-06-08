import brackets from "../assets/svg/Brackets";

interface HeroHeadingProps {
  className?: string;
  title?: string;
  text?: string;
  tag?: string;
}

const HeroHeading = ({ className, title, text, tag }: HeroHeadingProps) => {
  return (
    <div
      className={`${className} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}
    >
      {tag && <TagLine className="mb-4 md:justify-center">{tag}</TagLine>}
      {title && <h2 className="h2">{title}</h2>}
      {text && <p className="body-2 mt-4 text-n-4">{text}</p>}
    </div>
  );
};


import { ReactNode } from "react";

const TagLine = ({ className, children }: { className?: string; children: ReactNode }) => {
  return (
    <div className={`tagline flex items-center ${className || ""}`}>
      {brackets("left")}
      <div className="mx-3 text-n-3">{children}</div>
      {brackets("right")}
    </div>
  );
};

export default HeroHeading;
