export interface PressItem {
  title: string;
  publication: string;
  date: string;
  href: string;
  excerpt: string;
}

export const press: PressItem[] = [
  {
    title: "Donghyeon Kim's Designs Give Spatial's Augmented Reality A Personal Touch",
    publication: "VC News Network (via Reuters)",
    date: "Jul 12, 2019",
    href: "https://www.reuters.com/brandfeatures/venture-capital/article?id=130855",
    excerpt:
      "Profile of his journey from Izzle (university startup) through Samsung Electronics' Ambient Mode to Spatial's holographic AR meeting platform.",
  },
  {
    title: "New augmented reality software helps create a space for remote board meetings",
    publication: "MarketWatch (Heraldkeepers)",
    date: "Jul 19, 2019",
    href: "https://www.marketwatch.com/press-release/new-augmented-reality-software-helps-create-a-space-for-remote-board-meetings-2019-07-19",
    excerpt:
      "Coverage of Spatial Systems Inc and the AR meeting software shipped within six months of founding — featuring the iF Design Award recipient.",
  },
];
