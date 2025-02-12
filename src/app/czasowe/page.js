"use client";

import { Box, Heading, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import { useGoals } from "@/context/GoalsContext";

const CzasowePage = () => {
  const { goals, loading } = useGoals();

  // 🔹 Filtrowanie celów według sekcji
  const getGoalsByType = (type) => goals.filter((goal) => goal.type === type);

  return (
    <Container maxW="1000px" py={8}>
      <Heading mb={6} textAlign="center" color="white" fontWeight="bold">
        Twoje Cele
      </Heading>

      {loading ? (
        <Flex justify="center">
          <Spinner size="xl" color="red.500" />
        </Flex>
      ) : (
        <>
          {/* 🔹 Sekcja 1: Tydzień / Miesiąc / 3 Miesiące */}
          <Flex gap={6}>
            {["ten tydzień", "ten miesiąc", "3 miesiące"].map((type) => (
              <Box
                key={type}
                flex="1"
                bg="red.700"
                p={5}
                borderRadius="md"
                boxShadow="md"
              >
                <Heading size="lg" mb={3} color="gray.200" textAlign="center">
                  {type}
                </Heading>
                <Box mt={3} color="gray.300" textAlign="center">
                  {getGoalsByType(type).length > 0
                    ? getGoalsByType(type).map((goal) => (
                        <Text key={goal._id}>• {goal.text}</Text>
                      ))
                    : "Brak celów"}
                </Box>
              </Box>
            ))}
          </Flex>

          {/* 🔹 Sekcja 2: Rok / 3 Lata */}
          <Flex gap={6} mt={6}>
            {["ten rok", "3 lata"].map((type) => (
              <Box
                key={type}
                flex="1"
                bg="red.700"
                p={5}
                borderRadius="md"
                boxShadow="md"
              >
                <Heading size="lg" mb={3} color="gray.200" textAlign="center">
                  {type}
                </Heading>
                <Box mt={3} color="gray.300" textAlign="center">
                  {getGoalsByType(type).length > 0
                    ? getGoalsByType(type).map((goal) => (
                        <Text key={goal._id}>• {goal.text}</Text>
                      ))
                    : "Brak celów"}
                </Box>
              </Box>
            ))}
          </Flex>
        </>
      )}
    </Container>
  );
};

export default CzasowePage;
