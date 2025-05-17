"use client";

import {
  Box,
  Text,
  Flex,
  Button,
  HStack,
  VStack,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import {
  FaStar,
  FaRegStar,
  FaRegCheckCircle,
  FaRegCircle,
  FaPlus,
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
      borderRadius="xl"
      boxShadow="md"
      transition="all 0.2s"
      p={4}
      mb={3}
      cursor={isEditing ? "default" : "grab"}
      border={goal.important ? "2px solid" : ""}
      borderColor={goal.important ? "yellow.600" : ""}
      bg={"red.700"}
      _hover={{ bg: "#C31717" }}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...(!isEditing && attributes)}
      {...(!isEditing && listeners)}
    >
      <Flex justify="space-between" align="center">
        <HStack>
          <Button
            aria-label="Zaznacz jako ukończone"
            icon={goal.done ? <FaRegCheckCircle /> : <FaRegCircle />}
            size="xs"
            colorPallete={goal.done ? "green" : "gray"}
            color="white"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              toggleDone(goal._id, goal.done);
            }}
            data-dndkit-no-drag
            _hover={{
              bg: "none",
              color: "gray",
            }}
          >
            {goal.done ? <FaRegCheckCircle /> : <FaRegCircle />}
          </Button>
          <Text
            fontWeight="bold"
            fontSize="md"
            whiteSpace="pre-wrap"
            color={goal.important ? "white" : "gray.200"}
            textDecoration={goal.done ? "line-through" : "none"}
          >
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
                as={"span"}
                fontWeight="bold"
                fontSize="sm"
                color={goal.important ? "white" : "gray.200"}
                onClick={() => setIsEditing(true)}
                cursor="pointer"
                _hover={{ color: "gray.300" }}
              >
                {goal.text}
              </Text>
            )}
          </Text>
        </HStack>
        <Flex gap={2}>
          <Button
            aria-label="Oznacz jako ważne"
            icon={goal.important ? <FaStar /> : <FaRegStar />}
            size="xs"
            colorPallete={goal.important ? "yellow" : "gray"}
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              toggleImportant(goal._id, goal.important);
            }}
            data-dndkit-no-drag
            _hover={{
              bg: goal.important ? "yellow.500" : "gray.600",
              color: "white",
            }}
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
