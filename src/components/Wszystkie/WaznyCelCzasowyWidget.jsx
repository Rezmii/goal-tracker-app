"use client";

import { Box, Text, HStack, Icon } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaRegStar } from "react-icons/fa";

const WaznyCelCzasowyWidget = ({ goal }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: goal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      cursor="grab"
      bg="gray.800"
      p={4}
      borderRadius="lg"
      boxShadow="md"
      borderTop="4px solid"
      borderColor="red.400"
    >
      <HStack justifyContent="space-between">
        <Box>
          <Text fontWeight="bold" color="gray.100">
            {goal.goal.text}
          </Text>
          <Text fontSize="sm" color="gray.400">
            Z okresu: <strong>{goal.goal.type}</strong>
          </Text>
        </Box>
        <Icon as={FaRegStar} color="red.400" />
      </HStack>
    </Box>
  );
};

export default WaznyCelCzasowyWidget;
