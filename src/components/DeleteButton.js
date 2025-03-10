"use client";

import React, { useState } from "react";
import { Button, Dialog } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useGoals } from "@/context/GoalsContext";

const DeleteButton = ({ goal_id, confirm = false }) => {
  const { deleteGoal, archiveGoal } = useGoals();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteGoal(goal_id);
    setIsDeleting(false);
    setIsOpen(false);
  };

  const handleArchive = async () => {
    setIsDeleting(true);
    await archiveGoal(goal_id);
    setIsDeleting(false);
    setIsOpen(false);
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Zapobiega dragowaniu
    if (confirm) {
      setIsOpen(true); // Otwiera dialog, jeśli confirm === true
    } else {
      deleteGoal(goal_id); // Usuwa od razu, jeśli nie potrzeba potwierdzenia
    }
  };

  return (
    <>
      {/* 🔴 Przycisk usuwania */}
      <Button
        size="xs"
        colorScheme="red"
        variant="ghost"
        onClick={handleClick}
        data-dndkit-no-drag
        _hover={{ bg: "red.800", color: "white" }}
        isLoading={isDeleting}
      >
        <FaTrash />
      </Button>

      {/* 🔴 Dialog potwierdzający */}
      <Dialog.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement={"center"}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="gray.900" color="white">
            <Dialog.Header>
              <Dialog.Title>Usuń cel lub dodaj go do archiwum</Dialog.Title>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  colorPalette="gray"
                  color={"white"}
                  _hover={{ color: "black" }}
                >
                  Anuluj
                </Button>
              </Dialog.CloseTrigger>
              <Button
                size="sm"
                colorPalette={"white"}
                onClick={handleArchive}
                ml={3}
                isLoading={isDeleting}
                variant={"surface"}
              >
                Dodaj do archiwum
              </Button>
              <Button
                size="sm"
                colorPalette={"red"}
                onClick={handleDelete}
                ml={3}
                isLoading={isDeleting}
              >
                Usuń
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default DeleteButton;
