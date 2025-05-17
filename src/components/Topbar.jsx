"use client";

import { Flex, Text } from "@chakra-ui/react";

const Topbar = () => {
  return (
    <Flex
      bg="red.700"
      color="white"
      align="center"
      justify="space-between"
      p={4}
      w="calc(100% - 250px)"
      ml="250px"
      boxShadow="5px 5px 15px rgba(0, 0, 0, 0.5)"
    >
      <Text fontSize="xl" fontWeight="bold">
        Moje Cele
      </Text>
    </Flex>
  );
};

export default Topbar;
