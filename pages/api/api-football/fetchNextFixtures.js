export default async function fetchNextFixtures(req, res) {
    try {
        // const data = await fetch("https://v3.football.api-sports.io/leagues/seasons", {
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-host": "v3.football.api-sports.io",
        //         "x-rapidapi-key": "8b7377ead42a0eb34e2d8fa3b8d418c6"
        //     }
        // })
        const data = 'abc'
        console.log('[api/api-football/fetchNextFixtures] data: ', data);

        return res.status(200).json({ data: data });
    } catch (error) {
        return res.status(500).json('An error occured on the server.');

    }

}