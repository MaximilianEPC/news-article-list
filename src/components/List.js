import { Grid, FormHelperText, OutlinedInput, Button, Select, MenuItem } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Article from "./Article";
import { articleList } from './DemoData'; // Demo data added to avoid hitting the request limit.
import languages from './Languages';

const List = () => {
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();

    const [articles, setArticles] = useState([]);
    const [language, setLanguage] = useState('en');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        // axios.get(`https://gnews.io/api/v4/top-headlines?token=c5b16b07c5ad0b2e0c4eef840251d008&max=9&lang=${language}`)
        //     .then((response) => {
        //         setArticles(response.data.articles)
        //     });
        setArticles(articleList);
    }, [language]);

    const onLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const onSearch = (data) => {
        console.log(data.query);
    };

    return (
        <div>
            <div className="search">
                <FormHelperText className="helper-text" error>
                    {
                        (errors.query?.type === 'maxLength' && 'The search query is too long.') ||
                        (errors.query?.type === 'pattern' && 'Only alphanumeric characters and spaces are allowed.')
                    }
                </FormHelperText>
                <div className="fields">
                    <form onSubmit={handleSubmit(onSearch)}>
                        <OutlinedInput
                            error={errors.query}
                            {...register(
                                "query",
                                {
                                    required: true,
                                    maxLength: 10,
                                    pattern: /^[a-zA-Z0-9 ]*$/i
                                })
                            }
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                                clearErrors('query');
                            }}
                        />
                        <Button type="submit" variant="outlined">Search</Button>
                    </form>
                    <Select
                        variant="outlined"
                        value={language}
                        onChange={onLanguageChange}
                        MenuProps={{ PaperProps: { className: 'select' } }}>
                        {languages.map(language => 
                            <MenuItem key={language.value} value={language.value}>{language.label}</MenuItem>    
                        )}
                    </Select>
                </div>
            </div>
            <Grid container align="center">
                {articles.map(article =>
                    <Article key={article.url} article={article}/>
                )}
            </Grid>
        </div>
    );
};

export default List;