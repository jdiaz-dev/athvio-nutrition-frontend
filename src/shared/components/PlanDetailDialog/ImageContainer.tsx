import React, { useContext, useRef } from 'react';
import { CardMedia, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Box } from '@mui/system';
import EnablerEditionWrapper from 'src/shared/components/wrappers/EnablerEditionWrapper/EnablerEditionWrapper';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { EnableEditionContext } from 'src/shared/components/wrappers/EnablerEditionWrapper/EnableEditionContext';
import { MealImageSources, Modules } from 'src/shared/Consts';
import { useMealImageSlicers } from 'src/shared/hooks/useMealBasicInfoSlicers';

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

const ImageContainer = ({ image }: { image: string | File | null }) => {
  const dispatch = useDispatch();
  const currentModuleContext = useContext(CurrentModuleContext);
  const enableEditionContext = useContext(EnableEditionContext);
  const { setImage } = useMealImageSlicers(currentModuleContext.currentModule);

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
        image={image instanceof File ? URL.createObjectURL(image) : image ?? '/public/bowl.jpg'}
        alt="Meal image"
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <EnablerEditionWrapper
        enableEdition={
          (currentModuleContext.currentModule === Modules.NUTRITIONAL_MEALS && enableEditionContext.enableEdition) ||
          currentModuleContext.currentModule === Modules.CLIENT_PLANS ||
          currentModuleContext.currentModule === Modules.PROGRAMS
        }
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
              reader.onloadend = () => {
                dispatch(setImage({ image: file, imageSource: MealImageSources.UPLOADED }));
              };
            }}
          />
        </Box>
      </EnablerEditionWrapper>
    </Box>
  );
};

export default ImageContainer;
