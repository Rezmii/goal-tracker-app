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
    >
      <Text fontSize="xl" fontWeight="bold">
        My Goal App
      </Text>
    </Flex>
  );
};

export default Topbar;
