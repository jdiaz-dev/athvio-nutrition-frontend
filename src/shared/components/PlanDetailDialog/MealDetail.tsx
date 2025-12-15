/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Card, Grid, Menu, MenuItem, Tooltip } from '@mui/material';
import IconButton from 'src/shared/components/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
// import ImageIcon from '@mui/icons-material/Image';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import MealBuilder from 'src/shared/components/MealBuilder/MealBuilder';
import { makeStyles } from 'tss-react/mui';

import MealName from 'src/shared/components/PlanDetailDialog/MealName';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { MealWithStatus } from 'src/shared/components/PlanDetailDialog/MealList';
import { useMealBasicInfoSlicers } from 'src/shared/hooks/useMealBasicInfoSlicers';
import { useMealBuilderSlicers } from 'src/shared/hooks/useMealBuilderSlicers';
import { useMealListSlicers } from 'src/shared/hooks/useMealListSlicers';
import ImportMealDialog from 'src/shared/components/ImportMealDialog/ImportMealDialog';
import { useMealsStates } from 'src/shared/components/PlanDetailDialog/useMealsStates';
import MealTagSelector from 'src/shared/components/PlanDetailDialog/MealTagSelector';
import { useTranslation } from 'react-i18next';
import { generateTemporalId } from 'src/shared/helpers/functions';
import { Box } from '@mui/system';
import ImageContainer from 'src/shared/components/PlanDetailDialog/ImageContainer';

const cardStyles = makeStyles()(() => {
  return {
    card: {
      minWidth: 275,
      width: '70%',
      margin: '0px auto',
      marginBottom: '15px',
      padding: '0px',
    },
  };
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function MealDetail({ meal: { position, mealTag, name, image, ...mealDetails } }: { meal: MealWithStatus }) {
  const { t } = useTranslation();
  const { classes } = cardStyles();
  const currentModuleContext = useContext(CurrentModuleContext);
  const { mealBasicInfoState, mealDetailsState } = useMealsStates(currentModuleContext.currentModule);

  const dispatch = useDispatch();
  const { acceptNewMealBasicInfo } = useMealBasicInfoSlicers(currentModuleContext.currentModule);
  const { acceptNewMealDetail } = useMealBuilderSlicers(currentModuleContext.currentModule);
  const { updateMeal, deleteMeal, addMeal } = useMealListSlicers(currentModuleContext.currentModule);

  const [mealContainerTouched, setMealContainerTouched] = useState(false);
  const [mealDeteted, setMealDeleted] = useState(false);
  const [openImportMealDialog, setOpenImportMealDialog] = useState(false);
  const [showMealImage, setShowMealImage] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAnchorOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLOrSVGElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };
  const handleAnchorClose = () => {
    setAnchorEl(null);
  };
  const componentClickedHandler = () => {
    dispatch(acceptNewMealBasicInfo({ position, mealTag, name, image }));
    dispatch(acceptNewMealDetail(mealDetails));
  };
  const updateMealHandler = async () => {
    const { uuid, ...restMealDetail } = mealDetailsState;
    if (
      mealDetailsState.ingredientDetails.length > 0 ||
      mealBasicInfoState.mealTag.length > 0 ||
      mealDetails.cookingInstructions.length > 0
    ) {
      dispatch(
        updateMeal({
          ...mealBasicInfoState,
          ...restMealDetail,
          uuid,
        }),
      );
    }
  };
  const deleteMealHandler = async () => {
    setAnchorEl(null);
    dispatch(deleteMeal(mealDetailsState.uuid));
    setMealDeleted(true);
    setMealContainerTouched(false);
  };
  const duplicateMealHandler = async () => {
    setAnchorEl(null);
    setMealContainerTouched(false);
    dispatch(addMeal({ ...mealBasicInfoState, ...mealDetailsState, uuid: generateTemporalId() }));
  };
  const insertImageHandler = () => {
    setShowMealImage(!showMealImage);
    setMealContainerTouched(true);
  };
  const componentTouchedHandler = () => {
    if (!mealContainerTouched) setMealContainerTouched(true);
  };
  const closeImportMealHandler = () => {
    setMealContainerTouched(true);
    setOpenImportMealDialog(false);
  };
  const untouchedComponetHandler = () => {
    if (mealContainerTouched && !mealDeteted) void updateMealHandler();
    setMealContainerTouched(false);
  };
  useEffect(() => {
    if (mealContainerTouched) {
      componentClickedHandler();
    }
    return () => {};
  }, [mealContainerTouched]);

  const _meal = () => (mealContainerTouched ? mealDetailsState : mealDetails);
  const _mealTag = () => (mealContainerTouched ? mealBasicInfoState.mealTag : mealTag);
  const _mealName = () => (mealContainerTouched ? mealBasicInfoState.name : name);
  const _mealImage = () => (mealContainerTouched ? mealBasicInfoState.image : image);
  return (
    <>
      <Card
        style={{ width: '100%', padding: '10px' }}
        sx={{ minWidth: 275 }}
        className={classes.card}
        variant="outlined"
        onClick={componentTouchedHandler}
        onMouseLeave={untouchedComponetHandler}
      >
        <Grid container spacing={1}>
          <Grid item xs={10} style={{ display: 'flex' }}>
            <MealTagSelector mealTag={_mealTag()} setMealContainerTouched={setMealContainerTouched} />
            <MealName name={_mealName()} mealContainerTouched={mealContainerTouched} />
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              height: '45px',
              width: '100%',
              paddingLeft: '3%',
            }}
          >
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Tooltip title="imagen" placement="top">
                <IconButton onClick={insertImageHandler}>
                  <InsertPhotoIcon style={{ cursor: 'pointer' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('toolTips.importMeal')} placement="top">
                <IconButton onClick={() => setOpenImportMealDialog(true)}>
                  <SystemUpdateAltIcon style={{ cursor: 'pointer' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('toolTips.options')} placement="top" onClick={handleAnchorOpen}>
                <IconButton>
                  <FontAwesomeIcon icon={faEllipsisV} size="xs" />
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleAnchorClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => deleteMealHandler()}>{t('mealBuilder.buttons.deleteMeal')}</MenuItem>
              <MenuItem onClick={() => duplicateMealHandler()}>{t('mealBuilder.buttons.duplicateMeal')}</MenuItem>
            </Menu>
          </Grid>
        </Grid>

        {!showMealImage ? <MealBuilder meal={_meal()} /> : <ImageContainer image={_mealImage()} />}
        <ImportMealDialog openImportMealDialog={openImportMealDialog} closeImportMealHandler={closeImportMealHandler} />
      </Card>
    </>
  );
}

export default MealDetail;
