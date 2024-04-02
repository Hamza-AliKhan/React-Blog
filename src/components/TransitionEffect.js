import { useScrollTrigger, Grow, Slide, Zoom } from "@mui/material";

export function TransitionEffect({ children, threshold, timeout, method }) {
  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: threshold,
  });

  return (
    <>
      {method === "grow" && (
        <Grow in={trigger} timeout={timeout}>
          {children}
        </Grow>
      )}
      {method === "zoom" && (
        <Zoom in={trigger} timeout={timeout}>
          {children}
        </Zoom>
      )}
      {method === "slide" && (
        <Slide in={trigger} direction={"left"} timeout={timeout}>
          {children}
        </Slide>
      )}
    </>
  );
}

export default TransitionEffect;
