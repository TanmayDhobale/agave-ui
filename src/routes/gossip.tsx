import { createFileRoute } from "@tanstack/react-router";
import { Card, Flex, Text } from "@radix-ui/themes";

export const Route = createFileRoute("/gossip")({
  component: GossipComingSoon,
});

function GossipComingSoon() {
  return (
    <Flex direction="column" gap="4" p="4">
      <Card>
        <Flex direction="column" gap="2" p="4">
          <Text size="6" weight="bold">
            Gossip Network
          </Text>
          <Text size="3" color="gray">
            Gossip network visualization and peer management features are coming
            soon. This feature will show network topology, peer connections, and
            gossip protocol metrics.
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
