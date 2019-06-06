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
  },
  'STORY4': {
    'TITLE': 'Are the details of political donations completely open?',
    'SUBTITLES': [
      'If we need to wait for government to take actions, how much longer should we wait?',
      'Election regulation means more than transparency of political donations',
      'As election become increasingly fair, newcomers are more willing to run for election.'
    ],
    'P': [
      '" [The data of political donations] are not completely open. The real value of data is to be applied rather than to be read on paper," said Ronny Wang, one of the initiators of',
      'The Transparency of Political Contributions',
      'project',
      '',
      `The Transparency of Political Contributions projects started from a hackathon. The members of the civil group Anti-Nuclear Four-Five-Six took the details of seven dedicated accounts for political donations to the hackathon, they wanted to examine the government-business relationships of pro-nuclear candidates. "g0v aims to advocate open government in the hope that the public have easy access to official data. Many g0v participants felt outraged when they were informed that the details of political donations could only be acquired in printed copies," said Ronny Wang. Since the government wasn't familiar with the idea of open data at that time, g0v participants decided to solve the problem by themselves.`,
      `"The timing of the project was close to sunflower movement, and many netizens felt resentful with under-the-table politics. They wanted to do something but didn't know what to do. I decided to launch the crowdsourcing project of political donations data digitization for them to let off steam. They will recognize that they can make Taiwan a better country through keyboard and make the public more aware of the issue of political donations," said Ronny Wang.`,
      'After the objective of crowdsourcing was confirmed, Ronny Wang scanned all the printed documents into page images and divided them into word images to be recognized through crowdsourcing',
      '. Within 24 hours, the project completed recognition of 31K entries and digitization of the data from 2,637 documents and seven dedicated accounts for political donations.',
      `"Those netizens wouldn't stop here," said Ronny Wang, "I felt so happy that more netizens know that it's not too complicated to show your concern about politics and the country. You can start small." After the details of the seven dedicated accounts were digitized into organized data, members of the civil group copied the details of other dedicated accounts for political donations to be digitized through crowdsourcing.`,
      `The project didn't open all the data of candidates' dedicated accounts. Aside from expensive human efforts, some legislators urged to amend Political Donations Act and Ronny Wang thought that the project had achieved its desired results and there would be organized data after amendment was passed." To his surprise, "it was like that Chao Ming had been waiting for Chang Wu-Ji at Dadu for such a long time and didn't know how much longer she would have to wait."`,
      `The Executive Yuen proposed a draft amendment to Political Donations Act and required political candidates to make public the details of donations from business groups which exceed NT$500,000. Legislators Chi-Mai Chen, Kun-Tse Lee, Ying-Yuan Lee (current director of environmental protection) had proposed their own version of amendment to the law. All of them claimed that the details of political donations should be made public. In the version proposed by Kun-Tse Lee, open data should be available for easy copy and download. After the provisions passed its first reading, there had been no news about the amendments.`,
      `After two elections were held, the way we acquire the details of political donations is as the same as three years ago. In response to g0v crowdsourcing project, the Control Yuen claimed that "g0v should think carefully about the project and it would be better to wait for the government to take actions." How much longer should we wait?`,
      `Among those legislators who proposed their own versions of amendment, only Chi-Mai Chen continued to propose his own version of amendment last May. He told the journalist that it was difficult to pass the draft amendment in the face of strong opposition from other legislators. Some of them worried that if the details were made public, it would scare the donors; some of them felt concerned about the likelihood of personal data leaks. But Chi-Mai Chen thought that "there is no reason not to disclose the details of political donations." As for the possibility of passing the amendment in this legislative session, "it takes time to observe attentively."`,
      `Regarding possible oppositions, Ronny Wang claimed that he will respect individual's freedom not to disclose personal details of political donations. As for the data except for individual donors, "such as donations from political parties, business groups and [candidates'] expenditures should be made public."`,
      `"Political donation isn't necessarily a bad thing; opaque donation is the real problem," said Ronny Wang, "Many people view political donation as evil or collusion. We need to publicize details of political donations to change people's perceptions and make them understand that it's essential for democratic system."`,
      `"Business donations and lobbies are quite usual in democratic nations. We shouldn't view donations or lobbies as improper tactics," said Ronny Wang. But if we open all the data and ban money exchanges under the table, elections will become increasingly fair. Business donations provide the public an opportunity to examine if there are donation records between businesses and candidates so that the candidates won't favor certain businesses blatantly after election.`,
      `Besides of political donations, there's room for improvement as to regulations of elections in Taiwan.`,
      `Shang-Chih Chen, associate professor of political science of National Chung Cheng University and the candidate for 2016 legislator election, suggested that we should examine campaign donations from three aspects: government subsidies, official regulations, and public disclosure. Political Donations Act reinforces the third aspect, but there are no regulations for the first two aspects.`,
      `Government subsidy refers to publicly funded elections. Taiwan has adopted partial public funding system. The campaign expenses paid by the electee will be subsidized by a rate of NT$30 per vote. The government will also provide subsidies for campaign to the political parties every year.`,
      `Official regulations refer to guidance for campaign funds. In fact, the election commission puts a cap on campaign fund for candidates. According to Article 41 of `,
      'Civil Servants Election And Recall Act',
      `, the maximum campaign fund of each kind of civil servants shall be publicized by the election commission. The maximum will be the sum of 70 % of the total population of the electoral district divided by the quota of elect and the multiply by the basic amount of NT$ 30, plus a fixed amount. The fixed amount is NT$ 10,000,000 for each candidate for legislator election. Based on current constituency division, Hsinchu County has more voters than any other districts and the maximum of campaign fund for candidates in the district can reach NT$ 18,000,000.`,
      `We examined the data and found that 77 candidates, 30% of total candidates, whose campaign fund exceeded the maximum. Why was that? After Political Donations Act was enacted in 2014, the penalty provisions for exceeding the maximum were removed. It's strange that there are only rules and regulations without penalty provisions.`,
      `Shang-Chih Chen explained that the government considers regulation and transparency are two different approaches and can only choose one of them. That's to say, if the data of political donations are open, there's no need for regulations. Is that true?`,
      `"There is no maximum on donations and expenditures, and few regulations for campaign activities. Public subsidy remains NT$ 30 per vote. Public channels for promotion decrease year by year. Political donation depends on candidate's self-declaration without official inspection. Is it what we want?" said Shang-Chih Chen.`,
      'From the ',
      'analysis',
      ` of political donations to candidates, we find that financial resources are too concentrated on incumbents, and there's a big gap in the winning rate between incumbents and challengers. Shang-Chih Chen said based on his own election experience, "money is too important."`,
      `"In the beginning of the election, the key point is to raise popularity," said Shang-Chih Chen. Based on Political Donations Act, candidates can open dedicated account for political donations them months before election. "After you open the account and build online payment platform, two months have passed; as you really receive donations, another two months have passed. In the first half of the year, your account has been overdrawn. How do you get the money for your expenditure? It's a big question, not to mention there is primary election both in KMT and DPP.`,
      `"Billboard ad is the quickest way to raise popularity but also the most expensive one. The cost of a small square is four or five times more than housing rent. If the billboard ads will be hung out for 12 months, how much money do you need to pay?" Shang-Chih Chen added that promotion channels will be limited by the amount of campaign fund candidates can receive. "When I run for election, I used facial tissues as promotional products. We can deliver facial tissues through express companies or post offices but delivery cost is more expensive than production. At last, we recruited part-time workers to deliver facial tissues door to door. If government can help candidates to deliver promotional products, things will be different."`,
      `"Even though election commission will hold public hustings, "it is usually broadcast on fringe time. I spent lots of time to prepare and found no one watch it on TV but on the internet. One of the candidates said to me, ‘You work so hard and write a script.' You see. No one cares," said Shang-Chih Chen.`,
      `Shang-Chih Chen has advocated the system of public funding for candidates for many years in the hope that government increase the amount and fairness of election subsidies and reduce the financial obstacles for newcomers. He also suggested that we should strengthen the disclosure of private fortunes and transparency of advertising purchase to have more sound election conditions.`,
      `As for government, open data means that the data can collected in the Control Yuen can be reviewed by the public. Mirror Media took actions to reflect the limitations. We hope to emphasize the importance of open data through data application and crowdsourcing. But it's just the beginning, we need to pay more attention to the transparency of government-business relationships, regulations on political donations, and management of campaign.`
    ],
    'IMG_CAPTIONS': [
      `"The Transparency of Political Contributions" project in 2014`
    ],
    'HINTS': [
      [
        `Read the full transcript of Wang's interview, please click `,
        'here'
      ],
      `How did they recognize the word images? It looks like Captcha we see on websites every day. Most of websites require visitors to enter a series of letters or numbers in a distorted image to verify whether a visitor is human or not. Based on Captcha, reCAPTCHA project aims to translate ancient documents which are not easily distinguishable into recognizable images. As users enter letters precisely shown in the images to prove they are not robots, they accomplish successfully manual recognition. reCAPTCHA was acquired by Google in September 2009. It's reported that the system can complete 200 million recognitions each day. It's doubtless that reCAPTCHA project can assist in digitization of documents and images.`
    ]
  },
  'STORY5': {
    'TITLE': 'What the data tells us?<br>Five crutical findings of political donations.',
    'SUBTITLES': [
      `A change of mind! Most groups' tendencies of donations are not fixed.`,
      `Wholesale and retail trade, manufacturing and real estate activities were industries that donated much money`,
      'The top active industies of donattion were mining and quarrying, electricity and gas and real estate activities.',
      `DPP in the ninth attract significant increase of donations, catching up with KMT, but the composition of donations was different.`,
      `The overall revenue increased, but the impact of profit-seeking businesses decreased?`,
    ],
    'P': [
      `Last year we finished the digitization political donations of the ninth legislators, we found there were still questions that could not be answered. Therefore, an idea had emerged: "it would be good to have enough historical data for cross-checking". With the help from netizens, we digitized donation from profit-seeking businesses of the seventh and eighth legislators.`,
      `Of course, this data cannot 100% present the money flow during election periods because it has to do with whether the candidates declared him or herself or Control Yuan's investigation. But it is still an important starting point of the issue. Here we found something interesting:`,
      `In 2008, the amount of donations of the Formosa Plastics Group ranked tenth. But the amount had decreased by years. In 2012 it donated a total of 1.35 million and in 2016 only donated 1.1 million. The donations went to both KMT and DPP.`,
      `Other famous groups such as Yuanta group ranked eighteenth in 2008 (donated a total of 3.7 million) was only resurfaced in 2016, donating one million to two DPP candidates. As for the United Group which ranked fourteenth in 2008, it had completely vanished from the money flows of the following two sessions.`,
      `On the other hand, Vedan Enterprise was not in the top ten list in 2008 but made its comeback to the fifth with a doubling of the amount of donations in following two sessions.`,
      `Furthermore, we sorted out the groups that had donated in all three legislative elections then observed their tendencies of political parties when donating. We discovered that only a few groups held fixed tendencies. The spectrum of candidates that groups had donated shifted gradually from KMT to DPP. Some groups even donated to the opposite side in the 2016 election.`,
      `In 2008, groups on the top ten donation list were largely in favor of KMT. The only two different groups were Taiwan Optical Platform 38% in favor of DPP (and in 2012 changed attitude to 72% support KMT) and Ruentex Group 80% in favor of DPP.`,
      `What is more, in the trend of shifting from KMT to DPP, Ruentex Group made an opposite decision. In 2012 it donated 100% to DPP candidates while in 2016 only 20% left with 68% donations went to KMT candidates.`,
      `In 2012, Ta Ching group (100%) , Gold Capital group (100%), Yieh United Steel Group (100%) and Yulon Group (97%) were highly loyal to KMT candidates. But when it came to 2016, Ta Ching group was the only one that still 100% donated to KMT. The “loyal level ”of Yulon Group dropped to 70% . Yieh United Steel Group was even down to 38%, making its first time to provide more support to DPP candidates. Far Eastern Group always had the highest amount of donation, it shifted from highly support KMT to both sides.`,
      'We changed the way to calculate industrial categories based on the taxation registration from Ministry of Finanace,',
      'corresponding to the code by the industries to nineteen large category classified by the tax department',
      'Since a company may register multiple industries',
      ', and as long as there is trade or sale activities that can register as wholesale and retail trade, we assumed that it was because the number of Population made wholesale and retail trade made it the number one industry. Three sessions were pretty much the same.',
      `Considering the number of population to further analyze how active the industry was in donation, we found Ores and quarrying ranked number one (2012, 2016) and Electricity and gas supply industry (2008). Three sessions showed little difference.`,
      `These highly active industries were mostly in line with industries "make money through relations" listed in "The Economist".`,
      'In 2008 and 2012 there was not much change of donation income of DPP. In 2016 political donations had increased 37% to 1.2 billion, higher than KMT for the first time.',
      `As for KMT, its political donations reached 1.4 billion peak in 2012, other two years remained at around 1.2 billion. But there was a change in the composition of income. Donation from profit-seeking businesses dropped to a record low in 2016, accounting for only 3% of total revenue. Donation from party soared to 36% (the most popular momentum in 2012 only accounted for 20%). KMT candidates in 2016 elections mainly relied on party donations for campaigns.`,
      `Donation from profit-seeking businesses of DPP dropped 10% compared to 2008, we assume it was because the donations of total profit-seeking businesses decreased. What more, in 2012, DPP’s donation from profit-seeking businesses accounted for less than 30% while 60% from individuals. When it came to 2016, donation from profit-seeking businesses reached 37% but individuals donations decreased. `,
      `Total income of political donations for legislators reached 2.2 billion to 2.8 billions from 2008 to 2016, but the number of candidates (those who set up accounts for political donations and registered ) also increased from 191 to 261 .`,
      `Although the total amount increased, but the proportion of donations from profit-seeking business decreased year by year. Meanwhile, individual donations went up relatively. We assumed it was because there were more independent candidates that not from KMT nor DPP (52 in 2008 to 122 in 2016). Independent candidates attracted less attention from big companies, relying more on individual donations.`,
      `With more and more rookies going into politics, will “money ”be an important threshold? With the government to amend the law , more details of political donations will be revealed in the future, but this is only the first step, we will continue to monitor it with you!`,
      `What are you curious about? Welcome to dig out more to share with us from the `,
      'chart',
      ' or ',
      'raw data',
      '',
    ],
    'CHART_TITLES': [
      `Which groups donated the most money? to the Blue (KMT) or to the Green (DPP)?`,
      `Which groups donated in all 3 legislative elections? preference of party changed? `,
    ],
    'HINTS': [
      '假設 A 公司登記為「製造業」與「批發零售業」，捐贈 2 萬元，則計算方式為「製造業 2 萬元」、「批發零售業 2 萬元」，故加總金額會大於總金額',
      [
        'In May of 2016, The Economist released ',
        'Crony Capitalism',
        `index that ranks countries on the wealth of billionaires as a percentage of GDP. Taiwan ranked 10th among 22 countries with crony sector wealth accounting for 3.2 percent of GDP, higher than Japan, South Korea, and China. The higher the ratio, the more likely it is that success of businesses in the country depends on close relationships between business and government officials, and all the preferential and favorable benefits offered to businesses are legitimate. They will urge governments through monopoly or lobby to exert administrative power to provide them better environment conditions and greater benefits. In short, they leverage their political connections to make money. The rent-seeking sectors covered in The Economist's crony capitalism index included casino, defense, deposit-taking banking and investment banking, infrastructure and pipelines, oil/gas/chemicals/ other energy, real estate, construction, steel/other metals/mining/commodities, and so on.`
      ]
    ]
  },
}