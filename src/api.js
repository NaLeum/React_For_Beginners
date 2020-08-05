import axios from 'axios';


const api = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    params:{
        api_key:"577134ccdd84e1abd41a3f418178e6a5",
        language:"en-US"
    }
});


export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing",{
        params:{
            api_key:"577134ccdd84e1abd41a3f418178e6a5",
            language:"en-US"
        }
    }),
    upcoming:() =>api.get("movie/upcoming",{
        params:{
            api_key:"577134ccdd84e1abd41a3f418178e6a5",
            language:"en-US"

        }
    }),
    popular:() => api.get("movie/popular",{
        params:{
            api_key:"577134ccdd84e1abd41a3f418178e6a5",
            language:"en-US"

        }
    }),
    movieDetail:id => api.get(`movie/${id}`,{
        params:{
            append_to_response:"videos",
            api_key:"577134ccdd84e1abd41a3f418178e6a5",
            language:"en-US"

        }
    }),
    search:term => api.get("search/movie",{
        params:{
            query:encodeURIComponent(term),
            api_key:"577134ccdd84e1abd41a3f418178e6a5",
            language:"en-US"

        }
    })
}

export const tvApi = {
    topRated:() => api.get("tv/top_rated",{
        params:{
            api_key:"577134ccdd84e1abd41a3f418178e6a5",
            language:"en-US"

        }
    }),
    popular:()=> api.get("tv/popular",{
        params:{
            api_key:"577134ccdd84e1abd41a3f418178e6a5",
            language:"en-US"

        }
    }),
    airingToday: () => api.get("tv/airing_today",{
        params:{
            api_key:"577134ccdd84e1abd41a3f418178e6a5",
            language:"en-US"

        }
    }),
    showDetail:id => api.get(`tv/${id}`,{
        params:{
            append_to_response:"videos",
            api_key:"577134ccdd84e1abd41a3f418178e6a5",
            language:"en-US"

        }
    }),
    search:term => api.get("search/tv",{
        params:{
            query:encodeURIComponent(term),
            api_key:"577134ccdd84e1abd41a3f418178e6a5",
            language:"en-US"

        }
    })
}