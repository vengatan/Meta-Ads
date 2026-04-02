import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/insights", async (req, res) => {
  const token = process.env.META_ACCESS_TOKEN;
  const accountId = req.query.account_id;

  const url = `https://graph.facebook.com/v19.0/${accountId}/insights?fields=campaign_name,spend,ctr,cpc&date_preset=last_7d&access_token=${token}`;

  const response = await fetch(url);
  const data = await response.json();

  res.json(data);
});

app.listen(3000, () => console.log("Server running"));
