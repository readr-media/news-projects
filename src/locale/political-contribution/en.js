export const POLITICAL_CONTRIBUTION = {
  'PARTY': {
    '民主進步黨': 'dpp',
    '中國國民黨': 'kmt',
    '時代力量': 'npp',
    '無黨籍': 'indie',
    '無黨團結聯盟': 'npsu',
    '親民黨': 'pfp',
  },
  'LANDING': {
    'TITLE': 'Political Donations in the Statistics',
    'SUBTITLES': [
      "Legislator's",
      'eight-year',
      'investor list'
    ],
    'NAVS': {
      'CHARTS': 'Charts',
      'EXPLORE': 'Explore',
      'ANALYSIS': 'Analysis',
      'DATA': 'Data'
    }
  },
  'CONTENT_HEADER': {
    'FOLLOW': 'Follow',
    'NOTES': 'Notes',
    'COMMENT': 'Comment',
    'SHARE': 'Share',
    'DONATE': 'Donate'
  },
  'CHARTS': [
    [
      'How much political contribution did the legislators receive in total?',
      'What type of political contribution is received by each political party legislator?',
      'Who receives the most political contributions?',
      'Who receives the most money in the company donation?',
    ],
    [
      'Who received the most corporate donations?',
      'Who among the unselected candidates received the most political contributions?',
      'Which industries donate the most money to the legislators?',
      'Which industries donate most actively to the legislators?',
    ],
    [
      'Which industries donate the most? To KMT or DPP?',
      'Which industries donate continuously three-term legislator elections? Does the tendency of donating political parties change?',
      'The current legislator is relatively easy to win the election',
      'The election winning rate for those who run for the first time is only 9%.',
    ],
    [
      'The relationship between the legislators with high political contributions and the industries',
    ]
  ],
  'EXPLORE': {
    'TITLE': 'Search for politics-business relations',
    'P': [
      `How much does it cost to run for legislator election? Who donate the candidates? How much does it cost to answer the question? According to Taiwan's law, the candidates are forced to declare the sources of donations and make it public to be reviewed by the people after election. However, those data are much less public than "collected" in the Control Yuan. We need to go to the Control Yuan in person to review the data, and get permission to copy all the data on paper, which can't be used for further analysis.`,
      `We put in tremendous efforts to obtain all the data. Let's take a look at the connections between district legislative candidates and business groups.`
    ]
  },
  'STORY_HINT': 'Note',
  'STORY1': {
    'TITLE': 'More than 2.8 billion donations to legislative candidates in a single election',
    'P': [
      "In 2016, the vigorous 2016 legislator election had ended in Taiwan, and another election would come in 2018. Democracy is a vital asset Taiwan's people feel proud of. How do the people leverage the value of their votes? In recent years, more and more people claim for open politics, but one of the most critical data is locked technically in government. It's political donations.",
      'Based on the statistics, district legislative candidates',
      'in 2016 election had received donations of 2.8 billion NT dollars in total. If the public want to learn the details of those donations, what costs do they need to pay?',
      "In Taiwan, political candidates need to declare political donations based on Political Contribution Act, and the data will be examined by the public after election. However, those data are much more collected as artifacts than open to the public. The open data displayed online are limited to the statistics of political donations. If you want to know the details, you need to file a request with the Control Yuen and pay a little fee to review the data. You are only allowed to copy the data on paper, which can't be used for further analysis.",
      'In 2014, the renowned civil community g0v launched the',
      'Transparency of Political Contributions',
      'project. The participants of the project divided the details of political contributions acquired from the Control Yuen into small images in the unit of word. Through crowdsourcing OCR (OCR, Optical Character Recognition), they complete recognition of 310,000 entries, and digitize the data from seven dedicated accounts of political contributions and 2,637 documents within 24 hours.',
      'The project had great impacts and some of the legislators proposed amendment to "Political Donations Act". Ronny Wang, one of the initiators of the project thought that the project had achieved its desired results and people could get organized digital files after the amendment is passed. To his surprise, authoritative sources of the disclosure of the details of political donations are still unavailable after next legislator election had ended.',
      "Though those donations are legitimate, they aren't available to the public. Mirror Media worked with Zong-Rong Lee, the research fellow at Academia Sinica's Institute of Sociology, and focused on the data of political donations from profit-seeking businesses to candidates for 2016 legislator election. We digitized the data acquired from the Control Yuen and developed practical tools for analysis. We want to emphasize the importance of open data in the process of data application.",
      'We found that 261 candidates had received donations of NT$2,817,453,078 in total. Donations from profit-seeking businesses accounted for 32% of total donations and were contributed to 208 candidates. There were 5,797 donations which were contributed by 4,162 companies. Only 255 of the companies donated more than NT$1,000,000 and the last one donated NT$1,000,000.',
      'If we compared with the data of parent companies and business groups, we found that 432 of the companies belonged to 254 business groups and controlled 40% of total donations from profit-seeking businesses. The Far Eastern Group owned by Douglas Hsu topped the list with 54 million donations, 1.6 times more than The Yulon Group.',
      "The data has its limits. We can't assure if there is a quid pro quo under the table or intentional undeclared donations. Ideally, candidates' income displayed on the data could reflect truthfully their fundraising capacity. In reality, it represents the amount that candidates want to declare truthfully.",
      'How do we explain those legal donations?',
      `Based on "Political Donations Act", political donation refers to the assets provided to "campaign or other politics-related activities" should not involve a quid pro quo or other economic benefits.`,
      'In practical terms? We take some excerpts of interviews to provide readers various views on political donations:',
      "We'll make further analyses from the aspects of legislators, businesses, and political parties in the following days (You can subscribe our follow-up stories). If you feel interested in the data, you can tell us or",
      'explore the data by yourself with our tools',
    ],
    'CHART_TITLES': [
      'The compositions of political donations'
    ],
    'HINTS': [
      'This project focuses on candidates who had opened dedicated accounts for political donations and registered for election. At large legislator seats are determined by party vote share and they have no individual dedicated accounts for political donations. There are only 216 candidates for district and aboriginal legislators included in the statistics sample.'
    ],
    'QUOTES': [
      {
        'QUOTE_BY': "Zong-Rong Lee, the research fellow at Academia Sinica's Institute of Sociology",
        'P': [
          "Foreign scholars indicate that political donation should be viewed as a channel to exercise influence rather than the power of direct impact. It's not the case that I give you money and you need to do what I say; at least, they (donors) have one more influence channels compared with other people. The way how he uses the channel is another question, but we as ordinary people don't have such channels.",
          "Some of Taiwan's researches claim that political donation looks like insurance. Though I can't gain benefits from the donations in present, someone will help me solve problems as I get into troubles someday. The more money I donate, the bigger the insurance net is."
        ]
      },
      {
        'QUOTE_BY': 'A canvass volunteer',
        'P': [
          "There's not enough money during campaign. If you get more money, you can hang out more billboards, buy more ads, recruit more part-time workers. Until the end of the campaign, you feel there's little gap. Those donations can be a lifesaver to candidates. It's irresistible."
        ]
      },
      {
        'QUOTE_BY': "A legislator's assistant",
        'P': [
          "Businesses choose me, and I choose businesses, too. I have the right to reject donations. They won't take the initiative if you don't ask. They won't donate if there's no personal relationship."
        ]
      },
      {
        'QUOTE_BY': 'Shang-Chih Chen, associate professor of political science of National Chung Cheng University and candidate of Social Democratic Party in 2016 legislator election',
        'P': [
          'Political donation is one of the sources of campaign fund. If a candidate has no money, political donation becomes critical; if a candidate possesses his own wealth, political donation is only the icing on the cake.',
          "The businesses will calculate tax credit and then determine the amount of political donations. There's maximum for political donations——NT$1,000,000 for individual candidate and NT$2,000,000 in total for more than one candidates. If businesses want to make donations to several candidates for purpose of public relation, they can only contribute NT$200,000 at most to each candidate. If the donation to individual candidate exceeds NT$500,000 or reaches NT$1,000,000, we should pay more attention to it."
        ]
      },
      {
        'QUOTE_BY': "A legislator's assistant",
        'P': [
          'I think we should encourage politicians to declare political donations. Except that quid pro quo relation is investigated, only those who have no money or make truthful declaration would be examined. Many candidates start their own companies, foundations, and associations to circumvent the law. A for those who have no money, they spend as much as they could raise. As for those who declare little, their spending could appear prohibitively high'
        ]
      }
    ]
  }
}