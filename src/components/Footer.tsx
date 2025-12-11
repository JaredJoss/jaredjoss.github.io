import { useEffect, useState } from "react";
import ScrambleText from "@/components/ScrambleText";

interface LastFmTrack {
  name: string;
  artist: string;
  url: string;
  nowPlaying: boolean;
  timestamp: number | null;
}

const getTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp * 1000;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const Footer = () => {
  const [track, setTrack] = useState<LastFmTrack | null>(null);
  const [visitCount, setVisitCount] = useState<number | null>(null);

  // Track page visits using counterapi.dev
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Increment the counter
        const response = await fetch(
          "https://api.counterapi.dev/v1/jaredjoselowitz/visits/up"
        );
        const data = await response.json();
        setVisitCount(data.count);
      } catch (error) {
        console.error("Failed to track visit:", error);
      }
    };
    trackVisit();
  }, []);

  useEffect(() => {
    const fetchRecentTrack = async () => {
      const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
      const username = import.meta.env.VITE_LASTFM_USERNAME;
      
      if (!apiKey || !username) return;

      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
        );
        const data = await response.json();
        const recentTrack = data.recenttracks?.track?.[0];
        
        if (recentTrack) {
          setTrack({
            name: recentTrack.name,
            artist: recentTrack.artist["#text"],
            url: recentTrack.url,
            nowPlaying: recentTrack["@attr"]?.nowplaying === "true",
            timestamp: recentTrack.date?.uts ? parseInt(recentTrack.date.uts) : null,
          });
        }
      } catch (error) {
        console.error("Failed to fetch Last.fm track:", error);
      }
    };

    fetchRecentTrack();
    // Refresh every 30 seconds
    const interval = setInterval(fetchRecentTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 px-8 py-6 flex justify-between items-end text-sm">
      <div className="space-y-1">
        {track && (
          <div className="space-y-1 group/song">
            <div className="text-muted-foreground text-xs opacity-0 group-hover/song:opacity-100 transition-opacity duration-200">
              {track.nowPlaying ? "playing now" : track.timestamp ? `last song - ${getTimeAgo(track.timestamp)}` : ""}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-foreground">{track.nowPlaying ? "♪" : "♫"}</span>
              <ScrambleText text={track.name.toLowerCase()} />
              <span>by</span>
              <a 
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground link-hover"
              >
                <ScrambleText text={track.artist.toLowerCase()} />
              </a>
              <span className="text-primary">↗</span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <ScrambleText text="london" className="text-foreground" />
          <span>,</span>
          <ScrambleText text="uk" />
        </div>
      </div>
      
      <div className="text-right space-y-1 group/visits">
        <div className="text-muted-foreground text-xs opacity-0 group-hover/visits:opacity-100 transition-opacity duration-200">
          visits
        </div>
        <div className="text-muted-foreground">
          <ScrambleText 
            text={visitCount !== null ? String(visitCount).padStart(6, "0") : "------"} 
            className="text-primary font-medium tracking-wider" 
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
