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
  },
  'STORY2': {
    'TITLE': "Legislators - <br>The veterans' capacity for fundraising is 6.6 times more than newcomers",
    'SUBTITLES': [
      'Donations behaviors in Taiwan look more like religious belief'
    ],
    'P': [
      `According to the data of candidates' self-declaration, donations to the 9th district legislative candidates were concentrated on a very few of them. Among 261 candidates, the top 48 raisers controlled 50% of all the donations. The data shows that "incumbent" legislators gained greater advantage on fundraising.`,
      "From the rankings of total incomes and incomes of donations from profit-seeking businesses, all the top 5 raisers are incumbent legislators. It's remarkable that legislators Chien-Ming Ker and Chih-Wei Chiu respectively ranked first and second in terms of donations from profit-seeking businesses, which constituted over 50% of total incomes in both cases.",
      "Incumbent legislators gain more advantage on fundraising, and it happens in Taiwan and other countries. Take 2002 US congressional election for example, incumbents outraised challengers by seven times and won more than 90% of the time. According to political science professor Ding-Ming Wang's research on political donations to the 6th legislators, returning candidates outraised newcomers by two times, and the gap grew to 3.6 times in the 9th legislator election.",
      "In terms of donors, eighty percent of interested groups' donations go to incumbents based on America's elections results",
      `Hui-Min Chen, the secretary general of New Power Party, described that behavior pattern of political donors in Taiwan manifest religious quality, "Taiwan's people tend to donate to candidates with higher winning rates. The donors won't invest in candidates without possibility of winning because they have no chance to fulfill donors' political ideas."`,
      'If we used quartiles to analyze the distribution of political donations, we found that financial resources were too concentrated on a very few of candidates, especially for non-incumbents. We ranked political donations to 189 non-incumbents in order of the sum and then divide them into four groups. Legislator Hsien-Chih Chiu, candidate for Hsinshu City legislator, appeared in the first quartile and received NT$9,475,771. Legislator Chien-Yi Tung appeared in the third quartile and received NT$260,110, 36 times less than Hsien-Chih Chiu.',
      'We found that almost all the non-incumbents among the top raisers are not political newcomers, and most of them are current councilors. Among top ten raisers, two candidates of New Power Party are first-time challenger.',
      'We analyzed the list of first-time candidates in the election for public office and the data showed that their capacity for fundraising were 6.6 times less than incumbents, and had win rate of 9%.',
      'In terms of quartiles, we found again that financial resources were too concentrated on a very few of candidates. candidates. Half of the top ten raisers came from political families',
      '.',
      "However, due to bizarre political situation and the rising of new parties, the list of elected legislators appeared different from previous elections. Shou-Chung Ting and Yu-Sheng Wu who were among the top five fund-raisers failed to be re-elected, which showed that money alone can't guarantee success. We also identified the top five fund-raisers among losers as follows:",
      'Shou-Chung Ting was defeated by municipal councilor Su-Yao Wu who had devoted time and effort for many years; Yu-Sheng Wu got lost to Sun-ling Lu, daughter of a municipal councilor. The third and fourth fund-raisers were defeated respectively by Freddy Lim and Tzu-Yung Hung of New Power Party. Li-Huan Yang, the fifth fun-raiser, was beaten by Pao-Ching Cheng of DDP by a margin of 160 votes.',
      'In terms of political party, there were little differences between KMT and DPP. KMT candidates received more subsidies from the party. Personal donations to DPP candidates accounted for more than half of the total donations. NNP candidates received more donations from individual donors than from profit-seeking businesses, compared with other two parties.',
      "It's also worth noting that whether those donations data declared directly by candidates really reveal political reality. Does our system encourage politicians truthfully declare political donations?",
      `According to official regulations in Taiwan, there are limitations on the amount of donations and qualifications of donors. As for the qualification of donors, public enterprises or the civil enterprises in which the government holds not less than 20% of the capital, "manufacturers that have signed government procurement contract of a large amount or an investment contract of important public construction", and "profit-seeking businesses in accumulative deficit" are not allowed to contribute to political donations. Those regulations seem reasonable, but candidates have responsibility to verify the sources of donations. Shang-Chih Chen, associate professor of political science of National Chung Cheng University said, "those who declare truthfully need to bear higher cost while those who don't can get away with punishment easily.`,
      "How do those who don't declare truthfully avoid penalty? Based on Article 12 of Political Donations Act, if the amount of donation reaches ten million NT dollars, it should be audited and attested by the accountant entrusted. In 2016 legislator election, there were 155 candidates, 59% of all candidates, whose individual incomes from political donations were less than ten million NT dollars. Shang-Chih Chen also noted that accounting report doesn't include information of private capital. Many candidates raise funds by way of establishing foundations to circumvent the law, and the Control Yuen won't take the initiative to investigate it.",
      'What are other problems with our current political donations system? How can we make it better? Please follow our reporting.',
    ],
    'CHART_TITLES': [
      [
        '48 candidates (20%) ',
        'controlled 50% of all the donations'
      ],
      'Who received most political donations? (Total incomes)',
      'Who received most political donations from profit-seeking businesses?',
      'Incumbents gain greater advantage (compared with non-incumbents)',
      'Top ten raisers among non-incumbents',
      'Incumbents gain more advantage (compared with first-time candidates in the election to public office)',
      'Top ten raisers among first-time candidates in election for public office',
      'Who received most donations but failed to win?',
      "The compositions of donations to each party's candidates",
    ],
    'HINTS': [
      [
        'Minister of the Interior in 2012 - ',
        "Research on Taiwan's Political Donations System"
      ],
      [
        '此處引用《天下雜誌》',
        '「立委二代接班， 64 位政治世家全解析」',
        '資料，定義為至少一位長輩、平輩或晚輩親屬從政。'
      ]
    ]
  },
  'STORY3': {
    'TITLE': "Business - <br>Money-Power Game? Reveal Donors' Investment Register",
    'P': [
      "Who can be the sponsors of legislators? There are five sources of political donations: individuals, profit-seeking businesses, political parties, civil associations, and anonymous donations. In 2016 legislator election, donations from profit-seeking businesses accounted for 32% of total donations. Among 216 candidates, there were only eight candidates who didn't receive any donations from profit-seeking businesses.",
      `"Money isn't the only source of political influence, but it's the most important one in a capitalist society." Zong-Rong Lee, the research fellow at Academia Sinica's Institute of Sociology wrote in the essay`,
      "Corporate Power and Democracy: An Analysis of Business Groups' Campaign Contribution in the 2008 Legislator Election",
      'that American political scientist C. Wright Mills claimed that those who control economic power can transform political donations into political operation.',
      'Before exploring the idea of power operation, we should understand the limitations of political donations in Taiwan to distinguish the various meanings of those donations.',
      'Political donations are tax deductible, but the amount of deduction may not exceed 10% of the total income, and may not exceed NT$500,000. From this point of view, we can say that most of companies contribute donations for the purpose of tax deduction. Of 4,126 companies, there were 3,769 companies whose single donation was less than NT$500,000; there were only 393 companies whose single donation was more than NT$500,000.',
      `The amount of each company's donation to single candidate may not exceed NT$1,000,000, and amount of donations to multiple candidates may not exceed NT$1,000,000. Shang-Chih Chen, associate professor of political science of National Chung Cheng University pointed out that "if a company want to donate to multiple candidates for the purpose of public relation and the amount of its donation to each candidate may reach NT$200,000 at the most. If the amount of donation to individual candidate exceeds NT$500,000 or reach NT$1,000,000, we should pay more attention to those cases."`,
      'The candidates are allowed to receive political donations only ten months before the polling day. The amount of donations is calculated by year. For example, since 2016 legislator election was held in January, a company can make donations once in the end of 2015 and do again in the beginning of 2016, so that its donations to the same candidate can reach NT$2,000,000. Both Chien-Ming Ker and Yu-Sheng Wu had received cross-year donations.',
      'We worked with Zong-Rong Lee and compared 5,797 details of donations with the data of business groups',
      'We found that 432 companies affiliated to 254 business groups accounted for 40% of donations from profit-seeking businesses. The Far Eastern Group owned by Douglas Hsu ranked first with donations of 54 million NT dollars, 1.6 times more than the second one The Yulon Group',
      'From the list of top twenty donations from business groups, we found that there were 15 (Far Eastern, Yulon, Taiwan Cement, Ruentex, Vedan, Yeangder, Lealea, Taiwan International Securities, ASE, Ta Ching Securities, Solomon, Goldsun, Hontai, Kindom, MFC) out of 21 business groups are family business groups',
      ', with the percentage of 71%',
      `Zong-Rong Lee said "family business groups will actively build and maintain relationships with official sectors to sustain their businesses. They make political donations to broaden business network, consolidate family's ownership and provide resources to the outer world. The establishment of a strong relationship can take a great amount of time. Family business group's connections to the society and government can be inherited by next generations.`,
      "Compared with Lee's ",
      'research',
      ' on 2008 legislator election, the data showed that donations from business groups in 2016 election had risen, such as donations from Far Eastern Group increased 14 millions and the ones from Yulon Group increased 16.54 millions. Some other business groups withdrew from the ranking. Donations from some of business groups which were among top thirty donors in 2008 election had declined, including Farglory, Chinatrust, Formosa Plastics, Core Pacific, Nice, Polaris, Prince Motors, and Uni-President.',
      `We haven't figured out the reasons why business groups increase or decrease their donations, but Lee suggested that "maybe times have changed."`,
      `With a high degree of economic liberalization, Taiwan's government had offered benefits to conglomerates as much as possible. The influence of political power on economic benefits had declined significantly. For most of the conglomerates, political donation is not so important as before, and they are less enthusiastic about it.`,
      `Which industries need to deal with governments? Lee implied that "people who desire to influence politicians are those whose businesses are regulated strictly by government. Take US for example, economic benefits of some industries are controlled by government, such as national defense, water and electric power, telecommunications network, gas, and petrochemical industry. Business groups in those industries have stronger incentives to exert political influence.`,
      `"In Taiwan, financial holding companies made higher political donations in the early days since financial industry had been subject to extensive government regulations; the concession of cement industry will be possible affected by legal regulations for many years. If an industry is influenced with the changes of national policies, business groups in this industry will be more enthusiastic about political donations," said Lee.`,
      `He also indicated that "electronics industry is less willing to making political donations compared with other industries, since its competitive situation is mainly determined by global market rather than government support." To analyze the distribution of industries of business donors, we decided that a subsidiary company is assigned to the industry in which its parent company operates. The result is as follows.`,
      `There were many of the industries which are easily affected by official policies on the list. However, "others" ranked first, follow by electronics industry, which was less enthusiastic about political donations as Lee mentioned before. We speculated that the total number of companies might be an important impact factor; that's to say, there might be more companies in "others" and electronics industry in Taiwan.`,
      `We made further analysis on the share of companies which were more enthusiastic about political donations in their industries. The result is as follows.`,
      'In May of 2016, The Economist released ',
      'Crony Capitalism',
      ' index that ranks countries on the wealth of billionaires as a percentage of GDP. Taiwan ranked 10th among 22 countries with crony sector wealth accounting for 3.2 percent of GDP, higher than Japan, South Korea, and China.',
      'The higher the ratio, the more likely it is that success of businesses in the country depends on close relationships between business and government officials, and all the preferential and favorable benefits offered to businesses are legitimate. They will urge governments through monopoly or lobby to exert administrative power to provide them better environment conditions and greater benefits. In short, they leverage their political connections to make money.',
      'The rent-seeking ',
      'sectors',
      ` covered in The Economist's crony capitalism index included casino, defense, deposit-taking banking and investment banking, infrastructure and pipelines, oil/gas/chemicals/ other energy, real estate, construction, steel/other metals/mining/commodities, and so on. From the data of our project, we found that six out of top ten generous industries belonged to rent-seeking sectors.`,
      'The issue of political connections is highly sensitive. Regulations for political donations from profit-seeking businesses vary from countries. According to ',
      "Research on Taiwan's Political Donations System",
      ` commissioned by Minister of the Interior, businesses in America, South Korea, Canada, and France aren't allowed to make political donations, and businesses in Japan are limited to make donations to political parties (rather than individual politicians).`,
      `The project leader Tai-shun Yang wrote in the research paper, "more and more democratic nations ban corporate and union donations and Taiwan's government should refer to other countries' best practices, especially donations from profit-seeking businesses are limited to ten times more than donations from the individual. The research team suggests that government should examine corporate and union donations with more severe standards."`,
      `"But it's hard to stop the trend of businesses' intention to dominate politics through political donations. Even though we can ban all the donations, collusion between government and business sectors will be gone completely? I don't think so. The corporate will find new way to make donations," said Zong-Rong Lee. "The key point is that to what extent we want to make political donations transparent."`,
      `Taiwan's Political Donations Act was enacted in 2014. Though political candidates are requested to declare the details of political donations, does the government-business relationships become more transparent? Are there some places that receive no sunlight? Please subscribe to our news stories to get new updates about political donations.`
    ],
    'CHART_TITLES': [
      'The compositions of donations from profit-seeking businesses',
      'Which business groups/companies made biggest donations to candidates?',
      'The top ten generous industries',
      'What industries have more interactions with politicians?'
    ],
    'HINTS': [
      `The data of business groups were collected with the help of Zong-Rong Lee through comparison with several business databases and human verification. Please email us or leave your message to us if anything is missed. What's more, we covered only the subsidies affiliated to business groups at the time of making donations. Those subsidies that entered or withdrew from business groups after 2016 weren't included.`,
      'Family business groups refer to those in which family members are involved as directors or as major owners of listed companies',
    ]
  }
}