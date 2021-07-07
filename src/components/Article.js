import { Grid, Card } from "@material-ui/core";
import Moment from 'react-moment';

const Article = ({ article }) => {
    return (
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Card variant="outlined" onClick={() => {window.open(article.url, '_blank')}}>
                <div className="published">
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