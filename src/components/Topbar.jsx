// src/components/Topbar.jsx

"use client";

import { Flex, Text } from "@chakra-ui/react";

const Topbar = () => {
  return (
    <Flex
      // ZMIANA: Spójne tło z resztą UI
      bg="gray.900"
      color="white"
      align="center"
      justify="space-between"
      p={4}
      h="60px" // Ustawienie stałej wysokości
      w="calc(100% - 250px)"
      ml="250px"
      // ZMIANA: Subtelne oddzielenie od treści za pomocą dolnej krawędzi
      borderBottom="1px solid"
      borderColor="gray.700"
    >
      <Text fontSize="xl" fontWeight="bold">
        Moje Cele
      </Text>
    </Flex>
  );
};

export default Topbar;
