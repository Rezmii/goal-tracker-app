"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import AddGoalInput from "../AddGoalInput";

const TimeGoalCard = ({ title, goals }) => {
  return (
    <Box flex="1" bg="red.700" p={5} borderRadius="md" boxShadow="md">
      <Heading size="lg" mb={3} color="gray.200" textAlign="center">
        {title}
      </Heading>
      <Box mt={3} color="gray.300">
        {goals.length > 0
          ? goals.map((goal) => (
              <Text fontWeight="bold" fontSize="sm" key={goal._id}>
                • {goal.text}
              </Text>
            ))
          : "Brak celów"}
      </Box>
      <AddGoalInput type={title} />
    </Box>
  );
};

export default TimeGoalCard;
