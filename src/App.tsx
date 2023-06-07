import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import SearchBar from './SearchBar'
import { Character, CharacterDataWrapper } from './models/marvel'
import { Button } from '@mui/material'

const SUPERHERO_URL =
    'https://gateway.marvel.com/v1/public/characters?apikey=61614e956406795b15df4a1fe5a32c0c&ts=1&hash=48070b0f0c2a243ff5ad096255cd4c5e&limit=10'

const newURL = (currentCursor: number) =>
    `${SUPERHERO_URL}&offset=${currentCursor}`

const placeholderSuperHero: Character = {
    id: 1,
    name: 'Spiderman',
    description: 'Spiderman est un héros de Marvel',
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
    hero?: Character
}

const SuperHeroArticle = (props: SuperHeroArticleProps) => {
    const { hero = placeholderSuperHero } = props
    return (
        <div className='item'>
            <article>
                <div className='itemImg'>
                    <img
                        style={{ width: 'auto', height: '100%' }}
                        src={`${hero.thumbnail?.path}.${hero.thumbnail?.extension}`}
                        alt={hero.name}
                    />
                </div>
                <div className='itemContent'>
                    <h1>{hero.name}</h1>
                    <p>{hero.description}</p>
                </div>
            </article>
        </div>
    )
}

function Page() {
    // state management
    const [currentCursor, setCurrentCursor] = React.useState(0)
    const [heroes, setHeroes] = React.useState<Character[]>([])

    // use effect hook
    React.useEffect(() => {
        console.log('fetching heroes')
        fetchHeroes()
    }, [currentCursor])

    // internal function
    const fetchHeroes = async () => {
        const response = await fetch(newURL(currentCursor))
        const content: CharacterDataWrapper = await response.json()
        if (content?.data?.results) {
            console.log('has results')
            setHeroes(content.data.results)
        }
    }

    const previousPage = () =>
        setCurrentCursor((previous) => (previous >= 10 ? previous - 10 : 0))
    const nextPage = () => setCurrentCursor((previous) => previous + 10)

    const heroArticles = heroes.map((superhero) => (
        <SuperHeroArticle key={`superhero-article-${superhero.id}`} hero={superhero} />
    ))
    return (
        <>
            <div className='container'>{heroArticles}</div>
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
