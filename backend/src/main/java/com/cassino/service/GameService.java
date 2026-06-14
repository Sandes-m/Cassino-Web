package com.cassino.service;

import com.cassino.model.SpinResult;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class GameService {

    private static final String[] SIMBOLOS = {"🍒", "🍋", "🔔", "⭐", "🍀", "💎", "7️⃣"};
    private final Random sorteio;

    public GameService() {
        this.sorteio = new Random();
    }

    public GameService(Random sorteio) {
        this.sorteio = sorteio;
    }

    /**
     * Realiza um giro (spin) no slot machine.
     * Reduz o saldo em 1 ficha, sorteia 3 símbolos e verifica jackpot.
     */
    public SpinResult spin(int currentBalance) {
        if (currentBalance <= 0) {
            throw new IllegalStateException("Saldo insuficiente para jogar. Por favor, faça um depósito.");
        }

        int balanceAfterSpin = currentBalance - 1;

        String slot1 = SIMBOLOS[sorteio.nextInt(SIMBOLOS.length)];
        String slot2 = SIMBOLOS[sorteio.nextInt(SIMBOLOS.length)];
        String slot3 = SIMBOLOS[sorteio.nextInt(SIMBOLOS.length)];

        boolean isJackpot = slot1.equals("7️⃣") && slot2.equals("7️⃣") && slot3.equals("7️⃣");

        if (isJackpot) {
            balanceAfterSpin *= 2;
        }

        boolean gameOver = balanceAfterSpin <= 0;

        return new SpinResult(
                List.of(slot1, slot2, slot3),
                balanceAfterSpin,
                isJackpot,
                gameOver
        );
    }

    /**
     * Mapeia os símbolos disponíveis do jogo.
     */
    public String[] getSimbolos() {
        return SIMBOLOS;
    }
}
