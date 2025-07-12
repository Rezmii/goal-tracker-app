// src/components/DeleteButton.jsx

"use client";

import React, { useState } from "react";
import { Button, Dialog, VStack, Text } from "@chakra-ui/react";
import { FaTrash, FaArchive } from "react-icons/fa";

const DeleteButton = ({
  goal_id,
  onDelete,
  onArchive,
  confirm = false,
  enableArchive = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = async () => {
    setIsProcessing(true);
    if (onDelete) {
      await onDelete(goal_id);
    }
    setIsProcessing(false);
    setIsOpen(false);
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    if (onArchive) {
      await onArchive(goal_id);
    }
    setIsProcessing(false);
    setIsOpen(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (confirm) {
      setIsOpen(true);
    } else {
      handleDelete();
    }
  };

  return (
    <>
      <Button
        size="xs"
        variant="ghost"
        onClick={handleClick}
        data-dndkit-no-drag
        // ZMIANA: Subtelniejszy wygląd przycisku i lepszy hover
        color="gray.400"
        _hover={{ bg: "gray.500", color: "red.400" }}
        isLoading={isProcessing && !isOpen} // Pokaż spinner tylko przy natychmiastowym usuwaniu
      >
        <FaTrash />
      </Button>

      <Dialog.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement={"center"}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="gray.800"
            color="white"
            borderRadius="lg"
            maxW="sm"
          >
            <Dialog.Header>
              <Dialog.Title>Potwierdzenie</Dialog.Title>
            </Dialog.Header>
            {/* ZMIANA: Dodatkowe informacje dla użytkownika */}
            <Dialog.Body>
              {enableArchive ? (
                <Text color="gray.300">
                  Możesz trwale usunąć ten cel lub przenieść go do archiwum, aby
                  zachować go w historii.
                </Text>
              ) : (
                <Text color="gray.300">
                  Czy na pewno chcesz usunąć tą kategorię?
                </Text>
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Anuluj
              </Button>
              {enableArchive && (
                <Button
                  variant="outline"
                  leftIcon={<FaArchive />}
                  onClick={handleArchive}
                  ml={3}
                  isLoading={isProcessing}
                  _hover={{ bg: "whiteAlpha.200" }}
                >
                  Archiwizuj
                </Button>
              )}

              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={isProcessing}
              >
                Usuń trwale
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default DeleteButton;
