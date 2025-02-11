import { Provider } from "@/components/ui/provider";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <Flex h="100vh">
            <Sidebar />
            <Box flex="1" display="flex" flexDirection="column">
              <Topbar />
              <Box flex="1" bg="gray.700" color="white" ml="250px">
                {children}
              </Box>
            </Box>
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
