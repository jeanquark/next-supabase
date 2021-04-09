CREATE TABLE events (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  home_team_name VARCHAR(60),
  home_team_id INT,
  home_team_score INT,
  visitor_team_name VARCHAR(60),
  visitor_team_id INT,
  visitor_team_score INT
);

INSERT INTO events(home_team_name, home_team_id, home_team_score, visitor_team_name, 
visitor_team_id, visitor_team_score)
VALUES 
  ('Neuchâtel Xamax FCS', 1, 3, 'Lausanne Sport', 2, 0),
  ('FC Basel', 3, 2, 'FC Zürich', 4, 2);