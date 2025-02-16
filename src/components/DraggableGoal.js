"use client";

import { Box, Text, Flex, IconButton, Button } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { FaTrash } from "react-icons/fa";
import { CSS } from "@dnd-kit/utilities";
import { useGoals } from "@/context/GoalsContext";

const DraggableGoal = ({ goal }) => {
  const { deleteGoal } = useGoals();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: goal._id });

  return (
    <Box
      ref={setNodeRef}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      p={2}
      mb={2}
      cursor="grab"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
    >
      <Flex justify="space-between" align="center">
        <Text fontWeight="bold" fontSize="sm">
          {goal.text}
        </Text>
        <Button
          size="xs"
          colorScheme="red"
          variant="ghost"
          onClick={() => {
            deleteGoal(goal._id);
            console.log(goal._id);
          }}
          data-dndkit-no-drag
          _hover={{ bg: "red.800", color: "white" }}
        >
          <FaTrash />
        </Button>
      </Flex>
    </Box>
  );
};

export default DraggableGoal;
