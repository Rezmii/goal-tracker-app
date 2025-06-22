"use client";

// ZMIANA: Dodano HStack, Icon oraz ikonę FaGripVertical
import {
  Box,
  Heading,
  VStack,
  Flex,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaStar, FaRegStar, FaGripVertical } from "react-icons/fa";
import LevelItem from "./LevelItem";
import DeleteButton from "../DeleteButton";
import { useThreeLevelGoals } from "@/context/ThreeLevelGoalsContext";

const ThreeLevelGoalCard = ({ goal }) => {
  const { updateGoal, deleteGoal } = useThreeLevelGoals();

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
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <HStack spacing={3}>
          <Box
            {...attributes}
            {...listeners}
            p={2}
            cursor="grab"
            aria-label="Przeciągnij, aby zmienić kolejność"
          >
            <Icon as={FaGripVertical} color="gray.500" />
          </Box>
          <Heading size="md" color="gray.100">
            {goal.text}
          </Heading>
        </HStack>

        <Flex gap={1}>
          <Button
            aria-label="Oznacz jako ważne"
            size="sm"
            variant="ghost"
            onClick={() => updateGoal(goal._id, { important: !goal.important })}
            color={goal.important ? "red.400" : "gray.400"}
            _hover={{ color: "red.400", bg: "gray.700" }}
          >
            {goal.important ? <FaStar /> : <FaRegStar />}
          </Button>

          <DeleteButton
            goal_id={goal._id}
            onDelete={deleteGoal}
            confirm={true}
          />
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
