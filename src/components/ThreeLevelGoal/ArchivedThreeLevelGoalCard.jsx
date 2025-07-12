"use client";

import { Box, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";

const ArchivedThreeLevelGoalCard = ({ goal }) => {
  return (
    <Box
      bg="gray.800"
      p={4}
      borderRadius="lg"
      boxShadow="md"
      borderLeft="4px solid"
      borderColor="red.400"
    >
      <Text fontWeight="bold" fontSize="md" color="gray.200">
        {goal.text}
      </Text>
      <Text fontSize="xs" mt={1} mb={3} color="gray.400">
        Zarchiwizowano: {new Date(goal.archived_at).toLocaleDateString()}
      </Text>

      <VStack align="stretch" spacing={2} mt={3}>
        {goal.levels?.map((level) => (
          <HStack key={level.level}>
            <Icon
              as={level.done ? FaRegCheckCircle : FaRegCircle}
              color={level.done ? "red.400" : "gray.500"}
              boxSize={4}
            />
            <Text fontSize="sm" color="gray.300">
              {level.text}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default ArchivedThreeLevelGoalCard;
