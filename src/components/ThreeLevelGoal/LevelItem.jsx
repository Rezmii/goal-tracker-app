"use client";

import { useState } from "react";
import { Box, HStack, Text, Button } from "@chakra-ui/react";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import EditableGoalText from "../EditableGoalText";
import { useThreeLevelGoals } from "@/context/ThreeLevelGoalsContext";

const LevelItem = ({ levelData, goalId }) => {
  const { updateLevel } = useThreeLevelGoals();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Box
      p={3}
      bg="gray.700"
      borderRadius="md"
      borderLeft="4px solid"
      borderColor={levelData.done ? "red.400" : "gray.600"}
    >
      <HStack justifyContent="space-between">
        <HStack flex="1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              updateLevel(goalId, {
                level: levelData.level,
                done: !levelData.done,
              })
            }
            color={levelData.done ? "red.400" : "gray.400"}
            _hover={{ bg: "gray.500", color: "red.300" }}
          >
            {levelData.done ? <FaRegCheckCircle /> : <FaRegCircle />}
          </Button>

          {isEditing ? (
            <EditableGoalText
              initialText={levelData.text}
              onCancel={() => setIsEditing(false)}
              onSave={(newText) => {
                updateLevel(goalId, { level: levelData.level, text: newText });
                setIsEditing(false);
              }}
            />
          ) : (
            <Text
              color={levelData.done ? "red.400" : "gray.100"}
              textDecoration={levelData.done ? "line-through" : "none"}
              fontSize="sm"
              cursor="pointer"
              onClick={() => setIsEditing(true)}
            >
              {levelData.text}
            </Text>
          )}
        </HStack>
        <Text
          fontSize="xs"
          color="gray.500"
          fontWeight="bold"
          whiteSpace="nowrap"
        >
          POZIOM {levelData.level}
        </Text>
      </HStack>
    </Box>
  );
};

export default LevelItem;
