// src/components/CopyToClipboardButton.jsx

"use client";

// ZMIANA: Importujemy komponent Clipboard zamiast hooka
import { Button, Clipboard } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { FaCopy } from "react-icons/fa";

const CopyToClipboardButton = ({ dataToCopy }) => {
  const handleCopy = () => {
    toaster.create({
      title: "Skopiowano do schowka!",
      description: "Twoje cele są teraz w schowku w formacie JSON.",
      type: "info",
    });
  };

  return (
    <Clipboard.Root
      value={JSON.stringify(dataToCopy, null, 2)}
      onStatusChange={(details) => details.copied && handleCopy()}
    >
      <Clipboard.Trigger asChild>
        <Button
          position="fixed"
          bottom="2rem"
          right="2rem"
          bg="gray.700"
          color="gray.400"
          _hover={{ bg: "gray.500", color: "red.400" }}
          borderRadius="full"
          boxShadow="lg"
          aria-label="Kopiuj cele do schowka"
        >
          <FaCopy />
        </Button>
      </Clipboard.Trigger>
    </Clipboard.Root>
  );
};

export default CopyToClipboardButton;
