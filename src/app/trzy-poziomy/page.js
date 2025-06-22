"use client";

import { useState } from "react";
import {
  Heading,
  Container,
  Flex,
  Spinner,
  Button,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
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
  arrayMove,
} from "@dnd-kit/sortable";
import { FaPlus } from "react-icons/fa";
import ThreeLevelGoalCard from "@/components/ThreeLevelGoal/ThreeLevelGoalCard";

const TrzyPoziomyPage = () => {
  const [goals, setGoals] = useState([
    {
      _id: "1",
      text: "Nauczyć się grać na gitarze",
      important: true,
      levels: [
        { level: 1, text: "Podstawowe akordy", done: true },
        { level: 2, text: "Proste piosenki", done: false },
        { level: 3, text: "Pierwszy koncert dla znajomych", done: false },
      ],
    },
    {
      _id: "2",
      text: "Przebiec maraton",
      important: false,
      levels: [
        { level: 1, text: "Bieg na 5km", done: false },
        { level: 2, text: "Bieg na 10km", done: false },
        { level: 3, text: "Półmaraton", done: false },
      ],
    },
  ]);
  const loading = false;
  const addGoal = () => alert("Logika dodawania nowego celu (np. przez modal)");

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = goals.findIndex((goal) => goal._id === active.id);
    const newIndex = goals.findIndex((goal) => goal._id === over.id);

    setGoals((goals) => arrayMove(goals, oldIndex, newIndex));
  };

  return (
    <Container maxW="container.xl" p={0}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading size="2xl" color="white" fontWeight="bold">
          Cele 3-Poziomowe
        </Heading>
        <Button
          leftIcon={<Icon as={FaPlus} />}
          colorScheme="red"
          onClick={addGoal}
        >
          Dodaj Cel
        </Button>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" h="50vh">
          <Spinner size="xl" color="red.500" />
        </Flex>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={goals.map((g) => g._id)}>
            <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gap={6}>
              {goals.map((goal) => (
                <ThreeLevelGoalCard key={goal._id} goal={goal} />
              ))}
            </SimpleGrid>
          </SortableContext>
        </DndContext>
      )}
    </Container>
  );
};

export default TrzyPoziomyPage;
