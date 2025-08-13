<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
  <head>
    <title><xsl:value-of select="rss/channel/title"/> RSS Feed</title>
      <style type='text/css'>
            html{
                display:block; background-color:#efefef;
            }
            body{
                display:block; width:80%; margin:0 auto; padding:0;
                background-color:#fff; max-width:980px;
                font:18px Garamond,sans-serif;
            }
            body > .wrap{
                display:block; border:1px solid #cdcdcd;
                padding:0 10px; min-height:90%;
                border-top:none; border-bottom:none;
            }
            #explanation{
                display:block; border-bottom:1px solid #bbb;margin-top:3px
            }
            #explanation h1{
                display:block; margin:0; padding:0;
            }
             #explanation h1 a{
                text-decoration:none; color:#222; display:block;
                padding:3px 2px;
            }
            #explanation h1 a:hover{
                text-decoration:none; color:#000;
                background-color: #efefff; border-radius: 10px 10px 0 0;
            }

            #explanation  span:nth-child(2){
                font-style:italic; color:#999;
            }

            #content .article{
                border-bottom:1px solid #dfdffd;
                margin-top:20px; padding-bottom:10px;
            }
            #content .article h2{

                margin:0 auto 5px; padding:0;

            }
            #content .article h2 a{
                text-decoration:none; color:#fff;
                background-color:#339; display:block;
                padding:5px; border-radius:4px;
                margin:0;
            }
             #content .article:hover h2 a{
                text-decoration:none; color:#fff;
                background-color:#22a; display:block;
                padding:5px;
            }
            #content .article .excerpt{
                display:block; margin:0 5px; padding:0;
                line-height:1.5em;
            }
            #content .article .morelink{
                display:block; margin:10px 10px 0px 5px; padding:0;
                line-height:1.3em; text-align:right;
            }

            @media (max-width:480px){
                body{
                    display:block; width:98%;
                }
            }
      </style>
  </head>
  <body>
   <div class='wrap'>
    <div id="explanation">
        <h1><a href='{rss/channel/link}'><span><xsl:value-of select="rss/channel/title"/></span> <span>- <xsl:value-of select="rss/channel/description"/></span></a></h1>
    </div>
    <div id="content">
      <xsl:for-each select="rss/channel/item">
      <div class="article">
        <h2><a href="{link}" rel="bookmark"><xsl:value-of select="title"/></a></h2>
          <p class='excerpt'><xsl:value-of select="description"/></p>
          <p class='morelink'>Read full article: <a href='{link}'><b><xsl:value-of select="title"/></b></a>
        </p>
      </div>
      </xsl:for-each>
    </div>
      </div>
  </body>
</html>
</xsl:template>
</xsl:stylesheet>
