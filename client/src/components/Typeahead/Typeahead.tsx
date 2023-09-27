import { useState, useEffect, FC, ChangeEvent } from "react";
import { NameResponse, TypeaheadProps } from "../../global/interfaces.ts";
import { useFetchNamesWithCache } from "../../hooks/useFetchNamesWithCache.ts";
import { Stack, TextField, List, ListItem, ListItemText, Chip, Box } from "@mui/material";

/**
 * Typeahead component provides a text input field with real-time search suggestions.
 *
 * @param onSelect - Callback function that gets executed upon selecting a suggestion.
 */
const Typeahead: FC<TypeaheadProps> = ({ selected, setSelected }) => {
  const [input, setInput] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const { suggestions, fetchData } = useFetchNamesWithCache(input);

  useEffect(() => {
    if (input.length >= 1) {
      fetchData();
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [input]);

  const handleSuggestionClick = (name: string): void => {
    if (!selected.includes(name)) {
      setSelected([...selected, name]);
    }
    setInput("");
  };

  return (
    <Stack flexDirection='column' width="100%" p={1} data-testid="typeahead">
      <Box sx={{overflowX: "auto", py:2, width: "80%"}}>
        <TextField
          label="Typeahead"
          value={input}
          variant="outlined"
          sx={{width: "fit"}}
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInput(e.target.value)}
          InputProps={{
            startAdornment: selected.map((name: string, index: number) => (
              <Chip key={index} label={name} style={{margin: "0 2px"}}/>
            )),
          }}
        />
      </Box>
      {showSuggestions && suggestions.length > 0 && (
        <List>
          {suggestions.slice(0,10).map((suggestion: NameResponse) => (
            <ListItem key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.name)}>
              <ListItemText primary={suggestion.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
};

export default Typeahead;
