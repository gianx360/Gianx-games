create table if not exists public.games (
  id text primary key,
  game_type text not null check (game_type in ('four','tic-tac-toe')),
  board jsonb not null,
  turn integer not null default 1,
  status text not null default 'waiting',
  winner integer,
  player1_token text not null,
  player2_token text,
  created_at timestamptz not null default now()
);

alter table public.games enable row level security;

drop policy if exists "public can read games" on public.games;
drop policy if exists "public can create games" on public.games;
drop policy if exists "public can update games" on public.games;

create policy "public can read games" on public.games for select using (true);
create policy "public can create games" on public.games for insert with check (true);
create policy "public can update games" on public.games for update using (true) with check (true);

-- Atomically claims Player 2. SECURITY DEFINER avoids browser-side RLS/update
-- edge cases during the join handshake, while only allowing an empty seat to be claimed.
create or replace function public.join_game(game_id text, join_token text)
returns setof public.games
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.games
  set player2_token = join_token,
      status = 'playing'
  where id = game_id
    and player2_token is null;

  return query
  select * from public.games where id = game_id;
end;
$$;

grant execute on function public.join_game(text, text) to anon, authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'games'
  ) then
    alter publication supabase_realtime add table public.games;
  end if;
end $$;
