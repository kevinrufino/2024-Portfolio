// Project Links
export const MCFrontEndLink =
  "https://github.com/kevinrufino/minecraft-clone-react";
export const MCServerLink =
  "https://github.com/GreyDaCaLa/ReactMineCraftCloneServer";

export const MaxsLabLink = "https://www.swoosh.nike/m/maxs-lab";

export const swoosh404Link = "https://www.swoosh.nike/m/air-force-1-low-404";

export const dogewoodLink =
  "https://web.archive.org/web/20220506004107/https://app.dogewoodnft.com/";

export const anonymiceLink = "https://anonymice.com/";

export const snkybotLink = "https://github.com/kevinrufino/SNK-Y-Bot";

// Project Scrape Gifs

export const MCScrapeGif = "Minecraft-Scrape-Video.mp4";
export const MaxsLabScrapeGif = "maxs-lab-video.mp4";
export const swoosh404ScrapeGif = "404-error-scrape.mp4";
export const dogewoodScrapeGif =
  "dogewood-scrape.mp4";
export const anonymiceScrapeGif = "cheeth-scrape-video.mp4";
export const snkybotScrapeGif = "SNKY-Bot-scrape-video.mp4";

export const ProjectsData = [
  {
    title: "Max's Lab",
    technology: ["React", "Three.js", "Next.js", "Blender"],
    description:
      "I lead the development of a fully 3D marketing experience. This experience allowed users to deeply engage in a story of a collection of airmax products by exploring a full 3D world with easter eggs and live world events in support of IRL marketing moments. I worked cross functionally with 3D artists, designers, and project managers and marketing specialists to bring this to life. Feel free to check it out here.",
    links: [{
      "Try Out Max's Lab!": MaxsLabLink
    }],
    scrapeGif: MaxsLabScrapeGif,
  },
  {
    title: ".Swoosh 404",
    technology: ["React", "Canvas", "Next.js"],
    description:
      "To support the release of a physical product, I helped developed this space-invaders inspired game giving users eligibilty to purchase based on thier performance. This moment was lead by a site takeover where we glitched the site out and teased release information via decrytbable easter eggs. Worked cross functionally with marketing specialist and experience designers to test and rapidly iterate on this experience.",
    links: [{
      "Check out the .Swoosh Platform!": swoosh404Link
    }],
    scrapeGif: swoosh404ScrapeGif,
  },
  {
    title: "Minecraft Clone",
    technology: ["React", "Three.js", "Web Sockets", "Procedural Generation", "Physics Simulation"],
    description:
      "Developed and collaborated on a 3D WebGL clone of Minecraft with online functionalities. The online functionality uses web sockets to send and retrieve updates utilizing Socket.IO. Being built entirely in R3F, this is proudly the most in depth React Minecraft clone. The game generates a randomized voxel terrain of the world using an algorithm to create a graph of all the block data. The block data is used to construct a 3D geometry of the environment which the player can interact with using a custom physics engine. This terrain generation can support multiple parameters such as environment types. This started as a passion project to learn how a game like Minecraft can create its limitless world.",
    links: [
      {
        "Try it on your machine!": MCFrontEndLink,
      },
      {
        "Boot up a server, play with friends!": MCServerLink
      }
    ],
    scrapeGif: MCScrapeGif,
  },
  {
    title: "Defenders of Dogewood",
    technology: ["React", "Spline.ts", "Ethers.js", "Unity WebGL"],
    description:
      "I helped support the DoD team by refactoring the unity webgl based adventure experience to one that is built in react js using spline to control the animation assets. This experience was exclusive to members who owned a dogewood nft. Players we're able to take doge's on adventures to train them and earn rewards.",
    links: [{
      "The website is down but check it out on the way back machine!": dogewoodLink
    }],
    scrapeGif: dogewoodScrapeGif,
  },
  {
    title: "Anonymice",
    technology: ["React", "CSS", "Ethers.js", "Discord"],
    description:
      "I build the cheeth v2 staking experience for anonymice. This experience allowed users to stake their mice tokens to earn cheeth. Players would stake thier mice in order to help control the supply of the 'in game' economy to have a hand and advantage in the scarcity game. I worked with the team to design and develop the custom staking experience that was easy to use and understand, while also consulting on the tokenomics of the cheeth token.",
    links: [{
      "Check out their new site!": anonymiceLink
    }],
    scrapeGif: anonymiceScrapeGif,
  },
  {
    title: "SNK-Y Bot",
    technology: ["Vue", "Puppeteer", "Firebase", "Express", "Node.js"],
    description: "A college project that explored the use of web scraping to create a bot that would monitor sneaker releases and notify users of restocks. The bot was built using puppeteer to scrape data from various sneaker sites and automated the purchasing process. The bot was built with a Vue front end and a Firebase backend to store user data and preferences.",
    links: [{
      "Check out the GH!": snkybotLink
    }],
    scrapeGif: snkybotScrapeGif,
  },
];
