import { Grid, OutlinedInput, Button } from "@material-ui/core";
import Article from "./Article";
import "../styles.scss"
import { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('https://gnews.io/api/v4/top-headlines?token=c5b16b07c5ad0b2e0c4eef840251d008&max=9&lang=en')
            .then((response) => {
                setArticles(response.data.articles)
            });
    }, []);

    return (
        <div>
            <div className="search">
                <OutlinedInput/>
                <Button variant="outlined">Search</Button>
            </div>
            <Grid container align="center">
                {articles.map(article =>
                    <Article key={article.url} title={article.title}/>
                )}
            </Grid>
        </div>
    );
};

export default List;