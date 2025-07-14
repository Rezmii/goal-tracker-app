// src/components/TimeGoal/TimeGoalCard.jsx

"use client";

import { Box, Heading, Text, Flex, HStack, Icon } from "@chakra-ui/react";
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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaGripVertical } from "react-icons/fa";

const TimeGoalCard = ({ id, title, goals, isDraggableCard = false }) => {
  const { addGoal, updateGoalsOrder } = useGoals();
  const [localGoals, setLocalGoals] = useState(goals);
  const [isEditing, setIsEditing] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id, disabled: !isDraggableCard });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  const handleInnerDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localGoals.findIndex((goal) => goal._id === active.id);
    const newIndex = localGoals.findIndex((goal) => goal._id === over.id);

    const updatedGoals = arrayMove(localGoals, oldIndex, newIndex);
    setLocalGoals(updatedGoals);
    updateGoalsOrder(title, updatedGoals);
  };

  const handleAddNewGoal = (goalText) => {
    const newGoal = {
      text: goalText,
      type: title,
      date_finish: new Date(),
    };
    addGoal(newGoal);
  };

  const getDynamicTitle = (title) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-11

    switch (title) {
      case "3 miesiące": {
        const monthNames = [
          "styczeń",
          "luty",
          "marzec",
          "kwiecień",
          "maj",
          "czerwiec",
          "lipiec",
          "sierpień",
          "wrzesień",
          "październik",
          "listopad",
          "grudzień",
        ];
        const currentQuarter = Math.floor(month / 3);
        const startMonth = monthNames[currentQuarter * 3];
        const endMonth = monthNames[currentQuarter * 3 + 2];
        const capitalizedStartMonth =
          startMonth.charAt(0).toUpperCase() + startMonth.slice(1);
        return `${title} (${capitalizedStartMonth}-${endMonth})`;
      }
      case "ten rok":
        return `ten rok (${year})`;
      case "3 lata":
        return `3 lata (${year} - ${year + 2})`;
      default:
        return title;
    }
  };

  const displayTitle = getDynamicTitle(title);

  return (
    // ZMIANA: Nowy, subtelniejszy wygląd karty
    <Box
      ref={setNodeRef}
      style={isDraggableCard ? style : undefined}
      flex="1"
      bg="gray.800"
      p={5}
      borderRadius="lg"
      boxShadow="md"
    >
      <HStack mb={4} justify="center" position="relative">
        {isDraggableCard && (
          <Box
            {...attributes}
            {...listeners}
            cursor="grab"
            position="absolute"
            left="0"
            p={2}
          >
            <Icon as={FaGripVertical} color="gray.600" />
          </Box>
        )}
        <Heading
          size="md"
          mb={4}
          color="gray.300"
          textAlign="center"
          fontWeight="semibold"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          {displayTitle}
        </Heading>
      </HStack>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleInnerDragEnd}
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
        onAdd={handleAddNewGoal}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </Box>
  );
};

export default TimeGoalCard;
