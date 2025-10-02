import { createFileRoute } from "@tanstack/react-router";
import { Card, Flex, Text } from "@radix-ui/themes";

export const Route = createFileRoute("/slotDetails")({
  component: SlotDetailsComingSoon,
});

function SlotDetailsComingSoon() {
  return (
    <Flex direction="column" gap="4" p="4">
      <Card>
        <Flex direction="column" gap="2" p="4">
          <Text size="6" weight="bold">
            Slot Details
          </Text>
          <Text size="3" color="gray">
            Detailed slot analysis and transaction processing metrics are coming
            soon. This feature will provide in-depth analysis of individual
            slots including transaction processing, performance metrics, and
            detailed waterfall visualizations.
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
