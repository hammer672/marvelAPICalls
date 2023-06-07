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

interface DataContainer<T> {
    offset?: number
    limit?: number
    total?: number
    count?: number
    results?: T
}

export interface DataWrapper<TARTEMPION> {
    code?: number
    status?: string
    copyright?: string
    data?: DataContainer<TARTEMPION>
    attributionHTML?: string
    attributionText?: string
    etag?: string
}
