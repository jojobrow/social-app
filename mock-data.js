
function applyMockData(db, saveDb, hashPassword) {
  function mockPasswordForId(id) {
    return /^(u130|u131|u132|u133|u134|u135|u136|u137|u138|u139|u140|u141|muziek)$/.test(String(id || ""))
      ? "4321"
      : "1234";
  }

  function ensureMockPassword(user) {
    const id = String(user?.id || "");
    const isMockUser = /^u1\d\d$/.test(id) || id === "muziek";
    if (isMockUser && (!user.passwordSalt || !user.passwordHash)) {
      user.passwordSalt = "seed-mock-salt";
      user.passwordHash = hashPassword(mockPasswordForId(id), "seed-mock-salt");
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
    { id: "u130", displayName: "Trudy", handle: "@trudy", bio: "Houdt van warme homepagebeelden en rustige updates.", avatarColor: "#e1cabd", heroColor: "#f8ece4", homepageLikes: 14, backgroundUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=80" },
    { id: "u131", displayName: "Hannes", handle: "@hannes", bio: "Deelt korte notities, familiebeelden en kleine momenten.", avatarColor: "#cdb49f", heroColor: "#ecddd1", homepageLikes: 11, backgroundUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=80" },
    { id: "u132", displayName: "Cor", handle: "@cor", bio: "Zachte familiefoto’s en huiselijke sfeer op de homepage.", avatarColor: "#dfcabd", heroColor: "#f7ebe2", homepageLikes: 19, backgroundUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80" },
    { id: "u133", displayName: "Rina", handle: "@rina", bio: "Kleine verhalen, warme kleuren en vriendelijke reacties.", avatarColor: "#e2cdbf", heroColor: "#faeee6", homepageLikes: 17, backgroundUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80" },
    { id: "u134", displayName: "Catharina", handle: "@catharina", bio: "Rustige beeldreeksen en lieve publieke notities.", avatarColor: "#dec8bb", heroColor: "#f7ebe3", homepageLikes: 16, backgroundUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80" },
    { id: "u135", displayName: "Annie", handle: "@annie", bio: "Deelt graag portretten, familie en kleine dagboekmomenten.", avatarColor: "#e3cec1", heroColor: "#fbefe8", homepageLikes: 18, backgroundUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80" },
    { id: "u136", displayName: "Grades", handle: "@grades", bio: "Nuchtere updates met een warme homepage-uitstraling.", avatarColor: "#d6c0b0", heroColor: "#f1e3d8", homepageLikes: 12, backgroundUrl: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?auto=format&fit=crop&w=1600&q=80" },
    { id: "u137", displayName: "Robbert", handle: "@robbert", bio: "Houdt van duidelijke ritmes en rustige familiekiekjes.", avatarColor: "#c9b29d", heroColor: "#eadcd0", homepageLikes: 10, backgroundUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80" },
    { id: "u138", displayName: "Jennifer", handle: "@jennifer", bio: "Warme portretten, lichte kleuren en zachte captions.", avatarColor: "#e4cfc3", heroColor: "#fbefe8", homepageLikes: 21, backgroundUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80" },
    { id: "u139", displayName: "Chantal", handle: "@chantal", bio: "Kleine sociale updates en zachte homepage-sfeer.", avatarColor: "#dfc9bc", heroColor: "#f8ece4", homepageLikes: 15, backgroundUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80" },
    { id: "u140", displayName: "Eduard", handle: "@eduard", bio: "Rustige updates, familiebeelden en warme homepage-sfeer.", avatarColor: "#c9b29d", heroColor: "#eadcd0", homepageLikes: 13, backgroundUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80" },
    { id: "u141", displayName: "Grada", handle: "@grada", bio: "Lieve portretten, zachte kleuren en kleine familiemomenten.", avatarColor: "#e2cdbf", heroColor: "#faeee6", homepageLikes: 17, backgroundUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80" }
  ];

    { id: "muziek", displayName: "Muziek", handle: "@muziek", bio: "Generieke muziek-demo gebruiker voor partnerpitches met ingebakken radiofunctie.", avatarColor: "#f2c14e", heroColor: "#fff0bf", homepageLikes: 42, backgroundUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80" },

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

  const genericCaptions = [
    "Mijn homepage voelt meer als een kamer dan als een profiel.",
    "De feed is handig, maar de maker moet voelbaar centraal blijven.",
    "Publieke reacties horen hier op de voorpagina van de maker.",
    "Ik wil dat vrienden eerst voelen wie iemand is, pas daarna wat iemand post.",
    "Niet elke post hoeft een los eiland te zijn.",
    "Een zachte feed voelt minder agressief dan eindeloos losse prikkels."
  ];

  const familyCaptions = {
    u130: ["Trudy deelt een warm familiemoment vanaf haar homepage.", "Een rustig portret en een lieve update voor vrienden.", "Trudy laat extra sfeer zien met zachte kleuren.", "Kleine notitie van Trudy: contact voelt fijner als een homepage persoonlijk blijft."],
    u131: ["Hannes zet een nuchter moment uit het dagelijks leven online.", "Een korte update van Hannes voor vrienden en familie.", "Hannes laat extra sfeer zien op zijn voorpagina.", "Kleine notitie van Hannes: liever rust dan drukte in de feed."],
    u132: ["Cor deelt een huiselijk beeld met warme sfeer.", "Een korte familiegroet vanaf de homepage van Cor.", "Cor laat extra warmte en herkenning zien.", "Kleine notitie van Cor: publiek mag best vriendelijk en zacht voelen."],
    u133: ["Rina deelt een warme foto en een klein verhaal.", "Een rustige update van Rina voor haar kring.", "Rina laat een extra homepagebeeld zien met zachte tinten.", "Kleine notitie van Rina: liever echte mensen dan losse accounts."],
    u134: ["Catharina laat haar rustige homepage-sfeer zien.", "Een zachte update van Catharina voor vrienden.", "Catharina deelt nog een warm beeld voor haar voorpagina.", "Kleine notitie van Catharina: context maakt een post menselijker."],
    u135: ["Annie deelt een vriendelijk portretmoment.", "Een korte update van Annie tussen familie en vrienden.", "Annie laat extra warmte zien op haar homepage.", "Kleine notitie van Annie: een homepage mag voelen als thuiskomen."],
    u136: ["Grades deelt een nuchter beeld met warme ondertoon.", "Een rustige tekstupdate van Grades voor bekenden.", "Grades laat nog een extra sfeerbeeld zien.", "Kleine notitie van Grades: minder lawaai maakt sociaal prettiger."],
    u137: ["Robbert deelt een rustig moment uit zijn dag.", "Een korte update van Robbert voor zijn netwerk.", "Robbert laat extra homepage-sfeer zien.", "Kleine notitie van Robbert: eenvoud werkt vaak beter dan drukte."],
    u138: ["Jennifer deelt een warm portret met zachte kleuren.", "Een lieve update van Jennifer voor vrienden en familie.", "Jennifer laat haar homepage extra persoonlijk voelen.", "Kleine notitie van Jennifer: sfeer zegt soms meer dan tekst."],
    u139: ["Chantal deelt een rustig homepagebeeld met zachte tinten.", "Een korte update van Chantal voor haar vrienden.", "Chantal laat nog een extra moment zien vanaf haar voorpagina.", "Kleine notitie van Chantal: contact voelt beter met minder haast."],
    u140: ["Eduard deelt een rustig familiemoment vanaf zijn homepage.", "Een korte update van Eduard voor vrienden en familie.", "Eduard laat extra sfeer zien op zijn voorpagina.", "Kleine notitie van Eduard: rust maakt sociaal contact prettiger."],
    u141: ["Grada deelt een warm portret en een lieve update.", "Een korte familiegroet van Grada voor haar kring.", "Grada laat extra zachtheid en sfeer zien op haar homepage.", "Kleine notitie van Grada: een voorpagina mag vriendelijk en persoonlijk voelen."]
  };

  let changed = false;

  mockUsers.forEach((mock, index) => {
    let existingUser = db.users.find((user) => user.id === mock.id);

    if (existingUser) {
      if (ensureMockPassword(existingUser)) changed = true;
      if (!existingUser.backgroundUrl && mock.backgroundUrl) {
        existingUser.backgroundUrl = mock.backgroundUrl;
        changed = true;
      }
    } else {
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
        passwordHash: hashPassword(mockPasswordForId(mock.id), "seed-mock-salt")
      };
      db.users.push(existingUser);
      changed = true;
    }

    const existingMockPosts = db.posts.filter((post) => post.ownerUserId === mock.id);
    const desiredPostCount = 4;

    for (let p = existingMockPosts.length; p < desiredPostCount; p += 1) {
      const baseCreatedAt = Date.now() - ((index + 10) * 60000) - (p * 17000);
      const feedKind = p === 1 && index % 5 === 0 ? "recommended" : p === 2 && index % 7 === 0 ? "promoted" : "normal";
      const captions = familyCaptions[mock.id] || genericCaptions;
      const variantType = p === 0 || p === 2 ? "image" : (index % 4 === 0 && p === 1 ? "video" : "text");

      db.posts.push({
        id: db.counters.nextPostId++,
        ownerUserId: mock.id,
        caption: captions[p] || genericCaptions[p % genericCaptions.length],
        postType: variantType,
        imageUrl: variantType === "image" ? imagePool[(index + p) % imagePool.length] : "",
        videoUrl: variantType === "video" ? "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" : "",
        mediaWidth: 4,
        mediaHeight: 3,
        feedKind,
        likes: 3 + ((index + p) % 12),
        dislikes: [],
        hashtags: hashtagsPool[(index + p) % hashtagsPool.length],
        createdAt: baseCreatedAt
      });

      changed = true;
    }
  });

  const johannesFriendIds = ["u2", "u3", "u101", "u105", "u109", "u111", "u115", "u119", "u130", "u131", "u132", "u133", "u134", "u135", "u136", "u137", "u138", "u139", "u140", "u141"];

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
