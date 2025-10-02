import styles from "./toast.module.css";
import { Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useMount, usePrevious } from "react-use";
import { animated, useSpring } from "@react-spring/web";
import { useAtomValue } from "jotai";
import { agaveAgentStateAtom } from "../../api/agaveAtoms";

const hiddenStyles = {
  opacity: 0,
  top: -100,
};

const visibleStyles = {
  opacity: 1,
  top: 18,
};

function getToastProps(connected?: boolean, previousConnected?: boolean) {
  if (connected === undefined) return;

  if (!connected) {
    return {
      className: styles.disconnected,
      text: "Agave agent disconnected.",
    };
  }
  if (previousConnected === false && connected === true) {
    return { className: styles.connecting, text: "Agave agent connected." };
  }

  return getToastProps(previousConnected);
}

export default function Toast() {
  const agaveState = useAtomValue(agaveAgentStateAtom);
  const prevConnected = usePrevious(agaveState.connected);

  const [isInit, setIsInit] = useState(true);

  useMount(() => {
    setTimeout(() => setIsInit(false), 3_000);
  });

  const [springs, api] = useSpring(() => ({
    from: hiddenStyles,
  }));

  useEffect(() => {
    if (isInit) return;

    if (!agaveState.connected) {
      void api.start({ to: visibleStyles });
    } else {
      void api.start({ to: hiddenStyles });
    }
  }, [api, isInit, agaveState.connected]);

  const props = getToastProps(agaveState.connected, prevConnected);
  if (!props) return;

  return (
    <animated.div className={styles.container} style={springs}>
      <div className={`${styles.toast} ${props.className}`}>
        <Text className={styles.text}>{props.text}</Text>
      </div>
    </animated.div>
  );
}
