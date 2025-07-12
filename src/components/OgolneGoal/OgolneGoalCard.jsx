"use client";

import { Box, Heading, Icon, HStack, Flex, Button } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaGripVertical, FaStar, FaRegStar } from "react-icons/fa";
import DeleteButton from "../DeleteButton";
// ZMIANA: Importujemy pełny zestaw narzędzi DndContext
import {
  DndContext,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useOgolneGoals } from "@/context/OgolneGoalsContext";
import DraggableOgolneGoal from "./DraggableOgolneGoal";
import AddGoalInput from "../AddGoalInput";
import { useState } from "react";

const OgolneGoalCard = ({ category, goals }) => {
  const { addGoal, updateGoalsOrder, toggleCategoryImportant, deleteCategory } =
    useOgolneGoals();
  const [isEditing, setIsEditing] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: category.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 6 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = goals.findIndex((goal) => goal._id === active.id);
    const newIndex = goals.findIndex((goal) => goal._id === over.id);
    const reorderedGoals = arrayMove(goals, oldIndex, newIndex);
    updateGoalsOrder(category.name, reorderedGoals);
  };

  const handleAddNewGoal = (goalText) => {
    const newGoal = {
      text: goalText,
      category: category.name,
      order: goals.length,
    };
    addGoal(newGoal);
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
      borderColor={category.important ? "red.400" : "gray.600"}
    >
      <Flex mb={4} justify="space-between" align="center">
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
          <Heading
            size="md"
            color="gray.300"
            textAlign="center"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            {category.name}
          </Heading>
        </HStack>
        <HStack>
          <Button
            size="sm"
            variant="ghost"
            aria-label="Oznacz kategorię jako ważną"
            onClick={() =>
              toggleCategoryImportant(category._id, category.important)
            }
            color={category.important ? "red.400" : "gray.400"}
          >
            {category.important ? <FaStar /> : <FaRegStar />}
          </Button>
          <DeleteButton
            goal_id={category._id}
            onDelete={() => deleteCategory(category._id, category.name)}
            confirm
            enableArchive={false}
          />
        </HStack>
      </Flex>

      {goals.length > 0 && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={goals.map((g) => g._id)}
            strategy={verticalListSortingStrategy}
          >
            <Box minH="40px" color="gray.300">
              {goals.map((goal) => (
                <DraggableOgolneGoal key={goal._id} goal={goal} />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
      )}

      <AddGoalInput
        onAdd={handleAddNewGoal}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </Box>
  );
};

export default OgolneGoalCard;
