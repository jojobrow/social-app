const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const frontendDir = path.join(__dirname, "frontend");
const uploadsDir = path.join(__dirname, "uploads");
const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "db.json");

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

ensureDir(uploadsDir);
ensureDir(dataDir);

app.use(express.static(frontendDir));
app.use("/uploads", express.static(uploadsDir));

const imageMimeTypes = ["image/jpeg", "image/png", "image/webp"];
const videoMimeTypes = ["video/mp4", "video/webm"];
const allowedMimeTypes = [...imageMimeTypes, ...videoMimeTypes];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Alleen jpg, jpeg, png, webp, mp4 en webm zijn toegestaan."));
    }
    cb(null, true);
  }
});

function getBaseUrl(req) {
  return `${req.protocol}://${req.get("host")}`;
}

function createInitialData() {
  return {
    counters: {
      nextUserId: 4,
      nextPostId: 7,
      nextReactionId: 7,
      nextFriendRequestId: 1
    },
    users: [
      {
        id: "u1",
        displayName: "Johannes",
        handle: "@johannes",
        bio: "Bouwt aan een nieuw social concept waarin de homepage centraler is dan de feed.",
        avatarColor: "#dcc2ad",
        heroColor: "#f4e5d8",
        avatarUrl: "",
        backgroundUrl: "",
        homepageLikes: 14,
        blockedUsers: []
      },
      {
        id: "u2",
        displayName: "Emma",
        handle: "@emma",
        bio: "Visuele maker. Houdt van zachte layouts, beeld, sfeer en korte videoformats.",
        avatarColor: "#e7cfc4",
        heroColor: "#faeee7",
        avatarUrl: "",
        backgroundUrl: "",
        homepageLikes: 21,
        blockedUsers: []
      },
      {
        id: "u3",
        displayName: "Milan",
        handle: "@milan",
        bio: "Experimenteert met communities, reactiestructuren en sociale patronen.",
        avatarColor: "#d7c3b4",
        heroColor: "#efe2d7",
        avatarUrl: "",
        backgroundUrl: "",
        homepageLikes: 9,
        blockedUsers: []
      }
    ],
    posts: [
      {
        id: 1,
        ownerUserId: "u2",
        caption: "Nieuwe sfeerimpressie voor mijn pagina. De homepage moet echt voelen als mijn plek.",
        postType: "image",
        imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
        videoUrl: "",
        mediaWidth: 4,
        mediaHeight: 3,
        feedKind: "recommended",
        likes: 12,
        dislikes: [],
        hashtags: ["#homepage", "#visual", "#creator"],
        createdAt: Date.now() - 100000
      },
      {
        id: 2,
        ownerUserId: "u3",
        caption: "Tekstpost: reacties horen niet onder de post, maar op de homepage van de maker.",
        postType: "text",
        imageUrl: "",
        videoUrl: "",
        mediaWidth: 4,
        mediaHeight: 3,
        feedKind: "normal",
        likes: 6,
        dislikes: [],
        hashtags: ["#concept", "#social", "#frontpage"],
        createdAt: Date.now() - 90000
      },
      {
        id: 3,
        ownerUserId: "u1",
        caption: "Testbeeld voor de eigen homepage.",
        postType: "image",
        imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
        videoUrl: "",
        mediaWidth: 4,
        mediaHeight: 3,
        feedKind: "normal",
        likes: 7,
        dislikes: [],
        hashtags: ["#prototype", "#design"],
        createdAt: Date.now() - 80000
      }
    ],
    acceptedReactions: [],
    pendingReactions: [],
    friendRequests: [],
    friendships: [{ userA: "u1", userB: "u2", status: "accepted" }]
  };
}

function loadDb() {
  if (!fs.existsSync(dbPath)) {
    const initialData = createInitialData();
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), "utf8");
    return initialData;
  }

  try {
    const rawText = fs.readFileSync(dbPath, "utf8");
    return rawText ? JSON.parse(rawText) : createInitialData();
  } catch (error) {
    console.error("Kon data/db.json niet lezen. Er wordt een nieuwe basisdatabase gemaakt.", error);
    const fallback = createInitialData();
    fs.writeFileSync(dbPath, JSON.stringify(fallback, null, 2), "utf8");
    return fallback;
  }
}

let db = loadDb();

function saveDb() {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");
}

function findUser(userId) {
  return db.users.find((user) => user.id === userId);
}

function mapPostForClient(post) {
  return {
    ...post,
    owner: findUser(post.ownerUserId) || null
  };
}

function slugifyName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 18);
}

function buildUniqueHandle(displayName, ignoreUserId = "") {
  const base = slugifyName(displayName) || "gebruiker";
  let handleCore = base;
  let suffix = 1;

  while (
    db.users.some(
      (user) =>
        user.id !== ignoreUserId &&
        String(user.handle || "").toLowerCase() === `@${handleCore}`.toLowerCase()
    )
  ) {
    suffix += 1;
    handleCore = `${base}${suffix}`;
  }

  return `@${handleCore}`;
}

function pickPalette(index) {
  const palettes = [
    { avatarColor: "#dcc2ad", heroColor: "#f4e5d8" },
    { avatarColor: "#e7cfc4", heroColor: "#faeee7" },
    { avatarColor: "#d7c3b4", heroColor: "#efe2d7" },
    { avatarColor: "#ddc6bc", heroColor: "#f6e7df" }
  ];
  return palettes[index % palettes.length];
}

function createUserFromName(displayName) {
  const trimmedName = String(displayName || "").trim();
  const palette = pickPalette(db.users.length);

  const newUser = {
    id: `u${db.counters?.nextUserId || db.users.length + 1}`,
    displayName: trimmedName,
    handle: buildUniqueHandle(trimmedName),
    bio: "Nieuwe gebruiker op het prototype.",
    avatarColor: palette.avatarColor,
    heroColor: palette.heroColor,
    avatarUrl: "",
    backgroundUrl: "",
    homepageLikes: 0,
    blockedUsers: []
  };

  if (!db.counters) {
    db.counters = { nextUserId: db.users.length + 2, nextPostId: 10, nextReactionId: 1, nextFriendRequestId: 1 };
  } else {
    db.counters.nextUserId += 1;
  }

  db.users.push(newUser);
  saveDb();
  return newUser;
}

function findUserByDisplayName(displayName) {
  const normalized = String(displayName || "").trim().toLowerCase();
  return db.users.find((user) => String(user.displayName || "").trim().toLowerCase() === normalized);
}

app.get("/", (_req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

app.get("/users", (_req, res) => {
  res.json(db.users);
});

app.post("/auth/name-login", (req, res) => {
  const displayName = String(req.body?.displayName || "").trim();

  if (!displayName) {
    return res.status(400).json({ message: "Naam is verplicht." });
  }

  let user = findUserByDisplayName(displayName);
  let created = false;

  if (!user) {
    user = createUserFromName(displayName);
    created = true;
  }

  res.json({
    success: true,
    created,
    user
  });
});

app.get("/feed", (req, res) => {
  const userId = req.query.userId || "u1";
  const items = [...db.posts].sort((a, b) => b.createdAt - a.createdAt).map(mapPostForClient);

  res.json({
    viewerUserId: userId,
    items
  });
});

app.get("/frontpage/:userId", (req, res) => {
  const user = findUser(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "Gebruiker niet gevonden." });
  }

  const userPosts = db.posts
    .filter((post) => post.ownerUserId === req.params.userId)
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(mapPostForClient);

  res.json({
    user,
    stats: {
      posts: userPosts.length,
      homepageLikes: user.homepageLikes || 0,
      reactions: 0,
      friends: 0
    },
    recentPosts: userPosts,
    acceptedReactions: [],
    pendingReactions: []
  });
});

app.post("/upload-media", upload.single("media"), (req, res) => {
  const ownerUserId = req.body.ownerUserId;
  const owner = findUser(ownerUserId);

  if (!owner) {
    return res.status(400).json({ message: "Ongeldige gebruiker." });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Geen bestand ontvangen." });
  }

  const fileUrl = `${getBaseUrl(req)}/uploads/${req.file.filename}`;
  const isVideo = videoMimeTypes.includes(req.file.mimetype);
  const isImage = imageMimeTypes.includes(req.file.mimetype);

  if (!isVideo && !isImage) {
    return res.status(400).json({ message: "Ongeldig bestandstype." });
  }

  res.json({
    url: fileUrl,
    postType: isVideo ? "video" : "image",
    mediaWidth: 4,
    mediaHeight: 3,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size
  });
});

app.post("/posts", (req, res) => {
  const {
    ownerUserId,
    caption = "",
    imageUrl = "",
    videoUrl = "",
    hashtags = [],
    feedKind = "normal"
  } = req.body;

  const owner = findUser(ownerUserId);
  if (!owner) {
    return res.status(400).json({ message: "Ongeldige gebruiker." });
  }

  let postType = "text";
  if (videoUrl) postType = "video";
  else if (imageUrl) postType = "image";

  if (!db.counters) {
    db.counters = { nextUserId: db.users.length + 1, nextPostId: db.posts.length + 1, nextReactionId: 1, nextFriendRequestId: 1 };
  }

  const newPost = {
    id: db.counters.nextPostId++,
    ownerUserId,
    caption,
    postType,
    imageUrl,
    videoUrl,
    mediaWidth: 4,
    mediaHeight: 3,
    feedKind,
    likes: 0,
    dislikes: [],
    hashtags: Array.isArray(hashtags) ? hashtags : [],
    createdAt: Date.now()
  };

  db.posts.push(newPost);
  saveDb();
  res.json(mapPostForClient(newPost));
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "Bestand is te groot. Maximaal 25 MB." });
    }
    return res.status(400).json({ message: error.message });
  }

  if (error) {
    return res.status(400).json({ message: error.message || "Er ging iets mis." });
  }

  res.status(500).json({ message: "Onbekende fout." });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server draait op poort ${PORT}`);
});