import { createFileRoute } from "@tanstack/react-router";
import { Card, Flex, Text } from "@radix-ui/themes";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <Flex direction="column" gap="4" p="4">
      <Card>
        <Flex direction="column" gap="3" p="4">
          <Text size="6" weight="bold">
            About Agave Validator Dashboard
          </Text>
          <Text size="3" color="gray">
            This dashboard provides real-time monitoring for Agave validators.
            It connects to the agave-dashboard-agent via WebSocket to display
            validator metrics including version, bank slot, and fork count.
          </Text>
          <Text size="3" color="gray">
            The dashboard is designed to be simple and focused on core Agave
            validator functionality, providing essential metrics without the
            complexity of Firedancer-specific features.
          </Text>
          <Text size="3" color="gray">
            <strong>Architecture:</strong> Agave Validator → Prometheus →
            agave-dashboard-agent → WebSocket → Agave UI
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
