"use client";

import { Heading, Container, Flex, Spinner } from "@chakra-ui/react";
import { useGoals } from "@/context/GoalsContext";
import TimeGoalCard from "@/components/TimeGoal/TimeGoalCard";

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
              <TimeGoalCard
                key={type}
                title={type}
                goals={getGoalsByType(type)}
              />
            ))}
          </Flex>

          {/* 🔹 Sekcja 2: Rok / 3 Lata */}
          <Flex gap={6} mt={6}>
            {["ten rok", "3 lata"].map((type) => (
              <TimeGoalCard
                key={type}
                title={type}
                goals={getGoalsByType(type)}
              />
            ))}
          </Flex>
        </>
      )}
    </Container>
  );
};

export default CzasowePage;
