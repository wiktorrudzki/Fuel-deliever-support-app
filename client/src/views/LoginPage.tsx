import { useState } from 'react';

// material-ui
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { PrimaryButton } from '@/components/Button';
// project imports
import mainLogo from '@/icons/mainLogo.svg';

import './LoginPage.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .required('Email is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={() => {
        console.log('Zostałeś zalogowany');
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="login-container">
            <nav>
              <img src={mainLogo} alt="main_logo" className="main-logo" />
            </nav>
            <main>
              <div className="login-form">
                <div className="email-input">
                  <FormControl error={Boolean(touched.email && errors.email)}>
                    <TextField
                      id="email-login"
                      type="email"
                      label="Email"
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="email-input custom-input"
                      InputLabelProps={{
                        style: { color: '#B3B3B3' },
                      }}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="email-helper">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className="password-input">
                  <FormControl
                    error={Boolean(touched.password && errors.password)}
                    className="form-control-password"
                  >
                    <TextField
                      id="password-login"
                      type={showPassword ? 'text' : 'password'}
                      label="Hasło"
                      name="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="password-input custom-input"
                      InputLabelProps={{
                        style: { color: '#B3B3B3' },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                              className="icon-hide-password"
                            >
                              {showPassword ? (
                                <Visibility style={{ color: '#B3B3B3' }} />
                              ) : (
                                <VisibilityOff style={{ color: '#B3B3B3' }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {touched.password && errors.password && (
                      <FormHelperText error id="email-helper">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <PrimaryButton text="Zaloguj się" type="submit" />
              </div>
              <p className="forgot-text">Zapomniałeś(-aś) hasła?</p>
            </main>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginPage;
