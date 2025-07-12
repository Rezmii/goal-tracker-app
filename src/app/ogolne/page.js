"use client";

import {
  Container,
  Flex,
  Spinner,
  Button,
  Icon,
  SimpleGrid,
  Input,
} from "@chakra-ui/react";
import { useOgolneGoals } from "@/context/OgolneGoalsContext";
import OgolneGoalCard from "@/components/OgolneGoal/OgolneGoalCard";
import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
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

const OgolnePage = () => {
  const { goals, categories, loading, addCategory, reorderCategories } =
    useOgolneGoals();
  const [newCategoryName, setNewCategoryName] = useState("");

  const goalsByCategory = useMemo(() => {
    return goals.reduce((acc, goal) => {
      const { category } = goal;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(goal);
      return acc;
    }, {});
  }, [goals]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = categories.findIndex((c) => c.name === active.id);
    const newIndex = categories.findIndex((c) => c.name === over.id);
    const reordered = arrayMove(categories, oldIndex, newIndex);
    reorderCategories(reordered);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    addCategory(newCategoryName);
    setNewCategoryName("");
  };

  return (
    <Container maxW="container.xl" p={0}>
      <Flex justifyContent="flex-end" alignItems="center" mb={8} gap={4}>
        <Input
          placeholder="Nazwa nowej kategorii..."
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          variant="solid"
          maxW="300px"
        />
        <Button
          leftIcon={<Icon as={FaPlus} />}
          colorScheme="red"
          onClick={handleAddCategory}
          isDisabled={!newCategoryName.trim()}
        >
          Dodaj Kategorię
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
          <SortableContext items={categories.map((c) => c.name)}>
            <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gap={6}>
              {categories.map((category) => (
                <OgolneGoalCard
                  key={category.name}
                  category={category}
                  goals={goalsByCategory[category.name] || []}
                />
              ))}
            </SimpleGrid>
          </SortableContext>
        </DndContext>
      )}
    </Container>
  );
};

export default OgolnePage;
