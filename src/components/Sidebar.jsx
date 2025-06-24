// src/components/Sidebar.jsx

"use client";

import { Box, VStack, Text, Button, Icon } from "@chakra-ui/react";
import {
  FaThList,
  FaClock,
  FaLayerGroup,
  FaClipboardList,
  FaArchive,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Wszystkie", icon: FaThList, path: "/wszystkie" },
    { label: "Cele Czasowe", icon: FaClock, path: "/czasowe" },
    { label: "Cele 3-poziomowe", icon: FaLayerGroup, path: "/trzy-poziomy" },
    { label: "Ogólne", icon: FaClipboardList, path: "/ogolne" },
    { label: "Archiwum", icon: FaArchive, path: "/archiwum" },
  ];

  return (
    <Box
      bg="gray.900"
      color="white"
      w="250px"
      p={4}
      h="100vh"
      position="fixed"
      borderRight="1px solid"
      borderColor="gray.700"
      display={{ base: "none", lg: "block" }}
    >
      <Text
        fontSize="2xl"
        mb={8}
        fontWeight="bold"
        color="white"
        textAlign="center"
      >
        GoalTracker
      </Text>
      <VStack align="stretch" spacing={3}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link href={item.path} key={item.label} passHref>
              <Button
                as="a"
                w="100%"
                justifyContent="flex-start"
                p={6}
                variant="ghost"
                fontSize="md"
                bg={isActive ? "red.400" : "transparent"}
                color={isActive ? "white" : "gray.400"}
                _hover={{
                  bg: isActive ? "red.500" : "gray.800",
                  color: "white",
                }}
              >
                <Icon as={item.icon} mr={3} boxSize={5} />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Sidebar;
