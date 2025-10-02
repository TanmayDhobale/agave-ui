import { Text, Flex, Tooltip, Card } from "@radix-ui/themes";
import styles from "./identityKey.module.css";
import type { PropsWithChildren } from "react";
import PopoverDropdown from "../../components/PopoverDropdown";

export default function IdentityKey() {
  return (
    <DropdownContainer showDropdown>
      <Card
        variant="surface"
        style={{
          background: "rgba(76, 175, 80, 0.1)",
          border: "1px solid rgba(76, 175, 80, 0.2)",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        className={
          styles.container + " " + styles.horizontal + " " + styles.pointer
        }
      >
        <Flex align="center" gap="3" p="2">
          <Label
            label="Agave Validator"
            value="Agave"
            tooltip="Agave validator dashboard"
          />
        </Flex>
      </Card>
    </DropdownContainer>
  );
}

interface DropdownContainerProps {
  showDropdown: boolean;
}

function DropdownContainer({
  showDropdown,
  children,
}: PropsWithChildren<DropdownContainerProps>) {
  if (!showDropdown) {
    return children;
  }

  return (
    <PopoverDropdown content={<DropdownMenu />}>{children}</PopoverDropdown>
  );
}

function DropdownMenu() {
  return (
    <div className={styles.container}>
      <Flex gap="2">
        <Label
          label="Agave Validator"
          value="Agave Dashboard"
          tooltip="Agave validator dashboard"
        />
      </Flex>
    </div>
  );
}

interface LabelProps {
  label: string;
  value?: string | null;
  color?: string;
  tooltip?: string;
}
function Label({ label, value, color, tooltip }: LabelProps) {
  if (!value) return null;
  const textValue = (
    <Text className={styles.value} style={{ color: color }}>
      {value}
    </Text>
  );

  return (
    <Flex direction="column">
      <Text className={styles.label}>{label}</Text>
      {tooltip ? <Tooltip content={tooltip}>{textValue}</Tooltip> : textValue}
    </Flex>
  );
}
