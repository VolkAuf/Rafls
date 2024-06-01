import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./styles.module.scss";
import { CardList } from "features/cardList";
import { useNavigate } from "react-router-dom";
import bg from "./ui/assets/home-bg.png";
import { GetNewMovies, GetPopularSeries } from "entities/film/api";
import { useIsAuthenticated } from "../../entities/user/model.tsx";

export const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const { data: popularSeries } = GetPopularSeries();
  const { data: newMovies } = GetNewMovies();

  return (
    <>
      <div className={styles.slide}>
        <img className={styles.slide__bg} src={bg} alt="rafls-background" />
        <Typography variant="h3" color="white">
          Погрузись во <b>вселенную</b>
          <br />
          бесконечного контента и
          <br />
          удовольствия
        </Typography>
        <Button
          sx={{ borderRadius: "60px", p: "10px 34px" }}
          color="warning"
          variant="contained"
          onClick={() => navigate("/register")}
          disabled={isAuthenticated}
        >
          Начни бесплатно
        </Button>
      </div>
      <div className={styles.main}>
        <CardList data={newMovies} title="Новое кино" to="/films" />
        <CardList data={popularSeries} title="Популярные сериалы" to="/series" />
      </div>
    </>
  );
};
