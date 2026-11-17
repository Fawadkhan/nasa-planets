import { ReactNode, MouseEvent, CSSProperties } from "react";
import { withSounds } from "arwes";
import { Sounds } from "../types";

interface ClickableProps {
  children?: ReactNode;
  sounds: Sounds;
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
  className?: string;
  style?: CSSProperties;
}

const Clickable = (props: ClickableProps) => {
  const {
    children,
    sounds,
    onClick,
    ...rest
  } = props;

  const clickWithSound = (e: MouseEvent<HTMLSpanElement>) => {
    sounds.click && sounds.click.play();
    onClick && onClick(e);
  };

  return (
    <span {...rest} onClick={clickWithSound}>
      {children}
    </span>
  );
};

export default withSounds()(Clickable);
