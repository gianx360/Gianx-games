# GIANX GAMES

A tiny online multiplayer games site by Gianx Labs.

Included in v1:
- FOUR — four in a row
- TIC TAC TOE
- Private five-character rooms
- Shareable invite URLs
- Realtime multiplayer via Supabase
- No player accounts required
- Spectator mode when both seats are occupied
- Rematches

## Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor and run `supabase.sql` once.
3. In Supabase Project Settings / API, copy the project URL and anon/publishable key.
4. Copy `.env.example` to `.env.local` and fill in the two values.
5. Run:

   npm install
   npm run dev

6. Open http://localhost:3000

## Deploy

Push this folder to GitHub and import the repository into your Next.js host. Add the same two environment variables to the host before deploying.

## Important prototype note

This v1 intentionally uses public Supabase read/update policies and anonymous browser tokens to keep friend-to-friend games frictionless. It is suitable for a small casual prototype, but the database rules should be hardened before significant public traffic or competitive play.
