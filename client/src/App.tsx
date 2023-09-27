import { useState } from "react";
import { Typeahead, UsaMap } from "./components";
import { Box, Button, Stack } from "@mui/material";

/**
 * App Component
 *
 * The main component of the application that renders the Typeahead for search suggestions
 * and the USA map displaying the selected suggestions.
 *
 * @see Typeahead
 * @see UsaMap
 */
const App = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Stack flexDirection='row'>
      <Box width="50%" height="100vh" borderRight={3}>
        <Button size="small" sx={{mt:2, color:"#000"}} onClick={() => setSelected([])} data-testid="clear-btn">
          Clear
        </Button>
        <Typeahead selected={selected} setSelected={setSelected} />
      </Box>
      <Box width="50%" textAlign='center' p={2}>
        <UsaMap name={selected} />
      </Box>
    </Stack>
  );
};

export default App;
