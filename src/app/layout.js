// src/app/layout.js

import { Provider } from "@/components/ui/provider";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { GoalsProvider } from "@/context/GoalsContext";
import { ArchiveGoalsProvider } from "@/context/ArchiveGoalsContext";
import { ThreeLevelGoalsProvider } from "@/context/ThreeLevelGoalsContext";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <GoalsProvider>
            <ArchiveGoalsProvider>
              <ThreeLevelGoalsProvider>
                <Flex h="100vh">
                  <Sidebar />
                  <Box flex="1" display="flex" flexDirection="column">
                    <Topbar />

                    <Box
                      flex="1"
                      bg="gray.900"
                      color="white"
                      ml={{ base: 0, lg: "250px" }}
                      p={8}
                      mt="60px"
                    >
                      {children}
                    </Box>
                  </Box>
                </Flex>
                <Toaster />
              </ThreeLevelGoalsProvider>
            </ArchiveGoalsProvider>
          </GoalsProvider>
        </Provider>
      </body>
    </html>
  );
}
