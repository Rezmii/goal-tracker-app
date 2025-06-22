"use client";

import {
  Heading,
  Container,
  Flex,
  Spinner,
  Button,
  Icon,
  SimpleGrid,
  Dialog,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
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
import { useThreeLevelGoals } from "@/context/ThreeLevelGoalsContext";
import { Field } from "@/components/ui/field";

const TrzyPoziomyPage = () => {
  const { goals, loading, addGoal, updateGoalsOrder, setGoals } =
    useThreeLevelGoals();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGoalText, setNewGoalText] = useState("");

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
    const reorderedGoals = arrayMove(goals, oldIndex, newIndex);
    updateGoalsOrder(reorderedGoals);
  };

  const handleAddGoal = () => {
    if (!newGoalText.trim()) return;
    addGoal({ text: newGoalText, date_finish: new Date() });
    setNewGoalText("");
    setIsDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setNewGoalText("");
    setIsDialogOpen(false);
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
          onClick={() => setIsDialogOpen(true)}
        >
          Dodaj Cel
        </Button>
      </Flex>

      <Dialog.Root
        open={isDialogOpen}
        onOpenChange={(e) => setIsDialogOpen(e.open)}
        isCentered
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="gray.800" color="white" maxW="sm">
            <Dialog.Header>
              <Dialog.Title>Dodaj nowy cel główny</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger position="absolute" top="2" right="2" asChild>
              <Button variant="ghost" onClick={handleCloseDialog}>
                x
              </Button>
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <Field label="Nazwa celu">
                <Input
                  placeholder="Np. Przebiec maraton"
                  value={newGoalText}
                  onChange={(e) => setNewGoalText(e.target.value)}
                  focusBorderColor="red.500"
                />
              </Field>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="ghost" mr={3} onClick={handleCloseDialog}>
                Anuluj
              </Button>
              <Button colorScheme="red" onClick={handleAddGoal}>
                Stwórz
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

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
