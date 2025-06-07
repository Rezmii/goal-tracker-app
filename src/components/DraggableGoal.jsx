// src/components/DraggableGoal.jsx

"use client";

import { Box, Text, Flex, Button, HStack } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import {
  FaStar,
  FaRegStar,
  FaRegCheckCircle,
  FaRegCircle,
} from "react-icons/fa";
import { CSS } from "@dnd-kit/utilities";
import { useGoals } from "@/context/GoalsContext";
import { useState } from "react";
import EditableGoalText from "./EditableGoalText";
import DeleteButton from "./DeleteButton";
import SubtaskList from "./SubtasksList";

const DraggableGoal = ({ goal }) => {
  const { toggleImportant, toggleDone, updateGoalText } = useGoals();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: goal._id });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <Box
      ref={setNodeRef}
      borderRadius="md"
      boxShadow="sm"
      p={3}
      mb={3}
      cursor={isEditing ? "default" : "grab"}
      borderLeft="4px solid"
      borderColor={goal.important ? "red.400" : "transparent"}
      bg="gray.700"
      _hover={{ bg: "gray.600" }}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...(!isEditing && attributes)}
      {...(!isEditing && listeners)}
    >
      <Flex justify="space-between" align="center">
        <HStack spacing={3}>
          <Button
            aria-label="Zaznacz jako ukończone"
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              toggleDone(goal._id, goal.done);
            }}
            data-dndkit-no-drag
            color={goal.done ? "red.400" : "gray.400"}
            _hover={{ bg: "gray.500", color: "red.300" }}
          >
            {goal.done ? <FaRegCheckCircle /> : <FaRegCircle />}
          </Button>

          {isEditing ? (
            <EditableGoalText
              initialText={goal.text}
              onSave={(newText) => {
                updateGoalText(goal._id, newText);
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <Text
              as="span"
              fontWeight="medium"
              fontSize="sm"
              color={goal.done ? "red.400" : "gray.100"}
              textDecoration={goal.done ? "line-through" : "none"}
              onClick={() => setIsEditing(true)}
              cursor="pointer"
            >
              {goal.text}
            </Text>
          )}
        </HStack>
        <Flex align="center" gap={1}>
          <Button
            aria-label="Oznacz jako ważne"
            size="xs"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              toggleImportant(goal._id, goal.important);
            }}
            data-dndkit-no-drag
            color={goal.important ? "red.400" : "gray.400"}
            _hover={{ color: "red.400", bg: "gray.500" }}
          >
            {goal.important ? <FaStar /> : <FaRegStar />}
          </Button>
          <DeleteButton
            goal_id={goal._id}
            confirm={[
              "ten miesiąc",
              "3 miesiące",
              "ten rok",
              "3 lata",
            ].includes(goal.type)}
          />
        </Flex>
      </Flex>

      <SubtaskList goal={goal} />
    </Box>
  );
};

export default DraggableGoal;
