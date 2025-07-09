"use client";

import {
  Container,
  Flex,
  Spinner,
  Button,
  Icon,
  SimpleGrid,
  Dialog,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
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
import { FaPlus, FaTimes } from "react-icons/fa";
import ThreeLevelGoalCard from "@/components/ThreeLevelGoal/ThreeLevelGoalCard";
import { useThreeLevelGoals } from "@/context/ThreeLevelGoalsContext";
import { Field } from "@/components/ui/field";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";

const initialFormState = {
  text: "",
  level1: "",
  level2: "",
  level3: "",
};

const TrzyPoziomyPage = () => {
  const { goals, loading, addGoal, updateGoalsOrder, setGoals } =
    useThreeLevelGoals();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGoalData, setNewGoalData] = useState(initialFormState);

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

  const formattedGoalsForCopy = useMemo(() => {
    return goals.map((goal) => ({
      cel_glowny: goal.text,
      wazny: goal.important,
      poziomy: goal.levels.map((level) => ({
        poziom: level.level,
        opis: level.text,
        ukonczony: level.done,
      })),
    }));
  }, [goals]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGoal = () => {
    if (!newGoalData.text.trim()) return;

    const goalPayload = {
      text: newGoalData.text,
      levels: [
        { level: 1, text: newGoalData.level1 || "Poziom 1" },
        { level: 2, text: newGoalData.level2 || "Poziom 2" },
        { level: 3, text: newGoalData.level3 || "Poziom 3" },
      ],
    };

    addGoal(goalPayload);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setNewGoalData(initialFormState);
    setIsDialogOpen(false);
  };

  const isFormInvalid = !newGoalData.text.trim();

  return (
    <Container maxW="container.xl" p={0} position="relative">
      <Flex justifyContent="flex-end" alignItems="center" mb={8}>
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
        onOpenChange={(e) => !e.open && handleCloseDialog()}
        isCentered
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="gray.800" color="white" maxW="md">
            <Dialog.Header>
              <Dialog.Title>Stwórz Nowy Cel 3-Poziomowy</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger position="absolute" top="3" right="3" asChild>
              <Button variant="ghost" size="sm" onClick={handleCloseDialog}>
                <Icon as={FaTimes} />
              </Button>
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <VStack spacing={4} align="stretch">
                <Field label="Cel Główny">
                  <Input
                    name="text"
                    variant="subtle"
                    value={newGoalData.text}
                    onChange={handleInputChange}
                  />
                </Field>

                <Field label="Poziom 1">
                  <Input
                    name="level1"
                    variant="subtle"
                    value={newGoalData.level1}
                    onChange={handleInputChange}
                  />
                </Field>
                <Field label="Poziom 2">
                  <Input
                    name="level2"
                    variant="subtle"
                    value={newGoalData.level2}
                    onChange={handleInputChange}
                  />
                </Field>
                <Field label="Poziom 3">
                  <Input
                    name="level3"
                    variant="subtle"
                    value={newGoalData.level3}
                    onChange={handleInputChange}
                  />
                </Field>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="ghost" mr={3} onClick={handleCloseDialog}>
                Anuluj
              </Button>
              {/* ZMIANA: Przycisk jest nieaktywny, jeśli główny cel jest pusty */}
              <Button
                colorScheme="red"
                onClick={handleAddGoal}
                isDisabled={isFormInvalid}
              >
                Stwórz Cel
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
      {!loading && goals.length > 0 && (
        <CopyToClipboardButton dataToCopy={formattedGoalsForCopy} />
      )}
    </Container>
  );
};

export default TrzyPoziomyPage;
