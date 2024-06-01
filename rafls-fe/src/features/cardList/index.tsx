import { FC } from "react";
import Typography from "@mui/material/Typography";
import styles from "./styles.module.scss";
import { Card } from "shared/ui/card";
import { MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";

type CardListProps = {
  title?: string;
  to?: string;
  data?: MovieDtoV13[];
};

export const CardList: FC<CardListProps> = ({title, data}) => {
  return (
    <div className={styles.cardList}>
      {title ?
        <div className={styles.cardList__title}>
          <Typography variant="h3" sx={{ fontSize: 32, lineHeight: "36px", fontWeight: 400, color: "#FFFFFF" }}>
            {title}
          </Typography>
        </div>
        : null}
      <div className={styles.list}>
        {data?.map((item) => (<Card key={item.id} {...item}/>))}
      </div>
    </div>
  )
}