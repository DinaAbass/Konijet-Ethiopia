import { useEffect, useState } from "react";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Wind } from "lucide-react";

type Weather = {
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  sunrise: string;
  sunset: string;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windKmh: number;
};

const fmtTime = (unix: number, tz: number) => {
  const d = new Date((unix + tz) * 1000);
  return `${d.getUTCHours().toString().padStart(2, "0")}:${d.getUTCMinutes().toString().padStart(2, "0")}`;
};

const iconFor = (code: string) => {
  if (code.startsWith("01")) return Sun;
  if (code.startsWith("02") || code.startsWith("03") || code.startsWith("04")) return Cloud;
  if (code.startsWith("09")) return CloudDrizzle;
  if (code.startsWith("10")) return CloudRain;
  if (code.startsWith("11")) return CloudLightning;
  if (code.startsWith("13")) return CloudSnow;
  return Cloud;
};

export const WeatherWidget = ({ city = "Addis Ababa" }: { city?: string }) => {
  const [w, setW] = useState<Weather | null>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [err, setErr] = useState(false);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    if (!apiKey) { setErr(true); return; }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},ET&units=metric&appid=${apiKey}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(d => setW({
        temp: d.main.temp,
        feelsLike: d.main.feels_like,
        description: d.weather[0]?.description ?? "",
        icon: d.weather[0]?.icon ?? "01d",
        sunrise: fmtTime(d.sys.sunrise, d.timezone),
        sunset: fmtTime(d.sys.sunset, d.timezone),
        tempMin: d.main.temp_min,
        tempMax: d.main.temp_max,
        humidity: d.main.humidity,
        windKmh: Math.round((d.wind.speed ?? 0) * 3.6),
      }))
      .catch(() => setErr(true));
  }, [city, apiKey]);

  if (err || !w) {
    return (
      <section className="container-page py-6">
        <div className="rounded-2xl bg-muted/40 px-6 py-8 text-sm text-muted-foreground">
          {err ? "Weather temporarily unavailable." : "Loading weather…"}
        </div>
      </section>
    );
  }

  const Icon = iconFor(w.icon);
  const toUnit = (c: number) => unit === "C" ? c.toFixed(1) : ((c * 9) / 5 + 32).toFixed(1);

  return (
    <section className="container-page py-6">
      <div className="rounded-2xl bg-muted/30 px-5 md:px-8 py-6 border-b-4 border-secondary/60">
        <h3 className="font-display text-xl text-primary mb-4">Weather in {city}</h3>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-5xl font-light text-foreground">{toUnit(w.temp)}°</div>
              <div className="text-xs text-muted-foreground mt-1">
                <button onClick={() => setUnit("C")} className={unit === "C" ? "text-foreground font-medium" : "hover:text-primary"}>Celsius</button>
                <span className="mx-2">·</span>
                <button onClick={() => setUnit("F")} className={unit === "F" ? "text-foreground font-medium" : "text-secondary hover:underline"}>Fahrenheit</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon className="h-12 w-12 text-secondary" />
              <span className="text-xl font-medium capitalize">{w.description}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm ml-auto">
            <Stat label="Sunrise" value={w.sunrise} />
            <Stat label="Sunset" value={w.sunset} />
            <Stat label="Low" value={`${toUnit(w.tempMin)}°`} />
            <Stat label="High" value={`${toUnit(w.tempMax)}°`} />
            <Stat label="Humidity" value={`${w.humidity}%`} />
            <Stat label="Wind" value={`${w.windKmh} km/h`} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-muted-foreground">{label}</div>
    <div className="text-secondary font-semibold">{value}</div>
  </div>
);
