// src/components/TimeGoal/TimeGoalCard.jsx

"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
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
  const [isEditing, setIsEditing] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 6 },
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
    // ZMIANA: Nowy, subtelniejszy wygląd karty
    <Box flex="1" bg="gray.800" p={5} borderRadius="lg" boxShadow="md">
      {/* ZMIANA: Uproszczony nagłówek karty, bez tła */}
      <Heading
        size="md"
        mb={4}
        color="gray.300"
        textAlign="center"
        fontWeight="semibold"
        textTransform="uppercase"
        letterSpacing="wide"
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
          <Box minH="40px" color="gray.300">
            {localGoals.length > 0 || isEditing ? (
              localGoals.map((goal) => (
                <DraggableGoal key={goal._id} goal={goal} />
              ))
            ) : (
              <Text
                textAlign="center"
                fontSize="sm"
                color="gray.500"
                fontStyle="italic"
              >
                Brak celów
              </Text>
            )}
          </Box>
        </SortableContext>
      </DndContext>
      <AddGoalInput
        type={title}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </Box>
  );
};

export default TimeGoalCard;
