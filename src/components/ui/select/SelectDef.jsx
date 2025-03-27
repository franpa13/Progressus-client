import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const SelectDef = ({
  value,
  onChange,
  label = "Seleccione",
  options = [],
  fullWidth = true,
  sx = {},
  variant,
 
  fontWeight = "normal", // Agregar fontWeight como prop
  ...props
}) => {
  console.log(options , "op");
  
  return (
    <Box sx={{ minWidth: 120, ...sx }}>
      <FormControl
        variant={variant}
        size="small"
        fullWidth={fullWidth}
      >
        <InputLabel id={`${label}-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-label`}
          id={`${label}-select`}
          value={value}
          label={label}
          onChange={onChange}
          {...props}
        >
          {options.map((option, index) => (
            <MenuItem
              key={index}
              value={option}
              sx={{ fontWeight: fontWeight }} // Aplicar fontWeight
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
