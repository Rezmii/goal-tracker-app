"use client";

import { Box, VStack, Text, Button } from "@chakra-ui/react";
import {
  FaListAlt,
  FaClock,
  FaLayerGroup,
  FaClipboardList,
} from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
  const menuItems = [
    { label: "Wszystkie", icon: <FaListAlt />, path: "/wszystkie" },
    { label: "Czasowe", icon: <FaClock />, path: "/czasowe" },
    { label: "3 poziomy", icon: <FaLayerGroup />, path: "/trzy-poziomy" },
    { label: "Ogólne", icon: <FaClipboardList />, path: "/ogolne" },
  ];

  return (
    <Box bg="gray.900" color="white" w="250px" p={4} h="100vh" position="fixed">
      <Text fontSize="2xl" mb={6} fontWeight="bold" color="white">
        Zakładki
      </Text>
      <VStack align="start" gap={5} w="100%">
        {menuItems.map((menuItem) => (
          <Box key={menuItem.label} w="100%">
            <Link href={menuItem.path} passHref>
              <Button
                w="100%"
                color="white"
                bg="red.700"
                _hover={{ bg: "red.800" }}
              >
                {menuItem.icon} {menuItem.label}
              </Button>
            </Link>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
