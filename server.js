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
        caption: "Testbeeld voor de eigen homepage. Split screen blijft de kern van deze prototypefase.",
        postType: "image",
        imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
        videoUrl: "",
        mediaWidth: 4,
        mediaHeight: 3,
        feedKind: "normal",
        likes: 7,
        dislikes: [],
        hashtags: ["#prototype", "#split", "#design"],
        createdAt: Date.now() - 80000
      },
      {
        id: 4,
        ownerUserId: "u2",
        caption: "Korte video’s mogen compact blijven. 90 seconden voelt voor nu als een goed maximum.",
        postType: "video",
        imageUrl: "",
        videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        mediaWidth: 4,
        mediaHeight: 3,
        feedKind: "promoted",
        likes: 18,
        dislikes: [],
        hashtags: ["#video", "#format", "#prototype"],
        createdAt: Date.now() - 70000
      },
      {
        id: 5,
        ownerUserId: "u3",
        caption: "Als de homepage leeft, krijgt de feed meer context in plaats van alleen losse posts.",
        postType: "text",
        imageUrl: "",
        videoUrl: "",
        mediaWidth: 4,
        mediaHeight: 3,
        feedKind: "recommended",
        likes: 4,
        dislikes: [],
        hashtags: ["#context", "#community"],
        createdAt: Date.now() - 60000
      },
      {
        id: 6,
        ownerUserId: "u1",
        caption: "Uploadtest komt nu dichterbij. Eerst lokaal opslaan, daarna later echte productie-opslag.",
        postType: "text",
        imageUrl: "",
        videoUrl: "",
        mediaWidth: 4,
        mediaHeight: 3,
        feedKind: "normal",
        likes: 5,
        dislikes: [],
        hashtags: ["#upload", "#local", "#build"],
        createdAt: Date.now() - 50000
      }
    ],
    acceptedReactions: [
      {
        id: 1,
        targetUserId: "u2",
        fromUserId: "u1",
        text: "Je homepage voelt meteen persoonlijker dan een gewone profielpagina.",
        createdAt: Date.now() - 40000
      },
      {
        id: 2,
        targetUserId: "u1",
        fromUserId: "u2",
        text: "Je split screen idee maakt de relatie tussen maker en content veel duidelijker.",
        createdAt: Date.now() - 35000
      },
      {
        id: 3,
        targetUserId: "u3",
        fromUserId: "u2",
        text: "Sterk punt dat reacties naar de homepage gaan in plaats van onder elk item.",
        createdAt: Date.now() - 30000
      }
    ],
    pendingReactions: [
      {
        id: 4,
        targetUserId: "u1",
        fromUserId: "u3",
        text: "Zullen we later ook thema-achtergronden per gebruiker testen?",
        createdAt: Date.now() - 25000
      },
      {
        id: 5,
        targetUserId: "u1",
        fromUserId: "u2",
        text: "Upload met vaste 4:3 zou deze flow veel consistenter maken.",
        createdAt: Date.now() - 20000
      },
      {
        id: 6,
        targetUserId: "u2",
        fromUserId: "u1",
        text: "Je pagina werkt goed als maker-homepage naast je feed.",
        createdAt: Date.now() - 15000
      }
    ],
    friendRequests: [],
    friendships: [{ userA: "u1", userB: "u2", status: "accepted" }]
  };
}

function normalizeUser(user, fallbackUser = {}) {
  return {
    id: user?.id || fallbackUser.id || "",
    displayName: user?.displayName || fallbackUser.displayName || "Gebruiker",
    handle: user?.handle || fallbackUser.handle || "@gebruiker",
    bio: user?.bio || fallbackUser.bio || "Nieuwe gebruiker op het prototype.",
    avatarColor: user?.avatarColor || fallbackUser.avatarColor || "#dcc2ad",
    heroColor: user?.heroColor || fallbackUser.heroColor || "#f4e5d8",
    avatarUrl: user?.avatarUrl || fallbackUser.avatarUrl || "",
    backgroundUrl: user?.backgroundUrl || fallbackUser.backgroundUrl || "",
    homepageLikes: Number(user?.homepageLikes) || 0,
    blockedUsers: Array.isArray(user?.blockedUsers) ? user.blockedUsers : []
  };
}

function normalizeDb(raw) {
  const fallback = createInitialData();

  return {
    counters: {
      nextUserId: Number(raw?.counters?.nextUserId) || fallback.counters.nextUserId,
      nextPostId: Number(raw?.counters?.nextPostId) || fallback.counters.nextPostId,
      nextReactionId: Number(raw?.counters?.nextReactionId) || fallback.counters.nextReactionId,
      nextFriendRequestId:
        Number(raw?.counters?.nextFriendRequestId) || fallback.counters.nextFriendRequestId
    },
    users: Array.isArray(raw?.users)
      ? raw.users.map((user, index) => normalizeUser(user, fallback.users[index] || {}))
      : fallback.users,
    posts: Array.isArray(raw?.posts) ? raw.posts : fallback.posts,
    acceptedReactions: Array.isArray(raw?.acceptedReactions)
      ? raw.acceptedReactions
      : fallback.acceptedReactions,
    pendingReactions: Array.isArray(raw?.pendingReactions)
      ? raw.pendingReactions
      : fallback.pendingReactions,
    friendRequests: Array.isArray(raw?.friendRequests) ? raw.friendRequests : fallback.friendRequests,
    friendships: Array.isArray(raw?.friendships) ? raw.friendships : fallback.friendships
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
    const parsed = rawText ? JSON.parse(rawText) : {};
    const normalized = normalizeDb(parsed);
    fs.writeFileSync(dbPath, JSON.stringify(normalized, null, 2), "utf8");
    return normalized;
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

function mapReactionForClient(reaction) {
  return {
    ...reaction,
    fromUser: findUser(reaction.fromUserId) || null,
    targetUser: findUser(reaction.targetUserId) || null
  };
}

function mapPostForClient(post) {
  return {
    ...post,
    owner: findUser(post.ownerUserId) || null
  };
}

function areFriends(userA, userB) {
  return db.friendships.some(
    (item) =>
      item.status === "accepted" &&
      ((item.userA === userA && item.userB === userB) ||
        (item.userA === userB && item.userB === userA))
  );
}

function hasPendingFriendRequest(userA, userB) {
  return db.friendRequests.some(
    (item) =>
      item.status === "pending" &&
      ((item.requesterUserId === userA && item.targetUserId === userB) ||
        (item.requesterUserId === userB && item.targetUserId === userA))
  );
}

function getFriendshipStatus(viewerUserId, targetUserId) {
  if (!viewerUserId || !targetUserId || viewerUserId === targetUserId) return "self";
  if (areFriends(viewerUserId, targetUserId)) return "accepted";
  if (hasPendingFriendRequest(viewerUserId, targetUserId)) return "pending";
  return "none";
}

function getFriendCount(userId) {
  return db.friendships.filter(
    (item) => item.status === "accepted" && (item.userA === userId || item.userB === userId)
  ).length;
}

function sortFeedPosts(posts) {
  const feedWeight = {
    promoted: 3,
    recommended: 2,
    normal: 1
  };

  return [...posts].sort((a, b) => {
    const weightDiff = (feedWeight[b.feedKind] || 0) - (feedWeight[a.feedKind] || 0);
    if (weightDiff !== 0) return weightDiff;
    return (b.createdAt || 0) - (a.createdAt || 0);
  });
}

app.get("/", (_req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

app.get("/users", (_req, res) => {
  res.json(db.users);
});

app.post("/auth/name-login", (req, res) => {
  const rawName = String(req.body?.name || "").trim();

  if (!rawName) {
    return res.status(400).json({ message: "Naam ontbreekt." });
  }

  const normalizedName = rawName.toLowerCase();

  let existingUser = db.users.find(
    (user) =>
      String(user.displayName || "").trim().toLowerCase() === normalizedName ||
      String(user.handle || "").replace("@", "").trim().toLowerCase() === normalizedName
  );

  if (!existingUser) {
    const baseHandle = rawName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 16) || `user${db.counters.nextUserId}`;

    let handle = `@${baseHandle}`;
    let suffix = 1;

    while (db.users.some((user) => user.handle === handle)) {
      suffix += 1;
      handle = `@${baseHandle}${suffix}`;
    }

    existingUser = {
      id: `u${db.counters.nextUserId++}`,
      displayName: rawName,
      handle,
      bio: "Nieuwe gebruiker op het prototype.",
      avatarColor: "#dcc2ad",
      heroColor: "#f4e5d8",
      avatarUrl: "",
      backgroundUrl: "",
      homepageLikes: 0,
      blockedUsers: []
    };

    db.users.push(existingUser);
    saveDb();
  }

  res.json({ success: true, user: existingUser });
});

app.post("/users/:userId/profile-media", upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "background", maxCount: 1 }
]), (req, res) => {
  const user = findUser(req.params.userId);

  if (!user) {
    return res.status(404).json({ message: "Gebruiker niet gevonden." });
  }

  const files = req.files || {};
  const baseUrl = getBaseUrl(req);

  if (files.avatar?.[0]) {
    user.avatarUrl = `${baseUrl}/uploads/${files.avatar[0].filename}`;
  }

  if (files.background?.[0]) {
    user.backgroundUrl = `${baseUrl}/uploads/${files.background[0].filename}`;
  }

  saveDb();
  res.json({ success: true, user });
});

app.get("/feed", (req, res) => {
  const userId = req.query.userId || "";
  const items = sortFeedPosts(db.posts)
    .filter((post) => !post.dislikes.includes(userId))
    .map(mapPostForClient);

  res.json({
    viewerUserId: userId,
    items
  });
});

app.get("/frontpage/:userId", (req, res) => {
  const targetUserId = req.params.userId;
  const viewerUserId = req.query.viewerUserId || "";

  const user = findUser(targetUserId);
  if (!user) {
    return res.status(404).json({ message: "Gebruiker niet gevonden." });
  }

  const userPosts = db.posts
    .filter((post) => post.ownerUserId === targetUserId)
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(mapPostForClient);

  const approved = db.acceptedReactions
    .filter((reaction) => reaction.targetUserId === targetUserId)
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(mapReactionForClient);

  const pending = db.pendingReactions
    .filter((reaction) => reaction.targetUserId === targetUserId)
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(mapReactionForClient);

  res.json({
    user,
    friendshipStatus: getFriendshipStatus(viewerUserId, targetUserId),
    stats: {
      posts: userPosts.length,
      homepageLikes: user.homepageLikes,
      reactions: approved.length,
      friends: getFriendCount(targetUserId)
    },
    recentPosts: userPosts,
    acceptedReactions: approved,
    pendingReactions: pending
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

app.post("/posts/:postId/like", (req, res) => {
  const post = db.posts.find((item) => item.id === Number(req.params.postId));
  if (!post) {
    return res.status(404).json({ message: "Post niet gevonden." });
  }

  post.likes += 1;
  saveDb();
  res.json({ success: true, likes: post.likes });
});

app.post("/posts/:postId/dislike", (req, res) => {
  const post = db.posts.find((item) => item.id === Number(req.params.postId));
  if (!post) {
    return res.status(404).json({ message: "Post niet gevonden." });
  }

  const viewerUserId = req.body.viewerUserId;
  if (!viewerUserId) {
    return res.status(400).json({ message: "viewerUserId ontbreekt." });
  }

  if (!post.dislikes.includes(viewerUserId)) {
    post.dislikes.push(viewerUserId);
    saveDb();
  }

  res.json({ success: true });
});

app.post("/posts/:postId/delete", (req, res) => {
  const postId = Number(req.params.postId);
  const ownerUserId = String(req.body?.ownerUserId || "").trim();
  const index = db.posts.findIndex((item) => item.id === postId);

  if (index === -1) {
    return res.status(404).json({ message: "Post niet gevonden." });
  }

  if (!ownerUserId) {
    return res.status(400).json({ message: "ownerUserId ontbreekt." });
  }

  const post = db.posts[index];
  if (post.ownerUserId !== ownerUserId) {
    return res.status(403).json({ message: "Je kunt alleen je eigen posts verwijderen." });
  }

  [post.imageUrl, post.videoUrl].forEach((fileUrl) => {
    if (!fileUrl || !String(fileUrl).includes("/uploads/")) return;
    const fileName = decodeURIComponent(String(fileUrl).split("/uploads/")[1] || "");
    if (!fileName) return;
    const absolutePath = path.join(uploadsDir, path.basename(fileName));
    if (fs.existsSync(absolutePath)) {
      try {
        fs.unlinkSync(absolutePath);
      } catch (error) {
        console.warn("Kon upload niet verwijderen:", absolutePath, error.message);
      }
    }
  });

  db.posts.splice(index, 1);
  saveDb();
  res.json({ success: true, deletedPostId: postId });
});

app.post("/frontpage/:userId/like", (req, res) => {
  const user = findUser(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "Gebruiker niet gevonden." });
  }

  user.homepageLikes += 1;
  saveDb();
  res.json({ success: true, homepageLikes: user.homepageLikes });
});

app.post("/frontpage/:userId/react", (req, res) => {
  const targetUserId = req.params.userId;
  const { fromUserId, text } = req.body;

  const targetUser = findUser(targetUserId);
  const fromUser = findUser(fromUserId);

  if (!targetUser || !fromUser) {
    return res.status(400).json({ message: "Ongeldige gebruiker." });
  }

  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Reactie is leeg." });
  }

  if (targetUser.blockedUsers.includes(fromUserId)) {
    return res.status(403).json({ message: "Je bent geblokkeerd voor deze homepage." });
  }

  const newReaction = {
    id: db.counters.nextReactionId++,
    targetUserId,
    fromUserId,
    text: text.trim(),
    createdAt: Date.now()
  };

  db.pendingReactions.push(newReaction);
  saveDb();
  res.json({ success: true, reaction: mapReactionForClient(newReaction) });
});

app.post("/frontpage/:userId/reactions/:reactionId/approve", (req, res) => {
  const targetUserId = req.params.userId;
  const reactionId = Number(req.params.reactionId);

  const index = db.pendingReactions.findIndex(
    (reaction) => reaction.id === reactionId && reaction.targetUserId === targetUserId
  );

  if (index === -1) {
    return res.status(404).json({ message: "Pending reactie niet gevonden." });
  }

  const [reaction] = db.pendingReactions.splice(index, 1);
  db.acceptedReactions.push(reaction);
  saveDb();

  res.json({ success: true });
});

app.post("/frontpage/:userId/reactions/:reactionId/reject", (req, res) => {
  const targetUserId = req.params.userId;
  const reactionId = Number(req.params.reactionId);

  const index = db.pendingReactions.findIndex(
    (reaction) => reaction.id === reactionId && reaction.targetUserId === targetUserId
  );

  if (index === -1) {
    return res.status(404).json({ message: "Pending reactie niet gevonden." });
  }

  db.pendingReactions.splice(index, 1);
  saveDb();
  res.json({ success: true });
});

app.post("/frontpage/:userId/reactions/:reactionId/block", (req, res) => {
  const targetUserId = req.params.userId;
  const reactionId = Number(req.params.reactionId);

  const targetUser = findUser(targetUserId);
  if (!targetUser) {
    return res.status(404).json({ message: "Gebruiker niet gevonden." });
  }

  const index = db.pendingReactions.findIndex(
    (reaction) => reaction.id === reactionId && reaction.targetUserId === targetUserId
  );

  if (index === -1) {
    return res.status(404).json({ message: "Pending reactie niet gevonden." });
  }

  const [reaction] = db.pendingReactions.splice(index, 1);
  if (!targetUser.blockedUsers.includes(reaction.fromUserId)) {
    targetUser.blockedUsers.push(reaction.fromUserId);
  }
  saveDb();

  res.json({ success: true });
});

app.post("/friends/request", (req, res) => {
  const { requesterUserId, targetUserId } = req.body;

  if (!requesterUserId || !targetUserId) {
    return res.status(400).json({ message: "Gebruikers ontbreken." });
  }

  if (requesterUserId === targetUserId) {
    return res.status(400).json({ message: "Je kunt jezelf niet toevoegen." });
  }

  const requester = findUser(requesterUserId);
  const target = findUser(targetUserId);

  if (!requester || !target) {
    return res.status(400).json({ message: "Ongeldige gebruiker." });
  }

  const status = getFriendshipStatus(requesterUserId, targetUserId);
  if (status === "accepted") {
    return res.status(400).json({ message: "Jullie zijn al vrienden." });
  }

  if (status === "pending") {
    return res.status(400).json({ message: "Er bestaat al een verzoek." });
  }

  db.friendRequests.push({
    id: db.counters.nextFriendRequestId++,
    requesterUserId,
    targetUserId,
    status: "pending",
    createdAt: Date.now()
  });

  saveDb();
  res.json({ success: true });
});

app.get("/debug/db", (_req, res) => {
  res.json({
    dbPath,
    counters: db.counters,
    totals: {
      users: db.users.length,
      posts: db.posts.length,
      acceptedReactions: db.acceptedReactions.length,
      pendingReactions: db.pendingReactions.length,
      friendRequests: db.friendRequests.length,
      friendships: db.friendships.length
    }
  });
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
  console.log(`Frontend map: ${frontendDir}`);
  console.log(`Persistente data: ${dbPath}`);
});