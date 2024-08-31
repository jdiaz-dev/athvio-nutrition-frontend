import React, { useContext, useEffect } from 'react';
import { Button, Card } from '@mui/material';

import OtherQuestionaryDetailItem from 'src/modules/professionals/questionary-config/adapters/in/dialogs/OtherQuestionaryDetailItem';
import { QuestionaryDetail, QuestionaryGroup } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';
import MainCard from 'src/shared/components/MainCard/MainCard';
import { useDispatch } from 'react-redux';
import * as CustomQuestionaryConfigDetailsSlice from 'src/modules/professionals/questionary-config/adapters/in/slicers/CustomQuestionaryConfigDetailsSlice';
import { useQuestionaryConfig } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfigActions';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

const temporalId = 'temporalId';
function OtherQuestionaryDetailsManager({
  questionary,
  questionaryGroup,
  questionaryDetails,
}: {
  questionary: string;
  questionaryGroup: QuestionaryGroup;
  questionaryDetails: QuestionaryDetail[];
}) {
  const dispatch = useDispatch();
  const { otherQuestionaryDetailsCRUD } = useQuestionaryConfig();
  const authContext = useContext(AuthContext);

  const otherQuestionaryDetails = CustomQuestionaryConfigDetailsSlice.useSelectAllEntities();

  useEffect(() => {
    dispatch(CustomQuestionaryConfigDetailsSlice.initializeOtherQuestionaryDetails([...questionaryDetails]));
  }, [questionaryDetails]);

  const addOtherQuestionaryDetailHandler = () => {
    const improvisedRamdon = Math.random() * 1000 * Math.random() * 1000;

    const newQuestionaryDetail = {
      _id: temporalId + improvisedRamdon,
      associatedQuestion: '¿Cuál es la pregunta?',
      fieldName: 'Nombre de para este campo',
      isEnabled: true,
      status: '',
    };
    dispatch(CustomQuestionaryConfigDetailsSlice.addOther(newQuestionaryDetail));
  };

  const otherQuestionaryDetailsHandler = async () => {
    const baseData = {
      professional: authContext.professional,
      questionary,
      questionaryGroup: questionaryGroup._id,
    };

    const toAdd = otherQuestionaryDetails
      .filter(
        (item) => item._id.includes(temporalId) && item.status !== CustomQuestionaryConfigDetailsSlice.CustomQuestionaryDetailState.DELETED,
      )
      .map(({ _id, status, ...rest }) => ({ ...rest }));

    const toUpdate = otherQuestionaryDetails
      .filter(
        (item) =>
          !item._id.includes(temporalId) && item.status === CustomQuestionaryConfigDetailsSlice.CustomQuestionaryDetailState.UPDATED,
      )
      .map(({ _id, status, ...rest }) => ({ ...rest, questionaryDetail: _id }));

    const toDelete = otherQuestionaryDetails
      .filter(
        (item) =>
          !item._id.includes(temporalId) && item.status === CustomQuestionaryConfigDetailsSlice.CustomQuestionaryDetailState.DELETED,
      )
      .map(({ _id }) => _id);

    await otherQuestionaryDetailsCRUD({
      toAdd: {
        ...baseData,
        questionaryDetailsInput: toAdd,
      },
      toUpdate: {
        ...baseData,
        questionaryDetailsInput: toUpdate,
      },
      toDelete: {
        ...baseData,
        questionaryDetails: toDelete,
      },
      shouldToAdd: toAdd.length >= 1 ? true : false,
      shouldToUpdate: toUpdate.length >= 1 ? true : false,
      shouldToDelete: toDelete.length >= 1 ? true : false,
    });
  };

  return (
    <>
      <MainCard>
        {otherQuestionaryDetails
          .filter((item) => item.status !== CustomQuestionaryConfigDetailsSlice.CustomQuestionaryDetailState.DELETED)
          .map((questionaryDetail, index) => (
            <OtherQuestionaryDetailItem key={index} questionaryDetail={questionaryDetail} />
          ))}
        <Button variant="contained" onClick={addOtherQuestionaryDetailHandler}>
          Add question
        </Button>
        <Card variant="outlined">
          <Button variant="contained" onClick={otherQuestionaryDetailsHandler}>
            Save
          </Button>
        </Card>
      </MainCard>
    </>
  );
}

export default OtherQuestionaryDetailsManager;
