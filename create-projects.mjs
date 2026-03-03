/**
 * Script de création de 15 projets fictifs dans Sanity
 * Usage : SANITY_TOKEN=sk... node create-projects.mjs
 */

const PROJECT_ID = 'nt5y9ye7';
const DATASET    = 'production';
const TOKEN      = process.env.SANITY_TOKEN;

if (!TOKEN) {
  console.error('❌  Token manquant. Lance : SANITY_TOKEN=sk... node create-projects.mjs');
  process.exit(1);
}

// ── Images existantes (récupérées depuis Sanity) ──
const IMAGES = [
  'image-1d98e3b78c0db49a3c91e6b318cbf3c29d03e3ff-1200x1531-jpg', // portrait — Lumière Brute
  'image-68285a22eaebd3eec3671eb3a0a123b3423ff72e-1200x800-jpg',  // paysage — Silhouettes
  'image-89b53df7a93955d1a6d7543fb64c5c3d3e9aceeb-1200x800-jpg',  // paysage — Identité Matière
];

// ── Vidéos Mux existantes ──
const MUX = [
  '3n2RHKDlhMvi9rttLq005XXT0001TjwGmNFeb2ft015j3e8', // EXPORT_1
  'OoZrsAhmxCogxtLRezTcCAPuqJR02kXBg4wz731DMqCo',    // EXPORT_2
  'FX7wrRM87KWumTL8OMMucHgp00Q9RAbdmT99hMuTQmFo',    // EXPORT_3
];

const img  = (i) => ({ _type: 'image', asset: { _type: 'reference', _ref: IMAGES[i % IMAGES.length] } });
const mux  = (i) => ([{ _key: `v${i}`, _type: 'object', title: 'Film', muxPlaybackId: MUX[i % MUX.length], aspectRatio: '16/9' }]);
const slug = (t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const PROJECTS = [
  {
    title: 'Fragment Noir',
    category: 'Photo',
    year: 2024,
    img: 0,
    video: 0,
    description: 'Une série autour de la fragmentation du corps dans l\'espace — ombres découpées, matières brutes et lumière sculptée.',
    challenge: 'Comment représenter l\'absence sans que le cadre soit vide ? La série travaille le manque comme forme positive.',
    approach: 'Prises de vue en studio avec éclairage latéral unique, sur fond de béton brut. Aucune retouche sur la forme.',
  },
  {
    title: 'Eau Profonde',
    category: 'Vidéo',
    year: 2023,
    img: 1,
    video: 1,
    description: 'Court-métrage expérimental sur la notion de profondeur — visuelle, sonore et émotionnelle.',
    challenge: 'Traduire la sensation d\'immersion sans avoir recours à l\'eau réelle. Tout est construit en post-production.',
    approach: 'Tournage à sec avec capteurs de mouvement. La texture aquatique est recréée par calques de distorsion optique.',
  },
  {
    title: 'Corps Céleste',
    category: 'Direction',
    year: 2024,
    img: 2,
    video: 2,
    description: 'Direction artistique pour une collection automne-hiver. L\'axe : l\'astronomie comme métaphore de la solitude élégante.',
    challenge: 'Aligner la vision de la marque — très classique — avec une esthétique céleste et abstraite sans rupture.',
    approach: 'Références aux peintures de Caspar David Friedrich et aux photographies de la NASA des années 70. Palette froide et or.',
  },
  {
    title: 'Peau de Verre',
    category: 'Photo',
    year: 2022,
    img: 0,
    video: 0,
    description: 'Portrait éditorial pour une publication de mode indépendante. La peau comme surface, comme archive, comme mensonge.',
    challenge: 'Trouver une tension entre la douceur du sujet et la dureté du medium photographique.',
    approach: 'Film argentique 4×5, lumière naturelle filtrée par du verre dépoli. Post-traitement minimaliste pour garder le grain.',
  },
  {
    title: 'Éclipse',
    category: 'Vidéo',
    year: 2023,
    img: 1,
    video: 2,
    description: 'Clip vidéo pour une artiste électro-ambient. L\'image suit l\'architecture sonore du morceau, mesure par mesure.',
    challenge: 'Synchroniser visuellement un morceau de 6 minutes sans tomber dans le VJing ou l\'illustration triviale.',
    approach: 'Tournage de matière — verre, eau, fumée — image par image, puis édition sur grille rythmique. Aucun acteur, aucun texte.',
  },
  {
    title: 'Matière Vivante',
    category: 'Direction',
    year: 2024,
    img: 2,
    video: 1,
    description: 'Campagne pour un studio de design mobilier. L\'objet conçu comme organisme — il respire, il vieillit, il se transforme.',
    challenge: 'Rendre désirable un objet brut, non fini, qui revendique ses défauts comme signature.',
    approach: 'Séances de prise de vue évolutives sur 3 semaines — même objet, même cadrage, lumière naturelle changeante. Storytelling du temps.',
  },
  {
    title: 'Heure Bleue',
    category: 'Photo',
    year: 2023,
    img: 1,
    video: 0,
    description: 'Série personnelle sur le crépuscule urbain. La ville entre chien et loup — ni nuit, ni jour, juste le bord.',
    challenge: 'Capturer une fenêtre de lumière de moins de 20 minutes par jour, sur 30 jours consécutifs.',
    approach: 'Repérages minutieux en amont, cadrage fixe sur trépied. La variation n\'est due qu\'à la lumière et aux passants.',
  },
  {
    title: 'Surfaces',
    category: 'Vidéo',
    year: 2022,
    img: 0,
    video: 2,
    description: 'Film de présentation pour un cabinet d\'architecture. La surface comme première promesse d\'un espace.',
    challenge: 'Montrer des espaces inhabités sans qu\'ils paraissent froids ou inachevés.',
    approach: 'Lumière rasante en fin de journée. Plan-séquence lent sur steadicam. Son capturé in-situ, aucune musique ajoutée.',
  },
  {
    title: 'Retour Sauvage',
    category: 'Direction',
    year: 2023,
    img: 2,
    video: 1,
    description: 'Direction artistique pour un parfum "retour aux origines". Odeur de terre mouillée, de bois brûlé, de sel.',
    challenge: 'Traduire des sensations olfactives en image sans tomber dans les clichés nature-et-liberté des fragrances classiques.',
    approach: 'Visuels centrés sur la matière brute — pas de paysage, pas de visage. Gros plans texturés et lumière ambrée saturée.',
  },
  {
    title: 'Abstrait Blanc',
    category: 'Photo',
    year: 2024,
    img: 1,
    video: 0,
    description: 'Studio series sur la monochromie blanche — vêtement, fond, modèle. Où s\'arrête l\'un, où commence l\'autre.',
    challenge: 'Éviter l\'écrasement des valeurs et maintenir une profondeur lisible dans un environnement saturé de blanc.',
    approach: 'Éclairage à 9 sources indépendantes pour contrôler chaque zone de blanc séparément. Post-prod millimétrée des niveaux.',
  },
  {
    title: 'Tension Douce',
    category: 'Vidéo',
    year: 2022,
    img: 0,
    video: 0,
    description: 'Danse filmée. La chorégraphe Claire Renard explore la contradiction entre immobilité et élan.',
    challenge: 'Filmer la danse contemporaine sans la trahir — sans la rendre spectaculaire quand elle est intime.',
    approach: 'Caméra portée à main levée, très proche. Coupes longues. Le montage respecte le souffle de la danseuse.',
  },
  {
    title: 'Miroir Noir',
    category: 'Direction',
    year: 2024,
    img: 2,
    video: 2,
    description: 'Identité visuelle et campagne pour une marque d\'horlogerie de niche. Temps suspendu, matière noire, précision absolue.',
    challenge: 'Concurrencer les grandes maisons avec un budget limité, sans perdre l\'exigence du haut de gamme.',
    approach: 'Investissement total sur la lumière et le cadrage. Zéro compromis sur le produit. Équipe réduite à 3 personnes.',
  },
  {
    title: 'Solstice',
    category: 'Photo',
    year: 2023,
    img: 0,
    video: 0,
    description: 'Commande éditoriale autour du solstice d\'été. La lumière maximale comme sujette principale de l\'image.',
    challenge: 'Travailler à midi en plein soleil — la condition la plus difficile pour la photographie de portrait.',
    approach: 'Contre-emploi systématique des règles : surexposition assumée, ombres dures cultivées, yeux mi-clos des sujets.',
  },
  {
    title: 'Ruines',
    category: 'Vidéo',
    year: 2024,
    img: 1,
    video: 1,
    description: 'Documentaire de création sur un site industriel abandonné en région parisienne. La mémoire du travail.',
    challenge: 'Rendre hommage sans nostalgie creuse. Trouver la beauté sans romantiser la précarité.',
    approach: 'Entretiens filmés sur place, lumière naturelle seule. Son atmosphérique. Montage alterné passé/présent.',
  },
  {
    title: 'Présence',
    category: 'Direction',
    year: 2022,
    img: 2,
    video: 0,
    description: 'Campagne institutionnelle pour un musée d\'art contemporain. L\'art comme espace de présence pure.',
    challenge: 'Parler d\'art sans montrer les œuvres — confidentialité des artistes avant l\'ouverture.',
    approach: 'Les visiteurs comme matière. Des silhouettes dans l\'espace, des mains, des nuques. La contemplation comme sujet.',
  },
];

function makeDoc(p, idx) {
  return {
    _type: 'project',
    title: p.title,
    slug: { _type: 'slug', current: slug(p.title) },
    category: p.category,
    year: p.year,
    mainImage: img(p.img),
    description: p.description,
    challenge: p.challenge,
    approach: p.approach,
    videos: p.video !== undefined ? mux(p.video) : [],
  };
}

async function run() {
  const mutations = PROJECTS.map((p, i) => ({ create: makeDoc(p, i) }));

  const body = JSON.stringify({ mutations });
  const url  = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${DATASET}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body,
  });

  const json = await res.json();

  if (!res.ok) {
    console.error('❌  Erreur Sanity :', JSON.stringify(json, null, 2));
    process.exit(1);
  }

  const ids = json.results?.map(r => r.id) ?? [];
  console.log(`✅  ${ids.length} projets créés :`);
  PROJECTS.forEach((p, i) => console.log(`   ${String(i+1).padStart(2,'0')}. ${p.title} (${p.category}, ${p.year})`));
}

run().catch(e => { console.error(e); process.exit(1); });
