export const structuredDataScript = `
<script type="application/ld+json">
{
  "@context": "http://schema.org/",
  "@type": "Dataset",
  "name": "PoliticalContribution's name",
  "alternateName": "PoliticalContribution's alternate name",
  "description": "PoliticalContribution's description",
  "url": "https://github.com/mirror-media/politicalcontribution",
  "sameAs": "https://www.readr.tw/project/political-contribution",
  "dateCreated": "2018-01-01",
  "temporalCoverage": "1950-01-01/2018-12-31",
  "keywords":[
    "PoliticalContribution"
  ],
  "creator":{
    "@type": "Organization",
    "url": "https://www.cy.gov.tw/",
    "name": "The Control Yuan, Republic of China(Taiwan)",
    "contactPoint":{
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://www.cy.gov.tw/",
      "email": ""
    }
  },
  "distribution":[
    {
      "@type": "DataDownload",
      "encodingFormat": "PDF",
      "contentUrl": "https://github.com/mirror-media/politicalcontribution/blob/master/legislators/2008/A14_scanall_7.pdf",
      "description": "第七屆立委政治獻金原始掃描檔"
    },
    {
      "@type": "DataDownload",
      "encodingFormat": "CSV",
      "contentUrl": "https://github.com/mirror-media/politicalcontribution/blob/master/legislators/2008/A16_basicall_7.csv",
      "description": "第七屆立委基本資料"
    },
    {
      "@type": "DataDownload",
      "encodingFormat": "CSV",
      "contentUrl": "https://github.com/mirror-media/politicalcontribution/blob/master/legislators/2008/political_donation_7_od.csv",
      "description": "第七屆立委政治獻金csv檔案"
    },
    {
      "@type": "DataDownload",
      "encodingFormat": "CSV",
      "contentUrl": "https://github.com/mirror-media/politicalcontribution/blob/master/legislators/2012/A15_basicall_8.csv",
      "description": "第八屆立委基本資料"
    },
    {
      "@type": "DataDownload",
      "encodingFormat": "CSV",
      "contentUrl": "https://github.com/mirror-media/politicalcontribution/blob/master/legislators/2012/political_donation_8_od.csv",
      "description": "第八屆立委政治獻金csv檔案"
    },
    {
      "@type": "DataDownload",
      "encodingFormat": "PDF",
      "contentUrl": "https://github.com/mirror-media/politicalcontribution/blob/master/legislators/2016/A12_scanallpublic.pdf",
      "description": "第九屆立委政治獻金原始掃描檔"
    },
    {
      "@type": "DataDownload",
      "encodingFormat": "CSV",
      "contentUrl": "https://github.com/mirror-media/politicalcontribution/blob/master/legislators/2016/A05_basic_all.csv",
      "description": "第九屆立委基本資料"
    },
    {
      "@type": "DataDownload",
      "encodingFormat": "CSV",
      "contentUrl": "https://github.com/mirror-media/politicalcontribution/blob/master/legislators/2016/A02_company_all_public.csv",
      "description": "第九屆立委政治獻金csv檔案"
    }
  ],
  "spatialCoverage":{
    "@type": "Place",
    "geo":{
      "@type": "GeoShape",
      "box": "18.0 -65.0 72.0 172.0"
    }
  }
}
</script>`