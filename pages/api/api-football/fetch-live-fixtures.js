import { supabase } from "../../../utils/supabaseClient";

export default async function fetchNextFixtures(req, res) {
    try {
        // 1) Request data from Football API
        const data = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.API_FOOTBALL_KEY,
                "x-rapidapi-host": "v3.football.api-sports.io",
                "useQueryString": true
            }
        })
        const { response } = await data.json()

        console.log('response.length: ', response.length)

        return res.status(200).json({ success: true, length: response.length, data: response });
    } catch (error) {
        return res.status(500).json('An error occured on the server: ', error);

    }

}