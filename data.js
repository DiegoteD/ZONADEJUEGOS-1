const videogames = [
    {
        id: 1,
        title: "Spider-Man 2",
        description: "La secuela del exitoso juego de Spider-Man con nuevas mecánicas y dos Spider-Men jugables.",
        image: "img/1366_2000.jpg",
        price: 69.99,
        originalPrice: 79.99,
        discount: 12,
        platforms: ["playstation"],
        genres: ["Acción", "Aventura"],
        rating: 4.8,
        releaseYear: 2024,
        category: "latest"
    },
    {
        id: 2,
        title: "Baldur's Gate 3",
        description: "RPG épico con decisiones que importan y combate estratégico por turnos.",
        image: "img/apps.16348.14354439636842270.faa59050-7620-4a4f-8b3e-809caf8e781c.jpg",
        price: 59.99,
        originalPrice: 69.99,
        discount: 14,
        platforms: ["pc", "playstation"],
        genres: ["RPG", "Estrategia"],
        rating: 4.9,
        releaseYear: 2024,
        category: "latest"
    },
    {
        id: 3,
        title: "The Legend of Zelda: Tears of the Kingdom",
        description: "La esperada secuela de Breath of the Wild con nuevas mecánicas de construcción.",
        image: "img/2x1_NSwitch_TloZTearsOfTheKingdom_Gamepage_image1600w.jpg",
        price: 59.99,
        originalPrice: 69.99,
        discount: 14,
        platforms: ["nintendo"],
        genres: ["Aventura", "Acción"],
        rating: 4.9,
        releaseYear: 2024,
        category: "latest"
    },
    {
        id: 4,
        title: "Starfield",
        description: "Explora el cosmos en este RPG espacial de mundo abierto de Bethesda.",
        image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop",
        price: 49.99,
        originalPrice: 69.99,
        discount: 28,
        platforms: ["pc", "xbox"],
        genres: ["RPG", "Aventura"],
        rating: 4.3,
        releaseYear: 2024,
        category: "latest"
    },
    {
        id: 5,
        title: "Diablo IV",
        description: "El esperado regreso de la serie Diablo con gráficos modernos y nueva historia.",
        image: "img/iimages.jpg",
        price: 54.99,
        originalPrice: 69.99,
        discount: 21,
        platforms: ["pc", "playstation", "xbox"],
        genres: ["RPG", "Acción"],
        rating: 4.5,
        releaseYear: 2024,
        category: "latest"
    },
    {
        id: 6,
        title: "Call of Duty: Modern Warfare III",
        description: "El último capítulo de Modern Warfare con multijugador renovado.",
        image: "img/ss_53299e493d58d0c0698311f47c992fae91ea069d.1920x1080.jpg",
        price: 59.99,
        originalPrice: 69.99,
        discount: 14,
        platforms: ["pc", "playstation", "xbox"],
        genres: ["Acción", "FPS"],
        rating: 4.2,
        releaseYear: 2024,
        category: "latest"
    },

    {
        id: 7,
        title: "God of War Ragnarök",
        description: "Kratos y Atreus enfrentan el fin del mundo nórdico en esta épica aventura.",
        image: "img/steel-magnolia-1nh8h.jpg",
        price: 39.99,
        originalPrice: 59.99,
        discount: 33,
        platforms: ["playstation", "pc"],
        genres: ["Acción", "Aventura"],
        rating: 4.8,
        releaseYear: 2023,
        category: "lastyear"
    },
    {
        id: 8,
        title: "Elden Ring",
        description: "Un mundo abierto dark fantasy creado por FromSoftware y George R.R. Martin.",
        image: "img/nightreign-4331439.webp",
        price: 44.99,
        originalPrice: 59.99,
        discount: 25,
        platforms: ["pc", "playstation", "xbox"],
        genres: ["RPG", "Acción"],
        rating: 4.7,
        releaseYear: 2023,
        category: "lastyear"
    },
    {
        id: 9,
        title: "Horizon Forbidden West",
        description: "Aloy explora nuevas tierras en un mundo post-apocalíptico lleno de máquinas.",
        image: "img/d2c2b962-f75b-4470-ae27-6853213f5895_source-aspect-ratio_1600w_0.jpg",
        price: 34.99,
        originalPrice: 49.99,
        discount: 30,
        platforms: ["playstation", "pc"],
        genres: ["Acción", "RPG"],
        rating: 4.6,
        releaseYear: 2023,
        category: "lastyear"
    },
    {
        id: 10,
        title: "FIFA 24",
        description: "La simulación de fútbol más realista con nuevas mecánicas de juego.",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
        price: 29.99,
        originalPrice: 59.99,
        discount: 50,
        platforms: ["pc", "playstation", "xbox", "nintendo"],
        genres: ["Deportes"],
        rating: 4.1,
        releaseYear: 2023,
        category: "lastyear"
    },
    {
        id: 11,
        title: "Mortal Kombat 1",
        description: "El reinicio de la saga con nuevos luchadores y mecánicas de combate.",
        image: "img/mortal-kombat-1-khaos-reigns-dlc-revealed-includes-ghostface_xbgz.jpg",
        price: 39.99,
        originalPrice: 59.99,
        discount: 33,
        platforms: ["pc", "playstation", "xbox", "nintendo"],
        genres: ["Lucha", "Acción"],
        rating: 4.4,
        releaseYear: 2023,
        category: "lastyear"
    },
    {
        id: 12,
        title: "Street Fighter 6",
        description: "La nueva generación de Street Fighter con sistema de combate renovado.",
        image: "img/450_1000.jpg",
        price: 44.99,
        originalPrice: 59.99,
        discount: 25,
        platforms: ["pc", "playstation", "xbox"],
        genres: ["Lucha", "Acción"],
        rating: 4.5,
        releaseYear: 2023,
        category: "lastyear"
    },

    {
        id: 13,
        title: "Grand Theft Auto V",
        description: "El juego de mundo abierto más popular de todos los tiempos.",
        image: "img/1_gtavpc_03272015.jpg",
        price: 19.99,
        originalPrice: 29.99,
        discount: 33,
        platforms: ["pc", "playstation", "xbox"],
        genres: ["Acción", "Aventura"],
        rating: 4.8,
        releaseYear: 2021,
        category: "popular"
    },
    {
        id: 14,
        title: "Minecraft",
        description: "Construye, explora y sobrevive en un mundo de bloques infinito.",
        image: "img/450_1000.webp",
        price: 26.99,
        originalPrice: 29.99,
        discount: 10,
        platforms: ["pc", "playstation", "xbox", "nintendo", "mobile"],
        genres: ["Sandbox", "Aventura"],
        rating: 4.9,
        releaseYear: 2020,
        category: "popular"
    },
    {
        id: 15,
        title: "Fortnite",
        description: "El battle royale más popular del mundo con constantes actualizaciones.",
        image: "img/ogc1s3-1920x1080-181f9f4e8a8e.jpg",
        price: 0,
        originalPrice: 0,
        discount: 0,
        platforms: ["pc", "playstation", "xbox", "nintendo", "mobile"],
        genres: ["Battle Royale", "Acción"],
        rating: 4.3,
        releaseYear: 2020,
        category: "popular"
    },
    {
        id: 16,
        title: "The Witcher 3: Wild Hunt",
        description: "RPG épico con historia profunda y mundo abierto masivo.",
        image: "img/images.jpg",
        price: 24.99,
        originalPrice: 39.99,
        discount: 37,
        platforms: ["pc", "playstation", "xbox", "nintendo"],
        genres: ["RPG", "Aventura"],
        rating: 4.9,
        releaseYear: 2021,
        category: "popular"
    },
    {
        id: 17,
        title: "Among Us",
        description: "Juego de deducción social que se volvió viral mundialmente.",
        image: "img/5-truques-para-sempre-vencer-em-among-us.jpg",
        price: 4.99,
        originalPrice: 4.99,
        discount: 0,
        platforms: ["pc", "mobile", "nintendo"],
        genres: ["Social", "Estrategia"],
        rating: 4.2,
        releaseYear: 2020,
        category: "popular"
    },
    {
        id: 18,
        title: "Valorant",
        description: "Shooter táctico competitivo de Riot Games con personajes únicos.",
        image: "img/aefe3c7dbe39ef1da3f4241f4c6b771c535038fc-1920x1080.jpg",
        price: 0,
        originalPrice: 0,
        discount: 0,
        platforms: ["pc", "mobile"],
        genres: ["FPS", "Competitivo"],
        rating: 4.4,
        releaseYear: 2021,
        category: "popular"
    },

    {
        id: 19,
        title: "Halo Infinite",
        description: "El Master Chief regresa en esta nueva aventura de Halo.",
        image: "img/HaloInfinite.webp",
        price: 39.99,
        originalPrice: 59.99,
        discount: 33,
        platforms: ["pc", "xbox"],
        genres: ["FPS", "Ciencia Ficción"],
        rating: 4.3,
        releaseYear: 2022,
        category: "popular"
    },
    {
        id: 20,
        title: "Super Mario Odyssey",
        description: "Mario explora mundos únicos con su compañero Cappy.",
        image: "img/super-mario-odyssey_1.webp",
        price: 49.99,
        originalPrice: 59.99,
        discount: 16,
        platforms: ["nintendo"],
        genres: ["Plataformas", "Aventura"],
        rating: 4.8,
        releaseYear: 2022,
        category: "popular"
    },
    {
        id: 21,
        title: "PUBG Mobile",
        description: "Battle royale móvil con gráficos de alta calidad.",
        image: "img/PUBG-Mobile.jpg",
        price: 0,
        originalPrice: 0,
        discount: 0,
        platforms: ["mobile"],
        genres: ["Battle Royale", "Acción"],
        rating: 4.1,
        releaseYear: 2021,
        category: "popular"
    },
    {
        id: 22,
        title: "Ghost of Tsushima",
        description: "Aventura samurái en el Japón feudal con combate cinematográfico.",
        image: "img/ghosttsushima_3200883b.png",
        price: 34.99,
        originalPrice: 49.99,
        discount: 30,
        platforms: ["playstation", "pc"],
        genres: ["Acción", "Aventura"],
        rating: 4.7,
        releaseYear: 2022,
        category: "popular"
    },
    {
        id: 23,
        title: "Cyberpunk 2077",
        description: "RPG futurista en Night City con historia inmersiva.",
        image: "img/download.jpg",
        price: 29.99,
        originalPrice: 59.99,
        discount: 50,
        platforms: ["pc", "playstation", "xbox"],
        genres: ["RPG", "Ciencia Ficción"],
        rating: 4.2,
        releaseYear: 2022,
        category: "popular"
    },
    {
        id: 24,
        title: "Apex Legends",
        description: "Battle royale con héroes únicos y habilidades especiales.",
        image: "img/ss_13eb1c6837c8eb4a0cb016915d00c5bc94f8d5eb.1920x1080.jpg",
        price: 0,
        originalPrice: 0,
        discount: 0,
        platforms: ["pc", "playstation", "xbox", "mobile"],
        genres: ["Battle Royale", "FPS"],
        rating: 4.3,
        releaseYear: 2021,
        category: "popular"
    }
];

function getGamesByCategory(category) {
    return videogames.filter(game => game.category === category);
}

function getGamesByPlatform(platform) {
    if (platform === 'all') return videogames;
    return videogames.filter(game => game.platforms.includes(platform));
}

function searchGames(query) {
    return videogames.filter(game => 
        game.title.toLowerCase().includes(query.toLowerCase()) ||
        game.description.toLowerCase().includes(query.toLowerCase()) ||
        game.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
    );
}