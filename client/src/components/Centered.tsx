import { ReactNode } from "react";
import { withStyles } from "arwes";
import { Classes } from "../types";

const styles = () => ({
  root: {
    margin: "0 auto",
    maxWidth: 800,
  },
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    }
  }
});

interface CenteredProps extends React.HTMLAttributes<HTMLDivElement> {
  classes: Classes;
  className?: string;
  children?: ReactNode;
}

const Centered = (props: CenteredProps) => {
  const {
    classes,
    className,
    children,
    ...rest
  } = props;
  return (
    <div className={`${classes.root} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default withStyles(styles)(Centered);
