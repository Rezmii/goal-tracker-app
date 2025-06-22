"use client";

import { Box, Heading, VStack, Flex, Button, Text } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaStar, FaRegStar } from "react-icons/fa";
import LevelItem from "./LevelItem";
import DeleteButton from "../DeleteButton";

const ThreeLevelGoalCard = ({ goal }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: goal._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      bg="gray.800"
      p={5}
      borderRadius="lg"
      boxShadow="md"
      borderTop="4px solid"
      borderColor={goal.important ? "red.400" : "gray.600"}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        {...attributes}
        {...listeners}
        cursor="grab"
      >
        <Heading size="md" color="gray.100">
          {goal.text}
        </Heading>
        <Flex gap={1}>
          <Button
            aria-label="Oznacz jako ważne"
            size="sm"
            variant="ghost"
            onClick={() => {}}
            color={goal.important ? "red.400" : "gray.400"}
            _hover={{ color: "red.400", bg: "gray.700" }}
          >
            {goal.important ? <FaStar /> : <FaRegStar />}
          </Button>
          <DeleteButton goal_id={goal._id} />
        </Flex>
      </Flex>

      <VStack spacing={4} align="stretch">
        {goal.levels.map((level) => (
          <LevelItem key={level.level} levelData={level} goalId={goal._id} />
        ))}
      </VStack>
    </Box>
  );
};

export default ThreeLevelGoalCard;
