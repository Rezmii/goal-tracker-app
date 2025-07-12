"use client";

import { Box, Heading } from "@chakra-ui/react";
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
  const { addGoal, updateGoalsOrder } = useOgolneGoals();
  const [isEditing, setIsEditing] = useState(false);

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
    updateGoalsOrder(category, reorderedGoals);
  };

  const handleAddNewGoal = (goalText) => {
    const newGoal = {
      text: goalText,
      category: category,
      order: goals.length,
    };
    addGoal(newGoal);
  };

  return (
    <Box flex="1" bg="gray.800" p={5} borderRadius="lg" boxShadow="md">
      <Heading
        size="md"
        mb={4}
        color="gray.300"
        textAlign="center"
        fontWeight="semibold"
        textTransform="uppercase"
        letterSpacing="wide"
      >
        {category}
      </Heading>
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
      <AddGoalInput
        onAdd={handleAddNewGoal}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </Box>
  );
};

export default OgolneGoalCard;
