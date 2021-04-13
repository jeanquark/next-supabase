import { supabase } from "../../../utils/supabaseClient";

export default async function fetchNextFixtures(req, res) {
    try {
        // 1) Request data from Football API
        const data2 = await fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?from=2021-06-01&to=2021-07-31&league=4&season=2020", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": process.env.NEXT_PUBLIC_API_FOOTBALL_KEY
            }
        })
        const { response } = await data2.json()
        // console.log('[api/api-football/fetchNextFixtures] response: ', response);
        let array = []
        for (let i = 0; i < response.length; i++) {
            array.push({
                fixture_id: response[i]['fixture']['id'],
                home_team_name: response[i]['teams']['home']['name'],
                home_team_id: response[i]['teams']['home']['id'],
                visitor_team_name: response[i]['teams']['away']['name'],
                visitor_team_id: response[i]['teams']['away']['id'],
            })
        }
        console.log('[api/api-football/fetchNextFixtures] array: ', array)

        // 2) Load DB
        console.log('[api/api-football/fetchNextFixtures] response.length: ', response.length);
        const { data, error } = await supabase
            .from('events').upsert(array, { onConflict: 'fixture_id'})
        console.log('[api/api-football/fetchNextFixtures] data: ', data)
        console.log('[api/api-football/fetchNextFixtures] error: ', error)

        return res.status(200).json({ success: true, length: response.length });
    } catch (error) {
        return res.status(500).json('An error occured on the server: ', error);

    }

}