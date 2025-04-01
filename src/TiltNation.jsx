
import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

export default function TiltNation() {
  const [sessions, setSessions] = useState([]);
  const [playerInput, setPlayerInput] = useState("");
  const [players, setPlayers] = useState([]);
  const [buyIn, setBuyIn] = useState(10);
  const [recaves, setRecaves] = useState({});
  const [gains, setGains] = useState({});

  const addPlayer = () => {
    if (playerInput.trim() !== "") {
      setPlayers([...players, playerInput.trim()]);
      setPlayerInput("");
    }
  };

  const handleRecaveChange = (name, value) => {
    setRecaves({ ...recaves, [name]: Number(value) });
  };

  const handleGainChange = (name, value) => {
    setGains({ ...gains, [name]: Number(value) });
  };

  const handleRecaveKeyDown = (e, name) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRecaveChange(name, e.target.value);
    }
  };

  const handleGainKeyDown = (e, name) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGainChange(name, e.target.value);
    }
  };

  const addSession = () => {
    const totalInvested = Object.fromEntries(
      players.map((p) => [p, buyIn + (recaves[p] ? recaves[p] * buyIn : 0)])
    );
    const profit = {};
    players.forEach((p) => {
      const gain = gains[p] || 0;
      profit[p] = gain - totalInvested[p];
    });

    const session = {
      date: new Date().toLocaleDateString(),
      players,
      buyIn,
      recaves,
      gains,
      profit
    };

    setSessions([...sessions, session]);
    setPlayers([]);
    setRecaves({});
    setGains({});
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPlayer();
    }
  };

  const cumulative = {};
  sessions.forEach((s) => {
    Object.entries(s.profit).forEach(([name, profit]) => {
      cumulative[name] = (cumulative[name] || 0) + profit;
    });
  });

  const sortedRanking = Object.entries(cumulative).sort((a, b) => b[1] - a[1]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Tilt Nation</h1>

      <Card>
        <CardContent className="space-y-2 p-4">
          <h2 className="font-semibold">Nouvelle soirée</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Nom du joueur"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={addPlayer}>Ajouter joueur</Button>
          </div>
          <div className="flex gap-2 items-center">
            <label>Buy-in:</label>
            <Input
              type="number"
              value={buyIn}
              onChange={(e) => setBuyIn(Number(e.target.value))}
              className="w-20"
            />
          </div>
          {players.map((p) => (
            <div key={p} className="flex gap-4 items-center">
              <span className="w-24">{p}</span>
              <Input
                type="number"
                placeholder="Recaves"
                className="w-24"
                onChange={(e) => handleRecaveChange(p, e.target.value)}
                onKeyDown={(e) => handleRecaveKeyDown(e, p)}
              />
              <Input
                type="number"
                placeholder="Gain (€)"
                className="w-24"
                onChange={(e) => handleGainChange(p, e.target.value)}
                onKeyDown={(e) => handleGainKeyDown(e, p)}
              />
            </div>
          ))}
          <Button onClick={addSession}>Enregistrer la soirée</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold">Classement</h2>
          <ul>
            {sortedRanking.map(([name, total]) => (
              <li key={name}>
                {name}: {total > 0 ? "+" : ""}{total}€
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {sessions.map((s, idx) => (
        <Card key={idx}>
          <CardContent className="p-4">
            <h3 className="font-semibold">Soirée #{idx + 1} — {s.date}</h3>
            <ul>
              {s.players.map((p) => (
                <li key={p}>
                  {p}: {s.profit[p] > 0 ? "+" : ""}{s.profit[p]}€
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
