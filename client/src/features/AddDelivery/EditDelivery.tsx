import { useEffect, useRef, useState } from 'react';

import { Button, Grid } from '@mui/material';
import { Formik } from 'formik';

import DeliveryTable from '@/components/DeliveryTable/DeliveryTable';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { getPredictionById } from '@/dao/prediction';
import { usePromise } from '@/hooks';
import { Prediction, PredictionCreate } from '@/types/prediction';

const buttonStyles = {
  margin: '10px',
  color: 'black',
  border: '1px solid #B3B3B3',
  padding: '10px 20px',
  fontSize: '20px',
  textTransform: 'none',
  width: '100%',
  height: '40px',
  borderRadius: '5px',
  '&:hover': {
    backgroundColor: 'black',
    color: 'white',
  },
};

type Props = {
  id: number;
};

const EditDelivery = ({ id }: Props) => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [editMode, setEditMode] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<any>(null);

  const [get, isLoading] = usePromise(getPredictionById, ({ data }) =>
    setPrediction(data)
  );

  useEffect(() => {
    get(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: PredictionCreate) => {
    // TODO - złączyć do ze stacją, która przyjdzie z propsów i utworzyć delivery, później zrefaktoryzować ten komponent i komponent z inputami
    console.log(e);
  };

  return (
    <Grid item xs={12} md={8}>
      <LoadingOverlay isLoading={isLoading}>
        <Formik
          innerRef={formRef}
          initialValues={{
            departureTime: prediction?.departureTime,
            pb95: prediction?.pb95,
            pb98: prediction?.pb98,
            diesel: prediction?.diesel,
            turboDiesel: prediction?.turboDiesel,
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleSubmit, handleChange, handleReset }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid
                item
                xs={12}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <DeliveryTable
                  values={values}
                  disabled={isLoading || !editMode}
                  prediction={prediction}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid
                container
                spacing={2}
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'space-between' },
                }}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Button
                    onClick={() => {
                      if (editMode) {
                        handleReset();
                        setEditMode(false);
                      } else {
                        setEditMode(true);
                      }
                    }}
                    sx={buttonStyles}
                  >
                    {editMode ? 'Anuluj edycję' : 'Edytuj dostawę'}
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Button
                    disabled={!editMode}
                    sx={{
                      ...buttonStyles,
                      backgroundColor: '#2665D2',
                      color: 'white',
                    }}
                    type="submit"
                  >
                    Zatwierdź
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </LoadingOverlay>
    </Grid>
  );
};

export default EditDelivery;
