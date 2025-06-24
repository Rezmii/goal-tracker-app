// src/app/archiwum/page.js

"use client";

import {
  Container,
  Flex,
  Box,
  Text,
  Spinner,
  SimpleGrid, // ZMIANA: Użycie SimpleGrid dla lepszego układu
  Icon,
} from "@chakra-ui/react";
import { useArchiveGoals } from "@/context/ArchiveGoalsContext";
import { FaArchive } from "react-icons/fa"; // ZMIANA: Ikona dla zarchiwizowanych celów

const ArchiwumPage = () => {
  const { archiveGoals, loadingArchive } = useArchiveGoals();

  return (
    <Container maxW="container.xl" p={0}>
      {loadingArchive ? (
        <Flex justify="center" align="center" h="50vh">
          <Spinner size="xl" color="red.500" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {archiveGoals.length > 0 ? (
            archiveGoals.map((goal) => (
              <Box
                key={goal._id}
                bg="gray.800"
                p={4}
                borderRadius="lg"
                boxShadow="md"
                borderLeft="4px solid"
                borderColor="red.400"
                transition="background 0.2s ease-in-out"
                _hover={{
                  bg: "gray.700",
                  borderColor: "red.500",
                }}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontWeight="bold" fontSize="md" color="gray.200">
                    {goal.text}
                  </Text>
                </Flex>
                <Text fontSize="xs" mt={2} color="gray.400">
                  Data ukończenia:{" "}
                  {new Date(goal.date_finish).toLocaleDateString()}
                </Text>
              </Box>
            ))
          ) : (
            <Text color="gray.500" fontStyle="italic">
              Twoje archiwum jest puste.
            </Text>
          )}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default ArchiwumPage;
