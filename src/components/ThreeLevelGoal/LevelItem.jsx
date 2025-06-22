"use client";

import { Box, HStack, Text, Button } from "@chakra-ui/react";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";

const LevelItem = ({ levelData, goalId }) => {
  return (
    <Box
      p={3}
      bg="gray.700"
      borderRadius="md"
      borderLeft="4px solid"
      borderColor={levelData.done ? "red.400" : "gray.600"}
    >
      <HStack justifyContent="space-between">
        <HStack>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              /* toggleLevelDone(goalId, levelData.level, levelData.done) */
            }}
            color={levelData.done ? "red.400" : "gray.400"}
            _hover={{ bg: "gray.500", color: "red.300" }}
          >
            {levelData.done ? <FaRegCheckCircle /> : <FaRegCircle />}
          </Button>
          <Text
            color={levelData.done ? "red.400" : "gray.100"}
            textDecoration={levelData.done ? "line-through" : "none"}
            fontSize="sm"
          >
            {levelData.text}
          </Text>
        </HStack>
        <Text fontSize="xs" color="gray.500" fontWeight="bold">
          POZIOM {levelData.level}
        </Text>
      </HStack>
    </Box>
  );
};

export default LevelItem;
