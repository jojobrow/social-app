function applyMockData(db, saveDb, hashPassword) {
  function ensureMockPassword(user) {
    const id = String(user?.id || "");
    const isMockUser = /^u1\d\d$/.test(id);
    if (isMockUser && (!user.passwordSalt || !user.passwordHash)) {
      user.passwordSalt = "seed-mock-salt";
      user.passwordHash = hashPassword("1234", "seed-mock-salt");
      return true;
    }
    return false;
  }

  const mockUsers = [
    { id: "u100", displayName: "Noor", handle: "@noor", bio: "Fotografie, zachte tinten en kleine observaties.", avatarColor: "#d7bea6", heroColor: "#f2e4d7", homepageLikes: 17, backgroundUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80" },
    { id: "u101", displayName: "Levi", handle: "@levi", bio: "Korte video’s, montage en ritme.", avatarColor: "#d7c8bb", heroColor: "#f0e6dd", homepageLikes: 11, backgroundUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=80" },
    { id: "u102", displayName: "Sara", handle: "@sara", bio: "Tekst, sfeer en publieke notities.", avatarColor: "#d6b9a7", heroColor: "#f3e0d6", homepageLikes: 24, backgroundUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=80" },
    { id: "u103", displayName: "Ruben", handle: "@ruben", bio: "Maakt visuele dagboeken en experimenten.", avatarColor: "#cdb39d", heroColor: "#ebdacd", homepageLikes: 7, backgroundUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1600&q=80" },
    { id: "u104", displayName: "Yara", handle: "@yara", bio: "Lichte layouts, modebeelden en detailshots.", avatarColor: "#e3cdbd", heroColor: "#f7ece3", homepageLikes: 28, backgroundUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80" },
    { id: "u105", displayName: "Daan", handle: "@daan", bio: "Ziet community meer als ruimte dan als feed.", avatarColor: "#c7b09d", heroColor: "#e9ddd4", homepageLikes: 9, backgroundUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80" },
    { id: "u106", displayName: "Lotte", handle: "@lotte", bio: "Korte captions, rustige beelden, zachte video.", avatarColor: "#dcc9bb", heroColor: "#f6ece5", homepageLikes: 19, backgroundUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80" },
    { id: "u107", displayName: "Sam", handle: "@sam", bio: "Test nieuwe formats voor makers en vrienden.", avatarColor: "#cdbdac", heroColor: "#f0e7df", homepageLikes: 13, backgroundUrl: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1600&q=80" },
    { id: "u108", displayName: "Tess", handle: "@tess", bio: "Portretten, achtergronden en homepage-sfeer.", avatarColor: "#dec9b8", heroColor: "#f6e7dc", homepageLikes: 22, backgroundUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80" },
    { id: "u109", displayName: "Mats", handle: "@mats", bio: "Bouwt aan ritme in feeds zonder chaos.", avatarColor: "#ccb49f", heroColor: "#ebddd2", homepageLikes: 6, backgroundUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=80" },
    { id: "u110", displayName: "Nina", handle: "@nina", bio: "Kleine essays in captionvorm.", avatarColor: "#dcc6b5", heroColor: "#f5e8de", homepageLikes: 27, backgroundUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80" },
    { id: "u111", displayName: "Bram", handle: "@bram", bio: "Vriendschap eerst, algoritme later.", avatarColor: "#c8af99", heroColor: "#eadbd0", homepageLikes: 8, backgroundUrl: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1600&q=80" },
    { id: "u112", displayName: "Zoë", handle: "@zoe", bio: "Publieke reacties horen bij de maker, niet bij de losse post.", avatarColor: "#e1cec1", heroColor: "#f9eee7", homepageLikes: 31, backgroundUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80" },
    { id: "u113", displayName: "Jules", handle: "@jules", bio: "Werkt met text-only kaarten en kleurvlakken.", avatarColor: "#d2bdad", heroColor: "#f0e1d6", homepageLikes: 12, backgroundUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80" },
    { id: "u114", displayName: "Isa", handle: "@isa", bio: "Mengt video en tekst in rustige series.", avatarColor: "#dbc7b8", heroColor: "#f4e8df", homepageLikes: 16, backgroundUrl: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=1600&q=80" },
    { id: "u115", displayName: "Floris", handle: "@floris", bio: "Nuchtere notities over hoe socials anders kunnen.", avatarColor: "#cab39e", heroColor: "#ebddd1", homepageLikes: 10, backgroundUrl: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=1600&q=80" },
    { id: "u116", displayName: "Lina", handle: "@lina", bio: "Verzamelt zachte beelden uit alledaagse momenten.", avatarColor: "#e4d1c4", heroColor: "#fbf1ea", homepageLikes: 26, backgroundUrl: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?auto=format&fit=crop&w=1600&q=80" },
    { id: "u117", displayName: "Mika", handle: "@mika", bio: "Wil dat makers weer als mensen voelen.", avatarColor: "#cfbaa8", heroColor: "#efe1d7", homepageLikes: 14, backgroundUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=80" },
    { id: "u118", displayName: "Fien", handle: "@fien", bio: "Combineert screenshots, quotes en stille video.", avatarColor: "#d8c3b2", heroColor: "#f3e6dc", homepageLikes: 18, backgroundUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80" },
    { id: "u119", displayName: "Olivier", handle: "@olivier", bio: "Bouwt aan social flows met minder verslavend gedrag.", avatarColor: "#cdb4a3", heroColor: "#ecddd1", homepageLikes: 15, backgroundUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=80" },
    { id: "u120", displayName: "Mara", handle: "@mara", bio: "Werkt met dromerige beelden en zachte overgangen.", avatarColor: "#e3c7b8", heroColor: "#f7e8de", homepageLikes: 20, backgroundUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80" },
    { id: "u121", displayName: "Vince", handle: "@vince", bio: "Meer structuur, minder lawaai.", avatarColor: "#cbb39f", heroColor: "#ebddd1", homepageLikes: 12, backgroundUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80" },
    { id: "u122", displayName: "Elin", handle: "@elin", bio: "Kleine scènes en korte publieke notities.", avatarColor: "#dfcabd", heroColor: "#f8ece4", homepageLikes: 22, backgroundUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80" },
    { id: "u123", displayName: "Cas", handle: "@cas", bio: "Denkt in ritme, ordening en rust.", avatarColor: "#c9b19b", heroColor: "#eadacf", homepageLikes: 9, backgroundUrl: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1600&q=80" },
    { id: "u124", displayName: "Pien", handle: "@pien", bio: "Lichte portretten en warme kleuren.", avatarColor: "#e2cdbd", heroColor: "#faeee5", homepageLikes: 25, backgroundUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=80" },
    { id: "u125", displayName: "Rik", handle: "@rik", bio: "Test graag simpele sociale flows.", avatarColor: "#cab19a", heroColor: "#ebdbcf", homepageLikes: 7, backgroundUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=80" },
    { id: "u126", displayName: "Esra", handle: "@esra", bio: "Zoekt balans tussen maker en community.", avatarColor: "#e1ccc0", heroColor: "#f8eee8", homepageLikes: 18, backgroundUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80" },
    { id: "u127", displayName: "Jens", handle: "@jens", bio: "Schrijft compact en houdt van duidelijke ritmes.", avatarColor: "#cdb49e", heroColor: "#ecddd1", homepageLikes: 11, backgroundUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=80" },
    { id: "u128", displayName: "Liva", handle: "@liva", bio: "Mengt text cards met zachte homepagebeelden.", avatarColor: "#e0c9bc", heroColor: "#f7ebe3", homepageLikes: 23, backgroundUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80" },
    { id: "u129", displayName: "Thijs", handle: "@thijs", bio: "Bouwt aan rustigere communities.", avatarColor: "#c8af9a", heroColor: "#e9dbcf", homepageLikes: 10, backgroundUrl: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=1600&q=80" }
  ];

  const imagePool = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
  ];

  const textCaptions = [
    "Mijn homepage voelt meer als een kamer dan als een profiel.",
    "De feed is handig, maar de maker moet voelbaar centraal blijven.",
    "Publieke reacties horen hier op de voorpagina van de maker.",
    "Ik wil dat vrienden eerst voelen wie iemand is, pas daarna wat iemand post.",
    "Niet elke post hoeft een los eiland te zijn.",
    "Een zachte feed voelt minder agressief dan eindeloos losse prikkels.",
    "Als je de maker vindt, krijgt de content meer betekenis.",
    "Social hoeft niet altijd lawaaierig te zijn.",
    "De maker moet eerst als mens voelen en pas daarna als account.",
    "Homepage eerst geeft rust aan de feed."
  ];

  const hashtagsPool = [
    ["#homepage", "#maker", "#concept"],
    ["#creator", "#feed", "#social"],
    ["#frontpage", "#friends", "#context"],
    ["#video", "#image", "#text"],
    ["#community", "#prototype", "#maker"],
    ["#design", "#homepage", "#social"],
    ["#story", "#homepage", "#maker"],
    ["#quiet", "#frontpage", "#people"]
  ];

  let changed = false;

  mockUsers.forEach((mock, index) => {
    let existingUser = db.users.find((user) => user.id === mock.id);
    if (existingUser) {
      if (ensureMockPassword(existingUser)) changed = true;
      if (!existingUser.backgroundUrl && mock.backgroundUrl) {
        existingUser.backgroundUrl = mock.backgroundUrl;
        changed = true;
      }
    }
    if (!existingUser) {
      existingUser = {
        id: mock.id,
        displayName: mock.displayName,
        handle: mock.handle,
        bio: mock.bio,
        avatarColor: mock.avatarColor,
        heroColor: mock.heroColor,
        avatarUrl: "",
        backgroundUrl: mock.backgroundUrl || "",
        homepageLikes: mock.homepageLikes,
        blockedUsers: [],
        passwordSalt: "seed-mock-salt",
        passwordHash: hashPassword("1234", "seed-mock-salt")
      };
      db.users.push(existingUser);
      changed = true;
    }

    const existingMockPosts = db.posts.filter((post) => post.ownerUserId === mock.id);
    const desiredPostCount = 4;
    for (let p = existingMockPosts.length; p < desiredPostCount; p += 1) {
      const baseCreatedAt = Date.now() - ((index + 10) * 60000) - (p * 17000);
      const imageUrl = imagePool[(index + p) % imagePool.length];
      const hashtags = hashtagsPool[(index + p) % hashtagsPool.length];
      const feedKind = p === 1 && index % 5 === 0 ? "recommended" : p === 2 && index % 7 === 0 ? "promoted" : "normal";
      const variants = [
        { caption: textCaptions[(index + p) % textCaptions.length], postType: "image", imageUrl, videoUrl: "" },
        { caption: `${mock.displayName} deelt een tweede moment vanuit dezelfde makerswereld.`, postType: index % 4 === 0 ? "video" : "text", imageUrl: "", videoUrl: index % 4 === 0 ? "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" : "" },
        { caption: `${mock.displayName} laat extra sfeer zien voor een vollere homepage.`, postType: "image", imageUrl: imagePool[(index + p + 3) % imagePool.length], videoUrl: "" },
        { caption: "Kleine notitie: de maker moet zichtbaar blijven, ook als de feed sneller beweegt.", postType: "text", imageUrl: "", videoUrl: "" }
      ];
      const variant = variants[p % variants.length];
      db.posts.push({
        id: db.counters.nextPostId++,
        ownerUserId: mock.id,
        caption: variant.caption,
        postType: variant.postType,
        imageUrl: variant.imageUrl,
        videoUrl: variant.videoUrl,
        mediaWidth: 4,
        mediaHeight: 3,
        feedKind,
        likes: 3 + ((index + p) % 12),
        dislikes: [],
        hashtags,
        createdAt: baseCreatedAt
      });
      changed = true;
    }
  });

  const johannesFriendIds = ["u2", "u3", "u101", "u105", "u109", "u111", "u115", "u119", "u121", "u123", "u125", "u127", "u129"];
  johannesFriendIds.forEach((friendId) => {
    const friend = db.users.find((user) => user.id === friendId);
    if (!friend) return;
    const alreadyFriends = db.friendships.some(
      (item) =>
        item.status === "accepted" &&
        ((item.userA === "u1" && item.userB === friendId) ||
         (item.userA === friendId && item.userB === "u1"))
    );
    if (!alreadyFriends) {
      db.friendships.push({ userA: "u1", userB: friendId, status: "accepted" });
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

module.exports = {
  applyMockData
};