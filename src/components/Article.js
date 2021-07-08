import { Grid, Card } from "@material-ui/core";
import Moment from 'react-moment';
import axios from 'axios';

const Article = ({ article }) => {
    const onCardClick = () => {
        axios.post('http://localhost:8080/logOpen',
        {
            url: article.url,
            title: article.title,
            source: article.source.name,
        });
        window.open(article.url, '_blank');
    }

    return (
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Card variant="outlined" onClick={onCardClick}>
                <div className="published">
                    {`${article.source.name} - `}
                    <Moment format="YYYY-MM-DD HH:MM">{article.publishedAt}</Moment>
                </div>
                <div className="image">
                    <img src={article.image} alt=""/>
                </div>
                <p>{article.title}</p>
                <div className="description">{article.description}</div>
            </Card>
        </Grid>
    );
};

export default Article;