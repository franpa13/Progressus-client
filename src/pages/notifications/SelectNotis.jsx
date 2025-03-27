import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const SelectNotis = ({
    value,
    onChange,
    label = "Seleccione",
    options = [],
    fullWidth = true,
    sx = {},
    variant,
    fontWeight = "normal",
    ...props
  }) => {
    return (
      <Box sx={{ minWidth: 120, ...sx }}>
        <FormControl variant={variant} size="small" fullWidth={fullWidth}>
          <InputLabel id={`${label}-label`}>{label}</InputLabel>
          <Select
            labelId={`${label}-label`}
            id={`${label}-select`}
            value={value}
            label={label}
            onChange={onChange}
            {...props}
          >
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ fontWeight: fontWeight }}
                title={option.label} 
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };