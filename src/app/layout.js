// src/app/layout.js

import { Provider } from "@/components/ui/provider";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { GoalsProvider } from "@/context/GoalsContext";
import { ArchiveGoalsProvider } from "@/context/ArchiveGoalsContext";
import { ThreeLevelGoalsProvider } from "@/context/ThreeLevelGoalsContext";

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
                    <Box flex="1" bg="gray.900" color="white" ml="250px" p={8}>
                      {children}
                    </Box>
                  </Box>
                </Flex>
              </ThreeLevelGoalsProvider>
            </ArchiveGoalsProvider>
          </GoalsProvider>
        </Provider>
      </body>
    </html>
  );
}
