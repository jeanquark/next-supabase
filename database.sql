/** 
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
create table users (
  -- UUID from auth.users
  -- id uuid references auth.users not null primary key,
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  auth_user_id uuid references auth.users not null,
  full_name text,
  avatar_url text,
  -- The customer's billing address, stored in JSON format.
  billing_address jsonb,
  -- Stores your customer's payment instruments.
  payment_method jsonb,
  points INT
);
alter table users enable row level security;
create policy "Can view own user data." on users for select using (auth.uid() = auth_user_id);
create policy "Can update own user data." on users for update using (auth.uid() = auth_user_id);

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (auth_user_id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();




CREATE TABLE posts (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  title VARCHAR(60),
  description VARCHAR(60),
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO posts(title, description)
VALUES 
  ('Post #1', 'first post'),
  ('Post #2', 'second post');

CREATE TABLE events (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  fixture_id INT,
  home_team_id INT,
  home_team_name VARCHAR(60),
  home_team_image VARCHAR(120),
  home_team_score INT,
  visitor_team_id INT,
  visitor_team_name VARCHAR(60),
  visitor_team_image VARCHAR(120),
  visitor_team_score INT,
  venue VARCHAR(60),
  city VARCHAR(60),
  country VARCHAR(60),
  date timestamp,
  league_id UUID,
  round VARCHAR(60),
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO events(fixture_id, home_team_name, home_team_id, home_team_score, visitor_team_name, 
visitor_team_id, visitor_team_score)
VALUES 
  (1, 'Neuchâtel Xamax FCS', 1, 3, 'Lausanne Sport', 2, 0),
  (2, 'FC Basel', 3, 2, 'FC Zürich', 4, 2);

-- 2. Enable RLS (Prevent any action on the table)
ALTER TABLE events 
  enable row level security;

CREATE UNIQUE INDEX fixture_idx ON events (fixture_id);

CREATE TABLE messages (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  event_id INT,
  user_id VARCHAR(255),
  user_email VARCHAR(255),
  content VARCHAR(255),
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);



-- user_id uuid references auth.users,
create type team_type as enum('national', 'club');

CREATE TABLE teams (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name VARCHAR(60),
  type team_type NOT NULL,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO teams(name, type)
VALUES 
  ('Neuchâtel Xamax FCS', 'club'),
  ('Lausanne Sport', 'club');




CREATE TABLE actions (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name VARCHAR(60),
  description VARCHAR(60),
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO actions(name, description)
VALUES 
  ('hola', 'Lancer une hola'),
  ('Vuvuzela', 'Souffler dans une vuvuzela');


CREATE TABLE event_actions (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  event_id INT NOT NULL,
  action_id INT NOT NULL,
  user_id INT NOT NULL,
  number_participants INT,
  participation_threshold INT,
  expired_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT fk_event_id FOREIGN KEY (event_id) REFERENCES events (id),
  CONSTRAINT fk_action_id FOREIGN KEY (action_id) REFERENCES actions (id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO event_actions(event_id, action_id, user_id)
VALUES 
  (4, 1, 1),
  (4, 2, 1);

/* Increment function */ 
create or replace function increment_by_one (table_name varchar, column_name varchar, row_id int) 
returns void as
$$
  update table_name
  set column_name = column_name + 1
  where id = row_id
$$ 
language sql volatile;

/* Check participation threshold trigger */
CREATE OR REPLACE FUNCTION public.check_participation_threshold() 
RETURNS TRIGGER AS $$
BEGIN
	IF new.number_participants >= new.participation_threshold THEN
		update event_actions
    set is_completed = true
		where id = new.id;
	END IF;
  return new;
END;
END;
$$ LANGUAGE plpgsql SECURITY definer;
CREATE TRIGGER participation_threshold
    AFTER UPDATE OF number_participants ON event_actions
    FOR EACH ROW
    EXECUTE PROCEDURE check_participation_threshold();


CREATE TABLE user_event (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  event_id INT,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT fk_event_id FOREIGN KEY (event_id) REFERENCES events (id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);