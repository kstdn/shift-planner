import React, { useState } from 'react';
import * as Styled from './styled';

type Props = {
  color: string;
  onColorChange: (color: string) => any;
};

const ColorPickerTile = ({ color, onColorChange }: Props) => {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <Styled.ColorTile>
        <Styled.Color
          color={color}
          onClick={() => setPickerOpen(prev => !prev)}
        />
        {pickerOpen && (
          <Styled.ColorPicker
            color={color}
            onChange={({ hex }) => {
              onColorChange(hex);
              setPickerOpen(prev => !prev);
            }}
          />
        )}
      </Styled.ColorTile>
    </>
  );
};

export default ColorPickerTile;
