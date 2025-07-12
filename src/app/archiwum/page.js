// src/app/archiwum/page.js

"use client";

import {
  Container,
  Heading,
  Flex,
  Box,
  Text,
  Spinner,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useArchiveGoals } from "@/context/ArchiveGoalsContext";
import { FaArchive } from "react-icons/fa";
import { useMemo } from "react";
import ArchivedThreeLevelGoalCard from "@/components/ThreeLevelGoal/ArchivedThreeLevelGoalCard";

const ArchiwumPage = () => {
  const { archiveGoals, loadingArchive } = useArchiveGoals();

  const groupedGoals = useMemo(() => {
    if (!archiveGoals) return {};
    return archiveGoals.reduce((acc, goal) => {
      const category = goal.category || "ogolne";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(goal);
      return acc;
    }, {});
  }, [archiveGoals]);

  const categoriesInOrder = ["czasowe", "trzyPoziomowe"];

  return (
    <Container maxW="container.xl" p={0}>
      <Heading
        size="2xl"
        mb={8}
        textAlign="left"
        color="white"
        fontWeight="bold"
      >
        Archiwum
      </Heading>

      {loadingArchive ? (
        <Flex justify="center" align="center" h="50vh">
          <Spinner size="xl" color="red.500" />
        </Flex>
      ) : (
        <VStack spacing={10} align="stretch">
          {Object.keys(groupedGoals).length > 0 ? (
            categoriesInOrder.map(
              (category) =>
                // Sprawdzamy, czy dana kategoria ma jakiekolwiek cele
                groupedGoals[category] && (
                  <Box key={category}>
                    <Heading
                      size="lg"
                      mb={4}
                      color="gray.300"
                      borderBottom="2px solid"
                      borderColor="gray.700"
                      pb={2}
                    >
                      {category === "czasowe"
                        ? "Cele Czasowe"
                        : "Cele 3-Poziomowe"}
                    </Heading>
                    {/* ZMIANA: Używamy SimpleGrid zamiast VStack do wyświetlania kafelków */}
                    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
                      {groupedGoals[category].map((goal) =>
                        // ZMIANA: Warunkowe renderowanie w zależności od kategorii
                        goal.category === "czasowe" ? (
                          <Box
                            key={goal._id}
                            bg="gray.800"
                            p={4}
                            borderRadius="lg"
                            boxShadow="md"
                            borderLeft="4px solid"
                            borderColor="red.400"
                          >
                            <Text
                              fontWeight="bold"
                              fontSize="md"
                              color="gray.200"
                            >
                              {goal.text}
                            </Text>
                            <Text fontSize="xs" mt={2} color="gray.400">
                              Zarchiwizowano:{" "}
                              {new Date(goal.archived_at).toLocaleDateString()}
                            </Text>
                          </Box>
                        ) : (
                          <ArchivedThreeLevelGoalCard
                            key={goal._id}
                            goal={goal}
                          />
                        )
                      )}
                    </SimpleGrid>
                  </Box>
                )
            )
          ) : (
            <Text color="gray.500" fontStyle="italic">
              Twoje archiwum jest puste.
            </Text>
          )}
        </VStack>
      )}
    </Container>
  );
};

export default ArchiwumPage;
