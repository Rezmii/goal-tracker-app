"use client";

import { useState, useEffect } from "react";
import { Container, Spinner, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import OgolneGoalCard from "@/components/OgolneGoal/OgolneGoalCard";
import ThreeLevelGoalCard from "@/components/ThreeLevelGoal/ThreeLevelGoalCard";
import TimeGoalCard from "@/components/TimeGoal/TimeGoalCard";
import WaznyCelCzasowyWidget from "@/components/Wszystkie/WaznyCelCzasowyWidget";

const WszystkiePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/wszystkie");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Błąd pobierania danych dla dashboardu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((currentItems) => {
      const oldIndex = currentItems.findIndex((item) => item.id === active.id);
      const newIndex = currentItems.findIndex((item) => item.id === over.id);
      return arrayMove(currentItems, oldIndex, newIndex);
    });
    // W przyszłości tutaj będzie logika zapisu nowej kolejności do bazy
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" h="80vh">
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  return (
    <Container maxW="container.xl" p={0}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((item) => item.id)}>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
            {items.map((item) => {
              switch (item.type) {
                case "czasowe_karta":
                  return (
                    <TimeGoalCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      goals={item.goals}
                      isDraggableCard={true}
                    />
                  );
                case "ogolne_karta":
                  return (
                    <OgolneGoalCard
                      key={item.id}
                      id={item.id}
                      category={item.category}
                      goals={item.goals}
                    />
                  );
                case "trzyPoziomowe_karta":
                  return <ThreeLevelGoalCard key={item.id} goal={item.goal} />;
                case "czasowy_cel":
                  return <WaznyCelCzasowyWidget key={item.id} goal={item} />;
                default:
                  return null;
              }
            })}
          </SimpleGrid>
        </SortableContext>
      </DndContext>

      {items.length === 0 && (
        <Text color="gray.500" fontStyle="italic" textAlign="center">
          Brak ważnych elementów do wyświetlenia. Oznacz gwiazdką cele lub
          kategorie, aby pojawiły się tutaj.
        </Text>
      )}
    </Container>
  );
};

export default WszystkiePage;
