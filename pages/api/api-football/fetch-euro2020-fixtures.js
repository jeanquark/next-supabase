import { supabase } from "../../../utils/supabaseClient";

export default async function fetchNextFixtures(req, res) {
    try {
        // 1) Request data from Football API
        // const data = await fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?from=2021-06-01&to=2021-07-31&league=4&season=2020", {
        const data2 = await fetch("https://v3.football.api-sports.io/fixtures?from=2021-06-01&to=2021-07-31&league=4&season=2020", {
            "method": "GET",
            "headers": {
                "x-apisports-key": process.env.API_FOOTBALL_KEY
            }
        })
        const { response } = await data2.json()
        // console.log('[api/api-football/fetchNextFixtures] response: ', response);
        let array = []
        for (let i = 0; i < response.length; i++) {
            array.push({
                fixture_id: response[i]['fixture']['id'],
                home_team_id: response[i]['teams']['home']['id'],
                home_team_name: response[i]['teams']['home']['name'],
                home_team_image: response[i]['teams']['home']['logo'],
                visitor_team_id: response[i]['teams']['away']['id'],
                visitor_team_name: response[i]['teams']['away']['name'],
                visitor_team_image: response[i]['teams']['away']['logo'],
                venue: response[i]['fixture']['venue']['name'],
                city: response[i]['fixture']['venue']['city'],
                date: response[i]['fixture']['date'],
                league_id: response[i]['league']['id'],
                round: response[i]['league']['round'],
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