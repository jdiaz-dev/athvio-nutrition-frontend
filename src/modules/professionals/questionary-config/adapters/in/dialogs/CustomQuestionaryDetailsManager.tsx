import React, { useContext, useEffect } from 'react';
import { Button, Card } from '@mui/material';

import CustomQuestionaryDetailItem from 'src/modules/professionals/questionary-config/adapters/in/dialogs/CustomQuestionaryDetailItem';
import { QuestionaryDetail, QuestionaryGroup } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';
import MainCard from 'src/shared/components/MainCard/MainCard';
import { useDispatch } from 'react-redux';
import * as CustomQuestionaryConfigDetailsSlice from 'src/modules/professionals/questionary-config/adapters/in/slicers/CustomQuestionaryConfigDetailsSlice';
import { useQuestionaryConfig } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfigActions';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { generateTemporalId } from 'src/shared/helpers/functions';
import { ReduxItemtatus, temporalId } from 'src/shared/Consts';

function CustomQuestionaryDetailsManager({
  questionary,
  questionaryGroup,
  questionaryDetails,
}: {
  questionary: string;
  questionaryGroup: QuestionaryGroup;
  questionaryDetails: QuestionaryDetail[];
}) {
  const dispatch = useDispatch();
  const { customQuestionaryDetailsCRUD } = useQuestionaryConfig();
  const authContext = useContext(AuthContext);

  const customQuestionaryDetailsState = CustomQuestionaryConfigDetailsSlice.useSelectAllEntities();

  useEffect(() => {
    dispatch(
      CustomQuestionaryConfigDetailsSlice.initializeCustomQuestionaryDetails([
        ...questionaryDetails.map((item) => ({ ...item, status: ReduxItemtatus.INITIALIZED })),
      ]),
    );
  }, [questionaryDetails]);

  const addCustomQuestionaryDetailHandler = () => {
    const newQuestionaryDetail = {
      _id: generateTemporalId(),
      associatedQuestion: '¿Cuál es la pregunta?',
      fieldName: 'Nombre de para este campo',
      isEnabled: true,
      status: ReduxItemtatus.INITIALIZED,
    };
    dispatch(CustomQuestionaryConfigDetailsSlice.addCustom(newQuestionaryDetail));
  };

  const customQuestionaryDetailsHandler = async () => {
    const baseData = {
      professional: authContext.professional,
      questionary,
      questionaryGroup: questionaryGroup._id,
    };

    const toAddInput = customQuestionaryDetailsState
      .filter(
        (item) => item._id.includes(temporalId) && item.status !== ReduxItemtatus.DELETED && item.status !== ReduxItemtatus.INITIALIZED,
      )
      .map(({ _id, status, ...rest }) => ({ ...rest }));

    const toUpdateInput = customQuestionaryDetailsState
      .filter((item) => !item._id.includes(temporalId) && item.status === ReduxItemtatus.UPDATED)
      .map(({ _id, status, ...rest }) => ({ ...rest, questionaryDetail: _id }));

    const toDeleteInput = customQuestionaryDetailsState
      .filter((item) => !item._id.includes(temporalId) && item.status === ReduxItemtatus.DELETED)
      .map(({ _id }) => _id);

    await customQuestionaryDetailsCRUD({
      toAddInput: {
        ...baseData,
        questionaryDetailsInput: toAddInput,
      },
      toUpdateInput: {
        ...baseData,
        questionaryDetailsInput: toUpdateInput,
      },
      toDeleteInput: {
        ...baseData,
        questionaryDetails: toDeleteInput,
      },
      shouldToAdd: toAddInput.length >= 1 ? true : false,
      shouldToUpdate: toUpdateInput.length >= 1 ? true : false,
      shouldToDelete: toDeleteInput.length >= 1 ? true : false,
    });
  };

  return (
    <>
      <MainCard>
        {customQuestionaryDetailsState
          .filter((item) => item.status !== ReduxItemtatus.DELETED)
          .map((questionaryDetail, index) => (
            <CustomQuestionaryDetailItem key={index} questionaryDetail={questionaryDetail} />
          ))}
        <Button variant="contained" onClick={addCustomQuestionaryDetailHandler}>
          Add question
        </Button>
        <Card variant="outlined">
          <Button variant="contained" onClick={customQuestionaryDetailsHandler}>
            Save
          </Button>
        </Card>
      </MainCard>
    </>
  );
}

export default CustomQuestionaryDetailsManager;
