import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/insights", async (req, res) => {
  try {
    const token = process.env.META_ACCESS_TOKEN;
    const rawAccountId = req.query.account_id;

    if (!rawAccountId) {
      return res.status(400).json({ error: "Missing account_id" });
    }

    // ✅ FIX: normalize account ID
    const accountId = rawAccountId.startsWith("act_")
      ? rawAccountId
      : `act_${rawAccountId}`;

    const params = new URLSearchParams({
      access_token: token,
      fields: "campaign_name,adset_name,spend,impressions,clicks,ctr,cpc",
      date_preset: "last_7d"
    });

    const url = `https://graph.facebook.com/v19.0/${accountId}/insights?${params}`;

    console.log("REQUEST URL:", url);

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Meta Ads API is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
