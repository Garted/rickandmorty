import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
    const response = await fetch(
        `https://rickandmortyapi.com/api/character/[1,2,3,4,5,6,7,8,9]`
    );
    const data = await response.json();
    return data;
});

export const getMorefetchHeroes = createAsyncThunk(
    "heroes/getMorefetchHeroes",
    async (arr) => {
        const response = await fetch(
            `https://rickandmortyapi.com/api/character/${arr}`
        );
        const data = await response.json();
        return data;
    }
);

export const fetchEpisodes = createAsyncThunk(
    "heroes/fetchEpisodes",
    async () => {
        const response = await fetch(`https://rickandmortyapi.com/api/episode`);
        const data = await response.json();
        return data.results;
    }
);

//Функция запроса на сервер

export const heroesSlice = createSlice({
    name: "heroes",
    initialState: {
        data: null,
        episodes: null,
        id: null,
        status: null,
        error: null,
    },
    reducers: {
        setId(state, action) {
            state.id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHeroes.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(fetchHeroes.fulfilled, (state, action) => {
            state.data = action.payload.map((res) => {
                return {
                    id: res.id,
                    name: res.name,
                    img: res.image,
                    status: res.status,
                    episode: res.episode.length,
                    species: res.species,
                    gender: res.gender,
                    location: res.location.name,
                };
            });
            state.status = "idle";
            state.error = null;
        });
        builder.addCase(fetchHeroes.rejected, (state) => {
            state.status = null;
            state.status = "error";
        });
        builder.addCase(getMorefetchHeroes.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getMorefetchHeroes.fulfilled, (state, action) => {
            state.data = [
                ...state.data,
                ...action.payload.map((res) => ({
                    id: res.id,
                    name: res.name,
                    img: res.image,
                    status: res.status,
                    episode: res.episode.length,
                    species: res.species,
                    gender: res.gender,
                    location: res.location.name,
                })),
            ];
            state.status = "idle";
            state.error = null;
        });
        builder.addCase(getMorefetchHeroes.rejected, (state) => {
            state.status = null;
            state.status = "error";
        });
        builder.addCase(fetchEpisodes.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
            state.episodes = action.payload;
            state.status = "idle";
            state.error = null;
        });
        builder.addCase(fetchEpisodes.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const { setId } = heroesSlice.actions;
export default heroesSlice.reducer;
