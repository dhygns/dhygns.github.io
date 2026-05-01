export interface Patent {
  title: string;
  appNo: string;
  pubNo: string;
  filed: string;
  published: string;
  href: string;
  project: string;
  blurb: string;
}

export const patents: Patent[] = [
  {
    title: "Augmented Reality Computing Environments",
    appNo: "EP19723238",
    pubNo: "EP3776146",
    filed: "Apr 4, 2019",
    published: "Feb 17, 2021",
    href: "https://patentscope.wipo.int/search/en/detail.jsf?docId=EP318028874&docAn=19723238",
    project: "Spatial",
    blurb:
      "Methods for AR computing environments and holographic collaboration — covering aspects of the Spatial cross-platform metaverse architecture.",
  },
  {
    title: "Electronic Apparatus and Control Method Thereof",
    appNo: "PCT/KR2018/012656",
    pubNo: "WO2019135475",
    filed: "Oct 24, 2018",
    published: "Jul 11, 2019",
    href: "https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2019135475&tab=PCTBIBLIO",
    project: "Ambient Mode",
    blurb:
      "Texture synthesis and color/brightness balancing technique enabling a TV to visually merge into surrounding wallpaper — basis of Samsung's Ambient Mode invisible feature.",
  },
  {
    title: "Screen Control Method and Electronic Device Supporting the Same",
    appNo: "US15916904",
    pubNo: "US20180260295",
    filed: "Mar 9, 2018",
    published: "Sep 13, 2018",
    href: "https://patentscope.wipo.int/search/en/detail.jsf?docId=US225649165",
    project: "Air Quality Visualization",
    blurb:
      "Screen control method for adapting on-screen visualization to viewer distance and context — used in the Air Quality Visualization concept.",
  },
];
