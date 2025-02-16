"use client";

import { Box, Text } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableGoal = ({ goal }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: goal._id });

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
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
    >
      <Text fontWeight="bold" fontSize="sm">
        {goal.text}
      </Text>
    </Box>
  );
};

export default DraggableGoal;
