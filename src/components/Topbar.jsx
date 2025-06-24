// src/components/Topbar.jsx

"use client";

// ZMIANA: Dodajemy Button do importu
import { Flex, Text, HStack, IconButton, Icon, Button } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaThList,
  FaClock,
  FaLayerGroup,
  FaClipboardList,
  FaArchive,
} from "react-icons/fa";

const menuItems = [
  { label: "Wszystkie", icon: FaThList, path: "/wszystkie" },
  { label: "Cele Czasowe", icon: FaClock, path: "/czasowe" },
  { label: "Cele 3-poziomowe", icon: FaLayerGroup, path: "/trzy-poziomy" },
  { label: "Ogólne", icon: FaClipboardList, path: "/ogolne" },
  { label: "Archiwum", icon: FaArchive, path: "/archiwum" },
];

const Topbar = () => {
  const pathname = usePathname();
  const currentPage = menuItems.find((item) => item.path === pathname);
  const title = currentPage ? currentPage.label : "GoalTracker";

  return (
    <Flex
      bg="gray.900"
      color="white"
      align="center"
      justify="space-between"
      p={4}
      h="60px"
      w={{ base: "100%", lg: "calc(100% - 250px)" }}
      ml={{ base: 0, lg: "250px" }}
      borderBottom="1px solid"
      borderColor="gray.700"
      position="fixed"
      top="0"
      zIndex="sticky"
    >
      <Text
        fontSize="xl"
        fontWeight="bold"
        display={{ base: "none", lg: "block" }}
      >
        {title}
      </Text>

      <Text
        fontSize="xl"
        fontWeight="bold"
        display={{ base: "block", lg: "none" }}
      >
        GoalTracker
      </Text>

      <HStack spacing={1} display={{ base: "flex", lg: "none" }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link href={item.path} key={item.label}>
              <Button
                as="a"
                aria-label={item.label}
                variant="ghost"
                color={isActive ? "red.400" : "gray.400"}
                _hover={{ bg: "gray.700", color: "white" }}
                p={2}
              >
                <Icon as={item.icon} boxSize={5} />
              </Button>
            </Link>
          );
        })}
      </HStack>
    </Flex>
  );
};

export default Topbar;
