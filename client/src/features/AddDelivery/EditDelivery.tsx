import { useEffect, useRef, useState } from 'react';

import { Button, Grid } from '@mui/material';
import { Formik } from 'formik';

import DeliveryTable from '@/components/DeliveryTable/DeliveryTable';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { createDelivery } from '@/dao/delivery';
import { getAllDrivers } from '@/dao/driver';
import { getPredictionById } from '@/dao/prediction';
import { formatDateTimeLocal } from '@/helpers';
import { usePromise } from '@/hooks';
import { DeliveryCreate } from '@/types/delivery';
import { Driver } from '@/types/driver';
import { Prediction, PredictionCreate } from '@/types/prediction';
import { Station } from '@/types/station';

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
  station: Station;
};

const EditDelivery = ({ station }: Props) => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const [editMode, setEditMode] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<any>(null);

  const [get, isLoadingGet] = usePromise(getPredictionById, ({ data }) =>
    setPrediction(data)
  );
  const [create, isLoadingCreate] = usePromise(createDelivery, ({ data }) =>
    console.log(data, 'xd')
  );

  const [getDrivers, isLoadingDrivers] = usePromise(
    getAllDrivers,
    ({ data }) => setDrivers(data),
    (e) => console.error(e)
  );

  useEffect(() => {
    get(station.id);
    getDrivers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values: PredictionCreate) => {
    console.log({ ...values, stationId: station.id });
    if (
      values.departureTime &&
      values.diesel &&
      values.driverId &&
      values.pb95 &&
      values.pb98 &&
      values.turboDiesel
    )
      create({ ...values, stationId: station.id } as DeliveryCreate);
  };

  console.log(prediction);

  return (
    <Grid item xs={12} md={8}>
      <LoadingOverlay isLoading={isLoadingGet || isLoadingDrivers}>
        {drivers.length ? (
          <Formik
            innerRef={formRef}
            initialValues={{
              departureTime: prediction?.departureTime
                ? formatDateTimeLocal(prediction.departureTime)
                : undefined,
              pb95: prediction?.pb95,
              pb98: prediction?.pb98,
              diesel: prediction?.diesel,
              turboDiesel: prediction?.turboDiesel,
              driverId: drivers[0].id,
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
                    isLoadingDrivers={isLoadingDrivers}
                    drivers={drivers}
                    disabled={isLoadingCreate || isLoadingGet || !editMode}
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
        ) : (
          <div>Brak dostępnych kierowców</div>
        )}
      </LoadingOverlay>
    </Grid>
  );
};

export default EditDelivery;
