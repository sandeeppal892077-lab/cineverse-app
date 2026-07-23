import { Title } from '@/types';

export const CATEGORIES = [
  { id: 'movies', label: 'Movies', icon: 'Film' },
  { id: 'web-series', label: 'Web Series', icon: 'Tv' },
  { id: 'tv-shows', label: 'TV Shows', icon: 'Monitor' },
  { id: 'anime', label: 'Anime', icon: 'Sparkles' },
  { id: 'animated-movie', label: 'Animated Movies', icon: 'Palette' },
  { id: 'animated-series', label: 'Animated Series', icon: 'Clapperboard' },
  { id: 'comic', label: 'Comics', icon: 'BookOpen' },
  { id: 'manga', label: 'Manga', icon: 'BookMarked' },
  { id: 'manhwa', label: 'Manhwa', icon: 'Bookmark' },
  { id: 'manhua', label: 'Manhua', icon: 'Library' },
  { id: 'documentary', label: 'Documentaries', icon: 'Camera' },
  { id: 'short-film', label: 'Short Films', icon: 'Scissors' },
  { id: 'kids', label: 'Kids', icon: 'Baby' },
  { id: 'live-action', label: 'Live Action', icon: 'Video' },
  { id: 'reality-show', label: 'Reality Shows', icon: 'Users' },
];

export const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama',
  'Fantasy', 'Family', 'Horror', 'Mystery', 'Romance', 'Sci-Fi',
  'Thriller', 'War', 'History', 'Biography', 'Musical', 'Sport',
  'Western', 'Superhero', 'Psychological', 'Slice of Life', 'Isekai',
  'Shounen', 'Seinen', 'Shojo', 'Josei', 'Magic', 'Martial Arts',
  'Mecha', 'Military', 'School', 'Ecchi', 'Parody', 'Space',
  'Time Travel', 'Survival', 'Zombie', 'Mythology', 'Dark Fantasy',
  'Supernatural', 'Suspense', 'Medical', 'Legal', 'Political',
  'Detective', 'Noir', 'Cyberpunk', 'Steampunk', 'Coming of Age',
];

export const COUNTRIES = [
  { id: 'hollywood', label: 'Hollywood (USA)' },
  { id: 'bollywood', label: 'Bollywood (India)' },
  { id: 'tollywood', label: 'Tollywood Telugu' },
  { id: 'kollywood', label: 'Kollywood Tamil' },
  { id: 'mollywood', label: 'Mollywood Malayalam' },
  { id: 'sandalwood', label: 'Sandalwood Kannada' },
  { id: 'punjabi', label: 'Punjabi' },
  { id: 'marathi', label: 'Marathi' },
  { id: 'bengali', label: 'Bengali' },
  { id: 'japanese', label: 'Japanese' },
  { id: 'korean', label: 'Korean' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'thai', label: 'Thai' },
  { id: 'turkish', label: 'Turkish' },
  { id: 'spanish', label: 'Spanish' },
  { id: 'french', label: 'French' },
  { id: 'german', label: 'German' },
  { id: 'british', label: 'British' },
];

export const LANGUAGES = [
  'English', 'Hindi', 'Telugu', 'Tamil', 'Malayalam', 'Kannada',
  'Punjabi', 'Marathi', 'Bengali', 'Japanese', 'Korean', 'Chinese',
  'Thai', 'Turkish', 'Spanish', 'French', 'German', 'Portuguese',
];

const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

export const mockTitles: Title[] = [
  {
    id: '1', slug: 'dune-part-two', name: 'Dune: Part Two',
    tagline: 'Long live the fighters.',
    synopsis: 'Paul Atreides unites with the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe.',
    poster: `${POSTER_BASE}/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg`,
    backdrop: `${BACKDROP_BASE}/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg`,
    tmdbId: 693134,
    type: 'movie', genres: ['Sci-Fi', 'Action', 'Adventure', 'Drama'],
    year: 2024, runtime: 166, imdbRating: 8.5, languages: ['English'],
    country: 'hollywood', studio: 'Legendary Pictures', ageRating: 'PG-13',
    releaseDate: '2024-03-01', trending: true, featured: true, newRelease: true,
    cast: [
      { id: 'p1', name: 'Timothée Chalamet', character: 'Paul Atreides' },
      { id: 'p2', name: 'Zendaya', character: 'Chani' },
      { id: 'p3', name: 'Austin Butler', character: 'Feyd-Rautha' },
      { id: 'p4', name: 'Rebecca Ferguson', character: 'Lady Jessica' },
    ],
    crew: [
      { id: 'c1', name: 'Denis Villeneuve', role: 'Director' },
      { id: 'c2', name: 'Hans Zimmer', role: 'Composer' },
    ],
    awards: ['Academy Award Nominee', 'Golden Globe Winner'],
    relatedTitles: ['2', '3', '4'],
  },
  {
    id: '2', slug: 'oppenheimer', name: 'Oppenheimer',
    tagline: 'The world forever changes.',
    synopsis: 'The story of American physicist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    poster: `${POSTER_BASE}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,
    backdrop: `${BACKDROP_BASE}/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg`,
    tmdbId: 872585,
    type: 'movie', genres: ['Drama', 'Biography', 'History', 'Thriller'],
    year: 2023, runtime: 180, imdbRating: 8.3, languages: ['English'],
    country: 'hollywood', studio: 'Universal Pictures', ageRating: 'R',
    releaseDate: '2023-07-21',
    cast: [
      { id: 'p5', name: 'Cillian Murphy', character: 'J. Robert Oppenheimer' },
      { id: 'p6', name: 'Emily Blunt', character: 'Kitty Oppenheimer' },
      { id: 'p7', name: 'Robert Downey Jr.', character: 'Lewis Strauss' },
    ],
    crew: [{ id: 'c3', name: 'Christopher Nolan', role: 'Director' }],
    awards: ['Academy Award Winner - Best Picture', 'Academy Award Winner - Best Director'],
    relatedTitles: ['1', '3'],
  },
  {
    id: '3', slug: 'the-batman', name: 'The Batman',
    tagline: 'Unmask the truth.',
    synopsis: 'Batman ventures into Gotham City\'s underworld when a sadistic killer leaves behind cryptic clues, uncovering corruption that connects to his own family.',
    poster: `${POSTER_BASE}/74xTEgt7R36Fpooo50r9T25onhq.jpg`,
    backdrop: `${BACKDROP_BASE}/b0PlSFdDwbyFAJlsemRHn6bY1lT.jpg`,
    tmdbId: 414906,
    type: 'movie', genres: ['Action', 'Crime', 'Drama', 'Thriller', 'Superhero'],
    year: 2022, runtime: 176, imdbRating: 7.8, languages: ['English'],
    country: 'hollywood', studio: 'Warner Bros.', ageRating: 'PG-13',
    releaseDate: '2022-03-04',
    cast: [
      { id: 'p8', name: 'Robert Pattinson', character: 'Bruce Wayne / Batman' },
      { id: 'p9', name: 'Zoë Kravitz', character: 'Selina Kyle / Catwoman' },
      { id: 'p10', name: 'Paul Dano', character: 'Edward Nashton / Riddler' },
    ],
    crew: [{ id: 'c4', name: 'Matt Reeves', role: 'Director' }],
    relatedTitles: ['4', '5'],
  },
  {
    id: '4', slug: 'spider-man-across-spider-verse', name: 'Spider-Man: Across the Spider-Verse',
    tagline: 'It\'s how you wear the mask.',
    synopsis: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    poster: `${POSTER_BASE}/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg`,
    backdrop: `${BACKDROP_BASE}/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg`,
    tmdbId: 569094,
    type: 'animated-movie', genres: ['Animation', 'Action', 'Adventure', 'Sci-Fi'],
    year: 2023, runtime: 140, imdbRating: 8.7, languages: ['English'],
    country: 'hollywood', studio: 'Sony Pictures', ageRating: 'PG',
    releaseDate: '2023-06-02', trending: true,
    cast: [
      { id: 'p11', name: 'Shameik Moore', character: 'Miles Morales' },
      { id: 'p12', name: 'Hailee Steinfeld', character: 'Gwen Stacy' },
    ],
    crew: [{ id: 'c5', name: 'Joaquim Dos Santos', role: 'Director' }],
    awards: ['Academy Award Nominee - Best Animated Feature'],
    relatedTitles: ['1', '5'],
  },
  {
    id: '5', slug: 'demon-slayer-hashira-training', name: 'Demon Slayer: Hashira Training Arc',
    tagline: 'Strengthen your blade.',
    synopsis: 'Tanjiro undergoes rigorous training with the Hashira to prepare for the upcoming battle against Muzan Kibutsuji.',
    poster: `${POSTER_BASE}/cbqVn1sVusKE9hrOuSRGFtHlyFM.jpg`,
    backdrop: `${BACKDROP_BASE}/5E3BvRjuyD6W6dVkaXEkS7Dm3FG.jpg`,
    tmdbId: 239505,
    type: 'anime', genres: ['Action', 'Fantasy', 'Supernatural', 'Shounen'],
    year: 2024, runtime: 24, imdbRating: 8.6, languages: ['Japanese'],
    country: 'japanese', studio: 'ufotable', ageRating: 'TV-14',
    releaseDate: '2024-05-12', trending: true, newRelease: true,
    seasons: [
      {
        id: 's1', number: 1, title: 'Hashira Training Arc', episodeCount: 8, year: 2024,
        episodes: [
          { id: 'e1', number: 1, title: 'To Become a Hashira', synopsis: 'Tanjiro begins his training.', runtime: 24, airDate: '2024-05-12', imdbRating: 8.5, isCanon: true },
          { id: 'e2', number: 2, title: 'Giyu Tomioka\'s Sin', synopsis: 'Giyu confronts his past.', runtime: 24, airDate: '2024-05-19', imdbRating: 8.4, isCanon: true },
        ],
      },
    ],
    cast: [
      { id: 'p13', name: 'Natsuki Hanae', character: 'Tanjiro Kamado' },
      { id: 'p14', name: 'Akari Kitō', character: 'Nezuko Kamado' },
    ],
    crew: [{ id: 'c6', name: 'Haruo Sotozaki', role: 'Director' }],
    relatedTitles: ['6', '7'],
  },
  {
    id: '6', slug: 'attack-on-titan-final', name: 'Attack on Titan: The Final Season',
    tagline: 'Fight. Fight.',
    synopsis: 'The fate of the world hangs in the balance as Eren Yeager unleashes the full power of the Founding Titan.',
    poster: `${POSTER_BASE}/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg`,
    backdrop: `${BACKDROP_BASE}/qy6R8MnDJuPNPKy2koqRIZvRCjE.jpg`,
    tmdbId: 142144,
    type: 'anime', genres: ['Action', 'Dark Fantasy', 'Drama', 'Shounen'],
    year: 2023, runtime: 24, imdbRating: 9.0, languages: ['Japanese'],
    country: 'japanese', studio: 'MAPPA', ageRating: 'TV-MA',
    releaseDate: '2023-11-04',
    seasons: [
      {
        id: 's2', number: 1, title: 'The Final Season - Part 3', episodeCount: 2, year: 2023,
        episodes: [
          { id: 'e3', number: 1, title: 'The Battle of Heaven and Earth', synopsis: 'The final battle begins.', runtime: 60, airDate: '2023-11-04', imdbRating: 9.2, isCanon: true },
        ],
      },
    ],
    cast: [
      { id: 'p15', name: 'Yuki Kaji', character: 'Eren Yeager' },
      { id: 'p16', name: 'Yui Ishikawa', character: 'Mikasa Ackerman' },
    ],
    crew: [{ id: 'c7', name: 'Yuichiro Hayashi', role: 'Director' }],
    relatedTitles: ['5', '7'],
  },
  {
    id: '7', slug: 'one-piece', name: 'One Piece',
    tagline: 'I\'m gonna be King of the Pirates!',
    synopsis: 'Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as "One Piece".',
    poster: `${POSTER_BASE}/e3NBGiAifW9Xt8xD5tpARskjccO.jpg`,
    backdrop: `${BACKDROP_BASE}/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg`,
    tmdbId: 37854,
    type: 'anime', genres: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Shounen'],
    year: 1999, runtime: 24, imdbRating: 8.9, languages: ['Japanese'],
    country: 'japanese', studio: 'Toei Animation', ageRating: 'TV-14',
    releaseDate: '1999-10-20', trending: true,
    seasons: [
      {
        id: 's3', number: 1, title: 'East Blue', episodeCount: 61, year: 1999,
        episodes: [
          { id: 'e4', number: 1, title: 'I\'m Luffy! The Man Who\'s Gonna Be King of the Pirates!', synopsis: 'Luffy sets out to sea.', runtime: 24, airDate: '1999-10-20', imdbRating: 8.8, isCanon: true },
        ],
      },
    ],
    cast: [
      { id: 'p17', name: 'Mayumi Tanaka', character: 'Monkey D. Luffy' },
      { id: 'p18', name: 'Akemi Okamura', character: 'Nami' },
    ],
    crew: [{ id: 'c8', name: 'Eiichiro Oda', role: 'Creator' }],
    relatedTitles: ['5', '6'],
  },
  {
    id: '8', slug: 'stranger-things', name: 'Stranger Things',
    tagline: 'Every ending is a new beginning.',
    synopsis: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
    poster: `${POSTER_BASE}/49WJfeN0moxb9IPfGn8AIqMGskD.jpg`,
    backdrop: `${BACKDROP_BASE}/56v2KjBlYj3Ey2t4WDrYRAin39.jpg`,
    tmdbId: 66732,
    type: 'web-series', genres: ['Sci-Fi', 'Horror', 'Drama', 'Mystery'],
    year: 2022, runtime: 50, imdbRating: 8.7, languages: ['English'],
    country: 'hollywood', studio: 'Netflix', ageRating: 'TV-14',
    releaseDate: '2022-05-27',
    seasons: [
      {
        id: 's4', number: 4, title: 'Season 4', episodeCount: 9, year: 2022,
        episodes: [
          { id: 'e5', number: 1, title: 'Chapter One: The Hellfire Club', synopsis: 'A new threat emerges.', runtime: 76, airDate: '2022-05-27', imdbRating: 8.7, isCanon: true },
        ],
      },
    ],
    cast: [
      { id: 'p19', name: 'Millie Bobby Brown', character: 'Eleven' },
      { id: 'p20', name: 'Finn Wolfhard', character: 'Mike Wheeler' },
      { id: 'p21', name: 'Winona Ryder', character: 'Joyce Byers' },
    ],
    crew: [{ id: 'c9', name: 'The Duffer Brothers', role: 'Creators' }],
    relatedTitles: ['9', '10'],
  },
  {
    id: '9', slug: 'breaking-bad', name: 'Breaking Bad',
    tagline: 'Remember my name.',
    synopsis: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.',
    poster: `${POSTER_BASE}/ztkUQFLlC19CCMYHWx6Wb00E3y3.jpg`,
    backdrop: `${BACKDROP_BASE}/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg`,
    tmdbId: 1396,
    type: 'tv-show', genres: ['Crime', 'Drama', 'Thriller', 'Suspense'],
    year: 2013, runtime: 49, imdbRating: 9.5, languages: ['English'],
    country: 'hollywood', studio: 'AMC', ageRating: 'TV-MA',
    releaseDate: '2013-09-29',
    seasons: [
      {
        id: 's5', number: 5, title: 'Season 5', episodeCount: 16, year: 2013,
        episodes: [
          { id: 'e6', number: 1, title: 'Live Free or Die', synopsis: 'Walt and Jesse deal with the aftermath.', runtime: 47, airDate: '2012-07-15', imdbRating: 9.0, isCanon: true },
        ],
      },
    ],
    cast: [
      { id: 'p22', name: 'Bryan Cranston', character: 'Walter White' },
      { id: 'p23', name: 'Aaron Paul', character: 'Jesse Pinkman' },
    ],
    crew: [{ id: 'c10', name: 'Vince Gilligan', role: 'Creator' }],
    awards: ['16 Emmy Awards'],
    relatedTitles: ['8', '10'],
  },
  {
    id: '10', slug: 'squid-game', name: 'Squid Game',
    tagline: 'One game. 456 players.',
    synopsis: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games for a tempting prize.',
    poster: `${POSTER_BASE}/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg`,
    backdrop: `${BACKDROP_BASE}/oaGvjB0DvdhXhOAuADfHb261ZHa.jpg`,
    tmdbId: 93405,
    type: 'web-series', genres: ['Thriller', 'Drama', 'Survival'],
    year: 2021, runtime: 54, imdbRating: 8.0, languages: ['Korean'],
    country: 'korean', studio: 'Netflix', ageRating: 'TV-MA',
    releaseDate: '2021-09-17', trending: true,
    seasons: [
      {
        id: 's6', number: 1, title: 'Season 1', episodeCount: 9, year: 2021,
        episodes: [
          { id: 'e7', number: 1, title: 'Red Light, Green Light', synopsis: 'Gi-hun is invited to play.', runtime: 60, airDate: '2021-09-17', imdbRating: 8.0, isCanon: true },
        ],
      },
    ],
    cast: [
      { id: 'p24', name: 'Lee Jung-jae', character: 'Seong Gi-hun' },
      { id: 'p25', name: 'Park Hae-soo', character: 'Cho Sang-woo' },
    ],
    crew: [{ id: 'c11', name: 'Hwang Dong-hyuk', role: 'Director' }],
    awards: ['Emmy Award - Outstanding Directing'],
    relatedTitles: ['8', '9'],
  },
  {
    id: '11', slug: 'inception', name: 'Inception',
    tagline: 'Your mind is the scene of the crime.',
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
    poster: `${POSTER_BASE}/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg`,
    backdrop: `${BACKDROP_BASE}/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg`,
    tmdbId: 27205,
    type: 'movie', genres: ['Sci-Fi', 'Action', 'Thriller', 'Mystery'],
    year: 2010, runtime: 148, imdbRating: 8.8, languages: ['English'],
    country: 'hollywood', studio: 'Warner Bros.', ageRating: 'PG-13',
    releaseDate: '2010-07-16',
    cast: [
      { id: 'p26', name: 'Leonardo DiCaprio', character: 'Dom Cobb' },
      { id: 'p27', name: 'Tom Hardy', character: 'Eames' },
    ],
    crew: [{ id: 'c12', name: 'Christopher Nolan', role: 'Director' }],
    awards: ['4 Academy Awards'],
    relatedTitles: ['2', '12'],
  },
  {
    id: '12', slug: 'the-witcher', name: 'The Witcher',
    tagline: 'The worst monsters are the ones we create.',
    synopsis: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    poster: `${POSTER_BASE}/7vjaCdMw15FEbXyLQTVa04URsPm.jpg`,
    backdrop: `${BACKDROP_BASE}/jBJWaqoSCiARWtfV0GlqHrcdiJq.jpg`,
    tmdbId: 71912,
    type: 'web-series', genres: ['Fantasy', 'Action', 'Adventure', 'Drama'],
    year: 2023, runtime: 60, imdbRating: 8.0, languages: ['English'],
    country: 'hollywood', studio: 'Netflix', ageRating: 'TV-MA',
    releaseDate: '2023-06-29',
    seasons: [
      {
        id: 's7', number: 3, title: 'Season 3', episodeCount: 8, year: 2023,
        episodes: [
          { id: 'e8', number: 1, title: 'Shaerrawen', synopsis: 'Geralt protects Ciri.', runtime: 58, airDate: '2023-06-29', imdbRating: 7.8, isCanon: true },
        ],
      },
    ],
    cast: [
      { id: 'p28', name: 'Henry Cavill', character: 'Geralt of Rivia' },
      { id: 'p29', name: 'Anya Chalotra', character: 'Yennefer' },
    ],
    crew: [{ id: 'c13', name: 'Lauren Schmidt', role: 'Showrunner' }],
    relatedTitles: ['5', '7'],
  },
  {
    id: '13', slug: 'spirited-away', name: 'Spirited Away',
    tagline: 'A journey beyond imagination.',
    synopsis: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.',
    poster: `${POSTER_BASE}/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg`,
    backdrop: `${BACKDROP_BASE}/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg`,
    tmdbId: 129,
    type: 'animated-movie', genres: ['Animation', 'Fantasy', 'Family', 'Adventure'],
    year: 2001, runtime: 125, imdbRating: 8.6, languages: ['Japanese'],
    country: 'japanese', studio: 'Studio Ghibli', ageRating: 'PG',
    releaseDate: '2001-07-20',
    cast: [
      { id: 'p30', name: 'Rumi Hiiragi', character: 'Chihiro' },
      { id: 'p31', name: 'Miyu Irino', character: 'Haku' },
    ],
    crew: [{ id: 'c14', name: 'Hayao Miyazaki', role: 'Director' }],
    awards: ['Academy Award - Best Animated Feature', 'Golden Bear - Berlin Film Festival'],
    relatedTitles: ['4', '14'],
  },
  {
    id: '14', slug: 'jujutsu-kaisen', name: 'Jujutsu Kaisen',
    tagline: 'With this treasure, I summon.',
    synopsis: 'A boy swallows a cursed talisman and becomes the host of a powerful curse, enrolling in a school for Jujutsu Sorcerers.',
    poster: `${POSTER_BASE}/fHnXGb3MCQ8mE0FksS2KFOwGpiD.jpg`,
    backdrop: `${BACKDROP_BASE}/iIdBv0pMqNVwLpLU0FG8qBEfvM.jpg`,
    tmdbId: 126660,
    type: 'anime', genres: ['Action', 'Supernatural', 'School', 'Shounen'],
    year: 2023, runtime: 24, imdbRating: 8.5, languages: ['Japanese'],
    country: 'japanese', studio: 'MAPPA', ageRating: 'TV-MA',
    releaseDate: '2023-12-28', trending: true, newRelease: true,
    seasons: [
      {
        id: 's8', number: 2, title: 'Season 2', episodeCount: 23, year: 2023,
        episodes: [
          { id: 'e9', number: 1, title: 'Hidden Inventory / Premature Death', synopsis: 'Gojo\'s past is revealed.', runtime: 24, airDate: '2023-07-06', imdbRating: 8.8, isCanon: true },
        ],
      },
    ],
    cast: [
      { id: 'p32', name: 'Junya Enoki', character: 'Yuji Itadori' },
      { id: 'p33', name: 'Yuichi Nakamura', character: 'Satoru Gojo' },
    ],
    crew: [{ id: 'c15', name: 'Sunghoo Park', role: 'Director' }],
    relatedTitles: ['5', '6'],
  },
  {
    id: '15', slug: 'interstellar', name: 'Interstellar',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    poster: `${POSTER_BASE}/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg`,
    backdrop: `${BACKDROP_BASE}/xJHokMbljvjADYdit5fK1Dho0Xx.jpg`,
    tmdbId: 157336,
    type: 'movie', genres: ['Sci-Fi', 'Adventure', 'Drama'],
    year: 2014, runtime: 169, imdbRating: 8.7, languages: ['English'],
    country: 'hollywood', studio: 'Paramount', ageRating: 'PG-13',
    releaseDate: '2014-11-07',
    cast: [
      { id: 'p34', name: 'Matthew McConaughey', character: 'Cooper' },
      { id: 'p35', name: 'Anne Hathaway', character: 'Brand' },
    ],
    crew: [{ id: 'c16', name: 'Christopher Nolan', role: 'Director' }],
    awards: ['Academy Award - Best Visual Effects'],
    relatedTitles: ['11', '2'],
  },
  {
    id: '16', slug: 'parasite', name: 'Parasite',
    tagline: 'Act like you own the place.',
    synopsis: 'Greed and class discrimination threaten the relationship between a wealthy family and the poor Kim clan.',
    poster: `${POSTER_BASE}/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg`,
    backdrop: `${BACKDROP_BASE}/TU9HoIp5SBISigaSKyPlA1g99Jo.jpg`,
    tmdbId: 496243,
    type: 'movie', genres: ['Drama', 'Thriller', 'Comedy', 'Suspense'],
    year: 2019, runtime: 132, imdbRating: 8.5, languages: ['Korean'],
    country: 'korean', studio: 'CJ Entertainment', ageRating: 'R',
    releaseDate: '2019-05-30',
    cast: [
      { id: 'p36', name: 'Song Kang-ho', character: 'Ki-taek' },
      { id: 'p37', name: 'Choi Woo-shik', character: 'Ki-woo' },
    ],
    crew: [{ id: 'c17', name: 'Bong Joon-ho', role: 'Director' }],
    awards: ['Academy Award - Best Picture', 'Palme d\'Or'],
    relatedTitles: ['10', '2'],
  },
  {
    id: '17', slug: 'the-last-of-us', name: 'The Last of Us',
    tagline: 'When you\'re lost in the darkness, look for the light.',
    synopsis: 'Joel and Ellie navigate a post-apocalyptic America overrun by deadly infected and ruthless survivors.',
    poster: `${POSTER_BASE}/uKvVjHNqB5VmOrdxqAt2F7J78e.jpg`,
    backdrop: `${BACKDROP_BASE}/lGiRj7gSJRkGOFOKHs3I3sMdxiA.jpg`,
    tmdbId: 100088,
    type: 'web-series', genres: ['Drama', 'Horror', 'Adventure', 'Post-Apocalyptic'],
    year: 2023, runtime: 60, imdbRating: 8.8, languages: ['English'],
    country: 'hollywood', studio: 'HBO', ageRating: 'TV-MA',
    releaseDate: '2023-01-15', trending: true,
    seasons: [
      {
        id: 's9', number: 1, title: 'Season 1', episodeCount: 9, year: 2023,
        episodes: [
          { id: 'e10', number: 1, title: 'When You\'re Lost in the Darkness', synopsis: 'The outbreak begins.', runtime: 82, airDate: '2023-01-15', imdbRating: 8.8, isCanon: true },
        ],
      },
    ],
    cast: [
      { id: 'p38', name: 'Pedro Pascal', character: 'Joel Miller' },
      { id: 'p39', name: 'Bella Ramsey', character: 'Ellie Williams' },
    ],
    crew: [{ id: 'c18', name: 'Craig Mazin', role: 'Creator' }],
    awards: ['Emmy Award - Outstanding Drama Series'],
    relatedTitles: ['8', '9'],
  },
  {
    id: '18', slug: 'your-name', name: 'Your Name',
    tagline: 'Separated by distance, connected by fate.',
    synopsis: 'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?',
    poster: `${POSTER_BASE}/q719jXXEhOh52W38J3bGbkI2pJ.jpg`,
    backdrop: `${BACKDROP_BASE}/dIWwZWuey40yNia5unYvFf4Ibux.jpg`,
    tmdbId: 372058,
    type: 'animated-movie', genres: ['Animation', 'Romance', 'Fantasy', 'Drama'],
    year: 2016, runtime: 106, imdbRating: 8.4, languages: ['Japanese'],
    country: 'japanese', studio: 'CoMix Wave Films', ageRating: 'PG',
    releaseDate: '2016-08-26',
    cast: [
      { id: 'p40', name: 'Ryunosuke Kamiki', character: 'Taki' },
      { id: 'p41', name: 'Mone Kamishiraishi', character: 'Mitsuha' },
    ],
    crew: [{ id: 'c19', name: 'Makoto Shinkai', role: 'Director' }],
    relatedTitles: ['13', '4'],
  },
  {
    id: '19', slug: 'peaky-blinders', name: 'Peaky Blinders',
    tagline: 'No fighting. No fighting.',
    synopsis: 'A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps.',
    poster: `${POSTER_BASE}/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg`,
    backdrop: `${BACKDROP_BASE}/wiE9doxiLwq3WCGamDIOb2PqBqc.jpg`,
    tmdbId: 60571,
    type: 'tv-show', genres: ['Crime', 'Drama', 'History'],
    year: 2022, runtime: 60, imdbRating: 8.8, languages: ['English'],
    country: 'british', studio: 'BBC', ageRating: 'TV-MA',
    releaseDate: '2022-06-27',
    seasons: [
      {
        id: 's10', number: 6, title: 'Season 6', episodeCount: 6, year: 2022,
        episodes: [
          { id: 'e11', number: 1, title: 'Black Day', synopsis: 'Tommy faces his final battle.', runtime: 60, airDate: '2022-02-27', imdbRating: 8.5, isCanon: true },
        ],
      },
    ],
    cast: [
      { id: 'p42', name: 'Cillian Murphy', character: 'Thomas Shelby' },
      { id: 'p43', name: 'Helen McCrory', character: 'Polly Gray' },
    ],
    crew: [{ id: 'c20', name: 'Steven Knight', role: 'Creator' }],
    relatedTitles: ['9', '8'],
  },
  {
    id: '20', slug: 'money-heist', name: 'Money Heist',
    tagline: 'The heist of the century.',
    synopsis: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.',
    poster: `${POSTER_BASE}/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg`,
    backdrop: `${BACKDROP_BASE}/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg`,
    tmdbId: 71446,
    type: 'web-series', genres: ['Crime', 'Drama', 'Thriller', 'Action'],
    year: 2021, runtime: 50, imdbRating: 8.2, languages: ['Spanish'],
    country: 'spanish', studio: 'Netflix', ageRating: 'TV-MA',
    releaseDate: '2021-12-03',
    seasons: [
      {
        id: 's11', number: 5, title: 'Part 5', episodeCount: 10, year: 2021,
        episodes: [
          { id: 'e12', number: 1, title: 'The End of the Road', synopsis: 'The final chapter begins.', runtime: 50, airDate: '2021-09-03', imdbRating: 8.0, isCanon: true },
        ],
      },
    ],
    cast: [
      { id: 'p44', name: 'Úrsula Corberó', character: 'Tokyo' },
      { id: 'p45', name: 'Álvaro Morte', character: 'The Professor' },
    ],
    crew: [{ id: 'c21', name: 'Álex Pina', role: 'Creator' }],
    relatedTitles: ['10', '19'],
  },
];

export function getTitlesBySection(section: string): Title[] {
  switch (section) {
    case 'trending': return mockTitles.filter(t => t.trending);
    case 'new-releases': return mockTitles.filter(t => t.newRelease);
    case 'featured': return mockTitles.filter(t => t.featured);
    case 'editors-picks': return mockTitles.filter(t => t.editorsPick || t.imdbRating >= 8.5);
    case 'movies': return mockTitles.filter(t => t.type === 'movie' || t.type === 'animated-movie');
    case 'series': return mockTitles.filter(t => t.type === 'web-series' || t.type === 'tv-show');
    case 'anime': return mockTitles.filter(t => t.type === 'anime');
    case 'top-rated': return [...mockTitles].sort((a, b) => b.imdbRating - a.imdbRating);
    case 'recently-added': return mockTitles.filter(t => t.year >= 2023);
    default: return mockTitles;
  }
}

export function getTitleBySlug(slug: string): Title | undefined {
  return mockTitles.find(t => t.slug === slug);
}

export function searchTitles(query: string): Title[] {
  const q = query.toLowerCase();
  return mockTitles.filter(
    t =>
      t.name.toLowerCase().includes(q) ||
      t.genres.some(g => g.toLowerCase().includes(q)) ||
      t.cast.some(c => c.name.toLowerCase().includes(q)) ||
      t.crew.some(c => c.name.toLowerCase().includes(q)) ||
      t.type.toLowerCase().includes(q)
  );
}

export const SECTION_LABELS: Record<string, string> = {
  'trending': 'Trending Now',
  'new-releases': 'New Releases',
  'featured': 'Featured',
  'editors-picks': "Editor's Picks",
  'movies': 'Movies',
  'series': 'TV Shows & Web Series',
  'anime': 'Anime',
  'top-rated': 'Top Rated',
  'recently-added': 'Recently Added',
  'continue-watching': 'Continue Watching',
  'recommended': 'Recommended for You',
};
