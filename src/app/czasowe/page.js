// src/app/czasowe/page.js

"use client";

import { Container, Flex, Spinner } from "@chakra-ui/react";
import { useGoals } from "@/context/GoalsContext";
import TimeGoalCard from "@/components/TimeGoal/TimeGoalCard";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import { useMemo } from "react";

const CzasowePage = () => {
  const { goals, loading } = useGoals();
  const getGoalsByType = (type) => goals.filter((goal) => goal.type === type);

  const formattedGoalsForCopy = useMemo(() => {
    const groupedGoals = goals.reduce((acc, goal) => {
      const { type, text, important, done, subtasks } = goal;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push({
        cel: text,
        wazny: important,
        ukonczony: done,
        podpunkty: subtasks.map((s) => ({ tresc: s.text, ukonczony: s.done })),
      });
      return acc;
    }, {});
    return groupedGoals;
  }, [goals]);

  return (
    <Container maxW="container.xl" p={0}>
      {loading ? (
        <Flex justify="center" align="center" h="50vh">
          <Spinner size="xl" color="red.500" />
        </Flex>
      ) : (
        <Flex direction="column" gap={8}>
          {/* ZMIANA: Dodano responsywną właściwość `direction` */}
          <Flex gap={6} direction={{ base: "column", lg: "row" }}>
            {["ten tydzień", "ten miesiąc", "3 miesiące"].map((type) => (
              <TimeGoalCard
                key={type}
                id={`karta-${type}`}
                title={type}
                goals={getGoalsByType(type)}
              />
            ))}
          </Flex>
          {/* ZMIANA: Dodano responsywną właściwość `direction` */}
          <Flex gap={6} direction={{ base: "column", lg: "row" }}>
            {["ten rok", "3 lata"].map((type) => (
              <TimeGoalCard
                key={type}
                id={`karta-${type}`}
                title={type}
                goals={getGoalsByType(type)}
              />
            ))}
          </Flex>
        </Flex>
      )}
      {!loading && <CopyToClipboardButton dataToCopy={formattedGoalsForCopy} />}
    </Container>
  );
};

export default CzasowePage;
