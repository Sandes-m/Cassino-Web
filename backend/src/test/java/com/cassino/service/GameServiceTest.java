package com.cassino.service;

import com.cassino.model.SpinResult;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

class GameServiceTest {

    @Mock
    private Random random;

    @InjectMocks
    private GameService gameService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSpinWithNoBalanceThrowsException() {
        assertThrows(IllegalStateException.class, () -> gameService.spin(0));
        assertThrows(IllegalStateException.class, () -> gameService.spin(-5));
    }

    @Test
    void testSpinReducesBalanceByOneAndGeneratesSymbols() {
        // Mock random values (e.g. index 0, 1, 2)
        when(random.nextInt(anyInt()))
                .thenReturn(0) // 🍒
                .thenReturn(1) // 🍋
                .thenReturn(2); // 🔔

        SpinResult result = gameService.spin(10);

        assertEquals(9, result.newBalance());
        assertFalse(result.isJackpot());
        assertFalse(result.gameOver());
        assertEquals(3, result.slots().size());
        assertEquals("🍒", result.slots().get(0));
        assertEquals("🍋", result.slots().get(1));
        assertEquals("🔔", result.slots().get(2));
    }

    @Test
    void testJackpotDoublesBalance() {
        // Mock random values to get index 6 for all ("7️⃣")
        when(random.nextInt(anyInt()))
                .thenReturn(6) // 7️⃣
                .thenReturn(6) // 7️⃣
                .thenReturn(6); // 7️⃣

        // Spin with 10 balance.
        // Balance is reduced by 1 to 9.
        // Jackpot doubles 9 to 18.
        SpinResult result = gameService.spin(10);

        assertTrue(result.isJackpot());
        assertEquals(18, result.newBalance());
        assertFalse(result.gameOver());
    }

    @Test
    void testGameOverOnZeroBalance() {
        // Mock standard non-winning spin
        when(random.nextInt(anyInt())).thenReturn(0);

        SpinResult result = gameService.spin(1);

        assertEquals(0, result.newBalance());
        assertTrue(result.gameOver());
        assertFalse(result.isJackpot());
    }
}
