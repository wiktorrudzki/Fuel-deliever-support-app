import { Button } from '@mui/material';

type Props = React.ComponentProps<typeof Button> & { text: string };

const PrimaryButton = ({ text, ...passThroughProps }: Props) => {
  return (
    <Button
      size="large"
      variant="contained"
      style={{ borderRadius: 10, marginTop: 30, height: 50 }}
      {...passThroughProps}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
