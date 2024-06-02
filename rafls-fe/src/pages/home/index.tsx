import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./styles.module.scss";
import { CardList } from "features/cardList";
import { useNavigate } from "react-router-dom";
import bg from "./ui/assets/home-bg.png";
import { 
  GetNewMovies, 
  GetPopularSeries, 
  GetRecSysMoviesByIds, 
  GetRewatchMoviesByIds, 
  GetSameListItems 
} from "entities/film/api";
import { useIsAuthenticated } from "../../entities/user/model.tsx";
import { getUserLs } from "entities/user/user.ts";
import { GetReviewsByUserId } from "entities/review/api.ts";
import { GetRecommendations } from "entities/review/recommendationSystem.ts";
import { MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";
import { shuffle } from "pages/item/index.tsx";

export const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const { data: popularSeries } = GetPopularSeries();
  const { data: newMovies } = GetNewMovies();
  const userId = getUserLs()?.id;
  const { data: reviewbyUser } = GetReviewsByUserId(userId);
  const { data: sameList } = GetSameListItems();

  const idsRewatched: number[] = [];
  reviewbyUser?.forEach(element => { 
    if (element.movieId && element.criteria.generalRate > 6) 
      idsRewatched.push(Number(element.movieId));
  });
  const { data: rewatchedList } = GetRewatchMoviesByIds(idsRewatched);

  const recSysIds = GetRecommendations(userId);
  let recSysL: MovieDtoV13[] = [];
  const { data: recSysList } = GetRecSysMoviesByIds(recSysIds);
  if (recSysList && recSysList.length)
    recSysL = recSysList;
  shuffle(recSysL);

  return (
    <>
      <div className={styles.slide}>
        <img className={styles.slide__bg} src={bg} alt="rafls-background" />
        <Typography 
          sx={{ 
            zIndex: 1, 
            fontSize: '48px', 
            fontWeight: 700, 
            textAlign: 'left', // Выравнивание текста по левому краю
            alignSelf: 'flex-start' // Выравнивание текста по левому краю контейнера
          }} 
          variant="h3" 
          color="white"
        >
          Погрузись во <b>вселенную</b>
          <br />
          бесконечного контента и
          <br />
          удовольствия
        </Typography>
        <Button
          sx={{ 
            borderRadius: "60px", 
            padding: "10px 34px", 
            marginTop: "35px", 
            alignSelf: 'flex-start' // Выравнивание кнопки по левому краю контейнера
          }}
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
        {recSysIds && recSysIds.length && recSysL && recSysL.length ? <CardList data={recSysL} title={"Вам понравится"} /> : null}
        {idsRewatched && idsRewatched.length && rewatchedList && rewatchedList.length ? <CardList data={rewatchedList} title={"Ваши любимые"} /> : null}
        <CardList data={sameList} title={"Популярное"} />
      </div>
    </>
  );
};
