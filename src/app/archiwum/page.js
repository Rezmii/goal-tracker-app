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
      const category = goal.category_type || "inne";
      if (!acc[category]) acc[category] = [];
      acc[category].push(goal);
      return acc;
    }, {});
  }, [archiveGoals]);

  const categoriesInOrder = ["czasowe", "trzyPoziomowe", "ogolne"];
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
              (categoryKey) =>
                groupedGoals[categoryKey] && (
                  <Box key={categoryKey}>
                    <Heading
                      size="lg"
                      mb={4}
                      color="gray.300"
                      borderBottom="2px solid"
                      borderColor="gray.700"
                      pb={2}
                    >
                      {categoryKey === "czasowe" && "Cele Czasowe"}
                      {categoryKey === "trzyPoziomowe" && "Cele 3-Poziomowe"}
                      {categoryKey === "ogolne" && "Cele Ogólne"}
                    </Heading>

                    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
                      {groupedGoals[categoryKey].map((goal) => {
                        switch (goal.category_type) {
                          case "czasowe":
                            return (
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
                                  {new Date(
                                    goal.archived_at
                                  ).toLocaleDateString()}
                                </Text>
                              </Box>
                            );
                          case "trzyPoziomowe":
                            return (
                              <ArchivedThreeLevelGoalCard
                                key={goal._id}
                                goal={goal}
                              />
                            );
                          case "ogolne":
                            return (
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
                                <Text fontSize="sm" mt={2} color="gray.300">
                                  Kategoria: {goal.category}
                                </Text>
                                <Text mt={2} fontSize="xs" color="gray.400">
                                  Zarchiwizowano:{" "}
                                  {new Date(
                                    goal.archived_at
                                  ).toLocaleDateString()}
                                </Text>
                              </Box>
                            );
                          default:
                            return null;
                        }
                      })}
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
