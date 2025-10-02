import { Flex, Text, Card, Badge, Separator, Heading } from "@radix-ui/themes";
import styles from "./overview.module.css";
import { agaveAgentStateAtom } from "../../api/agaveAtoms";
import { useAtomValue } from "jotai";

export default function Overview() {
  return (
    <Flex
      direction="column"
      gap="6"
      className={styles.container}
      align="stretch"
      p="4"
    >
      <Flex direction="column" gap="2">
        <Heading size="8" weight="bold" color="green">
          Agave Validator Dashboard
        </Heading>
        <Text size="3" color="gray">
          Real-time monitoring and analytics for your Agave validator
        </Text>
      </Flex>

      <AgaveStatusCard />

      <Separator size="4" />

      <Flex direction="column" gap="4">
        <Heading size="6" weight="bold">
          Performance Metrics
        </Heading>
        <Flex direction="column" gap="3">
          <RPCStatsCard />
          <TPUTurbineRatesCard />
        </Flex>
      </Flex>

      <Separator size="4" />

      <Flex direction="column" gap="4">
        <Heading size="6" weight="bold">
          Features
        </Heading>
        <Flex direction="column" gap="3">
          <ComingSoonCard
            title="Slot Performance"
            description="Detailed slot performance metrics and analysis"
            icon="⚡"
          />
          <ComingSoonCard
            title="Transaction Analysis"
            description="Transaction processing analysis and statistics"
            icon="📊"
          />
          <ComingSoonCard
            title="Validator Network"
            description="Network topology and peer connection visualization"
            icon="🌐"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

function AgaveStatusCard() {
  const agaveState = useAtomValue(agaveAgentStateAtom);

  return (
    <Card
      variant="surface"
      style={{
        background:
          "linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(76, 175, 80, 0.02))",
        border: "1px solid rgba(76, 175, 80, 0.2)",
      }}
    >
      <Flex direction="column" gap="4" p="5">
        <Flex align="center" gap="3">
          <Text size="6" weight="bold" color="green">
            Validator Status
          </Text>
          <Badge
            variant="soft"
            color={agaveState.connected ? "green" : "red"}
            size="2"
          >
            {agaveState.connected ? "● Live" : "○ Offline"}
          </Badge>
        </Flex>

        <Flex gap="6" wrap="wrap">
          <MetricCard
            label="Version"
            value={agaveState.version || "—"}
            icon="🏷️"
            color="blue"
          />
          <MetricCard
            label="Bank Slot"
            value={agaveState.bank_slot?.toLocaleString() || "—"}
            icon="🔢"
            color="purple"
          />
          <MetricCard
            label="Forks"
            value={agaveState.forks?.toString() || "—"}
            icon="🌿"
            color="orange"
          />
          <MetricCard
            label="Connection"
            value={agaveState.connected ? "Connected" : "Disconnected"}
            icon={agaveState.connected ? "🔗" : "🔌"}
            color={agaveState.connected ? "green" : "red"}
          />
        </Flex>
      </Flex>
    </Card>
  );
}

function MetricCard({
  label,
  value,
  icon,
  color,
  trend,
}: {
  label: string;
  value: string;
  icon: string;
  color: string;
  trend?: string;
}) {
  return (
    <Card variant="surface" style={{ minWidth: "140px", flex: "1" }}>
      <Flex direction="column" gap="2" p="3" align="center">
        <Text size="2" color="gray" weight="medium">
          {label}
        </Text>
        <Text size="2">{icon}</Text>
        <Text
          size="4"
          weight="bold"
          color={color as "blue" | "purple" | "orange" | "green" | "red"}
          style={{ textAlign: "center" }}
        >
          {value}
        </Text>
        {trend && (
          <Text
            size="1"
            color={
              trend.startsWith("+")
                ? "green"
                : trend.startsWith("-")
                  ? "red"
                  : "gray"
            }
            weight="medium"
          >
            {trend}
          </Text>
        )}
      </Flex>
    </Card>
  );
}

function RPCStatsCard() {
  return (
    <Card
      variant="surface"
      style={{
        background:
          "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.02))",
        border: "1px solid rgba(59, 130, 246, 0.2)",
      }}
    >
      <Flex direction="column" gap="4" p="5">
        <Flex align="center" gap="3">
          <Text size="2">🌐</Text>
          <Text size="6" weight="bold" color="blue">
            RPC Performance
          </Text>
          <Badge variant="soft" color="blue" size="2">
            Live
          </Badge>
        </Flex>

        <Flex gap="6" wrap="wrap">
          <MetricCard
            label="RPC Requests/sec"
            value="1,247"
            icon="📡"
            color="blue"
            trend="+5.2%"
          />
          <MetricCard
            label="Avg Response Time"
            value="12ms"
            icon="⏱️"
            color="green"
            trend="-2.1%"
          />
          <MetricCard
            label="Success Rate"
            value="99.8%"
            icon="✅"
            color="green"
            trend="+0.1%"
          />
          <MetricCard
            label="Error Rate"
            value="0.2%"
            icon="⚠️"
            color="orange"
            trend="-0.1%"
          />
        </Flex>

        <Flex gap="6" wrap="wrap">
          <MetricCard
            label="Get Account Info"
            value="456/s"
            icon="👤"
            color="purple"
          />
          <MetricCard
            label="Get Balance"
            value="234/s"
            icon="💰"
            color="green"
          />
          <MetricCard
            label="Get Program Accounts"
            value="123/s"
            icon="📋"
            color="blue"
          />
          <MetricCard
            label="Simulate Transaction"
            value="89/s"
            icon="🔮"
            color="orange"
          />
        </Flex>
      </Flex>
    </Card>
  );
}

function TPUTurbineRatesCard() {
  return (
    <Card
      variant="surface"
      style={{
        background:
          "linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(168, 85, 247, 0.02))",
        border: "1px solid rgba(168, 85, 247, 0.2)",
      }}
    >
      <Flex direction="column" gap="4" p="5">
        <Flex align="center" gap="3">
          <Text size="2">🚀</Text>
          <Text size="6" weight="bold" color="purple">
            TPU & Turbine Rates
          </Text>
          <Badge variant="soft" color="purple" size="2">
            Live
          </Badge>
        </Flex>

        <Flex gap="6" wrap="wrap">
          <MetricCard
            label="TPU Transactions/sec"
            value="2,847"
            icon="⚡"
            color="purple"
            trend="+12.3%"
          />
          <MetricCard
            label="Turbine Packets/sec"
            value="15,234"
            icon="🌪️"
            color="blue"
            trend="+8.7%"
          />
          <MetricCard
            label="TPU Queue Depth"
            value="1,234"
            icon="📊"
            color="orange"
            trend="-15.2%"
          />
          <MetricCard
            label="Turbine Fanout"
            value="200"
            icon="🌐"
            color="green"
            trend="+0.0%"
          />
        </Flex>

        <Flex gap="6" wrap="wrap">
          <MetricCard
            label="TPU Forward Rate"
            value="98.5%"
            icon="➡️"
            color="green"
          />
          <MetricCard
            label="Turbine Retransmit"
            value="2.1%"
            icon="🔄"
            color="orange"
          />
          <MetricCard
            label="TPU Drop Rate"
            value="0.8%"
            icon="❌"
            color="red"
          />
          <MetricCard
            label="Turbine Success"
            value="97.9%"
            icon="✅"
            color="green"
          />
        </Flex>
      </Flex>
    </Card>
  );
}

function ComingSoonCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: string;
}) {
  return (
    <Card
      variant="surface"
      style={{
        background: "rgba(0, 0, 0, 0.02)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        opacity: 0.8,
      }}
    >
      <Flex direction="column" gap="3" p="4">
        <Flex align="center" gap="3">
          {icon && <Text size="4">{icon}</Text>}
          <Text size="5" weight="bold">
            {title}
          </Text>
          <Badge variant="outline" color="gray" size="1">
            Coming Soon
          </Badge>
        </Flex>
        <Text size="3" color="gray">
          {description}
        </Text>
      </Flex>
    </Card>
  );
}
