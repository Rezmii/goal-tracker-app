"use client";

import { Container, Heading, Flex, Box, Text, Spinner } from "@chakra-ui/react";
import { useArchiveGoals } from "@/context/ArchiveGoalsContext";

const ArchiwumPage = () => {
  const { archiveGoals, loadingArchive } = useArchiveGoals();

  return (
    <Container py={8}>
      <Heading
        mb={6}
        textAlign="center"
        color="white"
        fontWeight="bold"
        backgroundColor="#7c0f0f"
        borderRadius="md"
        boxShadow="5px 5px 15px rgba(0, 0, 0, 0.5)"
      >
        Archiwum Celów
      </Heading>

      {loadingArchive ? (
        <Flex justify="center">
          <Spinner size="xl" color="red.500" />
        </Flex>
      ) : (
        <Flex wrap="wrap" gap={4}>
          {archiveGoals.map((goal) => (
            <Box
              key={goal._id}
              bg="gray.800"
              p={4}
              borderRadius="md"
              w="100%"
              maxW="400px"
              boxShadow="md"
              borderLeft="4px solid red"
            >
              <Text fontWeight="bold" fontSize="md" color="gray.200">
                {goal.text}
              </Text>
              <Text fontSize="xs" mt={2} color="gray.400">
                Ukończono: {new Date(goal.date_finish).toLocaleDateString()}
              </Text>
            </Box>
          ))}
        </Flex>
      )}
    </Container>
  );
};

export default ArchiwumPage;
