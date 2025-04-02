import React, { useContext, useRef } from 'react';
import { CardMedia, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';

import * as NutritionalMealBasicInfoSlice from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealBasicInfo';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Box } from '@mui/system';
import EnablerEditionWrapper from 'src/shared/components/wrappers/EnablerEditionWrapper/EnablerEditionWrapper';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { EnableEditionContext } from 'src/shared/components/wrappers/EnablerEditionWrapper/EnableEditionContext';
import { Modules } from 'src/shared/Consts';

const ImageUploadButton = ({ onImageUpload }: { onImageUpload: (file: File) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <>
      <input type="file" accept="image/*" style={{ display: 'none' }} ref={inputRef} onChange={handleFileChange} />
      <IconButton onClick={handleClick} sx={{ backgroundColor: 'white', borderRadius: '50%' }}>
        <PhotoCameraIcon sx={{ color: '#00796b' }} />
      </IconButton>
    </>
  );
};

const ImageContainer = ({ image, setNewImage }: { image: string | null; setNewImage: (file: File) => void }) => {
  const dispatch = useDispatch();
  const currentModuleContext = useContext(CurrentModuleContext);
  const enableEditionContext = useContext(EnableEditionContext);

  return (
    <Box
      sx={{
        'position': 'relative',
        'width': '100%',
        'height': '300px',
        'overflow': 'hidden',
        'borderRadius': '8px',
        '&:hover .meal-image': {
          opacity: enableEditionContext.enableEdition ? 0.4 : 1,
        },
        '&:hover .hover-icon': {
          opacity: 1,
        },
      }}
    >
      <CardMedia
        component="img"
        className="meal-image"
        image={image ?? '/public/bowl.jpg'}
        alt="Meal image"
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <EnablerEditionWrapper
        enableEdition={currentModuleContext.currentModule === Modules.NUTRITIONAL_MEALS && enableEditionContext.enableEdition}
      >
        {' '}
        <Box
          className="hover-icon"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '6px',
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          <ImageUploadButton
            onImageUpload={(file) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (event: any) => {
                const image = event.target.result;
                dispatch(NutritionalMealBasicInfoSlice.setImage(image as string));
              };
              reader.onloadend = () => {
                setNewImage(file);
              };
            }}
          />
        </Box>
      </EnablerEditionWrapper>
    </Box>
  );
};

export default ImageContainer;
