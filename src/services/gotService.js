export default class GotService {
    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase}${url}, received ${res.status}`);
        }

        return await res.json();
    }
    async getAllCharacters() {
        const res = await this.getResource('/characters?page=7&pageSize=10');
        return res.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const char = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(char);
    }
    async getAllBooks() {
        const res = await this.getResource('/books?page=1');
        return res.map(this._transformCharacter);
    }
    async getBook(id) {
        const book = this.getResource(`/books/${id}`);
        return this._transformCharacter(book);
    }
    async getAllHouses() {
        const res = await this.getResource('/houses?page=1');
        return res.map(this._transformCharacter);
    }
    async getHous(id) {
        const house = this.getResource(`/houses/${id}`);
        return this._transformCharacter(house);
    }

    _transformCharacter(char) {
        for (let key in char) {
            if (char[key] === '') {
                char[key] = 'no data :(';
            }
        }

        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }
}