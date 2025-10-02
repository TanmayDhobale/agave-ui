import { useAtomValue } from "jotai";
import { agaveAgentStateAtom } from "../../api/agaveAtoms";
import { Tooltip, Badge, Flex } from "@radix-ui/themes";
import styles from "./cluster.module.css";
import { useMedia } from "react-use";

export default function Cluster() {
  const agaveState = useAtomValue(agaveAgentStateAtom);
  const isWideScreen = useMedia("(min-width: 600px)");

  if (!agaveState.version && !agaveState.bank_slot) return null;

  return (
    <div className={styles.cluster}>
      <Flex align="center" gap="3">
        <Tooltip content="Agave Validator Dashboard">
          <Badge
            color="green"
            variant="soft"
            size="2"
            style={{
              background: "linear-gradient(135deg, #4CAF50, #45a049)",
              color: "white",
              fontWeight: "600",
              padding: "4px 12px",
            }}
          >
            Agave
          </Badge>
        </Tooltip>

        {isWideScreen && agaveState.version && (
          <Tooltip content="Current Agave validator version">
            <Badge variant="outline" color="gray" size="1">
              v{agaveState.version}
            </Badge>
          </Tooltip>
        )}
      </Flex>
    </div>
  );
}
