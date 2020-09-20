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
      </Styled.ColorTile>
      {pickerOpen && (
        <Styled.ColorPicker
          color={color}
          onChange={({ hex }) => {
            onColorChange(hex);
            setPickerOpen(prev => !prev);
          }}
        />
      )}
    </>
  );
};

export default ColorPickerTile;
