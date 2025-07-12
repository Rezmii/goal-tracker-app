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

const OgolnePage = () => {
  const { goals, loading, addGoal } = useOgolneGoals();
  const [newCategory, setNewCategory] = useState("");

  const categories = useMemo(() => {
    return goals.reduce((acc, goal) => {
      const { category } = goal;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(goal);
      return acc;
    }, {});
  }, [goals]);

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    // Logika dodawania nowej, pustej kategorii (karty)
    // Na razie możemy po prostu dodać cel do nowej kategorii
    addGoal({ text: "Nowy cel", category: newCategory });
    setNewCategory("");
  };

  return (
    <Container maxW="container.xl" p={0}>
      <Flex justifyContent="flex-end" alignItems="center" mb={8} gap={4}>
        <Input
          placeholder="Nazwa nowej kategorii..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          variant="solid"
          maxW="300px"
        />
        <Button
          leftIcon={<Icon as={FaPlus} />}
          colorScheme="red"
          onClick={handleAddCategory}
          isDisabled={!newCategory.trim()}
        >
          Dodaj Kategorię
        </Button>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" h="50vh">
          <Spinner size="xl" color="red.500" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gap={6}>
          {Object.entries(categories).map(([category, goalsInCategory]) => (
            <OgolneGoalCard
              key={category}
              category={category}
              goals={goalsInCategory}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default OgolnePage;
