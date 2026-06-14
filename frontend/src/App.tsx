import { useState, useEffect, useCallback } from "react";
import type { FormEvent } from "react";
import { SlotSymbol } from "./components/SlotSymbol";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api/game";

// Símbolos padrão para animação de rotação
const ANIMATION_SYMBOLS = ["🍒", "🍋", "🔔", "⭐", "🍀", "💎", "7️⃣", "🍒", "🍋", "🔔", "⭐", "🍀", "💎", "7️⃣"];

// Funções auxiliares para sintetizar efeitos sonoros usando a Web Audio API
const playClickSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.08);

    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.08);

    setTimeout(() => {
      audioCtx.close();
    }, 100);
  } catch (err) {
    console.warn("Web Audio API click sound error:", err);
  }
};

const playSpinSound = (durationMs: number = 2000) => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    const audioCtx = new AudioContextClass();
    let time = audioCtx.currentTime;
    let interval = 0.06; // Começa rápido (60ms)
    const endTime = audioCtx.currentTime + (durationMs / 1000);

    while (time < endTime) {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(150 - (time - audioCtx.currentTime) * 30, time);

      gainNode.gain.setValueAtTime(0.15, time);
      gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.03);

      osc.start(time);
      osc.stop(time + 0.03);

      time += interval;
      interval += 0.005; // Desaceleração gradual
    }

    setTimeout(() => {
      audioCtx.close();
    }, durationMs + 200);
  } catch (err) {
    console.warn("Web Audio API spin sound error:", err);
  }
};

const playJackpotSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    const audioCtx = new AudioContextClass();
    const duration = 3.5;
    const startTime = audioCtx.currentTime;

    for (let i = 0; i < 45; i++) {
      const delay = Math.random() * duration;
      const time = startTime + delay;

      const baseFreq = 800 + Math.random() * 400;
      const frequencies = [baseFreq, baseFreq * 1.3, baseFreq * 2.5, baseFreq * 5.1];

      const gainNode = audioCtx.createGain();
      gainNode.connect(audioCtx.destination);

      const volume = 0.08 * (1 - delay / duration);
      gainNode.gain.setValueAtTime(volume, time);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

      frequencies.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);
        osc.connect(gainNode);
        osc.start(time);
        osc.stop(time + 0.15);
      });
    }

    setTimeout(() => {
      audioCtx.close();
    }, 4000);
  } catch (err) {
    console.warn("Web Audio API jackpot sound error:", err);
  }
};

export default function App() {
  const [balance, setBalance] = useState<number>(0);
  const [reels, setReels] = useState<string[]>(["🍒", "🍋", "🔔"]);
  const [spinningReels, setSpinningReels] = useState<boolean[]>([false, false, false]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  // Modais e Estados Visuais
  const [showDepositModal, setShowDepositModal] = useState<boolean>(false);
  const [showOutOfBalanceModal, setShowOutOfBalanceModal] = useState<boolean>(false);
  const [showJackpotCelebration, setShowJackpotCelebration] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/status`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setBalance(data.balance);
      }
    } catch (err) {
      console.error("Erro ao buscar status do saldo:", err);
    }
  }, []);

  const showError = useCallback((msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 4000);
  }, []);

  const handleDepositSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const amountVal = parseInt(depositAmount, 10);
    if (isNaN(amountVal) || amountVal <= 0) {
      showError("Por favor, digite um valor de depósito válido.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountVal }),
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setBalance(data.balance);
        setShowDepositModal(false);
        setShowOutOfBalanceModal(false);
        setDepositAmount("");
      } else {
        const errData = await res.json();
        showError(errData.error || "Erro ao efetuar depósito.");
      }
    } catch (err) {
      console.error("Erro ao efetuar depósito:", err);
      showError("Erro de rede ao conectar com o servidor.");
    }
  }, [depositAmount, showError]);

  const handleQuit = useCallback(async () => {
    playClickSound();
    try {
      const res = await fetch(`${API_BASE}/quit`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setBalance(data.balance);
        setReels(["🍒", "🍋", "🔔"]);
        setShowOutOfBalanceModal(false);
        alert("Sessão finalizada. Obrigado por jogar!");
      }
    } catch (err) {
      console.error("Erro ao encerrar jogo:", err);
    }
  }, []);

  const handleSpin = useCallback(async () => {
    if (isSpinning) return;
    if (balance <= 0) {
      setShowOutOfBalanceModal(true);
      return;
    }

    // Inicia a animação de girar
    setIsSpinning(true);
    setSpinningReels([true, true, true]);
    setErrorMsg("");
    playSpinSound(2000);

    // Otimização visual imediata do saldo (custa 1 ficha para girar)
    setBalance((prev) => Math.max(0, prev - 1));

    try {
      const res = await fetch(`${API_BASE}/spin`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json(); // data = { slots: [...], newBalance: X, isJackpot: bool, gameOver: bool }

        // Cronometra a parada das bobinas sequencialmente para efeito realista
        setTimeout(() => {
          setReels((prev) => [data.slots[0], prev[1], prev[2]]);
          setSpinningReels([false, true, true]);
        }, 800);

        setTimeout(() => {
          setReels((prev) => [prev[0], data.slots[1], prev[2]]);
          setSpinningReels([false, false, true]);
        }, 1400);

        setTimeout(() => {
          setReels((prev) => [prev[0], prev[1], data.slots[2]]);
          setSpinningReels([false, false, false]);
          setBalance(data.newBalance);
          setIsSpinning(false);

          // Verifica condições especiais após a parada total
          if (data.isJackpot) {
            playJackpotSound();
            setShowJackpotCelebration(true);
          } else if (data.gameOver) {
            setShowOutOfBalanceModal(true);
          }
        }, 2000);

      } else {
        const errData = await res.json();
        showError(errData.error || "Ocorreu um erro no giro.");
        // Restaura o saldo buscando do servidor
        fetchStatus();
        setIsSpinning(false);
        setSpinningReels([false, false, false]);
      }
    } catch (err) {
      console.error("Erro de rede no giro:", err);
      showError("Erro de rede. Verifique se o servidor backend está ligado.");
      fetchStatus();
      setIsSpinning(false);
      setSpinningReels([false, false, false]);
    }
  }, [isSpinning, balance, fetchStatus, showError]);
  // Busca o saldo do jogador ao carregar a página
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStatus();
  }, [fetchStatus]);
  // Atalhos de teclado (Enter para girar e F8 para parar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Se algum modal ou painel de comemoração estiver ativo, não responde aos atalhos globais
      if (showDepositModal || showOutOfBalanceModal || showJackpotCelebration) {
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (!isSpinning) {
          if (balance > 0) {
            handleSpin();
          } else {
            setShowOutOfBalanceModal(true);
          }
        }
      }

      if (e.key === "F8") {
        e.preventDefault();
        if (!isSpinning) {
          handleQuit();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSpinning, balance, showDepositModal, showOutOfBalanceModal, showJackpotCelebration, handleSpin, handleQuit]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Cabeçalho */}
      <header className="casino-header">
        <div className="casino-brand">
          <h1 className="casino-title">Java Slot Machine</h1>
          <span className="casino-subtitle">Simulador de Cassino</span>
        </div>
        <button className="btn-deposit" onClick={() => setShowDepositModal(true)}>
          DEPOSITAR
        </button>
      </header>

      {/* Conteúdo Principal */}
      <main className="game-container">
        <div className="cabinet-outer">
          <div className="cabinet-title-box">
            <h2 className="cabinet-title">Jackpot Machine</h2>
          </div>

          {/* Painel do Saldo */}
          <div className="dashboard">
            <span className="balance-label">Fichas Disponíveis</span>
            <div className="balance-value">{balance}</div>
          </div>

          {/* Bobinas (Reels) */}
          <div className="reels-wrapper">
            {reels.map((symbol, index) => (
              <div className="reel-window" key={index}>
                <div className={`reel-strip ${spinningReels[index] ? "spinning" : ""}`}>
                  {spinningReels[index] ? (
                    ANIMATION_SYMBOLS.map((sym, sIdx) => (
                      <div className="symbol-item" key={sIdx}>
                        <SlotSymbol name={sym} size={90} />
                      </div>
                    ))
                  ) : (
                    <div className="symbol-item">
                      <SlotSymbol name={symbol} size={95} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Controles de Jogo */}
          <div className="controls">
            <button
              className="btn-control btn-girar"
              disabled={isSpinning || balance <= 0}
              onClick={handleSpin}
            >
              {isSpinning ? "Girando..." : "Girar"}
            </button>
            <button
              className="btn-control btn-parar"
              disabled={isSpinning}
              onClick={handleQuit}
            >
              Parar
            </button>
          </div>
        </div>

        {/* Regras do Jogo e Boas-vindas */}
        <section className="rules-card">
          <h3 className="rules-title">Regras do Jogo & Instruções</h3>
          <ul className="rules-list">
            <li><strong>Depósito:</strong> Clique no botão "Depositar" para adicionar fichas (1 moeda = 1 ficha).</li>
            <li><strong>Custo por Giro:</strong> Cada giro custa exatamente 1 ficha do seu saldo disponível.</li>
            <li><strong>Jackpot:</strong> Consiga três símbolos 7️⃣ seguidos para ganhar o Jackpot, que dobra o seu saldo!</li>
            <li><strong>Parar:</strong> O botão "Parar" limpa a sessão atual e encerra a rodada.</li>
          </ul>
        </section>
      </main>

      {/* Toast de Erros */}
      {errorMsg && <div className="toast-msg">{errorMsg}</div>}

      {/* Modal de Depósito */}
      {showDepositModal && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleDepositSubmit}>
            <h3 className="modal-title">Efetuar Depósito</h3>
            <p className="modal-text">Digite abaixo o valor em dinheiro a ser convertido em fichas de jogo.</p>
            <div className="deposit-input-wrapper">
              <input
                type="number"
                className="deposit-input"
                placeholder="Ex: 50"
                min="1"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="deposit-buttons">
              <button type="submit" className="btn-modal btn-confirm">
                Confirmar
              </button>
              <button
                type="button"
                className="btn-modal btn-cancel"
                onClick={() => setShowDepositModal(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal de Saldo Esgotado */}
      {showOutOfBalanceModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Saldo Esgotado</h3>
            <p className="modal-text">Você está sem fichas! Deseja fazer um novo depósito ou parar de jogar?</p>
            <div className="deposit-buttons">
              <button
                type="button"
                className="btn-modal btn-confirm"
                onClick={() => {
                  setShowOutOfBalanceModal(false);
                  setShowDepositModal(true);
                }}
              >
                Depositar
              </button>
              <button
                type="button"
                className="btn-modal btn-cancel"
                onClick={handleQuit}
              >
                Parar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Tela de Celebração de Jackpot */}
      {showJackpotCelebration && (
        <div className="jackpot-overlay">
          <div className="jackpot-banner">🎉 JACKPOT !!! 🎉</div>
          <div className="jackpot-sub">Parabéns! Você tirou três 7️⃣ e seu saldo dobrou!</div>
          <button
            className="jackpot-btn"
            onClick={() => setShowJackpotCelebration(false)}
          >
            CONTINUAR JOGANDO
          </button>
        </div>
      )}

      {/* Definições globais de gradientes e filtros SVG para evitar duplicidade de IDs no DOM */}
      <svg style={{ display: "none" }}>
        <defs>
          <linearGradient id="gradCherry" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff3366" />
            <stop offset="100%" stopColor="#990022" />
          </linearGradient>
          <linearGradient id="gradLemon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffb8f" />
            <stop offset="60%" stopColor="#fadb14" />
            <stop offset="100%" stopColor="#ad8b00" />
          </linearGradient>
          <linearGradient id="gradBell" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe58f" />
            <stop offset="40%" stopColor="#ffc53d" />
            <stop offset="100%" stopColor="#d4b106" />
          </linearGradient>
          <linearGradient id="gradStar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffb8f" />
            <stop offset="50%" stopColor="#ffc53d" />
            <stop offset="100%" stopColor="#ff7875" />
          </linearGradient>
          <filter id="glowStar" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="gradClover" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bae637" />
            <stop offset="50%" stopColor="#73d13d" />
            <stop offset="100%" stopColor="#237804" />
          </linearGradient>
          <linearGradient id="gradDiamond" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e6f7ff" />
            <stop offset="40%" stopColor="#91d5ff" />
            <stop offset="70%" stopColor="#1890ff" />
            <stop offset="100%" stopColor="#0050b3" />
          </linearGradient>
          <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d4f" />
            <stop offset="40%" stopColor="#ff7a45" />
            <stop offset="85%" stopColor="#ffec3d" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="glow7" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
