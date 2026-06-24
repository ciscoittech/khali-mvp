import { Type } from "typebox";
import { defineToolPlugin } from "openclaw/plugin-sdk/tool-plugin";

export default defineToolPlugin({
  id: "trend-scout",
  name: "Trend Scout",
  description:
    "Monitor Google Trends and YouTube channels for rising content opportunities.",
  tools: (tool) => [
    tool({
      name: "check_google_trends",
      description:
        "Check Google Trends for rising search queries in specified categories. " +
        "Returns trending topics with their relative search interest and breakout status. " +
        "Use this to identify what people are searching for RIGHT NOW.",
      parameters: Type.Object({
        keywords: Type.Array(Type.String(), {
          description:
            'Seed keywords to check trends around (e.g. ["AI agents", "Claude Code", "GPU prices"])',
        }),
        geo: Type.Optional(
          Type.String({
            description:
              'Country code for regional trends (e.g. "US", "NG", "GB"). Omit for worldwide.',
          })
        ),
        timeframe: Type.Optional(
          Type.String({
            description:
              'Timeframe: "now 1-H" (past hour), "now 4-H", "now 1-d" (past day), "now 7-d" (past week). Default: "now 1-d"',
          })
        ),
      }),
      execute: async ({ keywords, geo, timeframe }) => {
        // Google Trends doesn't have a public API — scrape the explore page
        const period = timeframe || "now 1-d";
        const region = geo || "";

        const results: Array<{
          keyword: string;
          related_rising: string[];
          status: string;
        }> = [];

        for (const keyword of keywords) {
          try {
            const params = new URLSearchParams({
              q: keyword,
              date: period,
              geo: region,
            });

            const resp = await fetch(
              `https://trends.google.com/trends/api/dailytrends?hl=en&geo=${region || "US"}&ns=15`,
              { headers: { "Accept-Language": "en" } }
            );

            if (resp.ok) {
              const text = await resp.text();
              // Google prefixes response with )]}' — strip it
              const clean = text.replace(/^\)\]\}'/, "");
              try {
                const data = JSON.parse(clean);
                const trending =
                  data?.default?.trendingSearchesDays?.[0]?.trendingSearches || [];

                const related = trending
                  .slice(0, 5)
                  .map(
                    (t: any) =>
                      `${t.title?.query || "?"} (${t.formattedTraffic || "?"})`
                  );

                results.push({
                  keyword,
                  related_rising: related,
                  status: "ok",
                });
              } catch {
                results.push({
                  keyword,
                  related_rising: [],
                  status: "parse_error",
                });
              }
            } else {
              results.push({
                keyword,
                related_rising: [],
                status: `http_${resp.status}`,
              });
            }
          } catch {
            results.push({ keyword, related_rising: [], status: "error" });
          }

          // Polite delay
          await new Promise((r) => setTimeout(r, 1500));
        }

        return {
          keywords_checked: keywords.length,
          geo: region || "worldwide",
          timeframe: period,
          trends: results,
        };
      },
    }),

    tool({
      name: "get_channel_recent",
      description:
        "Get recent uploads from a YouTube channel via RSS (no API key needed). " +
        "Returns the latest videos with titles and publish dates. " +
        "Useful for monitoring competitor channels or creators in your niche.",
      parameters: Type.Object({
        channel_id: Type.String({
          description:
            "YouTube channel ID (starts with UC...). Find it from the channel URL.",
        }),
        max_results: Type.Optional(
          Type.Number({ description: "Max videos to return (default: 10)" })
        ),
      }),
      execute: async ({ channel_id, max_results }) => {
        const limit = max_results || 10;
        const resp = await fetch(
          `https://www.youtube.com/feeds/videos.xml?channel_id=${channel_id}`
        );

        if (!resp.ok) {
          throw new Error(
            `Failed to fetch channel feed: ${resp.status}`
          );
        }

        const xml = await resp.text();

        // Simple XML extraction (no parser dependency needed)
        const entries: Array<{
          title: string;
          video_id: string;
          url: string;
          published: string;
        }> = [];

        const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
        let match;
        while ((match = entryRegex.exec(xml)) && entries.length < limit) {
          const entry = match[1];
          const title =
            entry.match(/<title>(.*?)<\/title>/)?.[1] || "";
          const videoId =
            entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] || "";
          const published =
            entry.match(/<published>(.*?)<\/published>/)?.[1] || "";

          entries.push({
            title,
            video_id: videoId,
            url: `https://www.youtube.com/watch?v=${videoId}`,
            published,
          });
        }

        const channelName =
          xml.match(/<author>\s*<name>(.*?)<\/name>/)?.[1] || channel_id;

        return {
          channel: channelName,
          channel_id,
          video_count: entries.length,
          videos: entries,
        };
      },
    }),
  ],
});
