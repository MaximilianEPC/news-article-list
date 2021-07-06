import { Grid, Card } from "@material-ui/core";

const Article = ({title}) => {
    return (
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Card variant="outlined">
                {title}
            </Card>
        </Grid>
    );
};

export default Article;