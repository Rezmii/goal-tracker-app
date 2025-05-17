"use client";

import { Text, Flex, Button } from "@chakra-ui/react";
import { useGoals } from "@/context/GoalsContext";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import SubtaskDeleteButton from "./SubtaskDeleteButton";

const Subtask = ({ subtask, goalId, index }) => {
  const { toggleSubtaskDone } = useGoals();

  return (
    <Flex align="center" gap={2}>
      <Button
        aria-label="Zaznacz jako ukończone"
        icon={subtask.done ? <FaRegCheckCircle /> : <FaRegCircle />}
        size="xs"
        colorPallete={subtask.done ? "green" : "gray"}
        color="white"
        variant="ghost"
        marginLeft="5"
        onClick={(e) => {
          toggleSubtaskDone(goalId, index, subtask.done);
        }}
        data-dndkit-no-drag
        _hover={{
          bg: "none",
          color: "gray",
        }}
      >
        {subtask.done ? <FaRegCheckCircle /> : <FaRegCircle />}
      </Button>
      <Text
        fontSize="sm"
        color="gray.200"
        textDecoration={subtask.done ? "line-through" : "none"}
      >
        {subtask.text}
      </Text>
      <SubtaskDeleteButton goalId={goalId} index={index} />
    </Flex>
  );
};

export default Subtask;
