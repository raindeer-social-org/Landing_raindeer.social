<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap | raindeer.social</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #3e4c6b;
            background: #fafbfd;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(14,27,58,0.04), 0 1px 2px rgba(14,27,58,0.02);
            border: 1px solid #e2e6ee;
          }
          h1 {
            color: #0e1b3a;
            font-size: 24px;
            margin-top: 0;
            margin-bottom: 10px;
          }
          p {
            font-size: 14px;
            color: #66748f;
            margin-bottom: 24px;
            line-height: 1.5;
          }
          a {
            color: #0053cc;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          }
          th {
            background: #f3f5f9;
            color: #0e1b3a;
            text-align: left;
            padding: 10px 15px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            border-bottom: 1px solid #e2e6ee;
          }
          td {
            padding: 12px 15px;
            font-size: 14px;
            border-bottom: 1px solid #e2e6ee;
            word-break: break-all;
          }
          tr:hover td {
            background: #fafbfd;
          }
          .footer {
            margin-top: 30px;
            font-size: 11px;
            color: #9aa4ba;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>XML Sitemap</h1>
          <p>
            This is an XML Sitemap generated for search engines to index <strong>raindeer.social</strong>. 
            You can find more information about XML sitemaps at <a href="https://sitemaps.org" target="_blank" rel="noopener">sitemaps.org</a>.
          </p>
          <table>
            <thead>
              <tr>
                <th style="width: 60%">URL</th>
                <th style="width: 15%">Priority</th>
                <th style="width: 15%">Change Freq.</th>
                <th style="width: 10%">Last Mod.</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:priority"/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <div class="footer">
            © 2026 RAINDEER.SOCIAL
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
