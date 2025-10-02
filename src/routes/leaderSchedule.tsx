import { createFileRoute } from "@tanstack/react-router";
import { Card, Flex, Text } from "@radix-ui/themes";
import { z } from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";

// Keep the types for compatibility with existing components
const SearchTypeSchema = z.enum(["mySlots", "skippedSlots", "text"]);
export const SearchTypeEnum = SearchTypeSchema.enum;
export type SearchType = z.infer<typeof SearchTypeSchema>;

const searchParamsSchema = z.object({
  searchType: fallback(SearchTypeSchema, SearchTypeEnum.text).default(
    SearchTypeEnum.text,
  ),
  searchText: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/leaderSchedule")({
  component: LeaderScheduleComingSoon,
  validateSearch: zodValidator(searchParamsSchema),
});

function LeaderScheduleComingSoon() {
  return (
    <Flex direction="column" gap="4" p="4">
      <Card>
        <Flex direction="column" gap="2" p="4">
          <Text size="6" weight="bold">
            Leader Schedule
          </Text>
          <Text size="3" color="gray">
            Leader schedule visualization and slot management features are
            coming soon. This feature will show when this validator is scheduled
            to be a leader and provide detailed slot performance analysis.
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
