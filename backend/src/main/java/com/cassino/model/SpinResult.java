package com.cassino.model;

import java.util.List;

public record SpinResult(
    List<String> slots,
    int newBalance,
    boolean isJackpot,
    boolean gameOver
) {}
