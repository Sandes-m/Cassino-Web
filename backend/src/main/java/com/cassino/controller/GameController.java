package com.cassino.controller;

import com.cassino.model.DepositRequest;
import com.cassino.model.GameStatus;
import com.cassino.model.SpinResult;
import com.cassino.service.GameService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    /**
     * Retorna o saldo atual do jogador a partir da sessão.
     */
    @GetMapping("/status")
    public ResponseEntity<GameStatus> getStatus(HttpSession session) {
        Integer balance = (Integer) session.getAttribute("balance");
        if (balance == null) {
            balance = 0;
            session.setAttribute("balance", balance);
        }
        return ResponseEntity.ok(new GameStatus(balance));
    }

    /**
     * Realiza um depósito na sessão do jogador.
     */
    @PostMapping("/deposit")
    public ResponseEntity<GameStatus> deposit(@RequestBody DepositRequest request, HttpSession session) {
        if (request.amount() <= 0) {
            throw new IllegalArgumentException("O valor do depósito deve ser maior que zero.");
        }

        Integer currentBalance = (Integer) session.getAttribute("balance");
        if (currentBalance == null) {
            currentBalance = 0;
        }

        int newBalance = currentBalance + request.amount();
        session.setAttribute("balance", newBalance);

        return ResponseEntity.ok(new GameStatus(newBalance));
    }

    /**
     * Realiza uma jogada (giro) consumindo saldo e girando os slots.
     */
    @PostMapping("/spin")
    public ResponseEntity<SpinResult> spin(HttpSession session) {
        Integer currentBalance = (Integer) session.getAttribute("balance");
        if (currentBalance == null || currentBalance <= 0) {
            throw new IllegalStateException("Saldo insuficiente para jogar. Por favor, faça um depósito.");
        }

        SpinResult result = gameService.spin(currentBalance);
        session.setAttribute("balance", result.newBalance());

        return ResponseEntity.ok(result);
    }

    /**
     * Encerra a sessão de jogo e limpa o saldo.
     */
    @PostMapping("/quit")
    public ResponseEntity<GameStatus> quit(HttpSession session) {
        session.removeAttribute("balance");
        session.invalidate();
        return ResponseEntity.ok(new GameStatus(0));
    }

    /**
     * Trata erros de estado ilegal (como girar sem saldo).
     */
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, String>> handleIllegalState(IllegalStateException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }

    /**
     * Trata erros de argumento inválido (como depósitos negativos).
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }

    /**
     * Trata erros internos genéricos.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        return ResponseEntity.status(500).body(Map.of("error", "Ocorreu um erro inesperado no servidor do cassino."));
    }
}
