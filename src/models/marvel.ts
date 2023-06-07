export interface Character {
    id?: number
    name?: string
    description?: string
    modified?: Date
    resourceURI?: string
    urls?: Url[]
    thumbnail?: Image
    // comics?: ComicList
    // stories?: StoryList
    // events?: EventList
    // series?: SeriesList
}

interface Url {
    type?: string
    url?: string
}

interface Image {
    path?: string
    extension?: string
}

interface CharacterDataContainer {
    offset?: number
    limit?: number
    total?: number
    count?: number
    results?: Character[]
}

export interface CharacterDataWrapper {
    code?: number
    status?: string
    copyright?: string
    data?: CharacterDataContainer
    attributionHTML?: string
    attributionText?: string
    etag?: string
}
