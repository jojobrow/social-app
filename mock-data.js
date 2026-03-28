function applyMockData(db, saveDb, hashPassword) {
function ensureMockData() {
  function ensureMockPassword(user) {
    const id = String(user?.id || "");
    const isMockUser = /^u10\d$/.test(id) || /^u11\d$/.test(id);
    if (isMockUser && (!user.passwordSalt || !user.passwordHash)) {
      user.passwordSalt = "seed-mock-salt";
      user.passwordHash = hashPassword("1234", "seed-mock-salt");
      return true;
    }
    return false;
  }

  const mockUsers = [
    { id: "u100", displayName: "Noor", handle: "@noor", bio: "Fotografie, zachte tinten en kleine observaties.", avatarColor: "#d7bea6", heroColor: "#f2e4d7", homepageLikes: 17 },
    { id: "u101", displayName: "Levi", handle: "@levi", bio: "Korte video’s, montage en ritme.", avatarColor: "#d7c8bb", heroColor: "#f0e6dd", homepageLikes: 11 },
    { id: "u102", displayName: "Sara", handle: "@sara", bio: "Tekst, sfeer en publieke notities.", avatarColor: "#d6b9a7", heroColor: "#f3e0d6", homepageLikes: 24 },
    { id: "u103", displayName: "Ruben", handle: "@ruben", bio: "Maakt visuele dagboeken en experimenten.", avatarColor: "#cdb39d", heroColor: "#ebdacd", homepageLikes: 7 },
    { id: "u104", displayName: "Yara", handle: "@yara", bio: "Lichte layouts, modebeelden en detailshots.", avatarColor: "#e3cdbd", heroColor: "#f7ece3", homepageLikes: 28 },
    { id: "u105", displayName: "Daan", handle: "@daan", bio: "Ziet community meer als ruimte dan als feed.", avatarColor: "#c7b09d", heroColor: "#e9ddd4", homepageLikes: 9 },
    { id: "u106", displayName: "Lotte", handle: "@lotte", bio: "Korte captions, rustige beelden, zachte video.", avatarColor: "#dcc9bb", heroColor: "#f6ece5", homepageLikes: 19 },
    { id: "u107", displayName: "Sam", handle: "@sam", bio: "Test nieuwe formats voor makers en vrienden.", avatarColor: "#cdbdac", heroColor: "#f0e7df", homepageLikes: 13 },
    { id: "u108", displayName: "Tess", handle: "@tess", bio: "Portretten, achtergronden en homepage-sfeer.", avatarColor: "#dec9b8", heroColor: "#f6e7dc", homepageLikes: 22 },
    { id: "u109", displayName: "Mats", handle: "@mats", bio: "Bouwt aan ritme in feeds zonder chaos.", avatarColor: "#ccb49f", heroColor: "#ebddd2", homepageLikes: 6 },
    { id: "u110", displayName: "Nina", handle: "@nina", bio: "Kleine essays in captionvorm.", avatarColor: "#dcc6b5", heroColor: "#f5e8de", homepageLikes: 27 },
    { id: "u111", displayName: "Bram", handle: "@bram", bio: "Vriendschap eerst, algoritme later.", avatarColor: "#c8af99", heroColor: "#eadbd0", homepageLikes: 8 },
    { id: "u112", displayName: "Zoë", handle: "@zoe", bio: "Publieke reacties horen bij de maker, niet bij de losse post.", avatarColor: "#e1cec1", heroColor: "#f9eee7", homepageLikes: 31 },
    { id: "u113", displayName: "Jules", handle: "@jules", bio: "Werkt met text-only kaarten en kleurvlakken.", avatarColor: "#d2bdad", heroColor: "#f0e1d6", homepageLikes: 12 },
    { id: "u114", displayName: "Isa", handle: "@isa", bio: "Mengt video en tekst in rustige series.", avatarColor: "#dbc7b8", heroColor: "#f4e8df", homepageLikes: 16 },
    { id: "u115", displayName: "Floris", handle: "@floris", bio: "Nuchtere notities over hoe socials anders kunnen.", avatarColor: "#cab39e", heroColor: "#ebddd1", homepageLikes: 10 },
    { id: "u116", displayName: "Lina", handle: "@lina", bio: "Verzamelt zachte beelden uit alledaagse momenten.", avatarColor: "#e4d1c4", heroColor: "#fbf1ea", homepageLikes: 26 },
    { id: "u117", displayName: "Mika", handle: "@mika", bio: "Wil dat makers weer als mensen voelen.", avatarColor: "#cfbaa8", heroColor: "#efe1d7", homepageLikes: 14 },
    { id: "u118", displayName: "Fien", handle: "@fien", bio: "Combineert screenshots, quotes en stille video.", avatarColor: "#d8c3b2", heroColor: "#f3e6dc", homepageLikes: 18 },
    { id: "u119", displayName: "Olivier", handle: "@olivier", bio: "Bouwt aan social flows met minder verslavend gedrag.", avatarColor: "#cdb4a3", heroColor: "#ecddd1", homepageLikes: 15 }
    { id: "u140", displayName: "Eduard", handle: "@eduard", bio: "Rustige updates, familiebeelden en warme homepage-sfeer.", avatarColor: "#c9b29d", heroColor: "#eadcd0", homepageLikes: 13, backgroundUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80" },
    { id: "u141", displayName: "Grada", handle: "@grada", bio: "Lieve portretten, zachte kleuren en kleine familiemomenten.", avatarColor: "#e2cdbf", heroColor: "#faeee6", homepageLikes: 17, backgroundUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80" }
  ];

  const imagePool = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=80"
  ];

  const textCaptions = [
    "Mijn homepage voelt meer als een kamer dan als een profiel.",
    "De feed is handig, maar de maker moet voelbaar centraal blijven.",
    "Publieke reacties horen hier op de voorpagina van de maker.",
    "Ik wil dat vrienden eerst voelen wie iemand is, pas daarna wat iemand post.",
    "Niet elke post hoeft een los eiland te zijn.",
    "Een zachte feed voelt minder agressief dan eindeloos losse prikkels.",
    "Als je de maker vindt, krijgt de content meer betekenis.",
    "Social hoeft niet altijd lawaaierig te zijn."
  ];

  const hashtagsPool = [
    ["#homepage", "#maker", "#concept"],
    ["#creator", "#feed", "#social"],
    ["#frontpage", "#friends", "#context"],
    ["#video", "#image", "#text"],
    ["#community", "#prototype", "#maker"],
    ["#design", "#homepage", "#social"]
  ];

  let changed = false;

  mockUsers.forEach((mock, index) => {
    const existingUser = db.users.find((user) => user.id === mock.id);
    if (existingUser) {
      if (ensureMockPassword(existingUser)) changed = true;
    }

    if (!existingUser) {
      db.users.push({
        id: mock.id,
        displayName: mock.displayName,
        handle: mock.handle,
        bio: mock.bio,
        avatarColor: mock.avatarColor,
        heroColor: mock.heroColor,
        avatarUrl: "",
        backgroundUrl: "",
        homepageLikes: mock.homepageLikes,
        blockedUsers: [],
        passwordSalt: "seed-mock-salt",
        passwordHash: hashPassword("1234", "seed-mock-salt")
      });
      changed = true;
    }

    const hasMockPosts = db.posts.some((post) => post.ownerUserId === mock.id);
    if (!hasMockPosts) {
      const baseCreatedAt = Date.now() - ((index + 10) * 55000);
      const imageUrl = imagePool[index % imagePool.length];
      const hashtags = hashtagsPool[index % hashtagsPool.length];
      const feedKind = index % 5 === 0 ? "recommended" : index % 7 === 0 ? "promoted" : "normal";

      db.posts.push({
        id: db.counters.nextPostId++,
        ownerUserId: mock.id,
        caption: textCaptions[index % textCaptions.length],
        postType: "image",
        imageUrl,
        videoUrl: "",
        mediaWidth: 4,
        mediaHeight: 3,
        feedKind,
        likes: 3 + (index % 12),
        dislikes: [],
        hashtags,
        createdAt: baseCreatedAt
      });

      db.posts.push({
        id: db.counters.nextPostId++,
        ownerUserId: mock.id,
        caption: `${mock.displayName} deelt een tweede moment vanuit dezelfde makerswereld.`,
        postType: index % 4 === 0 ? "video" : "text",
        imageUrl: "",
        videoUrl: index % 4 === 0 ? "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" : "",
        mediaWidth: 4,
        mediaHeight: 3,
        feedKind: "normal",
        likes: 1 + (index % 8),
        dislikes: [],
        hashtags: ["#maker", "#flow", "#frontpage"],
        createdAt: baseCreatedAt - 17000
      });

      changed = true;
    }
  });

  if (changed) saveDb();
}


function ensureJohannesFriends() {
  const johannes = db.users.find((user) => user.id === "u1");
  if (!johannes) return;

  const preferredFriendIds = ["u2", "u3", "u101", "u105", "u109", "u111", "u115", "u119"];
  let changed = false;

  preferredFriendIds.forEach((friendId) => {
    const friend = db.users.find((user) => user.id === friendId);
    if (!friend) return;

    const alreadyFriends = db.friendships.some(
      (item) =>
        item.status === "accepted" &&
        ((item.userA === "u1" && item.userB === friendId) ||
         (item.userA === friendId && item.userB === "u1"))
    );

    if (!alreadyFriends) {
      db.friendships.push({
        userA: "u1",
        userB: friendId,
        status: "accepted"
      });
      changed = true;
    }

    db.friendRequests = db.friendRequests.filter(
      (item) =>
        !(
          (item.requesterUserId === "u1" && item.targetUserId === friendId) ||
          (item.requesterUserId === friendId && item.targetUserId === "u1")
        )
    );
  });

  if (changed) saveDb();
}

ensureMockData();
ensureJohannesFriends();


  ensureMockData();
  ensureJohannesFriends();
}

module.exports = {
  applyMockData
};
