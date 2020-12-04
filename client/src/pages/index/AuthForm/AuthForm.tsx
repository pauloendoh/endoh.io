import {
  Box,
  Button,
  CircularProgress,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import MyTextField from "components/shared/MyInputs/MyTextField";
import { AuthUserGetDto } from "dtos/AuthUserGetDto";
import { Form, Formik } from "formik";
import React, { MouseEvent, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as AuthActions from "store/auth/authActions";
import { ApplicationState } from "store/store";
import myAxios from "../../../utils/myAxios";
import MyAxiosError, { MyFieldError } from "../../../utils/MyAxiosError";

const AuthForm = (props: Props) => {
  const classes = useStyles();

  const [signupIsSelected, setSignupIsSelected] = useState(false);
  const [responseErrors, setResponseErrors] = useState([] as MyFieldError[]);

  return (
    <Box display="flex">
      <Paper className={classes.paper}>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            password2: "",
          }}
          // PE 2/3 jogar pra fora
          onSubmit={(values, { setSubmitting }) => {
            if (signupIsSelected && values.password !== values.password2) {
              setResponseErrors([
                { field: "password", message: "Passwords don't match" },
              ]);
              setSubmitting(false);
              return;
            }

            const authData = {
              username: values.username,
              email: values.email,
              password: values.password,
            };

            const endpoint = signupIsSelected
              ? "/auth/register"
              : "/auth/login";

            setResponseErrors([]);

            myAxios
              .post<AuthUserGetDto>(endpoint, authData)
              .then((res) => {
                const authUser = res.data;
                props.setAuthUser(authUser);

                // props.UPDATE_AUTH_USER(res.data);
              })
              .catch((err: MyAxiosError) => {
                setResponseErrors(err.response.data.errors);
              })
         
          }}
        >
          {({ isSubmitting, handleChange, errors }) => (
            <Form className="d-flex flex-column">
              <Box>
                <MyTextField
                  id="email"
                  name="email"
                  className="mt-3"
                  type={signupIsSelected ? "email" : "text"}
                  onChange={handleChange}
                  label={signupIsSelected ? "Email" : "Email or username"}
                  fullWidth
                  required
                  InputLabelProps={{ required: false }}
                  autoFocus
                />
              </Box>

              {signupIsSelected ? (
                <Box mt={1}>
                  <MyTextField
                    id="username"
                    name="username"
                    onChange={handleChange}
                    label="Username"
                    fullWidth
                    required
                    InputLabelProps={{ required: false }}
                  />
                </Box>
              ) : null}

              <Box mt={1}>
                <MyTextField
                  id="password"
                  type="password"
                  onChange={handleChange}
                  size="small"
                  label="Password"
                  className="mt-3"
                  fullWidth
                  required
                  InputLabelProps={{ required: false }}
                />
              </Box>

              {signupIsSelected ? (
                <Box mt={1}>
                  <MyTextField
                    id="password2"
                    name="password2"
                    type="password"
                    onChange={handleChange}
                    label="Confirm password"
                    className="mt-3"
                    fullWidth
                    required
                    InputLabelProps={{ required: false }}
                  />
                </Box>
              ) : null}

              <Box mt={2}>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  style={{ textTransform: "none", fontSize: 16 }}
                  fullWidth
                >
                  {signupIsSelected ? "SIGN UP" : "SIGN IN"}
                  {isSubmitting && (
                    <CircularProgress size={20} className="ml-3" />
                  )}
                </Button>
              </Box>

              {responseErrors.map((err, i) => (
                <Box key={i} mt={1}>
                  <Typography color="error">{err.message}</Typography>
                </Box>
              ))}
            </Form>
          )}
        </Formik>

        <Box mt={3}>
          {signupIsSelected ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box mr={1}> Already have an account?</Box>
              <Link
                href="#"
                onClick={(e: MouseEvent) => {
                  e.preventDefault();
                  setResponseErrors([]);
                  setSignupIsSelected(false);
                }}
              >
                Sign in
              </Link>
            </Box>
          ) : (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box mr={1}>Don't have an account?</Box>
              <Link
                href="#"
                onClick={(e: MouseEvent) => {
                  e.preventDefault();
                  setResponseErrors([]);
                  setSignupIsSelected(true);
                }}
              >
                Sign up
              </Link>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

type Props = ReturnType<typeof mapDispatchToProps>;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "2rem",
    width: 400,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuthUser: (authUser: AuthUserGetDto) =>
    dispatch(AuthActions.setAuthUser(authUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
