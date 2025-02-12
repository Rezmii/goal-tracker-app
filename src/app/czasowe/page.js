"use client";

import { Box, Heading, Container, Flex, VStack } from "@chakra-ui/react";

const CzasowePage = () => {
  return (
    <Container maxW="1000px" py={8}>
      <Heading mb={6} textAlign="center" color="white" fontWeight="bold">
        Twoje Cele
      </Heading>

      {/* 🔹 Pierwszy rząd sekcji */}
      <Flex gap={6}>
        <Box flex="1" bg="red.700" p={5} borderRadius="md" boxShadow="md">
          <Heading size="lg" mb={3} color="gray.200" textAlign="center">
            Ten tydzień
          </Heading>
          <Box mt={3} color="gray.300" textAlign="center">
            Brak celów na ten tydzień.
          </Box>
        </Box>

        <Box flex="1" bg="red.700" p={5} borderRadius="md" boxShadow="md">
          <Heading size="lg" mb={3} color="gray.200" textAlign="center">
            Ten miesiąc
          </Heading>
          <Box mt={3} color="gray.300" textAlign="center">
            Brak celów na ten miesiąc.
          </Box>
        </Box>

        <Box flex="1" bg="red.700" p={5} borderRadius="md" boxShadow="md">
          <Heading size="lg" mb={3} color="gray.200" textAlign="center">
            3 miesiące
          </Heading>
          <Box mt={3} color="gray.300" textAlign="center">
            Brak celów na 3 miesiące.
          </Box>
        </Box>
      </Flex>

      {/* 🔹 Drugi rząd sekcji */}
      <Flex gap={6} mt={6}>
        <Box flex="1" bg="red.700" p={5} borderRadius="md" boxShadow="md">
          <Heading size="lg" mb={3} color="gray.200" textAlign="center">
            Ten rok
          </Heading>
          <Box mt={3} color="gray.300" textAlign="center">
            Brak celów na ten rok.
          </Box>
        </Box>

        <Box flex="1" bg="red.700" p={5} borderRadius="md" boxShadow="md">
          <Heading size="lg" mb={3} color="gray.200" textAlign="center">
            3 lata
          </Heading>
          <Box mt={3} color="gray.300" textAlign="center">
            Brak celów na 3 lata.
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default CzasowePage;
