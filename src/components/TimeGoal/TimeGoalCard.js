"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import AddGoalInput from "../AddGoalInput";

const TimeGoalCard = ({ title, goals }) => {
  return (
    <Box flex="1" bg="red.700" p={5} borderRadius="md" boxShadow="md">
      <Heading
        size="lg"
        mb={3}
        color="gray.200"
        textAlign="center"
        backgroundColor="black"
        borderRadius="md"
      >
        {title}
      </Heading>
      <Box mt={3} color="gray.300">
        {goals.length > 0
          ? goals.map((goal) => (
              <Box
                key={goal._id}
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
                p={2}
                mb={2}
              >
                <Text fontWeight="bold" fontSize="sm">
                  {goal.text}
                </Text>
              </Box>
            ))
          : "Brak celów"}
      </Box>
      <AddGoalInput type={title} />
    </Box>
  );
};

export default TimeGoalCard;
