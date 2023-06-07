import React, { useMemo } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import SearchBar from './SearchBar'
import { Character, DataWrapper } from './models/marvel'
import { Button, Grid, Paper, Skeleton } from '@mui/material'
import useQuery from './hooks/useQuery'

const SUPERHERO_URL =
    'https://gateway.marvel.com/v1/public/characters?apikey=61614e956406795b15df4a1fe5a32c0c&ts=1&hash=48070b0f0c2a243ff5ad096255cd4c5e&limit=10'

const newURL = (currentCursor: number) =>
    `${SUPERHERO_URL}&offset=${currentCursor}`

const placeholderSuperHero: Character = {
    id: 1,
    name: '',
    description: '',
    thumbnail: {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
        extension: 'jpg',
    },
}

function Copyright() {
    return (
        <Typography variant='body2' color='text.secondary' align='center'>
            {'Copyleft '}
            <Link color='inherit' href='./'>
                Marvel Search 🄯
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    )
}

interface SuperHeroArticleProps {
    hero?: Character | undefined
}

const SuperHeroArticle = (props: SuperHeroArticleProps) => {
    const { hero } = props
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3}>
                <article>
                    {hero ? (
                        <img
                            style={{
                                width: 'auto',
                                maxWidth: '200px',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'left bottom',
                            }}
                            src={`${hero.thumbnail?.path}.${hero.thumbnail?.extension}`}
                            alt={hero.name}
                        />
                    ) : (
                        <Skeleton
                            variant='rectangular'
                            width={200}
                            height='100%'
                        />
                    )}
                    <div className='itemContent'>
                        {hero ? (
                            <h1>{hero?.name}</h1>
                        ) : (
                            <Skeleton variant='text' height={50} />
                        )}
                        {hero ? (
                            <p>{hero?.description}</p>
                        ) : (
                            <>
                                <Skeleton variant='text' />
                                <Skeleton variant='text' />
                                <Skeleton variant='text' />
                                <Skeleton variant='text' />
                            </>
                        )}
                    </div>
                </article>
            </Paper>
        </Grid>
    )
}

function Page() {
    // state management
    const [currentCursor, setCurrentCursor] = React.useState(0)
    const [characters, isLoading, error, fetchCharacters] =
        useQuery<Character[]>(SUPERHERO_URL)

    // use effect hook
    React.useEffect(() => {
        console.log('fetching heroes')
        fetchCharacters(currentCursor)
    }, [currentCursor])

    // internal function

    const previousPage = () =>
        setCurrentCursor((previous) => (previous >= 10 ? previous - 10 : 0))
    const nextPage = () => setCurrentCursor((previous) => previous + 10)

    const heroArticles = useMemo(() => {
        if (isLoading) {
            const placeholder = new Array(10).fill(0)
            return placeholder.map((_, index) => (
                <SuperHeroArticle
                    key={`superhero-article-placeholder-${index}`}
                />
            ))
        }
        return characters.map((superhero) => (
            <SuperHeroArticle
                key={`superhero-article-${superhero.id}`}
                hero={superhero}
            />
        ))
    }, [characters, isLoading])
    // render
    if (error) {
        return (
            <img src='https://faceswaponline.com/wp-content/uploads/2019/05/ThanosMeme-113d553cccd42016072efdc8bfbf5963.jpg' />
        )
    }

    return (
        <>
            <Grid container spacing={1}>
                {heroArticles}
            </Grid>
            <div>
                {currentCursor > 0 && (
                    <Button onClick={previousPage}>previous</Button>
                )}
                <Button onClick={nextPage}>next</Button>
            </div>
        </>
    )
}

export default function App() {
    return (
        <>
            <SearchBar />
            <Page />
            <Copyright />
        </>
    )
}
