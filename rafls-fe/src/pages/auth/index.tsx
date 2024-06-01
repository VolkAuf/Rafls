import { useLocation, useNavigate } from "react-router";
import styles from "./styles.module.scss";
import { Logo } from "shared/ui/logo";
import { Box, Button, Typography } from "@mui/material";
import {
  ChangeEvent,
  FC,
  FormEvent,
  InputHTMLAttributes,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { setAppUser, useIsAuthenticated } from "entities/user/model";
import { useDispatch } from "react-redux";
import { Login, RegisterUser } from "entities/user/api";

export const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const formRef = useRef<HTMLFormElement | null>(null);
  const isLogin = location.pathname === "/login";

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box className={styles.page}>
      <Logo />
      <Box
        ref={formRef}
        component="form"
        borderRadius="24px"
        padding="25px 75px"
        gap="12px"
        display="flex"
        flexDirection="column"
        width="577px"
        alignItems="center"
        onSubmit={onSubmitHandler}
        sx={{ bgcolor: "#00000099" }}
      >
        <Typography variant="h5" color="white" sx={{ mb: "10px" }}>
          {isLogin ? "Войдите" : "Зарегистрируйтесь"} чтобы начать
        </Typography>
        {isLogin ? (
          <LoginContent formRef={formRef} />
        ) : (
          <RegisterContent formRef={formRef} />
        )}
      </Box>
      <Link to="/" className={styles.backHome}>
        Вернуться на сайт
      </Link>
    </Box>
  );
};

type LoginContentProps = {
  formRef: MutableRefObject<HTMLFormElement | null>;
};

const LoginContent: FC<LoginContentProps> = ({ formRef }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState({ login: "", password: "" });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFields((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onClickHandler = () => {
    if (!formRef?.current?.checkValidity()) return;

    Login({ ...fields })
      .then(({ data }) => setAppUser({ ...data, dispatch }))
      .catch((error) => console.error(error.message));
  };

  return (
    <>
      <Input
        name="login"
        value={fields.login}
        onChange={onChangeHandler}
        fullWidth
        type="email"
        required
        placeholder="Пожалуйста введите электронную почту"
      />
      <Input
        name="password"
        value={fields.password}
        onChange={onChangeHandler}
        fullWidth
        type="password"
        required
        placeholder="Пароль"
      />
      <Button
        sx={{ borderRadius: "60px", p: "10px 34px", mt: "25px" }}
        color="warning"
        type="submit"
        variant="contained"
        onClick={onClickHandler}
      >
        Войти
      </Button>
      <div>
        <Typography variant="caption" color="gray">
          У вас нет учетной записи?{" "}
        </Typography>
        <Link className={styles.link} to="/register">
          <Typography variant="caption" color="rgb(237, 108, 2)">
            Создать аккаунт
          </Typography>
        </Link>
      </div>
    </>
  );
};

const RegisterContent: FC<LoginContentProps> = ({ formRef }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFields((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onClickHandler = () => {
    if (!formRef?.current?.checkValidity()) return;

    RegisterUser({
      username: fields.name,
      login: fields.email,
      password: fields.password,
    })
      .then(({ data }) => setAppUser({ ...data, dispatch }))
      .catch((error) => console.error(error.message));
  };

  return (
    <>
      <Input
        name="name"
        value={fields.name}
        onChange={onChangeHandler}
        fullWidth
        type="text"
        required
        minLength={2}
        maxLength={100}
        placeholder="Ваше имя"
      />
      <Input
        name="email"
        value={fields.email}
        onChange={onChangeHandler}
        fullWidth
        type="email"
        required
        maxLength={100}
        placeholder="Электронная почта"
      />
      <Input
        name="password"
        value={fields.password}
        onChange={onChangeHandler}
        fullWidth
        required
        minLength={6}
        maxLength={64}
        placeholder="Пароль"
      />
      <Input
        name="confirmPassword"
        value={fields.confirmPassword}
        onChange={onChangeHandler}
        fullWidth
        required
        minLength={6}
        maxLength={64}
        placeholder="Повторите пароль"
      />
      <Button
        sx={{ borderRadius: "60px", p: "10px 34px", mt: "25px" }}
        color="warning"
        variant="contained"
        type="submit"
        onClick={onClickHandler}
      >
        Регистрация
      </Button>
      <div>
        <Typography variant="caption" color="gray">
          Уже зарегистрированы?{" "}
        </Typography>
        <Link className={styles.link} to="/login">
          <Typography variant="caption" color="rgb(237, 108, 2)">
            Войти
          </Typography>
        </Link>
      </div>
    </>
  );
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean
}

const Input: FC<InputProps> = ({fullWidth, ...rest}) => {
  return (
    <div style={{width: fullWidth ? '100%' : 'auto'}} className={styles.input}>
      <input style={{width: '100%'}} {...rest} />
    </div>
  )
}