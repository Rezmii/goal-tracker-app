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
import DraggableGoal from "../DraggableGoal";
import AddGoalInput from "../AddGoalInput";
import { useGoals } from "@/context/GoalsContext";
import { useState, useEffect } from "react";

const TimeGoalCard = ({ title, goals }) => {
  const { updateGoalsOrder } = useGoals();
  const [localGoals, setLocalGoals] = useState(goals);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // 🔹 Przeciąganie aktywuje się dopiero po przesunięciu kursora o 8px
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // 🔹 Dotykowe przeciąganie działa po 200ms trzymania palca
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setLocalGoals(goals);
  }, [goals]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localGoals.findIndex((goal) => goal._id === active.id);
    const newIndex = localGoals.findIndex((goal) => goal._id === over.id);

    const updatedGoals = arrayMove(localGoals, oldIndex, newIndex);
    setLocalGoals(updatedGoals);
    updateGoalsOrder(title, updatedGoals);
  };

  return (
    <Box flex="1" bg="red.700" p={5} borderRadius="md" boxShadow="md">
      <Heading
        size="lg"
        mb={3}
        color="gray.200"
        textAlign="center"
        backgroundColor="black"
        borderRadius="md"
      >
        {title}
      </Heading>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={localGoals.map((goal) => goal._id)}
          strategy={verticalListSortingStrategy}
        >
          <Box mt={3} color="gray.300">
            {localGoals.length > 0
              ? localGoals.map((goal) => (
                  <DraggableGoal key={goal._id} goal={goal} />
                ))
              : "Brak celów"}
          </Box>
        </SortableContext>
      </DndContext>
      <AddGoalInput type={title} />
    </Box>
  );
};

export default TimeGoalCard;
