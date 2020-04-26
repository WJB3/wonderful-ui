import * as React from 'react';
import * as ReactDOM from 'react-dom';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import capitalize from '../utils/capitalize';
import Grow from '../Grow';
import Popper from '../Popper';
import useForkRef from '../utils/useForkRef';
import useId from '../utils/unstable_useId';
import setRef from '../utils/setRef';
import useIsFocusVisible from '../utils/useIsFocusVisible';
import useControlled from '../utils/useControlled';

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

function arrowGenerator() {
  return {
    '&[x-placement*="bottom"] $arrow': {
      flip: false,
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      marginLeft: 4,
      marginRight: 4,
      width: '2em',
      height: '1em',
      '&::before': {
        flip: false,
        borderWidth: '0 1em 1em 1em',
        borderColor: 'transparent transparent currentcolor transparent',
      },
    },
    '&[x-placement*="top"] $arrow': {
      flip: false,
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      marginLeft: 4,
      marginRight: 4,
      width: '2em',
      height: '1em',
      '&::before': {
        flip: false,
        borderWidth: '1em 1em 0 1em',
        borderColor: 'currentcolor transparent transparent transparent',
      },
    },
    '&[x-placement*="right"] $arrow': {
      flip: false,
      left: 0,
      marginLeft: '-0.95em',
      marginTop: 4,
      marginBottom: 4,
      height: '2em',
      width: '1em',
      '&::before': {
        flip: false,
        borderWidth: '1em 1em 1em 0',
        borderColor: 'transparent currentcolor transparent transparent',
      },
    },
    '&[x-placement*="left"] $arrow': {
      flip: false,
      right: 0,
      marginRight: '-0.95em',
      marginTop: 4,
      marginBottom: 4,
      height: '2em',
      width: '1em',
      '&::before': {
        flip: false,
        borderWidth: '1em 0 1em 1em',
        borderColor: 'transparent transparent transparent currentcolor',
      },
    },
  };
}

 

let hystersisOpen = false;
let hystersisTimer = null;

export function testReset() {
  hystersisOpen = false;
  clearTimeout(hystersisTimer);
}

const Tooltip = React.forwardRef(function Tooltip(props, ref) {
  const {
    arrow = false,
    children,
    classes,
    disableFocusListener = false,
    disableHoverListener = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterNextDelay = 0,
    enterTouchDelay = 700,
    id: idProp,
    interactive = false,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open: openProp,
    placement = 'bottom',
    PopperProps,
    title,
    TransitionComponent = Grow,
    TransitionProps,
    ...other
  } = props;

  const [childNode, setChildNode] = React.useState();
  const [arrowRef, setArrowRef] = React.useState(null);
  const ignoreNonTouchEvents = React.useRef(false);

  const closeTimer = React.useRef();
  const enterTimer = React.useRef();
  const leaveTimer = React.useRef();
  const touchTimer = React.useRef();

  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open',
  });

  let open = openState;

   
  const id = useId(idProp);

  React.useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      clearTimeout(touchTimer.current);
    };
  }, []);

  const handleOpen = (event) => {
    clearTimeout(hystersisTimer);
    hystersisOpen = true;

    // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.
    setOpenState(true);

    if (onOpen) {
      onOpen(event);
    }
  };

  const handleEnter = (forward = true) => (event) => {
    const childrenProps = children.props;

    if (event.type === 'mouseover' && childrenProps.onMouseOver && forward) {
      childrenProps.onMouseOver(event);
    }

    if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
      return;
    }


    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    if (enterDelay || (hystersisOpen && enterNextDelay)) {
      event.persist();
      enterTimer.current = setTimeout(
        () => {
          handleOpen(event);
        },
        hystersisOpen ? enterNextDelay : enterDelay,
      );
    } else {
      handleOpen(event);
    }
  };

  const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
  const [childIsFocusVisible, setChildIsFocusVisible] = React.useState(false);
  const handleBlur = () => {
    if (childIsFocusVisible) {
      setChildIsFocusVisible(false);
      onBlurVisible();
    }
  };

  const handleFocus = (forward = true) => (event) => {
    // Workaround for https://github.com/facebook/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    if (!childNode) {
      setChildNode(event.currentTarget);
    }

    if (isFocusVisible(event)) {
      setChildIsFocusVisible(true);
      handleEnter()(event);
    }

    const childrenProps = children.props;
    if (childrenProps.onFocus && forward) {
      childrenProps.onFocus(event);
    }
  };

  const handleClose = (event) => {
    clearTimeout(hystersisTimer);
    hystersisTimer = setTimeout(() => {
      hystersisOpen = false;
    }, 800 + leaveDelay);
    setOpenState(false);

    if (onClose) {
      onClose(event);
    }

    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      ignoreNonTouchEvents.current = false;
    }, theme.transitions.duration.shortest);
  };


  const handleTouchStart = (event) => {
    ignoreNonTouchEvents.current = true;
    const childrenProps = children.props;

    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }

    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    clearTimeout(touchTimer.current);
    event.persist();
    touchTimer.current = setTimeout(() => {
      handleEnter()(event);
    }, enterTouchDelay);
  };

  const handleTouchEnd = (event) => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    clearTimeout(touchTimer.current);
    clearTimeout(leaveTimer.current);
    event.persist();
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveTouchDelay);
  };

  const handleUseRef = useForkRef(setChildNode, ref);
  const handleFocusRef = useForkRef(focusVisibleRef, handleUseRef);
  // can be removed once we drop support for non ref forwarding class components
  const handleOwnRef = React.useCallback(
    (instance) => {
      // #StrictMode ready
      setRef(handleFocusRef, ReactDOM.findDOMNode(instance));
    },
    [handleFocusRef],
  );

  const handleRef = useForkRef(children.ref, handleOwnRef);

  // There is no point in displaying an empty tooltip.
  if (title === '') {
    open = false;
  }

  // For accessibility and SEO concerns, we render the title to the DOM node when
  // the tooltip is hidden. However, we have made a tradeoff when
  // `disableHoverListener` is set. This title logic is disabled.
  // It's allowing us to keep the implementation size minimal.
  // We are open to change the tradeoff.
  const shouldShowNativeTitle = !open && !disableHoverListener;
  const childrenProps = {
    'aria-describedby': open ? id : null,
    title: shouldShowNativeTitle && typeof title === 'string' ? title : null,
    ...other,
    ...children.props,
    className: clsx(other.className, children.props.className),
    ref: handleRef,
  };

  const interactiveWrapperListeners = {};

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = handleEnter();
    childrenProps.onMouseLeave = handleLeave();

    if (interactive) {
      interactiveWrapperListeners.onMouseOver = handleEnter(false);
      interactiveWrapperListeners.onMouseLeave = handleLeave(false);
    }
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = handleFocus();
    childrenProps.onBlur = handleLeave();

    if (interactive) {
      interactiveWrapperListeners.onFocus = handleFocus(false);
      interactiveWrapperListeners.onBlur = handleLeave(false);
    }
  }

   

  const mergedPopperProps = React.useMemo(() => {
    return deepmerge(
      {
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      },
      PopperProps,
    );
  }, [arrowRef, PopperProps]);

  return (
    <React.Fragment>
      {React.cloneElement(children, childrenProps)}
      <Popper
        className={clsx(classes.popper, {
          [classes.popperInteractive]: interactive,
          [classes.popperArrow]: arrow,
        })}
        placement={placement}
        anchorEl={childNode}
        open={childNode ? open : false}
        id={childrenProps['aria-describedby']}
        transition
        {...interactiveWrapperListeners}
        {...mergedPopperProps}
      >
        {({ placement: placementInner, TransitionProps: TransitionPropsInner }) => (
          <TransitionComponent
            timeout={theme.transitions.duration.shorter}
            {...TransitionPropsInner}
            {...TransitionProps}
          >
            <div
              className={clsx(
                classes.tooltip,
                {
                  [classes.touch]: ignoreNonTouchEvents.current,
                  [classes.tooltipArrow]: arrow,
                },
                classes[`tooltipPlacement${capitalize(placementInner.split('-')[0])}`],
              )}
            >
              {title}
              {arrow ? <span className={classes.arrow} ref={setArrowRef} /> : null}
            </div>
          </TransitionComponent>
        )}
      </Popper>
    </React.Fragment>
  );
});
 

export default withStyles(styles, { name: 'MuiTooltip' })(Tooltip);